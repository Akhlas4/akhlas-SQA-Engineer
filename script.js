// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initHeroAnimations();
    initServicesAnimations();
    initProjectsAnimations();
    initAboutAnimations();
    initExperienceAnimations();
    initSmoothScrolling();
});

// Navigation Animation
function initNavigation() {
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.nav-menu li', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power2.out'
    });
}

// Hero Section Animations
function initHeroAnimations() {
    const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    // Animate title lines
    tl.from('.title-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    })
    .from('.hero-email', {
        x: -50,
        opacity: 0,
        duration: 0.8
    }, '-=0.5')
    .from('.hero-stats', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8
    }, '-=0.5');

    // Animate center image
    gsap.from('.brush-stroke', {
        scale: 0,
        rotation: -45,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        delay: 0.3
    });

    gsap.from('.hero-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out'
    });

    // Animate right side
    gsap.from('.hero-tagline', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.8
    });

    gsap.from('.certification-badge', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 1
    });

    // Floating animation for image
    gsap.to('.hero-image', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Rotate brush stroke slowly
    gsap.to('.brush-stroke', {
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// Services Section Animations
function initServicesAnimations() {
    // Animate service items on scroll
    gsap.utils.toArray('.service-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: -100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15
        });

        // Add hover animation
        item.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.service-icon'), {
                scale: 1.1,
                rotation: 5,
                duration: 0.3
            });
        });

        item.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.service-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.3
            });
        });
    });

    // Animate section title
    gsap.from('.services-right .section-title', {
        scrollTrigger: {
            trigger: '.services-right',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

    // Animate descriptions
    gsap.from('.section-description', {
        scrollTrigger: {
            trigger: '.services-right',
            start: 'top 70%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3
    });

    // Animate stats
    gsap.from('.stat-box', {
        scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });

    // Counter animation for stats
    animateCounter('.stat-box h3:contains("285")', 0, 285, 2);
    animateCounter('.stat-box h3:contains("190")', 0, 190, 2);
}

// Projects Section Animations
function initProjectsAnimations() {
    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        const image = card.querySelector('.project-image-wrapper');
        const info = card.querySelector('.project-info');
        const counter = card.querySelector('.project-counter');

        // Create timeline for each card
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });

        // Animate based on card position (even/odd)
        if (index % 2 === 0) {
            tl.from(image, {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
            .from(info, {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.7');
        } else {
            tl.from(image, {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
            .from(info, {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.7');
        }

        // Animate counter
        tl.from(counter, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(1.7)'
        }, '-=0.5');

        // Animate project info elements
        tl.from(card.querySelector('.project-category'), {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, '-=0.5')
        .from(card.querySelector('.project-title'), {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from(card.querySelector('.project-description'), {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, '-=0.4');

        // Parallax effect on scroll
        gsap.to(image, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            ease: 'none'
        });
    });

    // Animate scrolling text
    const scrollText = document.querySelector('.scroll-text');
    if (scrollText) {
        // Clone the text for seamless loop
        scrollText.innerHTML += scrollText.innerHTML;
    }
}

// About Section Animations
function initAboutAnimations() {
    gsap.from('.about-title', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%'
        },
        x: -50,
        opacity: 0,
        duration: 1
    });

    gsap.from('.about-years', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%'
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });

    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 70%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
    });

    gsap.from('.about-stat', {
        scrollTrigger: {
            trigger: '.about-stats-grid',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3
    });

    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 70%'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Parallax effect for about image
    gsap.to('.about-image img', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -80,
        ease: 'none'
    });
}

// Experience Section Animations
function initExperienceAnimations() {
    gsap.from('.experience-section .section-title', {
        scrollTrigger: {
            trigger: '.experience-section',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

    gsap.utils.toArray('.experience-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%'
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });

        // Animate list items
        gsap.from(card.querySelectorAll('.experience-description li'), {
            scrollTrigger: {
                trigger: card,
                start: 'top 75%'
            },
            x: -30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: index * 0.15 + 0.3
        });
    });
}

// Skills section animation
gsap.from('.skills-title', {
    scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 1
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

// Counter animation helper function
function animateCounter(selector, start, end, duration) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(element, {
                    innerHTML: end,
                    duration: duration,
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        element.innerHTML = Math.ceil(this.targets()[0].innerHTML) + '+';
                    }
                });
            },
            once: true
        });
    });
}

// Mouse cursor effect (optional enhancement)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

let cursorStyle = document.createElement('style');
cursorStyle.innerHTML = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #2d7a6e;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    }
    
    @media (min-width: 1024px) {
        .custom-cursor {
            display: block;
        }
    }
`;
document.head.appendChild(cursorStyle);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// Scale cursor on hover over interactive elements
document.querySelectorAll('a, button, .service-item, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 2,
            backgroundColor: 'rgba(45, 122, 110, 0.2)',
            duration: 0.3
        });
    });

    element.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            backgroundColor: 'transparent',
            duration: 0.3
        });
    });
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Add loading animation
window.addEventListener('load', () => {
    gsap.to('body', {
        opacity: 1,
        duration: 0.5
    });
});

// Set initial body opacity
gsap.set('body', { opacity: 0 });

console.log('GSAP Animations Initialized Successfully!');
