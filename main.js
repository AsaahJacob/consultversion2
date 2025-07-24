// Preloader Logic
window.addEventListener('load', () => {
  const loader = document.getElementById('preloader');
  const navbar = document.getElementById('navbar'); // 👈 ADD THIS LINE

  loader.classList.add('opacity-0', 'transition-opacity', 'duration-500');

  setTimeout(() => {
    loader.remove();
    document.body.classList.remove('overflow-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 👇 TRIGGER navbar behavior manually on load
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > 0) {
      navbar.classList.remove('nav-visible');
      navbar.classList.add('nav-hidden');
    }

  }, 500);
});






// active-link.js// This script highlights the active link in the navigation bar based on the current URL path.

const path = window.location.pathname.replace(/\/$/, "").replace(".html", "");

document.querySelectorAll("nav a").forEach(link => {
  const linkPath = new URL(link.href).pathname.replace(/\/$/, "").replace(".html", "");

  if (path === linkPath) {
    link.classList.add("text-teal-700", "font-bold");
  }
});



// Stop pulsing on slide buttons after 3 seconds
      setTimeout(() => {
        document.querySelectorAll(
          '#slideshow .animate-pulse'
        ).forEach(btn => btn.classList.remove('animate-pulse'));
      }, 6000);

      function toggleSubmenu() {
        if (window.innerWidth < 768) {
          const submenu = document.getElementById("about-submenu");
          submenu.classList.toggle("hidden");
        }
      }

      function toggleSubmenu() {
        if (window.innerWidth < 768) {
          const submenu = document.getElementById("about-submenu");
          submenu.classList.toggle("hidden");
        }
      }

      function toggleMenu() {
  const menu = document.getElementById("menu");
  const menuToggle = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  const isOpen = !menu.classList.contains("translate-x-full");

  menu.classList.toggle("hidden", false); // Ensure it's visible
  menu.classList.toggle("translate-x-full"); // Slide in/out
  menuToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");

  // Toggle hamburger icon to X
  if (isOpen) {
    menuIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    `;
  } else {
    menuIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    `;
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
          const menuToggle = document.getElementById("menu-toggle");
          const menuIcon = document.getElementById("menu-icon");
          if (!menu.classList.contains("hidden")) {
            menu.classList.add("hidden");
            menuToggle.setAttribute("aria-expanded", "false");
            menuIcon.innerHTML = `
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            `;
          }
        }
      }, 100);

      window.addEventListener("scroll", closeMenuOnScroll);

      // Close menu on menu item click for mobile
      document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", () => {
          if (window.innerWidth < 768) {
            const menu = document.getElementById("menu");
            const menuToggle = document.getElementById("menu-toggle");
            const menuIcon = document.getElementById("menu-icon");
            menu.classList.add("hidden");
            menuToggle.setAttribute("aria-expanded", "false");
            menuIcon.innerHTML = `
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            `;
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

      // Slideshow Logic
  const slides     = document.querySelectorAll('#slideshow .slide');
  let   current    = 0;
  const intervalMs = 6000; // match your CSS animation duration
  const zoomInCls  = 'zoom-in-slow';
  const zoomOutCls = 'zoom-out-slow';

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

  // initial call
  showSlide(current);

  // cycle forever
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, intervalMs);

  // Navbar scroll behavior
      let lastScrollTop = 0;
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

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