document.addEventListener('DOMContentLoaded', function() {
    // --- スライドショー制御 (TOPページ専用) ---
    const slides = document.querySelectorAll('.slideImages .slide');
    
    if (slides.length > 0) {
        let currentIndex = 0;
        const slideCount = slides.length;
        const intervalTime = 6500; // 5秒

        function nextSlide() {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slideCount;
            slides[currentIndex].classList.add('active');
        }

        setInterval(nextSlide, intervalTime);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardImg = card.querySelector('.card-img');
        const imagesData = card.getAttribute('data-images');
        if (!imagesData) return;

        const images = JSON.parse(imagesData);
        let currentIndex = 0;
        let intervalId = null;

        const fadeNextImage = () => {
            const nextIndex = (currentIndex + 1) % images.length;
            const nextImageUrl = `url('${images[nextIndex]}')`;

            // 1. 背面(::before)に「次の画像」をセット
            cardImg.style.setProperty('--next-img', nextImageUrl);

            // 2. 前面(本体)をフェードアウトさせる
            cardImg.classList.add('fade-out');

            // 3. フェード(2秒)が終わったら、前面の画像を更新してパッと表示
            setTimeout(() => {
                cardImg.style.backgroundImage = nextImageUrl;
                cardImg.classList.remove('fade-out'); // 透明度を1に戻す
                currentIndex = nextIndex;
            }, 500); // CSSのtransition(2s)と一致させる[cite: 8, 9]
        };

        card.addEventListener('mouseenter', () => {
            if (intervalId) clearInterval(intervalId);
            // 5秒おきに実行 (表示3秒 + フェード2秒)
            intervalId = setInterval(fadeNextImage, 3500);
        });

        card.addEventListener('mouseleave', () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        });
    });
});