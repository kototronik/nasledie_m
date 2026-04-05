/**
 * Данные о жилищах народов (перенесены из JSON для работы без сервера)
 * Каждый объект содержит имя файла картинки (img) и аудио (snd).
 */
const housesData = [
    { "img": "русская.jpg", "snd": "Русская изба .mp3" },
    { "img": "иглу.jpg", "snd": "Иглу .mp3" },
    { "img": "сакля.jpg", "snd": "Сакля.mp3" },
    { "img": "юрта.jpg", "snd": "Башкирская юрта.mp3" },
    { "img": "дом.jpg", "snd": "Чеченский турлучный дом .mp3" },
    { "img": "татарская.jpg", "snd": "Татарская изба .mp3" }
];

/**
 * Основная функция инициализации галереи
 */
function initApp() {
    const gallery = document.getElementById('gallery');
    const stopFab = document.getElementById('stop-fab');
    let currentAudio = null;

    // Функция остановки воспроизведения
    const stopPlayback = () => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        stopFab.style.display = 'none'; // Прячем кнопку "Стоп"
    };

    // Создаем карточки для каждого дома
    housesData.forEach(item => {
        // 1. Создаем контейнер карточки
        const card = document.createElement('div');
        card.className = 'item';

        // 2. Создаем элемент изображения
        const img = document.createElement('img');
        img.src = item.img; // Используем имя файла напрямую[cite: 2]
        img.alt = "Изображение жилища";
        
        card.appendChild(img);
        gallery.appendChild(card);

        // 3. Добавляем событие клика (на планшете это будет тап)[cite: 2]
        card.addEventListener('click', () => {
            // Останавливаем старый звук перед запуском нового
            if (currentAudio) {
                currentAudio.pause();
            }

            // Создаем и запускаем новый аудио-объект
            currentAudio = new Audio(item.snd);
            currentAudio.play();

            // Показываем кнопку остановки
            stopFab.style.display = 'flex';

            // Прячем кнопку, когда звук доиграет до конца
            currentAudio.onended = () => {
                stopFab.style.display = 'none';
            };
        });
    });

    // Слушатель для кнопки СТОП
    stopFab.addEventListener('click', stopPlayback);
}

// Запуск приложения после загрузки скрипта
initApp();