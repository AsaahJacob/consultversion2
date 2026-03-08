// Preloader Logic
window.addEventListener('load', () => {
  const loader = document.getElementById('preloader');
  const navbar = document.getElementById('navbar');

  if (loader) {
    loader.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => {
      loader.remove();
      document.body.classList.remove('overflow-hidden');

      // Normalize pathname and check for hash
      const currentPage = window.location.pathname.replace(/\/$/, '') || '/index.html';
      const hash = window.location.hash;
      const targetAnchors = ['#staff', '#mission', '#careers'];
      const hasTargetAnchor = hash && targetAnchors.includes(hash);

      // Skip scroll-to-top for '/about' or any page with a target anchor
      if (currentPage !== '/about' && !hasTargetAnchor) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hasTargetAnchor && currentPage === '/about') {
        // Explicitly scroll to the <h2> element for #staff, #mission, or #careers
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > 0) {
        navbar.classList.remove('nav-visible');
        navbar.classList.add('nav-hidden');
      }
    }, 100); // Reduced timeout to minimize conflicts
  }
});
// active-link.js// This script highlights the active link in the navigation bar based on the current URL path.

// 1. Figure out the current “page key”
const rawPath = window.location.pathname.replace(/\/$/, "");            // e.g. "/about.html" → "/about.html", "/" → ""
const pageKey = (rawPath === "" || rawPath === "/") 
  ? "index" 
  : rawPath.replace(/^\//, "").replace(".html", "");                   // strip leading slash, drop .html

// 2. Grab every <a> in the desktop nav
document.querySelectorAll("#navbar .md\\:flex a[href]").forEach(link => {
  // 3. Skip any submenu or mobile‐menu links
  if (link.closest("#desktop-about-submenu") || link.closest("#menu")) return;

  // 4. Compute the link’s key
  const linkHref = new URL(link.href).pathname.replace(/\/$/, "");
  const linkKey = linkHref.replace(/^\//, "").replace(".html", "");

  // 5. Match & highlight
  if (linkKey === pageKey) {
    link.classList.add("text-brand-900", "font-bold");
  }
});


// Stop pulsing on slide buttons after 3 seconds
setTimeout(() => {
  document.querySelectorAll(
    '#slideshow .animate-pulse'
  ).forEach(btn => btn.classList.remove('animate-pulse'));
}, 6000);

// Modern Navigation Functions
function toggleSubmenu() {
  const submenu = document.getElementById("about-submenu");
  const submenuIcon = document.getElementById("submenu-icon");
  const submenuButton = document.querySelector('button[aria-controls="about-submenu"]');
  
  if (window.innerWidth < 768) {
    // Mobile submenu toggle
    const isExpanded = submenuButton.getAttribute("aria-expanded") === "true";
    
    if (isExpanded) {
      // Close submenu
      submenu.classList.add("hidden");
      submenuIcon.classList.remove("rotate-180");
      submenuButton.setAttribute("aria-expanded", "false");
    } else {
      // Open submenu
      submenu.classList.remove("hidden");
      submenuIcon.classList.add("rotate-180");
      submenuButton.setAttribute("aria-expanded", "true");
    }
  }
  // Desktop submenu is handled by hover functions
}

// Desktop About submenu hover functions
function showAboutSubmenu() {
  if (window.innerWidth >= 768) {
    const submenu = document.getElementById("desktop-about-submenu");
    const submenuIcon = document.getElementById("desktop-submenu-icon");
    
    submenu.classList.remove("opacity-0", "invisible", "-translate-y-2");
    submenu.classList.add("opacity-100", "visible", "translate-y-0");
    submenuIcon.classList.add("rotate-180");
  }
}

function hideAboutSubmenu() {
  if (window.innerWidth >= 768) {
    const submenu = document.getElementById("desktop-about-submenu");
    const submenuIcon = document.getElementById("desktop-submenu-icon");
    
    submenu.classList.add("opacity-0", "invisible", "-translate-y-2");
    submenu.classList.remove("opacity-100", "visible", "translate-y-0");
    submenuIcon.classList.remove("rotate-180");
  }
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  const menuBackdrop = document.getElementById("menu-backdrop");
  const menuToggle = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  
  // Check if menu is currently hidden or translated out
  const isCurrentlyHidden = menu.classList.contains("hidden");
  const isCurrentlyTranslated = menu.classList.contains("translate-x-full");
  const isOpen = !isCurrentlyHidden && !isCurrentlyTranslated;

  if (isOpen) {
    // Close menu
    menu.classList.add("translate-x-full");
    menuBackdrop.classList.add("hidden");
    menuToggle.setAttribute("aria-expanded", "false");
    menuIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    `;
    document.body.style.overflow = '';
    
    // Reset submenu state when closing menu
    resetMobileSubmenu();
  } else {
    // Open menu
    menu.classList.remove("hidden");
    menu.classList.remove("translate-x-full");
    menuBackdrop.classList.remove("hidden");
    menuToggle.setAttribute("aria-expanded", "true");
    menuIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    `;
    document.body.style.overflow = 'hidden';
  }
}

// Function to reset mobile submenu state
function resetMobileSubmenu() {
  const submenu = document.getElementById("about-submenu");
  const submenuIcon = document.getElementById("submenu-icon");
  const submenuButton = document.querySelector('button[aria-controls="about-submenu"]');
  
  if (submenu && submenuIcon && submenuButton) {
    submenu.classList.add("hidden");
    submenuIcon.classList.remove("rotate-180");
    submenuButton.setAttribute("aria-expanded", "false");
  }
}

// Debounce function to limit scroll event frequency
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Close menu on scroll for mobile
const closeMenuOnScroll = debounce(() => {
  if (window.innerWidth < 768) {
    const menu = document.getElementById("menu");
    const menuBackdrop = document.getElementById("menu-backdrop");
    const menuToggle = document.getElementById("menu-toggle");
    const menuIcon = document.getElementById("menu-icon");
    const isCurrentlyHidden = menu.classList.contains("hidden");
    const isCurrentlyTranslated = menu.classList.contains("translate-x-full");
    const isOpen = !isCurrentlyHidden && !isCurrentlyTranslated;
    
    if (isOpen) {
      menu.classList.add("translate-x-full");
      menuBackdrop.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");
      menuIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      `;
      document.body.style.overflow = '';
      
      // Reset submenu state when closing menu
      resetMobileSubmenu();
    }
  }
}, 100);

window.addEventListener("scroll", closeMenuOnScroll);

// Close menu on menu item click for mobile
document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      const menu = document.getElementById("menu");
      const menuBackdrop = document.getElementById("menu-backdrop");
      const menuToggle = document.getElementById("menu-toggle");
      const menuIcon = document.getElementById("menu-icon");
      menu.classList.add("translate-x-full");
      menuBackdrop.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");
      menuIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      `;
      document.body.style.overflow = '';
      
      // Reset submenu state when closing menu
      resetMobileSubmenu();
    }
  });
});

// Keyboard accessibility for menu toggle
document.getElementById("menu-toggle").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMenu();
  }
});

