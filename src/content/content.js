global.browser = require('webextension-polyfill');

global.browser.runtime.onMessage.addListener(async request => {
  console.log(request);
  return { response: 'ok' };
});

// Google Forms
if (location.href.includes('docs.google.com/forms')) {
  document.querySelector('body').insertAdjacentHTML('beforeend', '<span id="gpex-counter">0</span>');
  const counter = document.querySelector('#gpex-counter');
  counter.hidden = true;

  document.querySelectorAll('.exportTextarea').forEach(textarea => {
    console.warn(textarea);
    ['click', 'keyup', 'change', 'keydown'].forEach(eventType => {
      textarea.addEventListener(eventType, e => {
        counter.hidden = false;
        counter.textContent = String(e.target.value.length);
      });
    });
    textarea.addEventListener('blur', e => {
      counter.hidden = true;
    });
  });
}
// Google Classroom
if (location.href.includes('classroom.google.com')) {
  console.log('[Gpex] Google Classroom detected.');
}
