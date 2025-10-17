// 导航栏滚动动画效果
(function() {
  // 等待DOM和组件加载完成
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) {
      // 如果导航栏还未加载，稍后重试
      setTimeout(initNavbarScroll, 100);
      return;
    }
    
    let lastScrollTop = 0;
    let ticking = false;
    
    // 滚动处理函数
    function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 当滚动超过1px时添加scrolled类
      if (scrollTop > 1) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScrollTop = scrollTop;
      ticking = false;
    }
    
    // 使用requestAnimationFrame优化性能
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // 初始检查
    handleScroll();
  }
  
  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbarScroll);
  } else {
    initNavbarScroll();
  }
})();
