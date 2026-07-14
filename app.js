// Налаштування Telegram-бота
const TELEGRAM_TOKEN = '8205027376:AAHLYLmc6SR6Fbsu8-dp7oX8qdu6BVZKHNA'
; 
const TELEGRAM_CHAT_ID = '1679640902'; // Ваш ID вже тут

// 1. ТАЙМЕР ЗВОРОТНОГО ВІДЛІКУ (55 хвилин 3 секунди з перезапуском)
function startTimer(duration, displayHours, displayMinutes, displaySeconds) {
    let timer = duration;
    setInterval(function () {
        let hours = Math.floor(timer / 3600);
        let minutes = Math.floor((timer % 3600) / 60);
        let seconds = Math.floor(timer % 60);

        displayHours.textContent = hours < 10 ? "0" + hours : hours;
        displayMinutes.textContent = minutes < 10 ? "0" + minutes : minutes;
        displaySeconds.textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// 2. ІМІТАЦІЯ "ЖИВИХ" ЗАМОВЛЕНЬ
const names = ["Анастасія", "Михайло", "Олена", "Ігор", "Дмитро", "Тетяна", "Олександр", "Наталія"];
const cities = ["Дніпро", "Київ", "Львів", "Одеса", "Харків", "Запоріжжя", "Вінниця", "Полтава"];

function showFakeOrder() {
    const notifyElement = document.getElementById('notification');
    const nameSpan = document.getElementById('notify-name');
    const citySpan = document.getElementById('notify-city');
    const countSpan = document.getElementById('notify-count');

    nameSpan.textContent = names[Math.floor(Math.random() * names.length)];
    citySpan.textContent = cities[Math.floor(Math.random() * cities.length)];
    countSpan.textContent = Math.floor(Math.random() * 8) + 2;

    notifyElement.classList.add('show');

    setTimeout(() => {
        notifyElement.classList.remove('show');
    }, 6000);
}

// 3. ВІДПРАВКА ДАНИХ В TELEGRAM ЧЕРЕЗ AJAX
document.getElementById('tg-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    const message = `🛍️ **НОВЕ ЗАМОВЛЕННЯ!**\n\n👤 **Ім'я:** ${name}\n📞 **Телефон:** ${phone}\n🌐 **Товар:** Блендерний Сет 4в1`;
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Дякуємо! Ваша заявка прийнята. Менеджер зв\'яжеться з вами.');
            document.getElementById('tg-form').reset();
        } else {
            alert('Помилка відправки. Перевірте токен бота.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Помилка мережі.');
    });
});

window.onload = function () {
    const timeInSeconds = 3303; // 55 хв 3 сек
    startTimer(timeInSeconds, document.getElementById('hours'), document.getElementById('minutes'), document.getElementById('seconds'));

    setTimeout(showFakeOrder, 4000);
    setInterval(showFakeOrder, 25000);
};
