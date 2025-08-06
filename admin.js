// admin.js
document.addEventListener('DOMContentLoaded', () => {
    const backendUrl = 'http://localhost:3000'; // Make sure this matches your backend server URL

    const authSection = document.getElementById('auth-section');
    const messagesSection = document.getElementById('messages-section');
    const adminUsernameInput = document.getElementById('admin-username');
    const adminPasswordInput = document.getElementById('admin-password');
    const loginBtn = document.getElementById('login-btn');
    const authStatus = document.getElementById('auth-status');
    const logoutBtn = document.getElementById('logout-btn');

    const messageList = document.getElementById('message-list');
    const filterReadSelect = document.getElementById('filter-read');
    const refreshBtn = document.getElementById('refresh-btn');
    const noMessagesFound = document.getElementById('no-messages-found');
    const statusMessage = document.getElementById('status-message');

    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const pageInfoSpan = document.getElementById('page-info');

    let currentPage = 1;
    const messagesPerPage = 5; // You can adjust this
    let totalMessages = 0;

    // --- Helper Functions ---

    function showStatusMessage(message, type = 'info') {
        statusMessage.textContent = message;
        statusMessage.style.display = 'block';
        statusMessage.style.backgroundColor = type === 'error' ? '#ffdddd' : (type === 'success' ? '#d4edda' : '#ffe08a');
        statusMessage.style.color = type === 'error' ? '#721c24' : (type === 'success' ? '#155724' : '#333');
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }

    function getToken() {
        return localStorage.getItem('adminToken'); // Using Basic Auth, this will be username:password in base64
    }

    function setToken(username, password) {
        const token = btoa(`${username}:${password}`); // Base64 encode
        localStorage.setItem('adminToken', token);
    }

    function clearToken() {
        localStorage.removeItem('adminToken');
    }

    function isAuthenticated() {
        return getToken() !== null;
    }

    function renderMessages(messages) {
        messageList.innerHTML = ''; // Clear previous messages
        if (messages.length === 0) {
            noMessagesFound.style.display = 'block';
            return;
        }
        noMessagesFound.style.display = 'none';

        messages.forEach(message => {
            const messageCard = document.createElement('div');
            messageCard.classList.add('message-card');
            if (message.is_read) {
                messageCard.classList.add('read');
            }

            const date = new Date(message.timestamp).toLocaleString();

            messageCard.innerHTML = `
                <h3>From: ${message.name}</h3>
                <p><strong>Email:</strong> ${message.email}</p>
                <p><strong>Phone:</strong> ${message.phone || 'N/A'}</p>
                <p><strong>Message:</strong> ${message.message}</p>
                <p class="message-meta">Received: ${date} ${message.is_read ? '(Read)' : '(Unread)'}</p>
                <div class="message-actions">
                    ${!message.is_read ? `<button class="mark-read-btn" data-id="${message.id}">Mark as Read</button>` : ''}
                    <button class="delete-btn" data-id="${message.id}">Delete</button>
                </div>
            `;
            messageList.appendChild(messageCard);
        });
    }

    async function fetchMessages() {
        if (!isAuthenticated()) {
            showAdminState(false);
            return;
        }

        try {
            const filter = filterReadSelect.value;
            let queryParams = `?page=${currentPage}&limit=${messagesPerPage}`;
            if (filter !== 'all') {
                queryParams += `&is_read=${filter === 'read' ? 1 : 0}`;
            }

            const response = await fetch(`${backendUrl}/admin/messages${queryParams}`, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                }
            });

            if (response.status === 401) {
                showStatusMessage('Session expired or unauthorized. Please log in again.', 'error');
                clearToken();
                showAdminState(false);
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch messages');
            }

            const data = await response.json();
            totalMessages = data.total;
            renderMessages(data.messages);
            updatePaginationControls();

        } catch (error) {
            console.error('Error fetching messages:', error);
            showStatusMessage(`Error: ${error.message}`, 'error');
            // If fetching fails, clear messages and show no messages found
            messageList.innerHTML = '';
            noMessagesFound.style.display = 'block';
            totalMessages = 0;
            updatePaginationControls();
        }
    }

    async function login() {
        const username = adminUsernameInput.value.trim();
        const password = adminPasswordInput.value.trim();

        if (!username || !password) {
            authStatus.textContent = 'Please enter both username and password.';
            authStatus.style.color = 'red';
            return;
        }

        try {
            const token = btoa(`${username}:${password}`); // Base64 encode for Basic Auth header
            const response = await fetch(`${backendUrl}/admin/login`, {
                method: 'POST', // Method doesn't matter for basic auth middleware, but POST is semantically for login
                headers: {
                    'Authorization': `Basic ${token}`,
                    'Content-Type': 'application/json' // Even if body is empty, for some servers
                }
            });

            if (response.ok) {
                setToken(username, password); // Store the basic auth token
                authStatus.textContent = 'Login successful!';
                authStatus.style.color = 'green';
                showAdminState(true);
                currentPage = 1; // Reset to first page on successful login
                fetchMessages();
            } else {
                const errorData = await response.json();
                authStatus.textContent = `Login failed: ${errorData.message || 'Invalid credentials'}`;
                authStatus.style.color = 'red';
            }
        } catch (error) {
            console.error('Login error:', error);
            authStatus.textContent = 'Login failed. Server not reachable.';
            authStatus.style.color = 'red';
        }
    }

    function logout() {
        clearToken();
        showAdminState(false);
        showStatusMessage('Logged out successfully.', 'info');
    }

    async function markAsRead(id) {
        if (!confirm('Are you sure you want to mark this message as read?')) {
            return;
        }
        try {
            const response = await fetch(`${backendUrl}/admin/messages/${id}/read`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Basic ${getToken()}`
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    showStatusMessage('Session expired or unauthorized. Please log in again.', 'error');
                    clearToken();
                    showAdminState(false);
                    return;
                }
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to mark as read');
            }
            showStatusMessage('Message marked as read successfully!', 'success');
            fetchMessages(); // Refresh messages
        } catch (error) {
            console.error('Error marking message as read:', error);
            showStatusMessage(`Error: ${error.message}`, 'error');
        }
    }

    async function deleteMessage(id) {
        if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
            return;
        }
        try {
            const response = await fetch(`${backendUrl}/admin/messages/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Basic ${getToken()}`
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    showStatusMessage('Session expired or unauthorized. Please log in again.', 'error');
                    clearToken();
                    showAdminState(false);
                    return;
                }
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete message');
            }
            showStatusMessage('Message deleted successfully!', 'success');
            // Check if current page is empty after deletion and there are other pages
            if (currentPage > 1 && messageList.children.length === 1 && totalMessages - 1 <= (currentPage - 1) * messagesPerPage) {
                currentPage--;
            }
            fetchMessages(); // Refresh messages
        } catch (error) {
            console.error('Error deleting message:', error);
            showStatusMessage(`Error: ${error.message}`, 'error');
        }
    }

    function updatePaginationControls() {
        const totalPages = Math.ceil(totalMessages / messagesPerPage);
        pageInfoSpan.textContent = `Page ${currentPage} of ${totalPages}`;

        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    function showAdminState(loggedIn) {
        if (loggedIn) {
            authSection.style.display = 'none';
            messagesSection.style.display = 'block';
        } else {
            authSection.style.display = 'block';
            messagesSection.style.display = 'none';
            authStatus.textContent = 'Please log in to access the admin panel.';
            authStatus.style.color = '#0056b3'; // Reset to info color
            adminUsernameInput.value = '';
            adminPasswordInput.value = '';
            messageList.innerHTML = ''; // Clear messages
            noMessagesFound.style.display = 'none';
            totalMessages = 0;
            currentPage = 1;
            updatePaginationControls();
        }
    }

    // --- Event Listeners ---
    loginBtn.addEventListener('click', login);
    adminPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            login();
        }
    });
    logoutBtn.addEventListener('click', logout);
    filterReadSelect.addEventListener('change', () => {
        currentPage = 1; // Reset to first page when filter changes
        fetchMessages();
    });
    refreshBtn.addEventListener('click', fetchMessages);

    messageList.addEventListener('click', (event) => {
        if (event.target.classList.contains('mark-read-btn')) {
            const id = event.target.dataset.id;
            markAsRead(id);
        } else if (event.target.classList.contains('delete-btn')) {
            const id = event.target.dataset.id;
            deleteMessage(id);
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchMessages();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(totalMessages / messagesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            fetchMessages();
        }
    });

    // Initial check on page load
    if (isAuthenticated()) {
        showAdminState(true);
        fetchMessages();
    } else {
        showAdminState(false);
    }
});