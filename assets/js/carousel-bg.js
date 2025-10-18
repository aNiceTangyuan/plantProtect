// 背景轮播：基于叠层淡入淡出，不改变原有 .card-group 结构
(function () {
  const container = document.querySelector('.carousel-bg');
  if (!container) return;

  // 轮播图片列表（按需添加更多图片）
  const images = [
    'assets/images/lettuce-1200x600-1.JPEG',
    'assets/images/tractor-sprayer-1200x600-1.JPEG',
    'assets/images/rice-carry-1200x600-1.JPEG'
  ].filter(Boolean);

  if (!images || images.length <= 1) {
    // 单图：使用现有背景，不构建轮播层
    return;
  }

  // 预加载图片，避免切换闪烁
  const preload = (src) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(src);
    img.src = src;
  });

  Promise.all(images.map(preload)).then(() => {
    // 创建叠层容器
    const slidesWrap = document.createElement('div');
    slidesWrap.className = 'bg-slides';

    // 生成两层用于交替淡入淡出（双缓冲）
    const slideA = document.createElement('div');
    slideA.className = 'bg-slide';
    const slideB = document.createElement('div');
    slideB.className = 'bg-slide';

    slidesWrap.appendChild(slideA);
    slidesWrap.appendChild(slideB);

    // 放到最底层（在 ::after 之下，已由 CSS z-index=0 保证）
    container.insertBefore(slidesWrap, container.firstChild);

    let cur = 0;
    let showingA = true;
    const interval = 6000; // 6s 一张

    // 初始化第一张
    slideA.style.backgroundImage = `url('${images[cur]}')`;
    slideA.classList.add('is-active');

    const nextIndex = () => (cur + 1) % images.length;

    const switchSlide = () => {
      cur = nextIndex();
      const nextUrl = images[cur];

      if (showingA) {
        slideB.style.backgroundImage = `url('${nextUrl}')`;
        slideB.classList.add('is-active');
        slideA.classList.remove('is-active');
      } else {
        slideA.style.backgroundImage = `url('${nextUrl}')`;
        slideA.classList.add('is-active');
        slideB.classList.remove('is-active');
      }
      showingA = !showingA;
    };

    // 页面可见性控制（避免后台切换）
    let timer = null;
    const start = () => {
      if (timer) return;
      timer = setInterval(switchSlide, interval);
    };
    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });

    start();
  });
})();
