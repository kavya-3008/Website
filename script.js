const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const GEISEL_SRC = '/assets/geisel-removebg-preview%20Background%20Removed.png';
const CONFETTI_DURATION_MS = 3200;

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

function createPiece(left, top, size) {
  const img = document.createElement('img');
  img.src = GEISEL_SRC;
  img.alt = '';
  img.className = 'geisel-confetti-piece';
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;
  img.style.objectFit = 'contain';
  img.style.left = `${left}px`;
  img.style.top = `${top}px`;
  img.style.transform = 'translate(-50%, -50%) rotate(0deg)';
  img.style.opacity = '1';
  return img;
}

function spawnGeiselShower() {
  const container = getContainer();
  const count = 36;
  const w = window.innerWidth;
  const h = window.innerHeight;

  for (let i = 0; i < count; i++) {
    const startX = randomBetween(0, w);
    const startY = randomBetween(0, h * 0.2);
    const size = 65;
    const tx = randomBetween(-120, 120);
    const ty = randomBetween(h * 0.55, h * 0.95);
    const rot = randomBetween(-420, 420);
    const img = createPiece(startX, startY, size);

    container.appendChild(img);

    setTimeout(() => {
      img.style.left = `${startX + tx}px`;
      img.style.top = `${startY + ty}px`;
      img.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
      img.style.opacity = '0';
    }, 35);

    setTimeout(() => img.remove(), CONFETTI_DURATION_MS + 400);
  }
}

document.body.addEventListener('click', () => {
  spawnGeiselShower();
});

const profileImage = document.querySelector('.profile-image');
if (profileImage) {
  profileImage.addEventListener('click', (e) => {
    e.stopPropagation();
    spawnGeiselShower();
  });
  profileImage.style.cursor = 'pointer';
  profileImage.setAttribute('title', 'Click for a surprise!');
}

const revealNodes = document.querySelectorAll('.reveal');
if (revealNodes.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
}
