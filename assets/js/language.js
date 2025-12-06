const Language = (() => {
  const selector = document.querySelector('.language-switcher');
  const buttons = selector ? Array.from(selector.querySelectorAll('button')) : [];
  const defaultLang = localStorage.getItem('raven-lang') || 'en';

  async function loadLanguage(lang) {
    try {
      const response = await fetch(`./lang/${lang}.json`);
      const data = await response.json();
      applyTranslations(data, lang);
      localStorage.setItem('raven-lang', lang);
      updateButtons(lang);
      toggleDirection(lang);
    } catch (err) {
      console.error('Language load failed', err);
    }
  }

  function applyTranslations(dictionary, lang) {
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedValue(dictionary, key);
      if (value) {
        el.innerHTML = value;
      }
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = getNestedValue(dictionary, key);
      if (value) {
        el.setAttribute('placeholder', value);
      }
    });

    const buttonsText = document.querySelectorAll('[data-i18n-value]');
    buttonsText.forEach((el) => {
      const key = el.getAttribute('data-i18n-value');
      const value = getNestedValue(dictionary, key);
      if (value) {
        el.setAttribute('value', value);
      }
    });
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => (acc ? acc[part] : null), obj);
  }

  function updateButtons(lang) {
    buttons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function toggleDirection(lang) {
    const isRTL = lang === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', isRTL);
  }

  function init() {
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => loadLanguage(btn.dataset.lang));
    });
    loadLanguage(defaultLang);
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', Language.init);
