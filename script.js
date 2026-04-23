// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements to be animated on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    
    // Observer options for triggering animations
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('is-visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial state setup before observing
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Logo parallax effect for premium feel
    const logoContainer = document.querySelector('.logo-container');
    const navbar = document.querySelector('.navbar');
    const leftMenu = document.querySelector('.nav-links.left-links');
    const badge = document.querySelector('.hero-img-badge');

    if (navbar && leftMenu) {
        const menuToggle = document.createElement('button');
        menuToggle.type = 'button';
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle menu');
        menuToggle.innerHTML = '<span aria-hidden="true"></span>';
        navbar.insertBefore(menuToggle, navbar.firstChild);

        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('menu-open');
        });

        document.addEventListener('click', (event) => {
            if (!navbar.contains(event.target) && navbar.classList.contains('menu-open')) {
                navbar.classList.remove('menu-open');
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Only apply parallax on desktop
        if (window.innerWidth >= 900 && logoContainer && scrolled < 300) {
            logoContainer.style.transform = `translateY(${scrolled * 0.15}px)`;
        }

        // Add scrolled class to navbar
        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if(badge && scrolled < 800) {
            badge.style.transform = `rotate(-6deg) translateY(${scrolled * -0.05}px)`;
        }
    });
    // Blog Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.postcard-link');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            blogPosts.forEach(post => {
                if (filter === 'all' || post.getAttribute('data-category') === filter) {
                    post.style.display = 'block';
                    // Re-trigger animation if hidden previously
                    setTimeout(() => {
                        post.classList.add('is-visible');
                    }, 50);
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
});
