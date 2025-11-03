// Security: Input sanitization function to prevent XSS
function sanitizeInput(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Lightbox for gallery
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggleBtn = document.getElementById('menuToggle');
  const nav = document.querySelector('header nav');
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery img').forEach((img) => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    });
  }

  // Fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

  // Accordion toggles (About page)
  document.querySelectorAll('.accordion-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = btn.nextElementSibling;
      if (panel) {
        panel.style.display = expanded ? 'none' : 'block';
      }
    });
    // default hidden
    const panel = btn.nextElementSibling;
    if (panel) panel.style.display = 'none';
  });

  // Dynamic products loading and search
  const productList = document.getElementById('productList');
  const searchBar = document.getElementById('searchBar');

  let allProducts = [];

  async function loadProducts() {
    if (!productList) return;
    try {
      const res = await fetch('data/products.json');
      allProducts = await res.json();
      renderProducts(allProducts);
    } catch (e) {
      productList.innerHTML = '<p>Unable to load products right now.</p>';
    }
  }

  function renderProducts(items) {
    productList.innerHTML = items.map((p) => `
      <div class="product" data-name="${p.name.toLowerCase()}">
        <h3>${p.name}</h3>
        <img src="${p.image}" alt="${p.alt}">
        <p>${p.description}</p>
        <p><strong>Price:</strong> ${p.price}</p>
      </div>
    `).join('');
  }

  function filterProducts(term) {
    const t = term.trim().toLowerCase();
    const filtered = allProducts.filter((p) => p.name.toLowerCase().includes(t) || p.tags.join(' ').toLowerCase().includes(t));
    renderProducts(filtered);
  }

  if (productList) {
    loadProducts();
    if (searchBar) {
      searchBar.addEventListener('input', (e) => filterProducts(e.target.value));
    }
  }

  // Contact form validation + AJAX submit with mailto fallback
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let name = document.getElementById('contactName').value.trim();
      let email = document.getElementById('contactEmail').value.trim();
      let type = document.getElementById('contactType').value;
      let message = document.getElementById('contactMessage').value.trim();
      const errors = [];
      if (name.length < 2) errors.push('Name must be at least 2 characters.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email address.');
      if (message.length < 10) errors.push('Message must be at least 10 characters.');
      const out = document.getElementById('contactErrors');
      if (out) out.innerHTML = errors.map((x) => `<p style="color:#b00020;">${sanitizeInput(x)}</p>`).join('');
      // Sanitize inputs before sending
      name = sanitizeInput(name);
      message = sanitizeInput(message);
      if (errors.length === 0) {
        try {
          const res = await fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, type, message, form: 'contact' })
          });
          if (res.ok) {
            if (out) out.innerHTML = '<p style="color: #0a7c2f;">Your message has been sent successfully. Thank you!</p>';
            contactForm.reset();
            return;
          }
          // fallback to mailto if request failed
          const subject = encodeURIComponent(`Contact: ${type} from ${name}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nType: ${type}\n\nMessage:\n${message}`);
          window.location.href = `mailto:orders@cakerush.example?subject=${subject}&body=${body}`;
        } catch (_) {
          const subject = encodeURIComponent(`Contact: ${type} from ${name}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nType: ${type}\n\nMessage:\n${message}`);
          window.location.href = `mailto:orders@cakerush.example?subject=${subject}&body=${body}`;
        }
      }
    });
  }

  // Enquiry form validation + AJAX submit with mailto fallback
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      let phone = document.getElementById('phone').value.trim();
      const enquiryType = document.getElementById('enquiryType').value;
      const product = document.getElementById('product').value;
      let message = document.getElementById('message').value.trim();
      const errors = [];
      if (name.length < 2) errors.push('Name must be at least 2 characters.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email address.');
      if (message.length < 10) errors.push('Message must be at least 10 characters.');
      if (phone && !/^\+?[0-9\s-]{7,15}$/.test(phone)) errors.push('Phone number format is invalid.');
      const out = document.getElementById('enquiryErrors');
      if (out) out.innerHTML = errors.map((x) => `<p style="color:#b00020;">${sanitizeInput(x)}</p>`).join('');
      // Sanitize inputs before sending
      name = sanitizeInput(name);
      message = sanitizeInput(message);
      if (errors.length === 0) {
        try {
          const res = await fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, enquiryType, product, message, form: 'enquiry' })
          });
          if (res.ok) {
            if (out) out.innerHTML = '<p style="color: #0a7c2f;">Your enquiry has been received. We will get back to you soon!</p>';
            enquiryForm.reset();
            return;
          }
          const subject = encodeURIComponent(`Enquiry: ${enquiryType}${product ? ' - ' + product : ''}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${enquiryType}\nProduct: ${product}\n\nMessage:\n${message}`);
          window.location.href = `mailto:orders@cakerush.example?subject=${subject}&body=${body}`;
        } catch (_) {
          const subject = encodeURIComponent(`Enquiry: ${enquiryType}${product ? ' - ' + product : ''}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${enquiryType}\nProduct: ${product}\n\nMessage:\n${message}`);
          window.location.href = `mailto:orders@cakerush.example?subject=${subject}&body=${body}`;
        }
      }
    });
  }

  // Leaflet map init (Contact page)
  if (document.getElementById('map') && typeof L !== 'undefined') {
    const map = L.map('map').setView([-26.1249, 27.9135], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([-26.1249, 27.9135]).addTo(map).bindPopup('Cake Rush Bakery').openPopup();
  }
});


