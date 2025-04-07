// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize VANTA.js background if available
    initVantaBackground();
});

// Initialize animations with intersection observer
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update icon based on current theme
    updateThemeIcon(savedTheme);
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// Initialize mobile navigation
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Initialize skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                progressBar.style.width = percentage + '%';
                // Unobserve after animation is triggered
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.1 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize VANTA.js background if available
function initVantaBackground() {
    if (typeof VANTA !== 'undefined' && typeof VANTA.NET !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x1d1f2f,
            color: 0xff7eb3,
            showDots: false
        });
    }
}

// Terminal contact form typing effect
function initTerminalForm() {
    const terminalForm = document.getElementById('terminal-form');
    
    if (!terminalForm) return;
    
    const inputs = terminalForm.querySelectorAll('.terminal-input');
    const prompts = document.querySelectorAll('.terminal-prompt-text');
    
    // Add typing sound effect
    function playTypeSound() {
        // This could be implemented with an actual sound effect
        // For now, we'll just leave this as a placeholder
    }
    
    // Add focus to the first input
    if (inputs.length > 0) {
        inputs[0].focus();
    }
    
    // Add typing effect to prompts
    prompts.forEach((prompt, index) => {
        const text = prompt.textContent;
        prompt.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                prompt.textContent += text.charAt(i);
                playTypeSound();
                i++;
            } else {
                clearInterval(typeInterval);
                // Focus the corresponding input after typing is complete
                if (inputs[index]) {
                    inputs[index].focus();
                }
            }
        }, 50);
    });
    
    // Handle form submission
    terminalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show sending message
        const responseElement = document.createElement('div');
        responseElement.classList.add('terminal-response');
        responseElement.textContent = '> Sending message...';
        terminalForm.appendChild(responseElement);
        
        // Simulate sending (would be replaced with actual form submission)
        setTimeout(() => {
            responseElement.textContent = '> Message sent successfully!';
            terminalForm.reset();
        }, 1500);
    });
}

// Call terminal form initialization if the page is loaded
window.addEventListener('load', function() {
    initTerminalForm();
});