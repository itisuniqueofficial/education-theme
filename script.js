document.addEventListener('DOMContentLoaded', () => {
    // Slider Logic
    const slides = document.querySelectorAll('.slider .item');
    const dots = document.querySelectorAll('.slideI .i');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let slideIndex = 0;
    let autoSlide;

    function setBackgrounds() {
        slides.forEach(slide => {
            const bg = slide.dataset.bg;
            slide.querySelector('.img').style.backgroundImage = `url(${bg})`;
        });
    }

    function showSlides(n) {
        slideIndex = (n + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle('active', i === slideIndex));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === slideIndex));
    }

    function moveSlide(n) {
        showSlides(slideIndex + n);
    }

    function currentSlide(n) {
        showSlides(n);
        clearInterval(autoSlide);
        startAutoSlide();
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => moveSlide(1), 4500);
    }

    setBackgrounds();
    showSlides(slideIndex);
    startAutoSlide();

    prevBtn.addEventListener('click', () => moveSlide(-1));
    nextBtn.addEventListener('click', () => moveSlide(1));
    dots.forEach(dot => dot.addEventListener('click', () => currentSlide(parseInt(dot.dataset.index))));
    document.querySelector('.slideB').addEventListener('mouseenter', () => clearInterval(autoSlide));
    document.querySelector('.slideB').addEventListener('mouseleave', startAutoSlide);

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
        const isActive = navUl.classList.contains('active');
        menuToggle.textContent = isActive ? '✕' : '☰';
        menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Lazy Load Animations
    const animateElements = document.querySelectorAll('.subject-card, .founder-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animate-in'), index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(el => observer.observe(el));

    // Enroll Now Modal
    document.querySelector('.cta-btn').addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'modal-title');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.8); z-index: 3000; display: flex;
            justify-content: center; align-items: center; opacity: 0;
            transition: opacity 0.4s ease;
        `;
        modal.innerHTML = `
            <div style="background: #fff; padding: 2.5rem; border-radius: 15px; text-align: center; max-width: 500px; transform: scale(0.9); transition: transform 0.4s ease;">
                <h3 id="modal-title" style="color: #1e2a44; font-size: 1.8rem; margin-bottom: 1rem;">Join MHC Classes</h3>
                <p style="color: #5a6a88; margin-bottom: 2rem; font-size: 1.1rem;">Contact us to start your journey to IIT-JEE & NEET success!</p>
                <button style="background: #00d4ff; color: #fff; padding: 0.8rem 2rem; border: none; border-radius: 25px; cursor: pointer; font-weight: 700;" aria-label="Close Modal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.querySelector('div').style.transform = 'scale(1)';
            modal.querySelector('button').focus();
        });
        modal.querySelector('button').addEventListener('click', () => modal.remove());
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') modal.remove();
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Parallax Effect with Debouncing
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                slides.forEach(slide => {
                    slide.querySelector('.img').style.backgroundPositionY = `${window.scrollY * 0.2}px`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
});