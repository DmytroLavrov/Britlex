// ========== POPUP-BURGER ==========
const body = document.body;
const burger = document.querySelector('.header-burger');
const popup = document.querySelector('.popup');
const navLink = document.querySelector('.header-nav').cloneNode(true);
const headerContact = document.querySelector('.header-contact').cloneNode(true);

burger.addEventListener('click', burgerHandler);

function burgerHandler(e) {
  e.preventDefault();
  popup.classList.toggle('open');
  burger.classList.toggle('active-burger');
  body.classList.toggle('noscroll');
  renderPopup();
}

function renderPopup() {
  popup.appendChild(navLink);
  popup.appendChild(headerContact);
  addEventListenersToClonedItems();
}

function addEventListenersToClonedItems() {
  const navLinkItems = popup.querySelectorAll('.header-link');
  navLinkItems.forEach((item) => {
    item.addEventListener('click', () => {
      popup.classList.remove('open');
      burger.classList.remove('active-burger');
      body.classList.remove('noscroll');
    });
  });
}

// ========== ANIMATION ON SCROLL (Intersection Observer API) ==========
let options = {
  root: null,
  rootMargin: '500px',
  threshold: 0.5
}

let callback = function(enteries, observer) {
  enteries.forEach(entry => {
      if (entry.isIntersecting) {
          console.log('find', entry)
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
      }
  });
}

let observer = new IntersectionObserver(callback, options);

let targets = document.querySelectorAll('.anim')
targets.forEach(target => {
  observer.observe(target)
})

// ========== EMAIL VALIDATION ==========
const form = document.querySelector('.contact-form');
const email = document.querySelector('.contact-email');
const errorSection = form.querySelector('.error');
const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (checkEmail()) {
    form.submit();
  }
});

email.addEventListener('input', () => {
  const emailValue = email.value.trim();
  if (emailValue !== '' && errorSection.innerText !== '') {
    setMessage('');
  }
});

function checkEmail() {
  const emailValue = email.value.trim();

  if (emailValue === '') {
    setMessage('Enter is required');
    return false;
  } else if (!regex.test(emailValue)) {
    setMessage('Enter has wrong format');
    return false;
  } else {
    setMessage('');
    return true;
  }
}

function isEmailValid() {
  const emailValue = email.value.trim();
  return regex.test(emailValue);
}

function setMessage(message) {
  errorSection.innerText = message;
}

// ========== SWAP BLOCKS ==========
const about = document.querySelector('.about');
const aboutColumn = document.querySelector('.about-column');
const aboutTitle = document.querySelector('.about-title');
const aboutImage = document.querySelector('.about-image');

const contact = document.querySelector('.contact');
const contactContent = document.querySelector('.contact-content');
const contactTitle = document.querySelector('.contact-title');
const contactImage = document.querySelector('.contact-image');

function swapBlocks() {
  // Swap blocks for the 'about' section
  if (window.innerWidth <= 754) {
    // If 'aboutTitle' is inside 'aboutColumn', move it after 'aboutImage'
    if (aboutColumn.contains(aboutTitle)) {
      aboutColumn.removeChild(aboutTitle);
      about.insertBefore(aboutTitle, aboutImage.nextSibling);
    }
    // If 'aboutImage' is not inside 'aboutColumn', move it into 'about'
    if (!aboutColumn.contains(aboutImage)) {
      about.removeChild(aboutImage);
      about.appendChild(aboutImage);
    }
  } else {
    // If 'aboutTitle' is not inside 'aboutColumn', move it to the beginning of 'aboutColumn'
    if (!aboutColumn.contains(aboutTitle)) {
      about.removeChild(aboutTitle);
      aboutColumn.insertBefore(aboutTitle, aboutColumn.firstChild);
    }
    // If 'aboutImage' is inside 'aboutColumn', move it out of 'aboutColumn' into 'about'
    if (aboutColumn.contains(aboutImage)) {
      aboutColumn.removeChild(aboutImage);
      about.appendChild(aboutImage);
    }
  }

  // Swap blocks for the 'contact' section
  if (window.innerWidth <= 754) {
    // If 'contactTitle' is inside 'contactContent', move it before 'contactContent'
    if (contactContent.contains(contactTitle)) {
      contactContent.removeChild(contactTitle);
      contact.insertBefore(contactTitle, contactContent);
    }
    // If 'contactImage' is not inside 'contactContent', move it into 'contactContent'
    if (!contactContent.contains(contactImage)) {
      contact.removeChild(contactImage);
      contactContent.insertBefore(contactImage, contactContent.firstChild);
    }
  } else {
    // If 'contactTitle' is not inside 'contactContent', move it to the beginning of 'contactContent'
    if (!contactContent.contains(contactTitle)) {
      contact.removeChild(contactTitle);
      contactContent.insertBefore(contactTitle, contactContent.firstChild);
    }
    // If 'contactImage' is inside 'contactContent', move it out of 'contactContent' into 'contact'
    if (contactContent.contains(contactImage)) {
      contactContent.removeChild(contactImage);
      contact.insertBefore(contactImage, contactContent.nextSibling);
    }
  }
}

swapBlocks();

window.addEventListener('resize', swapBlocks);
