import './style.css';
import './welcome.css';

// ===== CONFIGURATION =====

// Той уақыты: 14 Тамыз 2026 жыл, 15:00
const EVENT_DATE = new Date('2026-08-14T15:00:00').getTime();

// ===== 1. LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }, 1500); // Көрсетілім үшін кішкене кідіріс
});

// ===== 2. SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach(el => {
  revealOnScroll.observe(el);
});

// ===== 3. WELCOME SCREEN =====
const welcomeScreen = document.getElementById('welcomeScreen');
const openBtn = document.getElementById('openBtn');

// When user clicks 'Open Invitation'
const envelopeWrapper = document.getElementById('envelopeWrapper');
openBtn.addEventListener('click', () => {
  envelopeWrapper.classList.add('open');
  
  setTimeout(() => {
    welcomeScreen.classList.add('slide-up');
    document.body.style.overflow = 'auto'; // allow scrolling now
  }, 1500); // Wait 1.5 seconds for envelope animation
});


// ===== 4. COUNTDOWN TIMER =====
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const timerContainer = document.getElementById('timer');
const timerMessage = document.getElementById('timerMessage');

const updateCountdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = EVENT_DATE - now;

  if (distance < 0) {
    clearInterval(updateCountdown);
    timerContainer.classList.add('hidden');
    timerMessage.classList.remove('hidden');
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.innerText = days < 10 ? '0' + days : days;
  hoursEl.innerText = hours < 10 ? '0' + hours : hours;
  minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
  secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
}, 1000);


// Telegram RSVP logic removed
// ===== 6. PARTICLES (Hero section background) =====
function createParticles() {
  const container = document.getElementById('particles');
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 3px and 8px
    const size = Math.random() * 5 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-10px`;
    
    // Random animation duration and delay
    const duration = Math.random() * 5 + 5; // 5-10s
    const delay = Math.random() * 5;
    
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
  }
}

createParticles();

// ===== 7. BUTTERFLIES =====
function createButterflies() {
  for (let i = 1; i <= 2; i++) {
    const container = document.createElement('div');
    container.classList.add('butterfly-container', `butterfly-${i}`);
    
    // Unique ID for each gradient to prevent SVG rendering issues
    const gradId = `wingGrad-${i}`;
    
    container.innerHTML = `
      <svg viewBox="0 0 100 100" class="butterfly-svg">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff758c"/>
            <stop offset="100%" stop-color="#ff7eb3"/>
          </linearGradient>
        </defs>
        <g class="wings">
          <path class="wing wing-left" d="M 50 50 C 20 20, 0 40, 20 65 C 30 75, 45 65, 50 50 Z" fill="url(#${gradId})" opacity="0.9"/>
          <path class="wing wing-left-bottom" d="M 50 50 C 30 65, 20 90, 40 95 C 45 95, 50 75, 50 50 Z" fill="url(#${gradId})" opacity="0.95"/>
          <path class="wing wing-right" d="M 50 50 C 80 20, 100 40, 80 65 C 70 75, 55 65, 50 50 Z" fill="url(#${gradId})" opacity="0.9"/>
          <path class="wing wing-right-bottom" d="M 50 50 C 70 65, 80 90, 60 95 C 55 95, 50 75, 50 50 Z" fill="url(#${gradId})" opacity="0.95"/>
        </g>
        <rect x="48" y="42" width="4" height="25" rx="2" fill="#4a3b32"/>
        <circle cx="50" cy="38" r="4" fill="#4a3b32"/>
        <path d="M 49 35 Q 35 20 40 15" fill="none" stroke="#4a3b32" stroke-width="1.5"/>
        <path d="M 51 35 Q 65 20 60 15" fill="none" stroke="#4a3b32" stroke-width="1.5"/>
      </svg>
    `;
    document.body.appendChild(container);
  }
}

createButterflies();

// Music control removed

// ===== 9. RSVP GOOGLE SHEETS INTEGRATION =====
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx6LthOP89AUYYFoj5ffph7Fl0L9tBnSmFuCf-FBIV0MHJmJ_90wiphVlf0K3osL_pA-A/exec";

async function sendRSVP(e) {
  e.preventDefault();

  const rsvpForm = document.getElementById('rsvpForm');
  const submitBtn = rsvpForm.querySelector('.rsvp-submit-btn');
  const originalText = submitBtn ? submitBtn.textContent : 'ЖАУАПТЫ ЖІБЕРУ';
  
  if (submitBtn) {
    submitBtn.textContent = "Күте тұрыңыз...";
    submitBtn.disabled = true;
  }

  const formData = new FormData(rsvpForm);
  const name = formData.get('guestName');
  const attendance = formData.get('attendance');
  const guests = formData.get('guestCount') || '1 адам'; // Default just in case

  const requestBody = JSON.stringify({
    name: name,
    attendance: attendance,
    guests: guests
  });

  console.log("Жіберілетін мәліметтер (JSON):", requestBody);
  console.log("Жіберілетін URL:", WEB_APP_URL);

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: {
        // Мы используем text/plain чтобы избежать ошибки CORS preflight OPTIONS,
        // которую Google Apps Script по умолчанию не поддерживает корректно.
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: requestBody
    });

    console.log("Жауап статусы (response.status):", response.status);
    
    // Читаем текст ответа от Google Apps Script
    const responseText = await response.text();
    console.log("Жауап мәтіні (response.text):", responseText);

    // Любой 2xx статус или opaque ответ (если Apps Script возвращает редирект без CORS) считается успешным
    if (response.ok || response.type === 'opaque') {
      alert("Жауабыңыз қабылданды ❤️");
      rsvpForm.style.display = 'none';
      const rsvpSuccess = document.getElementById('rsvpSuccess');
      if (rsvpSuccess) {
        rsvpSuccess.classList.remove('hidden');
      }
    } else {
      throw new Error(`Google Apps Script қате қайтарды. Статус: ${response.status}. Мәтін: ${responseText}`);
    }
  } catch (error) {
    console.error("Fetch қатесі немесе CORS:", error);
    alert("Кешіріңіз, жіберу кезінде қате орын алды.\\nСебебі: " + error.message);
  } finally {
    if (submitBtn) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const rsvpForm = document.getElementById('rsvpForm');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', sendRSVP);
  }
});
