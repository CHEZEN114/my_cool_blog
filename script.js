const posts = [
    {
        id: 1,
        tag: '前端开发',
        title: 'CSS 动画的艺术：从基础到高级',
        excerpt: '深入探索 CSS 动画的奥秘，从关键帧动画到性能优化，让你的网站动起来！',
        date: '2024-01-15',
        readTime: '8 分钟'
    },
    {
        id: 2,
        tag: 'JavaScript',
        title: '现代 JavaScript 最佳实践',
        excerpt: '探索 ES6+ 新特性，掌握异步编程，写出更优雅、更高效的代码。',
        date: '2024-01-12',
        readTime: '12 分钟'
    },
    {
        id: 3,
        tag: 'UI 设计',
        title: '打造令人惊艳的深色模式',
        excerpt: '深色模式不只是反转颜色，这里有你需要知道的所有设计技巧。',
        date: '2024-01-10',
        readTime: '6 分钟'
    },
    {
        id: 4,
        tag: '性能优化',
        title: 'Web 性能优化完全指南',
        excerpt: '从加载速度到运行时性能，全面提升你的网站用户体验。',
        date: '2024-01-08',
        readTime: '15 分钟'
    },
    {
        id: 5,
        tag: '响应式设计',
        title: '响应式设计：不止是媒体查询',
        excerpt: '学习现代响应式设计技术，用 CSS Grid 和 Flexbox 构建完美布局。',
        date: '2024-01-05',
        readTime: '10 分钟'
    },
    {
        id: 6,
        tag: '工具',
        title: '2024 年必备的开发工具',
        excerpt: '从编辑器到终端，提升开发效率的神器推荐！',
        date: '2024-01-01',
        readTime: '7 分钟'
    }
];

function renderPosts() {
    const postsGrid = document.getElementById('postsGrid');
    if (!postsGrid) return;
    
    postsGrid.innerHTML = posts.map(post => `
        <article class="post-card" data-post-id="${post.id}">
            <span class="post-tag">${post.tag}</span>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="post-meta">
                <span class="post-date">${post.date}</span>
                <span class="read-more">阅读 ${post.readTime} →</span>
            </div>
        </article>
    `).join('');
    
    document.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', () => {
            const postId = card.dataset.postId;
            alert(`文章 ID: ${postId}\n\n在完整版本中，这里会打开文章详情页面！`);
        });
    });
}

const themeToggle = document.getElementById('themeToggle');
let isDarkMode = true;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('light-mode');
        themeToggle.querySelector('.icon').textContent = isDarkMode ? '🌙' : '☀️';
    });
}

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

function animateOnScroll() {
    const elements = document.querySelectorAll('.post-card, .section-title, .stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    animateOnScroll();
    
    console.log('%c🚀 Cool Blog 已加载！', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%c用代码创造世界 ✨', 'color: #ec4899; font-size: 14px;');
});
