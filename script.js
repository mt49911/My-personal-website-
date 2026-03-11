// AOS INITIALIZATION
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// PRELOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.preloader').classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }, 2000);
});
document.body.classList.add('no-scroll');

// NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlighting
  let current = '';
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// MOBILE MENU TOGGLE
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// TYPING ANIMATION
const typingText = document.getElementById('typingText');
const words = ['Web Developer', 'Canva Designer', 'Digital Marketer', 'Phone Technician', 'Textile Merchant'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}
typeEffect();

// STATS COUNTER
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;
function countStats() {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    let count = 0;
    const increment = target / 50;
    const updateCount = () => {
      if (count < target) {
        count += increment;
        stat.textContent = Math.ceil(count);
        setTimeout(updateCount, 20);
      } else {
        stat.textContent = target + (stat.getAttribute('data-target') === '100' ? '%' : '+');
      }
    };
    updateCount();
  });
}
window.addEventListener('scroll', () => {
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statsPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    if (statsPosition < screenPosition && !counted) {
      countStats();
      counted = true;
    }
  }
});

// BACK TO TOP
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// CURRENT LOCATION (from localStorage)
function loadLocation() {
  const locationSpan = document.querySelector('#currentLocation span');
  const savedLocation = localStorage.getItem('currentLocation');
  if (savedLocation) {
    locationSpan.textContent = savedLocation;
  } else {
    locationSpan.textContent = 'Malumfashi & Kwari Market, Kano';
  }
}
loadLocation();

// NOTIFICATIONS
function loadNotifications() {
  const notifList = document.getElementById('notificationList');
  const badge = document.getElementById('notificationBadge');
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  badge.textContent = notifications.length;
  if (notifications.length === 0) {
    notifList.innerHTML = '<p style="padding: 15px; text-align: center;">No new notifications</p>';
    return;
  }
  let html = '';
  notifications.slice(0, 5).reverse().forEach(notif => {
    html += `
      <div class="notification-item">
        ${notif.image ? `<img src="${notif.image}" alt="notif">` : ''}
        <div>
          <strong>${notif.title}</strong>
          <p style="font-size: 0.9rem; color: #666;">${notif.description}</p>
          <small style="color: #999;">${notif.date}</small>
        </div>
      </div>
    `;
  });
  notifList.innerHTML = html;
}
loadNotifications();

// CHATBOT
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');
const suggestions = document.querySelectorAll('.suggestion');

chatbotToggle.addEventListener('click', () => {
  chatbotWindow.classList.toggle('open');
});
chatbotClose.addEventListener('click', () => {
  chatbotWindow.classList.remove('open');
});

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function handleUserInput(input) {
  const lower = input.toLowerCase();
  let reply = '';

  if (lower.includes('service') || lower.includes('what do you do')) {
    reply = 'I offer Web Development, Canva Design, Digital Marketing, Phone Repair & Sales, AI Media, and I also sell textiles (Yadi, Shadda, Atampa, Men\'s Lace) at Kwari Market, Kano.';
  } else if (lower.includes('textile') || lower.includes('yadi') || lower.includes('shadda') || lower.includes('atampa') || lower.includes('lace')) {
    reply = 'We have high-quality textiles: Yadi (Ankara), Shadda, Atampa, and Men\'s Lace. Prices are affordable. Visit my shop at Kwari Market or order via WhatsApp.';
  } else if (lower.includes('price') || lower.includes('cost')) {
    reply = 'Prices vary. For websites start at ₦50,000, designs at ₦5,000, textiles depend on type. Contact me on WhatsApp for exact quote.';
  } else if (lower.includes('contact') || lower.includes('reach')) {
    reply = 'You can reach me on WhatsApp: 08167726037 or call 09020899102. I\'m 24/7 active!';
  } else if (lower.includes('location') || lower.includes('where')) {
    const loc = localStorage.getItem('currentLocation') || 'Malumfashi & Kwari Market, Kano';
    reply = `I'm currently at: ${loc}`;
  } else if (lower.includes('salam') || lower.includes('hello')) {
    reply = 'Wa alaikum assalam! How can I assist you today?';
  } else {
    reply = 'I\'m not sure about that. Please ask Abdullahi directly on WhatsApp: 08167726037. He\'ll be happy to help!';
  }
  addMessage(reply, 'bot');
}

chatbotSend.addEventListener('click', () => {
  const text = chatbotInput.value.trim();
  if (text) {
    addMessage(text, 'user');
    chatbotInput.value = '';
    setTimeout(() => handleUserInput(text), 500);
  }
});
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    chatbotSend.click();
  }
});
suggestions.forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.textContent;
    addMessage(text, 'user');
    setTimeout(() => handleUserInput(text), 500);
  });
});

// SMOOTH SCROLL
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// IMAGE ERROR HANDLING
document.querySelectorAll('img').forEach(img => {
  img.onerror = function () {
    this.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
  };
});
