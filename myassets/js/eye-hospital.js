/* ===================================
   Eye Hospital - GSAP Animations & Interactions
   =================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ===================================
// Navigation
// ===================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Animate hamburger
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
    gsap.to(spans[1], { opacity: 0, duration: 0.3 });
    gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
  } else {
    gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
    gsap.to(spans[1], { opacity: 1, duration: 0.3 });
    gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
  }
});

// Close mobile menu on link click
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const spans = navToggle.querySelectorAll('span');
    gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
    gsap.to(spans[1], { opacity: 1, duration: 0.3 });
    gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
    } else {
      document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
    }
  });
});

// ===================================
// Hero Section Animations
// ===================================

// Typing Animation
const typedTextElement = document.getElementById('typedText');
const texts = [
  'Bladeless Cataract Surgery',
  'Advanced LASIK Procedures',
  'Glaucoma Treatment',
  'Retina Care & Surgery',
  'Corneal Transplant',
  'Pediatric Eye Care',
  'Oculoplasty Services'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 500; // Pause before typing next
  }
  
  setTimeout(typeText, typingSpeed);
}

// Start typing animation after page load
setTimeout(typeText, 1000);

// Hero content animation
const heroTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

heroTimeline
  .from('.hero-badge', { 
    opacity: 0, 
    y: 20, 
    duration: 0.5,
    delay: 0.1,
    clearProps: "all"
  })
  .from('.hero-main-title', { 
    opacity: 0, 
    y: 30, 
    duration: 0.6,
    clearProps: "all" 
  }, '-=0.3')
  .from('.typing-container', { 
    opacity: 0, 
    y: 20, 
    duration: 0.5,
    clearProps: "all" 
  }, '-=0.3')
  .from('.hero-description', { 
    opacity: 0, 
    y: 20, 
    duration: 0.5,
    clearProps: "all" 
  }, '-=0.3')
  .from('.feature-item', { 
    opacity: 0, 
    x: -20, 
    duration: 0.4, 
    stagger: 0.05,
    clearProps: "all" 
  }, '-=0.3')
  .from('.hero-cta-group .btn', { 
    opacity: 0, 
    y: 20, 
    duration: 0.4, 
    stagger: 0.1,
    clearProps: "all" 
  }, '-=0.2')
  .from('.stat-mini', { 
    opacity: 0, 
    y: 15, 
    duration: 0.3, 
    stagger: 0.1,
    clearProps: "all" 
  }, '-=0.2')
  .from('.doctor-card', { 
    opacity: 0, 
    scale: 0.95, 
    duration: 0.6,
    ease: 'back.out(1.2)',
    clearProps: "all" 
  }, '-=0.4')
  .from('.floating-badge', { 
    opacity: 0, 
    scale: 0.5, 
    duration: 0.4, 
    stagger: 0.1,
    ease: 'back.out(1.2)',
    clearProps: "all" 
  }, '-=0.3')
  .from('.scroll-indicator', { 
    opacity: 0, 
    duration: 0.5,
    clearProps: "all" 
  }, '-=0.2');

// Hero video overlay animation
gsap.from('.hero-overlay', {
  opacity: 0,
  duration: 0.8,
  ease: 'power2.inOut'
});

// ===================================
// Stats Counter Animation
// ===================================

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString() + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Trigger counter animation when stats section is in view
ScrollTrigger.create({
  trigger: '.stats',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.stat-number').forEach(stat => {
      animateCounter(stat);
    });
  }
});

// ===================================
// Section Animations with GSAP ScrollTrigger
// ===================================

// Fade in from bottom
gsap.utils.toArray('.section-label, .section-title, .section-description').forEach(element => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 90%', // Trigger earlier
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30, // Less distance
    duration: 0.5, // Faster
    ease: 'power2.out', // Snappier ease
    clearProps: "all"
  });
});

// About section animations
gsap.from('.about-image', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 75%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  x: -50, // Less distance
  duration: 0.6,
  ease: 'power2.out',
  clearProps: "all"
});

gsap.from('.about-content', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 75%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  x: 50,
  duration: 0.6,
  ease: 'power2.out',
  delay: 0.1, // Reduced delay
  clearProps: "all"
});

gsap.from('.about-feature', {
  scrollTrigger: {
    trigger: '.about-features',
    start: 'top 85%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  y: 30,
  duration: 0.4,
  stagger: 0.1, // Faster stagger
  ease: 'power2.out',
  clearProps: "all"
});

// Service cards animation
gsap.from('.service-card', {
  scrollTrigger: {
    trigger: '.services-grid',
    start: 'top 80%', // Earlier trigger
    toggleActions: 'play none none none'
  },
  opacity: 0,
  y: 40,
  duration: 0.5,
  stagger: 0.1,
  ease: 'power2.out',
  clearProps: "all"
});

// Equipment items animation
gsap.from('.equipment-card', {
  scrollTrigger: {
    trigger: '.equipment-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  scale: 0.9,
  duration: 0.4,
  stagger: 0.05,
  ease: 'back.out(1.2)',
  clearProps: "all"
});

// Doctor section animations
gsap.from('.doctor-image', {
  scrollTrigger: {
    trigger: '.doctor',
    start: 'top 75%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  x: -50,
  duration: 0.6,
  ease: 'power2.out',
  clearProps: "all"
});

gsap.from('.doctor-content', {
  scrollTrigger: {
    trigger: '.doctor',
    start: 'top 75%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  x: 50,
  duration: 0.6,
  ease: 'power2.out',
  delay: 0.1,
  clearProps: "all"
});

gsap.from('.credential', {
  scrollTrigger: {
    trigger: '.doctor-credentials',
    start: 'top 90%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  scale: 0.9,
  duration: 0.4,
  stagger: 0.05,
  ease: 'back.out(1.2)',
  clearProps: "all"
});

gsap.from('.expertise-tags span', {
  scrollTrigger: {
    trigger: '.expertise-tags',
    start: 'top 90%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  y: 15,
  duration: 0.3,
  stagger: 0.03,
  ease: 'power2.out',
  clearProps: "all"
});

// Insurance logos animation
gsap.from('.insurance-logo', {
  scrollTrigger: {
    trigger: '.insurance-grid',
    start: 'top 85%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  scale: 0.8,
  duration: 0.4,
  stagger: 0.05,
  ease: 'back.out(1.2)',
  clearProps: "all"
});

// Location cards animation
gsap.from('.location-card', {
  scrollTrigger: {
    trigger: '.locations-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  y: 40,
  duration: 0.5,
  stagger: 0.1,
  ease: 'power2.out',
  clearProps: "all"
});

// Testimonials animation
gsap.from('.testimonial-card', {
  scrollTrigger: {
    trigger: '.testimonials-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  y: 40,
  duration: 0.5,
  stagger: 0.1,
  ease: 'power2.out',
  clearProps: "all"
});

gsap.from('.testimonial-stats .stat-box', {
  scrollTrigger: {
    trigger: '.testimonial-stats',
    start: 'top 85%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  scale: 0.9,
  duration: 0.4,
  stagger: 0.05,
  ease: 'back.out(1.2)',
  clearProps: "all"
});

// Gallery animation
gsap.from('.gallery-item', {
  scrollTrigger: {
    trigger: '.gallery-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  scale: 0.95,
  duration: 0.5,
  stagger: 0.05,
  ease: 'power2.out',
  clearProps: "all"
});

// Footer animation
gsap.from('.footer-col', {
  scrollTrigger: {
    trigger: '.footer',
    start: 'top 90%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  y: 30,
  duration: 0.5,
  stagger: 0.1,
  ease: 'power2.out',
  clearProps: "all"
});

// ===================================
// Process Section Animations
// ===================================

gsap.from('.process-step', {
  scrollTrigger: {
    trigger: '.process',
    start: 'top 85%',
  },
  y: 30,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  ease: 'power2.out',
  clearProps: "all"
});

// ===================================
// Quick Booking Entrance
// ===================================

gsap.from('.quick-booking', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top center',
  },
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.5,
  ease: 'power3.out',
  clearProps: "all"
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 80
        },
        ease: 'power3.inOut'
      });
    }
  });
});

// ===================================
// Parallax Effects
// ===================================

// Hero video parallax
gsap.to('.hero-video', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  y: 200,
  ease: 'none'
});

// Section backgrounds parallax
gsap.utils.toArray('.about-image img, .doctor-image img').forEach(image => {
  gsap.to(image, {
    scrollTrigger: {
      trigger: image,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    y: 50,
    ease: 'none'
  });
});

// ===================================
// Hover Animations
// ===================================

// Service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    gsap.to(this.querySelector('.service-icon'), {
      rotation: 360,
      duration: 0.6,
      ease: 'power2.out'
    });
  });
});

// Equipment items - Hover effects are now handled via CSS for better performance
// document.querySelectorAll('.equipment-item').forEach(item => { ... });

// ===================================
// WhatsApp Button Animation
// ===================================

gsap.from('.whatsapp-float', {
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    toggleActions: 'play none none none'
  },
  scale: 0,
  duration: 0.5,
  ease: 'back.out(1.7)',
  delay: 2
});

// ===================================
// Page Load Animation
// ===================================

window.addEventListener('load', () => {
  // Hide preloader if exists
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => preloader.remove()
    });
  }
  
  // Refresh ScrollTrigger
  ScrollTrigger.refresh();
});

// ===================================
// Resize Handler
// ===================================

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

// ===================================
// Custom Cursor Effect (Disabled for better UX)
// ===================================

// Custom cursor disabled to maintain default cursor visibility
// Can be enabled later if needed

// ===================================
// Intersection Observer for Lazy Loading
// ===================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '600px' // Increased to 600px to load images much earlier
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// Performance Optimization
// ===================================

// Debounce scroll events
let ticking = false;

function updateScrollPosition() {
  ticking = false;
  // Add any scroll-dependent updates here
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollPosition);
    ticking = true;
  }
});

// ===================================
// Console Log (Optional)
// ===================================

console.log('%c🏥 Yogmaya Devi Eye Hospital ', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%cWebsite loaded successfully with GSAP animations', 'color: #00bfa5; font-size: 14px;');

// ===================================


