
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





  // projects

/* HS Projects JS: tilt, hover pop, click focus, blur others */
/* Scope to container to avoid collisions */
(function(){
  const container = document.querySelector('.hs-projects-section');
  if (!container) return;

  const cards = container.querySelectorAll('.hs-project-card');
  const overlay = document.getElementById('hsFocus');
  const focusClose = document.getElementById('hsFocusClose');
  const focusTitle = document.getElementById('hsFocusTitle');
  const focusDesc = document.getElementById('hsFocusDesc');
  const focusTech = document.getElementById('hsFocusTech');
  const focusBtns = document.getElementById('hsFocusBtns');
  const focusImg = container.querySelector('.hs-focus-thumb img');

  /* --- Tilt & pop on hover (mouse) --- */
  cards.forEach(card=>{
    // mousemove tilt
    card.addEventListener('mousemove', (e)=>{
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x pos within card
      const y = e.clientY - rect.top;
      const cx = rect.width/2;
      const cy = rect.height/2;
      const rx = ((y - cy) / cy) * -8; // rotateX
      const ry = ((x - cx) / cx) * 10; // rotateY
      card.style.setProperty('--rx', rx + 'deg');
      card.style.setProperty('--ry', ry + 'deg');
      card.style.setProperty('--tz', '18px'); // pop
    });

    // reset on leave
    card.addEventListener('mouseleave', ()=>{
      card.style.setProperty('--rx','0deg');
      card.style.setProperty('--ry','0deg');
      card.style.setProperty('--tz','0px');
    });

    // keyboard focus (accessibility)
    card.addEventListener('focus', ()=>{
      card.classList.add('hs-keyboard-focus');
      card.style.setProperty('--tz','12px');
    });
    card.addEventListener('blur', ()=>{
      card.classList.remove('hs-keyboard-focus');
      card.style.setProperty('--tz','0px');
    });

    // click -> open focus modal
    card.addEventListener('click', ()=> openFocus(card));
  });

  /* --- Open focus overlay --- */
  function openFocus(card){
    // populate details from data attributes
    const title = card.dataset.title || '';
    const desc = card.dataset.desc || '';
    const tech = card.dataset.tech || '';
    const live = card.dataset.live || '#';
    const github = card.dataset.github || '#';
    const img = card.dataset.img || card.querySelector('img')?.src || '';

    // set content
    focusTitle.textContent = title;
    focusDesc.textContent = desc;
    focusTech.textContent = tech;
    focusImg.src = img;
    focusImg.alt = title;

    // buttons
    focusBtns.innerHTML = `
      <a class="hs-btn hs-live" href="${escapeHtml(live)}" target="_blank" rel="noopener">Live Preview</a>
      <a class="hs-btn hs-github" href="${escapeHtml(github)}" target="_blank" rel="noopener">View Code</a>
    `;

    // mark focused card for blur effect
    cards.forEach(c=> c.classList.remove('hs-focused'));
    card.classList.add('hs-focused');
    container.classList.add('hs-projects-blur');

    // show overlay
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden','false');

    // prevent body scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  /* --- Close focus overlay --- */
  function closeFocus(){
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden','true');
    container.classList.remove('hs-projects-blur');
    cards.forEach(c=> c.classList.remove('hs-focused'));

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // close events
  if (focusClose) focusClose.addEventListener('click', closeFocus);
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeFocus(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('active')) closeFocus(); });

  /* small helper to avoid injection if user data contains quotes */
  function escapeHtml(str){
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
})();




// github 


const GITHUB_USERNAME = "harshitshesh"; 



// 🔥 Fetch GitHub Stats
async function loadGitHubStats() {
    const url = `https://api.github.com/users/${GITHUB_USERNAME}`;
    const res = await fetch(url);
    const data = await res.json();

    document.querySelector("#public-repos .value").textContent = data.public_repos;
    document.querySelector("#followers .value").textContent = data.followers;
    document.querySelector("#following .value").textContent = data.following;
}
loadGitHubStats();

// 🔥 Contribution Calendar (small box chart)
GitHubCalendar("#github-calendar", GITHUB_USERNAME, {
    responsive: true,
});

// 🔥 GSAP Animation
gsap.from(".gh-card", {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// 🔥 VANTA Background (Dark Minimal NET)


// open resume 

function openResume(e) {
    e.preventDefault();
    
    // Open PDF in new tab
    window.open("img/Resume (1).pdf", "_blank");

    // Force Download
    const a = document.createElement("a");
    a.href = "img/Resume (1).pdf";
    a.download = "Harshit-Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
}



VANTA.NET({
  el: "#animatedLayer",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  color: 0x00eaff,
  backgroundColor: 0x000000,
  points: 9,
  maxDistance: 21,
  spacing: 16,
});


VANTA.NET({
    el: "#vanta-bg-section",
    mouseControls: false,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x00eaff,
    backgroundColor: 0x000000,
    points: 8.0,
    maxDistance: 20.0,
    spacing: 18.0
});



