global.browser = require('webextension-polyfill');

global.browser.runtime.onMessage.addListener(async request => {
  const result = [];
  const selector = 'a[aria-label][data-focus-id][target=_blank]';
  const docsTypes = ['Google ドキュメント', 'Google スプレッドシート', 'Google スライド', 'Google フォーム'];
  switch (request.query) {
    case 'getDocs':
      document.querySelectorAll(selector).forEach(doc => {
        if (doc.title) {
          let type = doc.querySelector('div > div > div') ? doc.querySelector('div > div > div').textContent : '不明';
          let downloadable = true;
          let gdocs = false;
          let defaultExportType = null;
          let dlLinkDir = null;
          if (type.indexOf('YouTube') === 0) {
            type = 'YouTube';
            downloadable = false;
          }
          if (docsTypes.includes(type)) {
            gdocs = true;
            if (type === 'Google ドキュメント') {
              defaultExportType = 'docx';
              dlLinkDir = 'document';
            } else if (type === 'Google スプレッドシート') {
              defaultExportType = 'xlsx';
              dlLinkDir = 'spreadsheets';
            } else if (type === 'Google スライド') {
              downloadable = false;
            } else if (type === 'Google フォーム') {
              downloadable = false;
            }
          }
          result.push({
            visibility: downloadable ? Boolean(doc.offsetHeight) : false,
            title: doc.title,
            href: doc.getAttribute('href'),
            type,
            downloadable,
            gdocs,
            defaultExportType,
            dlLinkDir
          });
        }
      });
      return result;
    case 'getClassInfo':
      if (location.href.includes('classroom.google.com')) {
        return {
          classTitle: document.querySelector('nav h1 span:first-child').textContent,
          classInfo: document.querySelector('nav h1 span:last-child').textContent
        };
      } else return { classTitle: '対象ページではありません' };
    default:
      return false;
  }
});

// Google Forms
if (location.href.includes('docs.google.com/forms')) {
  document.querySelector('body').insertAdjacentHTML('beforeend', '<span id="gpex-counter">0</span>');
  const counter = document.querySelector('#gpex-counter');
  counter.hidden = true;

  document.querySelectorAll('.exportTextarea').forEach(textarea => {
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
