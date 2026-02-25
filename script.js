// 1. Typewriter Effect Configuration
const textElement = document.getElementById('typewriter');
const phrases = ["Building Digital Experiences.", "Full Stack Developer.", "UI/UX Enthusiast.", "Problem Solver."];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentPhrase.length) {
        isDeleting = true;
        speed = 1500; // Pause at the end of phrase
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

// 2. Intersection Observer for Scroll Animations
// This is more efficient than the traditional 'window.onscroll'
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// 3. Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});

// 4. Form Submission (Preventing page refresh)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.innerText = "Message Sent!";
        btn.style.background = "#22c55e"; // Success green
        contactForm.reset();
    });
}