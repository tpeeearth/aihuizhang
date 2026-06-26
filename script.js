// AI学习徽章官网 - JavaScript

document.addEventListener('DOMContentLoaded', function() {
  console.log('AI学习徽章官网已加载');

  // 导航栏滚动效果
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.querySelector('.back-to-top');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // 滚动时更新导航栏样式和当前激活的导航链接
  function updateNavbar() {
    const scrollY = window.scrollY;

    // 导航栏背景
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 回到顶部按钮
    if (scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // 更新当前激活的导航链接
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar();

  // 平滑滚动到锚点
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }

      // 关闭移动端菜单
      navMenu.classList.remove('active');
    });
  });

  // 回到顶部
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 移动端菜单切换
  mobileMenuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });

  // 滚动动画 - Intersection Observer
  const animateTargets = document.querySelectorAll('.animate-target, .animate-left, .animate-right, .animate-scale');
  const sectionHeaders = document.querySelectorAll('.section-header');
  
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateTargets.forEach(target => {
    observer.observe(target);
  });

  sectionHeaders.forEach(header => {
    // 检查元素是否已经在视口中
    const rect = header.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      header.classList.add('visible');
    } else {
      observer.observe(header);
    }
  });

  // 为网格子元素自动添加交错动画
  document.querySelectorAll('.core-grid, .products-grid, .usecases-grid, .data-grid, .team-grid, .timeline-layers').forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, index) => {
      child.classList.add('animate-target');
      child.classList.add('animate-delay-' + ((index % 4) + 1));
      observer.observe(child);
    });
  });

  // 功能介绍区左右交替动画
  document.querySelectorAll('.feature-item').forEach((item, index) => {
    if (index % 2 === 0) {
      item.classList.add('animate-left');
    } else {
      item.classList.add('animate-right');
    }
    observer.observe(item);
  });

  // 时间线卡片左右交替动画
  document.querySelectorAll('.timeline-card').forEach((card, index) => {
    if (index % 2 === 0) {
      card.classList.add('animate-left');
    } else {
      card.classList.add('animate-right');
    }
    observer.observe(card);
  });

  // 数字滚动动画
  const dataNumbers = document.querySelectorAll('.data-number[data-target]');
  let countersStarted = false;

  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        dataNumbers.forEach(num => {
          const target = parseFloat(num.dataset.target);
          const suffix = num.dataset.suffix || '';
          const decimal = parseInt(num.dataset.decimal) || 0;
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            if (decimal > 0) {
              num.textContent = current.toFixed(decimal) + suffix;
            } else {
              num.textContent = Math.floor(current).toLocaleString() + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const dataSection = document.querySelector('.data-grid');
  if (dataSection) {
    counterObserver.observe(dataSection);
  }

  // 表单提交处理
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('感谢您的申请！我们会尽快与您联系。');
      this.reset();
    });
  }

  // 购买按钮点击处理
  const buyButtons = document.querySelectorAll('.btn-primary');
  buyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // 排除导航栏和表单的按钮
      if (!this.closest('.navbar') && !this.closest('form')) {
        e.preventDefault();
        alert('感谢您的关注！购买功能即将上线。');
      }
    });
  });

  // 产品卡片悬浮效果增强
  const productCards = document.querySelectorAll('.product-card, .pricing-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = this.classList.contains('featured') 
        ? 'scale(1.05) translateY(-8px)' 
        : 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = this.classList.contains('featured') 
        ? 'scale(1.05)' 
        : 'translateY(0)';
    });
  });

  // 图片占位符点击提示
  const imagePlaceholders = document.querySelectorAll('[class*="placeholder"]');
  imagePlaceholders.forEach(placeholder => {
    placeholder.style.cursor = 'pointer';
    placeholder.addEventListener('click', function() {
      console.log('此处可替换为真实图片');
    });
  });

  console.log('AI学习徽章官网初始化完成');
});
