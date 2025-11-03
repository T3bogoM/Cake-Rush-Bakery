# Cake Rush Bakery

A simple multi-page site for Cake Rush Bakery with interactive UI, SEO, and form handling.

## Getting Started
- Open `index.html` in your browser.
- For the interactive map on `contact.html`, internet access is required to load Leaflet tiles.

## SEO
- `robots.txt` added to allow crawling and point to sitemap
- `sitemap.xml` lists all key pages
- Each page includes a unique `<title>`, meta description, canonical URL, and accessible image `alt` text

## JavaScript Enhancements
- Lightbox for gallery images
- Scroll-based fade-in animations
- Accordion for testimonials on `about.html`
- Dynamic product loading and live search on `products.html` from `data/products.json`
- Leaflet map on `contact.html`
- Form validation for `enquire.html` and `contact.html`
- AJAX submission to `https://httpbin.org/post` with graceful `mailto:` fallback

## Changelog

### 2025-11-03
- Added `robots.txt` to allow all crawlers and reference sitemap.
- Added `sitemap.xml` with URLs for `index`, `about`, `products`, `gallery`, `enquire`, and `contact` pages.
- Implemented gallery lightbox (click any image to view larger) in `gallery.html` with styles in `style.css` and logic in `script.js`.
- Added scroll-based fade-in animations (`.fade-in`) observed via `IntersectionObserver` in `script.js`.
- Built accordion for testimonials on `about.html` with accessible `aria-expanded` toggles.
- Implemented dynamic product loading and client-side search on `products.html` sourcing from `data/products.json`.
- Integrated Leaflet map on `contact.html` with a marker and popup for the bakery location.
- Implemented client-side validation for both `contact.html` and `enquire.html`.
- Enhanced both forms with AJAX submission to `https://httpbin.org/post` and added success messaging; if the request fails, fall back to a composed `mailto:` link that includes all form details.
- Reviewed and confirmed on-page SEO (titles, descriptions, canonical links, descriptive `alt` attributes) across all pages.

## Notes
- Replace `https://cakerushbakery.example` in `sitemap.xml` and `robots.txt` with the actual production domain when deploying.
- The AJAX endpoint (`https://httpbin.org/post`) is for demo/testing purposes; replace with a real endpoint or form service in production.

