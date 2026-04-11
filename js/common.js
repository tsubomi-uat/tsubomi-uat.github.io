// ドキュメントの読み込みが完了してから実行
document.addEventListener('DOMContentLoaded', function() {
    // すべてのスライド（画像）を取得
    const slides = document.querySelectorAll('.hero .slide');
    let currentIndex = 0; // 現在表示されているスライドの番号
    const slideCount = slides.length; // スライドの総数（今回は5枚）
    const intervalTime = 5000; // 切り替え間隔（1秒 = 1000ミリ秒）

    // スライドを切り替える関数
    function nextSlide() {
        // 現在の「active」クラスを外す
        slides[currentIndex].classList.remove('active');

        // 次のスライド番号を計算（最後の次は最初に戻る）
        currentIndex = (currentIndex + 1) % slideCount;

        // 次のスライドに「active」クラスを付ける
        slides[currentIndex].classList.add('active');
    }

    // 指定した時間ごとに nextSlide 関数を繰り返し実行（自動再生）
    setInterval(nextSlide, intervalTime);
});

// 既存のスライドショー処理の下に追記してください
const menuTrigger = document.getElementById('menu-trigger');
const sidebar = document.getElementById('sidebar');

menuTrigger.addEventListener('click', function() {
    // ボタンの三本線をアニメーションさせる
    this.classList.toggle('active');
    // サイドバーを出し入れする
    sidebar.classList.toggle('show');
});

// メニューリンクをクリックしたら閉じる（利便性のため）
const sideLinks = document.querySelectorAll('.side-menu a');
sideLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuTrigger.classList.remove('active');
        sidebar.classList.remove('show');
    });
});