document.addEventListener('DOMContentLoaded', () => {
    // --- Translations Object ---
    const translations = {
        en: {
            nav_home: "Home",
            nav_about: "About Me",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_contact: "Contact Us",
            hero_greeting: 'Hi, I am "Zawmyolwin(ابلکلم)"',
            hero_tagline: "A Passionate Web Developer",
            hero_description: "Crafting engaging and user-friendly digital experiences with a focus on clean code and innovative solutions.",
            btn_view_work: "View My Work",
            btn_get_in_touch: "Get In Touch",
            journey_heading: "My Journey &amp; Experience",
            journey_para1: "I'm Zawmyolwin(ابلکلم), a passionate web developer with one year of hands-on experience in crafting dynamic and user-centric web applications. My journey into web development began with a fascination for how digital interfaces come to life, evolving into a dedication to building robust and elegant solutions.",
            journey_para2: "Over the past year, I've had the privilege to collaborate with talented individuals and teams, contributing to diverse projects ranging from intuitive user interfaces to powerful front-end systems. My focus has always been on writing clean, efficient, and maintainable code, ensuring a seamless experience for users and developers alike.",
            journey_para3: "I thrive on continuous learning and adapting to new technologies, constantly seeking ways to enhance my skills and deliver cutting-edge solutions. Every project is an opportunity to learn, innovate, and exceed expectations.",
            skills_heading: "My Skills",
            skill_html: "HTML5",
            skill_css: "CSS3",
            skill_js: "JavaScript",
            skill_node: "Node.js",
            skill_python: "Python",
            skill_ai_ml: "AI/ML Basics",
            projects_heading: "My Recent Projects",
            project1_title: "To-do-list",
            project1_desc: "A simple and efficient to-do list application to help users manage their daily tasks and stay organized.",
            project2_title: "Portfolio Website",
            project2_desc: "A dynamic and responsive portfolio showcasing my skills, projects, and professional journey as a web developer.",
            project3_title: "Restaurant Website",
            project3_desc: "A modern and inviting website for a restaurant, featuring online menu, table reservations, and contact information.",
            btn_view_details: "View Details",
            contact_heading: "Get In Touch",
            form_name_label: "Name",
            form_name_placeholder: "Enter your name",
            form_phone_label: "Phone",
            form_phone_placeholder: "Enter your phone number (optional)",
            form_email_label: "Email",
            form_email_placeholder: "Enter your email",
            form_message_label: "Your Message",
            form_message_placeholder: "Type your message here...",
            form_submit_btn: "Send Message",
            alert_success: "Thank you for your message, Abulkalam will get back to you soon!"
        },
        my: {
            // Burmese translations
            nav_home: "ပင်မ",
            nav_about: "ကျွန်ုပ်အကြောင်း",
            nav_skills: "ကျွမ်းကျင်မှုများ",
            nav_projects: "ပရောဂျက်များ",
            nav_contact: "ဆက်သွယ်ရန်",
            hero_greeting: "မင်္ဂလာပါ၊ ကျွန်ုပ်က 'Zawmyolwin(ابلکلم)'ပါ",
            hero_tagline: "စိတ်အားထက်သန်သော ဝဘ်ဆိုက်တည်ဆောက်သူ",
            hero_description: "သန့်ရှင်းသောကုဒ်နှင့် ဆန်းသစ်သောဖြေရှင်းနည်းများကို အလေးပေး၍ ဆွဲဆောင်မှုရှိပြီး အသုံးပြုရလွယ်ကူသော ဒစ်ဂျစ်တယ်အတွေ့အကြုံများကို ဖန်တီးနေပါသည်။",
            btn_view_work: "ကျွန်ုပ်၏လက်ရာများကို ကြည့်ရန်",
            btn_get_in_touch: "ဆက်သွယ်ရန်",
            journey_heading: "ကျွန်ုပ်၏ခရီးနှင့်အတွေ့အကြုံ",
            journey_para1: "ကျွန်ုပ်သည် Zawmyolwin(ابلکلم) ဖြစ်ပြီး၊ ခေတ်မီပြီး အသုံးပြုသူဗဟိုပြု ဝဘ်အက်ပလီကေးရှင်းများ ဖန်တီးရာတွင် တစ်နှစ်တာ လက်တွေ့အတွေ့အကြုံရှိသော စိတ်အားထက်သန်သည့် ဝဘ်ဆိုက်တည်ဆောက်သူတစ်ဦး ဖြစ်ပါသည်။ ကျွန်ုပ်၏ဝဘ်ဆိုက်တည်ဆောက်ရေးခရီးသည် ဒစ်ဂျစ်တယ်မျက်နှာပြင်များ မည်သို့အသက်ဝင်လာသည်ကို စိတ်ဝင်စားမှုဖြင့် စတင်ခဲ့ပြီး ခိုင်မာပြီး စနစ်ကျသည့် ဖြေရှင်းနည်းများ ဖန်တီးရာတွင် အပ်နှံမှုဖြင့် တိုးတက်လာပါသည်။",
            journey_para2: "ပြီးခဲ့သည့်တစ်နှစ်အတွင်း အရည်အချင်းရှိသူများနှင့် အဖွဲ့များနှင့် ပူးပေါင်းလုပ်ကိုင်ခွင့်ရခဲ့ပြီး အသုံးပြုသူမျက်နှာပြင်မှ စွမ်းအားမြင့် front-end စနစ်များအထိ မတူညီသော ပရောဂျက်များစွာတွင် ပါဝင်ခဲ့ပါသည်။ ကျွန်ုပ်၏အာရုံစူးစိုက်မှုသည် အမြဲတမ်း သန့်ရှင်း၊ ထိရောက်ပြီး ထိန်းသိမ်းရလွယ်ကူသော ကုဒ်များကို ရေးသားခြင်းဖြစ်ပြီး အသုံးပြုသူများနှင့် တည်ဆောက်သူများအတွက် ချောမွေ့သော အတွေ့အကြုံကို သေချာစေပါသည်။",
            journey_para3: "ကျွန်ုပ်သည် အဆက်မပြတ်သင်ယူခြင်းနှင့် နည်းပညာအသစ်များကို လိုက်လျောညီထွေဖြစ်အောင် လုပ်ဆောင်ခြင်းကို နှစ်သက်ပြီး ကျွန်ုပ်၏ကျွမ်းကျင်မှုများကို မြှင့်တင်ရန်နှင့် ခေတ်မီဆန်းသစ်သော ဖြေရှင်းနည်းများကို ပေးအပ်ရန် နည်းလမ်းများကို အမြဲရှာဖွေနေပါသည်။ ပရောဂျက်တိုင်းသည် သင်ယူရန်၊ ဆန်းသစ်ရန်နှင့် မျှော်လင့်ချက်များကို ကျော်လွန်ရန် အခွင့်အလမ်းတစ်ခု ဖြစ်ပါသည်။",
            skills_heading: "ကျွန်ုပ်၏ကျွမ်းကျင်မှုများ",
            skill_html: "HTML5",
            skill_css: "CSS3",
            skill_js: "JavaScript",
            skill_node: "Node.js",
            skill_python: "Python",
            skill_ai_ml: "AI/ML အခြေခံ",
            projects_heading: "ကျွန်ုပ်၏နောက်ဆုံးပရောဂျက်များ",
            project1_title: "လုပ်ရမည့်အရာများစာရင်း",
            project1_desc: "အသုံးပြုသူများအား တစ်နေ့တာလုပ်ရမည့် လုပ်ငန်းများကို စနစ်တကျ စီမံခန့်ခွဲနိုင်ရန် ဒီဇိုင်းထုတ်ထားသော ရိုးရှင်းပြီး ထိရောက်သော To-do list အက်ပလီကေးရှင်း။",
            project2_title: "Portfolio ဝဘ်ဆိုက်",
            project2_desc: "ကျွန်ုပ်၏ကျွမ်းကျင်မှုများ၊ ပရောဂျက်များနှင့် ဝဘ်ဆိုက်တည်ဆောက်သူတစ်ဦးအနေဖြင့် ပရော်ဖက်ရှင်နယ်ခရီးကို ပြသထားသည့် ရွေ့လျားမှုရှိပြီး တုံ့ပြန်မှုရှိသော Portfolio ဝဘ်ဆိုက်။",
            project3_title: "စားသောက်ဆိုင် ဝဘ်ဆိုက်",
            project3_desc: "အွန်လိုင်းမီနူး၊ စားပွဲကြိုတင်မှာကြားခြင်းနှင့် ဆက်သွယ်ရန်အချက်အလက်များ ပါဝင်သော စားသောက်ဆိုင်အတွက် ခေတ်မီပြီး ဖိတ်ခေါ်သောဝဘ်ဆိုက်။",
            btn_view_details: "အသေးစိတ်ကြည့်ရန်",
            contact_heading: "ဆက်သွယ်ရန်",
            form_name_label: "အမည်",
            form_name_placeholder: "သင်၏အမည်ကို ထည့်ပါ",
            form_phone_label: "ဖုန်းနံပါတ်",
            form_phone_placeholder: "သင်၏ဖုန်းနံပါတ်ကို ထည့်ပါ (ရွေးချယ်နိုင်သည်)",
            form_email_label: "အီးမေးလ်",
            form_email_placeholder: "သင်၏အီးမေးလ်ကို ထည့်ပါ",
            form_message_label: "သင်၏စာ",
            form_message_placeholder: "သင်၏စာကို ဤနေရာတွင် ရိုက်ထည့်ပါ...",
            form_submit_btn: "စာပို့မည်",
            alert_success: "သင်၏စာအတွက် ကျေးဇူးတင်ပါသည်။ Abulkalam သည် မကြာမီ သင့်ထံ ပြန်လည်ဆက်သွယ်ပါမည်။"
        }
    };

    let currentLang = localStorage.getItem('lang') || 'en'; // Default to English
    const langToggle = document.getElementById('lang-toggle');

    // Function to set the language
    function setLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Update the language toggle button text
        langToggle.textContent = lang === 'en' ? 'မြန်မာ' : 'Eng';
        localStorage.setItem('lang', lang);
    }

    // Call setLanguage initially to apply stored or default language
    setLanguage(currentLang);

    // --- Navigation Bar Toggle (Hamburger Menu) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded); // For accessibility
    });

    // Close mobile menu when a navigation link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- Dark/Light Mode Toggle ---
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const iconDark = modeToggle.querySelector('.icon-dark');
    const iconLight = modeToggle.querySelector('.icon-light');

    // Initialize mode based on local storage or system preference
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentMode = localStorage.getItem('theme') || (prefersDarkMode ? 'dark' : 'light');

    if (currentMode === 'light') {
        body.classList.add('light-mode');
        iconDark.style.display = 'none';
        iconLight.style.display = 'block';
    } else {
        iconDark.style.display = 'block';
        iconLight.style.display = 'none';
    }

    // Event listener for mode toggle button click
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            iconDark.style.display = 'none';
            iconLight.style.display = 'block';
        } else {
            localStorage.setItem('theme', 'dark');
            iconDark.style.display = 'block';
            iconLight.style.display = 'none';
        }
    });

    // --- Language Toggle ---
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'my' : 'en';
        setLanguage(currentLang);
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth' // Smooth scroll animation
            });
        });
    });

    // --- Dynamic Greeting in Hero Section ---
    const highlightText = document.querySelector('.highlight-text');

    let greetingIndex = 0;
    let greetingInterval; // Declare interval variable outside to clear it later

    function changeGreeting() {
        const greetingsEng = ["Abulkalam", "a Web Developer", "a Problem Solver", "a Creator"];
        const greetingsMy = ["အဘူလ်ကာလမ်", "ဝဘ်ဆိုက်တည်ဆောက်သူ", "ပြဿနာဖြေရှင်းသူ", "ဖန်တီးသူ"];
        const currentGreetings = localStorage.getItem('lang') === 'my' ? greetingsMy : greetingsEng;

        // Animate text content change for highlight
        highlightText.style.opacity = 0;
        setTimeout(() => {
            highlightText.textContent = currentGreetings[greetingIndex];
            highlightText.style.opacity = 1;
            greetingIndex = (greetingIndex + 1) % currentGreetings.length;
        }, 300); // Wait for fade out, then change text and fade in
    }

    // Initial call and interval setup for dynamic greeting
    setTimeout(() => {
        changeGreeting(); // Call immediately
        greetingInterval = setInterval(changeGreeting, 3500); // Change greeting every 3.5 seconds
    }, 1000); // Initial delay before the first change animation starts

    // --- Contact Form Submission to Backend ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Stop the form from submitting normally

            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            try {
                const response = await fetch('http://localhost:3000/api/contact', { // IMPORTANT: Use your backend URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    alert(translations[localStorage.getItem('lang') || 'en'].alert_success);
                    this.reset(); // Clear form fields after successful submission
                    launchConfetti(); // Optional: Launch confetti on success
                } else {
                    alert(`Error: ${result.message || 'Something went wrong.'}`);
                }
            } catch (error) {
                console.error('Network or server error:', error);
                alert('Failed to connect to the server. Please try again later.');
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // --- Confetti Effect on Page Load ---
    function launchConfetti() {
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FFFFFF', '#2C2C2C', '#FFA500', '#007bff']
            });
        }
    }

    setTimeout(launchConfetti, 1500);
});

