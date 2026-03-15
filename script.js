const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

// Use root-relative path so it works from any page (e.g. index vs work.html)
const GEISEL_SRC = '/assets/geisel-removebg-preview%20Background%20Removed.png';
const CONFETTI_DURATION_MS = 2000;

function getContainer() {
  let el = document.getElementById('geisel-confetti-container');
  if (!el) {
    el = document.createElement('div');
    el.id = 'geisel-confetti-container';
    el.className = 'geisel-confetti-container';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
  }
  return el;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function spawnGeiselConfetti(originX, originY, isShower) {
  const container = getContainer();
  const count = isShower ? 60 : 24;
  const size = isShower ? randomBetween(24, 48) : randomBetween(40, 80);
  const w = window.innerWidth;
  const h = window.innerHeight;
  const spreadX = isShower ? Math.max(w - originX, originX) : 220;
  const spreadY = isShower ? Math.max(h - originY, originY) : 132;
  const spreadXNeg = isShower ? -originX : -220;
  const spreadYNeg = isShower ? -originY : -132;

  for (let i = 0; i < count; i++) {
    const img = document.createElement('img');
    img.src = GEISEL_SRC;
    img.alt = '';
    img.className = 'geisel-confetti-piece';
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
    img.style.objectFit = 'contain';
    const tx = randomBetween(spreadXNeg, spreadX);
    const ty = randomBetween(spreadYNeg, spreadY);
    const rot = randomBetween(-360, 360);

    img.style.left = `${originX}px`;
    img.style.top = `${originY}px`;
    img.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    img.style.opacity = '1';

    container.appendChild(img);

    setTimeout(() => {
      img.style.left = `${originX + tx}px`;
      img.style.top = `${originY + ty}px`;
      img.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
      img.style.opacity = '0';
    }, 50);

    setTimeout(() => img.remove(), CONFETTI_DURATION_MS);
  }
}

document.body.addEventListener('click', (e) => {
  spawnGeiselConfetti(e.clientX, e.clientY, false);
});

const profileImage = document.querySelector('.profile-image');
if (profileImage) {
  profileImage.addEventListener('click', (e) => {
    e.stopPropagation();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    spawnGeiselConfetti(centerX, centerY, true);
  });
  profileImage.style.cursor = 'pointer';
  profileImage.setAttribute('title', 'Click for a surprise!');
}
