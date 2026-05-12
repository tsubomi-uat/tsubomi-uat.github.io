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

/**
 * 2. カード画像クリック切り替え制御 (card)
 * クリック（タップ）するたびに data-images の画像を順次切り替え
 */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardImg = card.querySelector('.card-img');
        const imagesData = card.getAttribute('data-images');
        
        // data-images属性がないカードは何もしない
        if (!imagesData) return;

        const images = JSON.parse(imagesData);
        let currentIndex = 0;
        let isAnimating = false; // アニメーション中の連続クリック防止

        // クリックイベント
        card.addEventListener('click', (e) => {
            // もし <a> タグ（もっと見るボタン等）をクリックした場合は画像切り替えをしない
            if (e.target.tagName === 'A' || e.target.closest('a')) return;

            if (isAnimating) return; // アニメーション中は無視
            isAnimating = true;

            // 1. 次の画像のインデックスを決定
            currentIndex = (currentIndex + 1) % images.length;
            const nextImageUrl = `url('${images[currentIndex]}')`;

            // 2. 背面レイヤー(::before)に「次の画像」をセット
            // CSS変数 --next-img を更新
            cardImg.style.setProperty('--next-img', nextImageUrl);

            // 3. 前面(本体)をフェードアウトさせるクラスを付与
            cardImg.classList.add('fade-out');

            // 4. CSSの transition (2s) が終わるのを待ってからリセット
            setTimeout(() => {
                // 背面の画像を本体の背景にコピー
                cardImg.style.backgroundImage = nextImageUrl;
                // クラスを除去して不透明度を1に戻す
                cardImg.classList.remove('fade-out');
                
                isAnimating = false;
            }, 500); // top.css の transition 秒数と合わせる
        });
    });
});