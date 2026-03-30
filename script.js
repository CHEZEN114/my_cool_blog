// 文章数据管理
let posts = [];
let currentPostId = null;
let favorites = JSON.parse(localStorage.getItem('blog_favorites')) || [];
let comments = JSON.parse(localStorage.getItem('blog_comments')) || {};

// 初始化文章数据
async function initPosts() {
    const postFiles = [
        { file: 'css-animation-guide.md', tag: '前端开发', title: 'CSS 动画的艺术：从基础到高级', date: '2024-01-15' },
        { file: 'modern-js-practices.md', tag: 'JavaScript', title: '现代 JavaScript 最佳实践', date: '2024-01-12' },
        { file: 'sample-post.md', tag: '前端开发', title: 'CSS 动画的艺术：从基础到高级', date: '2024-01-10' }
    ];
    
    posts = postFiles.map((p, index) => ({
        id: index + 1,
        tag: p.tag,
        title: p.title,
        file: p.file,
        excerpt: '点击查看文章详情...',
        date: p.date,
        readTime: '5-10 分钟'
    }));
}

// 读取Markdown文件内容
async function loadPostContent(file) {
    try {
        const response = await fetch(`posts/${file}`);
        if (!response.ok) throw new Error('Failed to load post');
        return await response.text();
    } catch (error) {
        console.error('Error loading post:', error);
        return '抱歉，文章加载失败。';
    }
}

// 简单的Markdown解析器
function parseMarkdown(text) {
    return text
        // 标题
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // 粗体和斜体
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // 代码块
        .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
        .replace(/`(.*?)`/gim, '<code>$1</code>')
        // 列表
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        .replace(/^[\d]+\. (.*$)/gim, '<li>$1</li>')
        // 分割线
        .replace(/^---$/gim, '<hr>')
        // 段落
        .replace(/\n\n/gim, '</p><p>')
        .replace(/^([\s\S]+)$/gim, '<p>$1</p>');
}

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
            showPostDetail(parseInt(postId));
        });
    });
}

// 显示文章详情
async function showPostDetail(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    currentPostId = postId;
    const content = await loadPostContent(post.file);
    
    document.getElementById('articleTag').textContent = post.tag;
    document.getElementById('articleTitle').textContent = post.title;
    document.getElementById('articleDate').textContent = post.date;
    document.getElementById('articleReadTime').textContent = post.readTime;
    document.getElementById('articleContent').innerHTML = parseMarkdown(content);
    
    // 更新收藏按钮状态
    updateFavoriteButton();
    
    // 加载评论
    renderComments();
    
    // 显示文章详情，隐藏其他内容
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('articleDetail').style.display = 'block';
    window.scrollTo(0, 0);
}

// 返回首页
function showHome() {
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('articleDetail').style.display = 'none';
    document.getElementById('archive').style.display = 'none';
    document.getElementById('favorites').style.display = 'none';
    currentPostId = null;
}

// 显示归档
function showArchive() {
    const archiveList = document.getElementById('archiveList');
    const grouped = {};
    
    posts.forEach(post => {
        const month = post.date.substring(0, 7);
        if (!grouped[month]) grouped[month] = [];
        grouped[month].push(post);
    });
    
    archiveList.innerHTML = Object.entries(grouped)
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([month, monthPosts]) => `
            <div class="archive-group">
                <h3 class="archive-month">${month}</h3>
                ${monthPosts.map(post => `
                    <div class="archive-item" onclick="showPostDetail(${post.id})">
                        <span class="archive-date">${post.date}</span>
                        <span class="archive-title">${post.title}</span>
                    </div>
                `).join('')}
            </div>
        `).join('');
    
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('posts').style.display = 'none';
    document.getElementById('archive').style.display = 'block';
    document.getElementById('favorites').style.display = 'none';
    document.getElementById('articleDetail').style.display = 'none';
}

