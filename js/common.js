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
