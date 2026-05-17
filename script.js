// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
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
});
