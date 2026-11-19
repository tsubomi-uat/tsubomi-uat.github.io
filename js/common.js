/**
 * つぼみ株式会社 共通スクリプト
 * 1. メインビジュアルのスライドショー
 * 2. スマホ用メニューの開閉
 * 3. スクロールしたときのヘッダーの区切り線
 * 4. スクロールに応じたフェードイン
 */
document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ------------------------------------------------------------------
       1. スライドショー
       ------------------------------------------------------------------ */
    const slides = document.querySelectorAll('.hero__slide');

    if (slides.length > 1 && !reduceMotion) {
        let current = 0;
        const INTERVAL = 6500;

        setInterval(() => {
            slides[current].classList.remove('is-active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('is-active');
        }, INTERVAL);
    }

    /* ------------------------------------------------------------------
       2. スマホ用メニュー
       ------------------------------------------------------------------ */
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('global-nav');

    if (toggle && nav) {
        const setMenu = (open) => {
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
            nav.classList.toggle('is-open', open);
            document.body.classList.toggle('is-menu-open', open);
        };

        toggle.addEventListener('click', () => {
            setMenu(toggle.getAttribute('aria-expanded') !== 'true');
        });

        // メニュー内のリンクを押したら閉じる
        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenu(false));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenu(false);
        });

        // メニューの外側（ヘッダー以外）をタップしたら閉じる
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('is-open') && !e.target.closest('.site-header')) {
                setMenu(false);
            }
        });

        // PC幅に広げたときは閉じた状態に戻す
        window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
            if (e.matches) setMenu(false);
        });
    }

    /* ------------------------------------------------------------------
       3. ヘッダーの区切り線
       ------------------------------------------------------------------ */
    const header = document.querySelector('.site-header');

    if (header) {
        const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ------------------------------------------------------------------
       4. フェードイン
       ------------------------------------------------------------------ */
    const fadeTargets = document.querySelectorAll('.fade-in');

    if (!('IntersectionObserver' in window) || reduceMotion) {
        fadeTargets.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    fadeTargets.forEach((el) => observer.observe(el));
});
