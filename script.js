/*1. ACTIVE NAVIGATION HIGHLIGHT*/
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

/* 2. GALLERY LIGHTBOX*/
const galleryImages = document.querySelectorAll(".gallery img");

if (galleryImages.length > 0) {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      lightbox.classList.add("active");
      const img = document.createElement("img");
      img.src = image.src;
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }
      lightbox.appendChild(img);
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

/*3. FORM VALIDATION (Contact + Enquiry) */
function validateForm(event) {
  const form = event.target;
  const inputs = form.querySelectorAll("input[required], textarea[required], select[required]");
  let valid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.border = "2px solid red";
      valid = false;
    } else {
      input.style.border = "2px solid green";
    }

    // Additional check for email fields//
    if (input.type === "email" && !/^[^@]+@[^@]+\.[^@]+$/.test(input.value)) {
      alert("Please enter a valid email address.");
      valid = false;
    }
  });

  if (!valid) {
    event.preventDefault();
    alert("Please fill in all required fields correctly before submitting.");
  } else {
    alert("Thank you! Your form has been submitted successfully.");
  }
}

/*Attach validation to forms*/
const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", validateForm);
});

/* 4. PRODUCT SEARCH / FILTER*/
const searchInput = document.getElementById("searchInput");
const productItems = document.querySelectorAll(".product-item");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const searchTerm = searchInput.value.toLowerCase();

    productItems.forEach((item) => {
      const productName = item.querySelector("h3").textContent.toLowerCase();
      item.style.display = productName.includes(searchTerm) ? "block" : "none";
    });
  });
}

/* 5. SMOOTH SCROLLING */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

/*6. FADE-IN ANIMATION ON SCROLL*/
const fadeElements = document.querySelectorAll(".fade-in");

function checkFadeIn() {
  const triggerBottom = window.innerHeight / 5 * 4;

  fadeElements.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", checkFadeIn);
checkFadeIn();

/*7. INTERACTIVE MAP NOTICE*/
const mapSection = document.querySelector(".map-section");
if (mapSection) {
  console.log("Google Maps iframe loaded successfully!");
}

/*END OF SCRIPT */
