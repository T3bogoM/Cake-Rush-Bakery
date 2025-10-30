document.getElementById('enquiryForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const product = document.getElementById('product').value;
  const message = document.getElementById('message').value.trim();

  // Simple validation check
  if (!name || !email || !product || !message) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  // Show confirmation message
  alert(`Thank you, ${name}! Your enquiry about "${product}" has been received. We will contact you soon.`);

  // Reset the form
  this.reset();
});



// Lightbox for gallery
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery img");
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.innerHTML = "";
      const clone = document.createElement("img");
      clone.src = img.src;
      lightbox.appendChild(clone);
      lightbox.style.display = "flex";
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
});
