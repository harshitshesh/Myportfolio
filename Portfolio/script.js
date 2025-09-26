
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

const GH_USERNAME = "harshitshesh"; // apna GitHub username daalo

// Fetch GitHub stats
async function loadGitHubStats() {
  const res = await fetch(`https://api.github.com/users/${GH_USERNAME}`);
  const data = await res.json();

  document.getElementById("gh-repos").textContent = data.public_repos;
  document.getElementById("gh-followers").textContent = data.followers;
  document.getElementById("gh-stars").textContent = data.public_repos; // total stars ka approx, or fetch separately if needed
}

// Fetch 5 latest GitHub repos
async function loadGitHubProjects() {
  const res = await fetch(`https://api.github.com/users/${GH_USERNAME}/repos?sort=updated&per_page=5`);
  const repos = await res.json();
  const grid = document.getElementById("repo-grid");
  grid.innerHTML = "";

  repos.forEach(repo => {
    const card = document.createElement("div");
    card.className = "repo-card";
    card.innerHTML = `
      <h4>${repo.name}</h4>
      <p>${repo.description || "No description"}</p>
      <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
      <a href="${repo.html_url}" target="_blank">View Repo</a>
    `;
    grid.appendChild(card);
  });
}

// GitHub contribution calendar
function loadGitHubCalendar() {
  new GitHubCalendar("#calendar-wrapper", GH_USERNAME, { responsive: true, global_stats: true });
}

// Call functions
loadGitHubStats();
loadGitHubProjects();
loadGitHubCalendar();
