// Mobile menu toggle and smooth scrolling
(function () {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.getElementById('site-nav');

  // Header background on scroll
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('bg-background/95', 'backdrop-blur-lg', 'border-b', 'border-border');
    } else {
      nav.classList.remove('bg-background/95', 'backdrop-blur-lg', 'border-b', 'border-border');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const open = mobileMenu.getAttribute('data-open') === 'true';
      mobileMenu.setAttribute('data-open', String(!open));
      mobileMenu.classList.toggle('hidden', open);
    });
  }

  // Smooth scroll for nav links
  const linkSelector = 'a[data-scroll]';
  document.querySelectorAll(linkSelector).forEach((el) => {
    el.addEventListener('click', (e) => {
      const href = el.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      if (mobileMenu && mobileMenu.getAttribute('data-open') === 'true') {
        mobileMenu.setAttribute('data-open', 'false');
        mobileMenu.classList.add('hidden');
      }
    });
  });

  // EmailJS contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const name = /** @type {HTMLInputElement} */(form.querySelector('#name'))?.value.trim();
      const email = /** @type {HTMLInputElement} */(form.querySelector('#email'))?.value.trim();
      const message = /** @type {HTMLTextAreaElement} */(form.querySelector('#message'))?.value.trim();

      if (submitBtn) submitBtn.disabled = true;

      if (!name || !email || !message) {
        alert('Please fill in all fields');
        if (submitBtn) submitBtn.disabled = false;
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      try {
        if (!window.emailjs) {
          throw new Error('EmailJS not loaded');
        }
        const templateParams = { from_name: name, from_email: email, message, to_name: 'Raseel' };
        await window.emailjs.send('service_awb0zbl', 'template_fw2rz7n', templateParams, 'BLb92lff8N8VbOu49');
        alert("Message sent successfully! I'll get back to you soon.");
        form.reset();
      } catch (err) {
        console.error(err);
        alert('Failed to send message. Please try again later.');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
})();


