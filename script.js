// script.js

function setLang(lang) {
    fetch(`lang/${lang}.json`)
        .then(res => {
            if (!res.ok) throw new Error(`ไม่สามารถโหลดไฟล์ ${lang}.json ได้`);
            return res.json();
        })
        .then(translations => {
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');

                // แยกประเภทการแปลตาม tag
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key] || '';
                } else if (element.dataset.textKey) {
                    element.textContent = translations[key] || '';
                } else {
                    element.innerHTML = translations[key] || '';
                }
            });

            // อัปเดต attribute lang ของ html
            document.documentElement.setAttribute('lang', lang);

            // อัปเดต canonical link
            const canonical = document.querySelector("link[rel='canonical']");
            if (canonical) {
                canonical.href = lang === 'en'
                    ? 'https://www.oceanbreezerestaurant.com/en/ '
                    : 'https://www.oceanbreezerestaurant.com/ ';
            }

            // อัปเดตธงใน dropdown
            const flagEl = document.getElementById("selected-flag");
            if (flagEl) {
                flagEl.className = lang === 'en' ? 'fi fi-us me-2' : 'fi fi-th me-2';
            }

            // บันทึกภาษาที่เลือกลง localStorage
            localStorage.setItem('lang', lang);
        })
        .catch(err => console.error(err));
}

// เมื่อโหลดหน้าเสร็จ ตรวจสอบว่าเคยเลือกภาษาไว้หรือไม่
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('lang') || 'th';
    setLang(savedLang);
});
