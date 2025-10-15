// 组件加载工具
(function() {
  // 加载组件
  async function loadComponent(elementId, componentPath) {
    try {
      const response = await fetch(componentPath);
      const html = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = html;
      }
    } catch (error) {
      console.error(`Failed to load component: ${componentPath}`, error);
    }
  }

  // 页面加载完成后加载所有组件
  document.addEventListener('DOMContentLoaded', function() {
    // 加载导航栏
    if (document.getElementById('navbar-placeholder')) {
      loadComponent('navbar-placeholder', './components/navbar.html');
    }
    
    // 加载语言选择栏
    if (document.getElementById('lang-bar-placeholder')) {
      loadComponent('lang-bar-placeholder', './components/lang-bar.html');
    }
    
    // 加载底部版权
    if (document.getElementById('footer-placeholder')) {
      loadComponent('footer-placeholder', './components/footer.html');
    }
  });
})();
