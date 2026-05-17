// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Custom Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover effect to links and buttons
const interactables = document.querySelectorAll('a, button, .project-card, .skill-card');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Reveal elements on scroll
gsap.utils.toArray('section').forEach(function(elem) {
    gsap.fromTo(elem, 
        { y: 50, opacity: 0 }, 
        {
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
});

// Typing effect for the title
const titles = ["Software Developer", "B.Tech CSE Student", "Web Developer", "Android Dev"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 2000;
const typingTextSpan = document.querySelector(".typing-text");

function type() {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
        typingTextSpan.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextSpan.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex++;
        if (titleIndex >= titles.length) {
            titleIndex = 0;
        }
    }
    setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", function() {
    if(titles.length) setTimeout(type, newTextDelay + 250);
    loadProjects();
});

// Load Projects Dynamically from JSON
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        
        const container = document.getElementById('projects-container');
        container.innerHTML = ''; // Clear loading state

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <a href="${project.link}" class="project-link" target="_blank">
                        View Project <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            
            // Re-bind cursor events for dynamically loaded elements
            card.addEventListener('mouseenter', () => cursor.classList.add('active'));
            card.addEventListener('mouseleave', () => cursor.classList.remove('active'));
            
            const link = card.querySelector('.project-link');
            link.addEventListener('mouseenter', () => cursor.classList.add('active'));
            link.addEventListener('mouseleave', () => cursor.classList.remove('active'));

            container.appendChild(card);
        });

        // Trigger GSAP for new elements
        gsap.fromTo('.project-card', 
            { y: 50, opacity: 0 }, 
            {
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#projects-container",
                    start: "top 80%"
                }
            }
        );

    } catch (error) {
        console.error("Error loading projects:", error);
        document.getElementById('projects-container').innerHTML = '<p style="color:red">Failed to load projects.</p>';
    }
}
