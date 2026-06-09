// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const menuIcon = document.getElementById('menu-icon');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
    } else {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
});

// Close menu when clicking a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
});

// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.05,
    rootMargin: "0px 0px -20px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles for animation
const sections = document.querySelectorAll('section:not(.marquee-section)');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
});

// --- CUSTOM MOUSE CURSOR ---
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// --- TYPING EFFECT ---
const textArray = ["Faris Hilman Ramadhan", "Creative Coder", "Frontend Developer", "Web Enthusiast"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
const typedTextSpan = document.getElementById("typing-text");

function type() {
    const currentText = textArray[textIndex];

    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++;
        if (textIndex >= textArray.length) {
            textIndex = 0;
        }
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// --- DYNAMIC PROJECTS ---
const projectsData = [
    {
        title: "Sipentar Admin",
        description: "A premium modern admin dashboard for managing Sipentar data. Features complex data tables, charts, and administrative controls.",
        image: "sipentar_admin.png",
        tags: ["React", "JavaScript", "Tailwind CSS"],
        link: "https://github.com/frzhilman27/sipentar-admin"
    },
    {
        title: "Sipentar Frontend",
        description: "The main user portal for the Sipentar ecosystem. A dynamic and responsive frontend web application built with modern aesthetics.",
        image: "sipentar_frontend.png",
        tags: ["React", "JavaScript", "CSS"],
        link: "https://github.com/frzhilman27/sipentar-frontend"
    },
    {
        title: "Sipentar Backend",
        description: "A robust and scalable backend system powering the Sipentar platform, handling data persistence, authentication, and business logic.",
        image: "sipentar_backend.png",
        tags: ["Node.js", "Express", "Database"],
        link: "https://github.com/frzhilman27/sipentar-backend"
    },
    {
        title: "Task API NestJS",
        description: "A comprehensive REST API for task management built using TypeScript and the NestJS framework, demonstrating solid backend architecture.",
        image: "task_api.png",
        tags: ["TypeScript", "NestJS", "API"],
        link: "https://github.com/frzhilman27/task-api-nestjs"
    }
];

const projectContainer = document.getElementById('project-container');

function renderProjects() {
    if (!projectContainer) return;
    
    projectsData.forEach((project, index) => {
        const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        
        const cardHtml = `
            <div class="project-card" style="opacity: 0; transform: translateY(50px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; transition-delay: ${index * 0.1}s;">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="btn-text">View Repository →</a>
                </div>
            </div>
        `;
        projectContainer.insertAdjacentHTML('beforeend', cardHtml);
    });

    // Observe newly added project cards for scroll animation
    const newCards = projectContainer.querySelectorAll('.project-card');
    newCards.forEach(card => observer.observe(card));
}

document.addEventListener("DOMContentLoaded", () => {
    if (typedTextSpan) {
        setTimeout(type, newTextDelay + 250);
    }
    renderProjects();

    // --- CONTACT FORM TO WHATSAPP ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Format the WhatsApp message
            const waNumber = "6281310345751";
            const text = `Halo Faris!%0A%0A*Nama:* ${name}%0A*Email:* ${email}%0A*Pesan:* ${message}`;
            
            // Create WhatsApp URL
            const waUrl = `https://wa.me/${waNumber}?text=${text}`;
            
            // Open WhatsApp in a new tab
            window.open(waUrl, '_blank');
            
            // Reset form
            this.reset();
        });
    }
});

// --- VIBE MODE & LOFI PLAYER ---
const vibeToggle = document.getElementById('vibe-toggle');
let isVibeMode = false;
const lofiAudio = document.getElementById('lofi-audio');
const lofiStatus = document.getElementById('lofi-status');
const lofiPlayBtn = document.getElementById('lofi-play-btn');

if (vibeToggle) {
    vibeToggle.addEventListener('click', () => {
        isVibeMode = !isVibeMode;
        if (isVibeMode) {
            document.documentElement.setAttribute('data-theme', 'vibe');
            // Auto-play music if possible
            if (lofiAudio && lofiAudio.paused) {
                lofiAudio.play().catch(e => console.log("Auto-play prevented"));
            }
        } else {
            // Revert to saved theme (dark or light)
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        }
    });
}

// HTML5 Audio Logic
if (lofiPlayBtn && lofiAudio) {
    lofiStatus.textContent = "Ready to Play";

    lofiPlayBtn.addEventListener('click', () => {
        if (lofiAudio.paused) {
            lofiStatus.textContent = "Buffering...";
            lofiAudio.play().then(() => {
                lofiStatus.textContent = "Playing...";
                lofiPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }).catch(error => {
                lofiStatus.textContent = "Error playing audio";
                console.error("Audio playback error:", error);
            });
        } else {
            lofiAudio.pause();
            lofiStatus.textContent = "Paused";
            lofiPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });

    lofiAudio.addEventListener('playing', () => {
        lofiStatus.textContent = "Playing...";
        lofiPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    });

    lofiAudio.addEventListener('pause', () => {
        lofiStatus.textContent = "Paused";
        lofiPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    });

    lofiAudio.addEventListener('error', () => {
        lofiStatus.textContent = "Error Loading Audio";
    });
}
