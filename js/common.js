// ドキュメントの読み込みが完了してから実行
document.addEventListener('DOMContentLoaded', function() {
    // --- 1. スライドショー制御 ---
    const slides = document.querySelectorAll('.topCompanyImage .slide');
    let currentIndex = 0;
    const slideCount = slides.length;
    const intervalTime = 5000; // 5秒に設定（ご提示のコードに合わせました）

    function nextSlide() {
        if (slides.length > 0) {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slideCount;
            slides[currentIndex].classList.add('active');
        }
    }
    if (slides.length > 0) {
        setInterval(nextSlide, intervalTime);
    }

    // --- 2. ハンバーガーメニュー制御 ---
    const menuTrigger = document.getElementById('menu-trigger');
    const sidebar = document.getElementById('sidebar');

    if (menuTrigger && sidebar) {
        // メニューボタン（三本線/×）をクリックした時の挙動
        menuTrigger.addEventListener('click', function(e) {
            // クリックイベントが背後の document に伝わって即座に閉じるのを防ぐ
            e.stopPropagation();
            // 既に開いていれば閉じ、閉じていれば開く（toggle）
            this.classList.toggle('active');
            sidebar.classList.toggle('show');
        });

        // ★追加機能：メニューの外側（サイドバー以外の場所）をクリックしたら閉じる
        document.addEventListener('click', function(e) {
            // メニューが開いている、かつクリックされた場所がサイドバーでもボタンでもない場合
            if (sidebar.classList.contains('show') && 
                !sidebar.contains(e.target) && 
                !menuTrigger.contains(e.target)) {
                
                menuTrigger.classList.remove('active');
                sidebar.classList.remove('show');
            }
        });
    }
});