// Lazy Loading for Images
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy-image');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
}

// Initialize lazy loading when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
  initLazyLoading();
}

// Slideshow Logic
const slides = document.querySelectorAll('#slideshow .slide');
let current = 0;
const intervalMs = 6000; // match your CSS animation duration
const zoomInCls = 'zoom-in-slow';
const zoomOutCls = 'zoom-out-slow';

// Initialize slideshow - hide all slides except the first
function initializeSlideshow() {
  slides.forEach((slide, i) => {
    if (i === 0) {
      slide.classList.remove('opacity-0');
      slide.classList.add('opacity-100');
    } else {
      slide.classList.remove('opacity-100');
      slide.classList.add('opacity-0');
    }
  });
}

function showSlide(idx) {
  slides.forEach((slide, i) => {
    const img = slide.querySelector('img');

    if (i === idx) {
      // fade in
      slide.classList.remove('opacity-0');
      slide.classList.add('opacity-100');

      // choose zoom direction (alternating here—customize as you like)
      const animClass = (i % 2 === 0 ? zoomInCls : zoomOutCls);

      // restart the animation
      img.classList.remove(zoomInCls, zoomOutCls);
      void img.offsetWidth;
      img.classList.add(animClass);

    } else {
      // fade out & clear zoom
      slide.classList.remove('opacity-100');
      slide.classList.add('opacity-0');
      img.classList.remove(zoomInCls, zoomOutCls);
    }
  });
}

