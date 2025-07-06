function setLang(lang) {
    fetch(`lang/${lang}.json`)
        .then(res => res.json())
        .then(translations => {
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                element.textContent = translations[key] || '';
            });

            // Update HTML lang attribute
            document.documentElement.setAttribute('lang', lang);

            // Update canonical link for SEO
            const canonical = document.querySelector("link[rel='canonical']");
            if (canonical) {
                canonical.href = lang === 'en'
                    ? 'https://www.oceanbreezerestaurant.com/en/'
                    : 'https://www.oceanbreezerestaurant.com/';
            }

            // ✅ Update flag icon
            const flagEl = document.getElementById("selected-flag");
            if (flagEl) {
                flagEl.className = lang === 'en' ? 