// 显示收藏
function showFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    const favoritePosts = posts.filter(p => favorites.includes(p.id));
    
    if (favoritePosts.length === 0) {
        favoritesGrid.innerHTML = '<p class="empty-message">还没有收藏任何文章</p>';
    } else {
        favoritesGrid.innerHTML = favoritePosts.map(post => `
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
        
        favoritesGrid.querySelectorAll('.post-card').forEach(card => {
            card.addEventListener('click', () => {
                showPostDetail(parseInt(card.dataset.postId));
            });
        });
    }
    
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('posts').style.display = 'none';
    document.getElementById('archive').style.display = 'none';
    document.getElementById('favorites').style.display = 'block';
    document.getElementById('articleDetail').style.display = 'none';
}

// 收藏功能
function toggleFavorite() {
    if (!currentPostId) return;
    
    const index = favorites.indexOf(currentPostId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(currentPostId);
    }
    
    localStorage.setItem('blog_favorites', JSON.stringify(favorites));
    updateFavoriteButton();
}

function updateFavoriteButton() {
    const btn = document.getElementById('favoriteBtn');
    if (!btn || !currentPostId) return;
    
    const isFavorited = favorites.includes(currentPostId);
    btn.querySelector('.favorite-icon').textContent = isFavorited ? '❤️' : '🤍';
    btn.querySelector('.favorite-text').textContent = isFavorited ? '已收藏' : '收藏';
}

// 搜索功能
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchClose = document.getElementById('searchClose');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        searchInput.focus();
    });
}

if (searchClose) {
    searchClose.addEventListener('click', () => {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
}

if (searchInput) {
    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value.toLowerCase();
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = [];
        for (const post of posts) {
            const content = await loadPostContent(post.file);
            if (post.title.toLowerCase().includes(query) || content.toLowerCase().includes(query)) {
                results.push(post);
            }
        }
        
        searchResults.innerHTML = results.length === 0 
            ? '<p class="search-empty">没有找到相关文章</p>'
            : results.map(post => `
                <div class="search-result-item" onclick="showPostDetail(${post.id}); searchModal.classList.remove('active');">
                    <h4>${post.title}</h4>
                    <p>${post.tag} · ${post.date}</p>
                </div>
            `).join('');
    });
}

// 评论功能
function addComment() {
    const name = document.getElementById('commentName').value.trim();
    const text = document.getElementById('commentText').value.trim();
    
    if (!name || !text || !currentPostId) {
        alert('请填写姓名和评论内容');
        return;
    }
    
    if (!comments[currentPostId]) {
        comments[currentPostId] = [];
    }
    
    comments[currentPostId].push({
        name,
        text,
        date: new Date().toLocaleString('zh-CN')
    });
    
    localStorage.setItem('blog_comments', JSON.stringify(comments));
    
    document.getElementById('commentName').value = '';
    document.getElementById('commentText').value = '';
    
    renderComments();
}

function renderComments() {
    const list = document.getElementById('commentsList');
    if (!currentPostId) return;
    
    const postComments = comments[currentPostId] || [];
    
    if (postComments.length === 0) {
        list.innerHTML = '<p class="empty-message">还没有评论，来写第一条吧！</p>';
        return;
    }
    
    list.innerHTML = postComments.map(c => `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-author">${c.name}</span>
                <span class="comment-date">${c.date}</span>
            </div>
            <p class="comment-text">${c.text}</p>
        </div>
    `).join('');
}

// 按标签筛选
function filterByTag(tag) {
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('posts').style.display = 'block';
    document.getElementById('archive').style.display = 'none';
    document.getElementById('favorites').style.display = 'none';
    document.getElementById('articleDetail').style.display = 'none';
    
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tag === tag) btn.classList.add('active');
    });
    
    const filtered = tag === 'all' ? posts : posts.filter(p => p.tag === tag);
    const postsGrid = document.getElementById('postsGrid');
    
    postsGrid.innerHTML = filtered.map(post => `
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
    
    postsGrid.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', () => {
            showPostDetail(parseInt(card.dataset.postId));
        });
    });
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
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

// 分享功能
function shareTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.getElementById('articleTitle').textContent);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareWeibo() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.getElementById('articleTitle').textContent);
    window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${title}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('链接已复制到剪贴板！');
    });
}

// 字体大小控制
let currentFontSize = 0; // -1: 小, 0: 正常, 1: 大

function changeFontSize(delta) {
    currentFontSize = Math.max(-1, Math.min(1, currentFontSize + delta));
    const content = document.getElementById('articleContent');
    if (content) {
        content.style.fontSize = currentFontSize === -1 ? '14px' : currentFontSize === 1 ? '20px' : '16px';
    }
}

// 返回顶部按钮
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 进度条
const progressBar = document.getElementById('progressBar');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await initPosts();
    renderPosts();
    animateOnScroll();
    
    // 渲染标签过滤器
    const tagsFilter = document.getElementById('tagsFilter');
    const tags = [...new Set(posts.map(p => p.tag))];
    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        btn.dataset.tag = tag;
        btn.textContent = tag;
        btn.onclick = () => filterByTag(tag);
        tagsFilter.appendChild(btn);
    });
    
    console.log('%c🚀 Cool Blog 已加载！', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%c用代码创造世界 ✨', 'color: #ec4899; font-size: 14px;');
});
