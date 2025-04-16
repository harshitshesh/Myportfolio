
const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

const text = "Thank you for visit my portfolio";
let index = 0;
let isDeleting = false;

function typeEffect() {
  if (!isDeleting && index <= text.length) {
    typedText.textContent = text.slice(0, index++);
    setTimeout(typeEffect, 100);
  } else if (index > 0) {
    isDeleting = true;
    typedText.textContent = text.slice(0, --index);
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = false;
    setTimeout(typeEffect, 800);
  }
}
VANTA.DOTS({
  el: "#about",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x00ffff,
  backgroundColor: 0x1a1a1a,
  size: 1.50,
  showLines: false
});


typeEffect();


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else {
      entry.target.classList.remove('animate');
    }
  });
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});






  function toggleMenu() {
    const nav = document.querySelector(".navlinks");
    nav.classList.toggle("active");
  }