// Initialize slideshow when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSlideshow);
} else {
  initializeSlideshow();
}

// initial call
showSlide(current);

// cycle forever
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, intervalMs);

// Modern Navbar scroll behavior with glassmorphism effect
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Add/remove glassmorphism effect based on scroll
  if (currentScroll > 50) {
    navbar.classList.add('bg-white/95', 'backdrop-blur-lg');
    navbar.classList.remove('bg-white/80', 'backdrop-blur-md');
  } else {
    navbar.classList.remove('bg-white/95', 'backdrop-blur-lg');
    navbar.classList.add('bg-white/80', 'backdrop-blur-md');
  }

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    navbar.classList.remove('nav-visible');
    navbar.classList.add('nav-hidden');
  } else {
    // Scrolling up
    navbar.classList.remove('nav-hidden');
    navbar.classList.add('nav-visible');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile or negative scrolling
});

// Modal functionality for staff
      function openModal(id) {
      document.getElementById(id).classList.remove('hidden');
    }

    function closeModal(id) {
      document.getElementById(id).classList.add('hidden');
    }

      // Close modal on outside click
      document.addEventListener('click', (event) => {
        if (event.target.classList.contains('fixed')) {
          const modals = document.querySelectorAll('.fixed');
          modals.forEach(modal => modal.classList.add('hidden'));
        }
      });

      // Staff carousel data and rendering
      const staffData = [
        { name: 'Jane Doe', position: 'Managing Partner', slug: 'jane-doe', img: 'assets/images/staff/jane-doe.svg' },
        { name: 'John Smith', position: 'Senior Advisor', slug: 'john-smith', img: 'assets/images/staff/john-smith.svg' },
        { name: 'A. Placeholder', position: 'Associate', slug: 'placeholder', img: 'assets/images/staff/placeholder.svg' },
        { name: 'M. Example', position: 'Consultant', slug: 'm-example', img: 'assets/images/staff/m-example.svg' },
        { name: 'Priya Patel', position: 'Tax Specialist', slug: 'priya-patel', img: 'assets/images/staff/priya-patel.svg' },
        { name: 'Carlos Mendes', position: 'Immigration Counsel', slug: 'carlos-mendes', img: 'assets/images/staff/carlos-mendes.svg' },
        { name: 'Fatima Al-Hassan', position: 'Policy Advisor', slug: 'fatima-alhassan', img: 'assets/images/staff/fatima-alhassan.svg' },
        { name: 'Liu Wei', position: 'Research Associate', slug: 'liu-wei', img: 'assets/images/staff/liu-wei.svg' },
        { name: 'Sofia Rossi', position: 'Client Relations', slug: 'sofia-rossi', img: 'assets/images/staff/sofia-rossi.svg' }
      ];

      function renderStaffCarousel() {
        const track = document.getElementById('staff-track');
        if (!track) return;
        track.innerHTML = '';

        staffData.forEach(member => {
          const a = document.createElement('a');
          a.href = `staffs/${member.slug}.html`;
          a.className = 'min-w-[220px] sm:min-w-[240px] bg-white rounded-xl shadow p-4 flex-shrink-0 text-center hover:shadow-lg transition';
          a.innerHTML = `
            <img src="${member.img}" alt="${member.name}" loading="lazy" class="w-32 h-32 rounded-full mx-auto object-cover mb-3 lazy-image" />
            <h3 class="text-lg font-semibold text-brand-900">${member.name}</h3>
            <p class="text-sm text-gray-600">${member.position}</p>
          `;
          track.appendChild(a);
        });

        // Re-init lazy loading for injected images
        initLazyLoading();
      }

      document.addEventListener('DOMContentLoaded', () => {
        renderStaffCarousel();

        const track = document.getElementById('staff-track');
        const prev = document.getElementById('staff-prev');
        const next = document.getElementById('staff-next');
        if (!track) return;

        const scrollAmount = Math.round(track.clientWidth * 0.7) || 600;

        prev && prev.addEventListener('click', () => {
          track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        next && next.addEventListener('click', () => {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // keyboard accessibility
        [prev, next].forEach(btn => {
          if (!btn) return;
          btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              btn.click();
            }
          });
        });
      });