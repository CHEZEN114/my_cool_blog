# Cool Blog 🚀

一个现代、酷炫的博客网站，用代码创造世界！

## ✨ 新功能

### 📖 Markdown文章系统
- 自动从`posts/`文件夹加载Markdown文件
- 支持标题、列表、代码块、粗体、斜体等常见Markdown语法
- 文章详情页面，支持完整的文章阅读体验

### ❤️ 收藏功能
- 点击收藏按钮收藏喜欢的文章
- 收藏状态保存在localStorage，刷新后依然存在
- 在"收藏"页面查看所有收藏的文章

### 🔍 搜索功能
- 实时搜索文章标题和内容
- 点击搜索按钮打开搜索框
- 搜索结果实时显示，点击即可跳转

### 💬 评论系统
- 每篇文章都支持评论功能
- 评论保存在localStorage
- 显示评论者姓名、内容和时间

### 📂 文章归档
- 按月份归档文章
- 快速浏览所有文章

### 🎨 其他功能
- **主题切换**: 深色/浅色模式
- **字体大小控制**: A-/A/A+ 三种字体大小
- **分享功能**: 支持Twitter、微博分享和复制链接
- **阅读进度条**: 页面顶部显示阅读进度
- **返回顶部**: 快速返回页面顶部
- **标签筛选**: 按技术标签筛选文章

## 🎨 设计特性

- 🌓 **现代设计** - 深色模式、渐变色彩、流畅动画
- 🎨 **主题切换** - 支持深色/浅色主题
- 📱 **响应式布局** - 完美适配各种设备
- ⚡ **高性能** - 纯原生 HTML/CSS/JS，无依赖
- ✨ **交互动画** - 滚动动画、悬停效果、平滑过渡

## 🛠️ 技术栈

- **HTML5** - 语义化标签
- **CSS3** - CSS 变量、Flexbox、Grid、动画
- **JavaScript** - 原生 ES6+，无框架
- **LocalStorage** - 本地数据持久化

## 🚀 快速开始

1. 克隆这个仓库
```bash
git clone https://github.com/CHEZEN114/my_cool_blog.git
```

2. 使用本地服务器运行（推荐使用 VS Code Live Server 插件或 Python SimpleHTTPServer）
```bash
# 使用 Python 3
python -m http.server 8000

# 或使用 Node.js
npx serve
```

3. 打开浏览器访问 `http://localhost:8000`

4. 开始探索！

## 📁 项目结构

```
my_cool_blog/
├── index.html          # 主页
├── styles.css          # 样式文件
├── script.js           # 交互逻辑
├── posts/              # 文章文件夹
│   ├── css-animation-guide.md
│   ├── modern-js-practices.md
│   └── sample-post.md
├── assets/             # 资源文件夹
└── README.md           # 项目说明
```

## 📝 添加新文章

1. 在 `posts/` 文件夹创建新的 `.md` 文件
2. 在 `script.js` 的 `initPosts()` 函数中添加文章信息：
```javascript
{ file: 'your-post.md', tag: '分类', title: '文章标题', date: '2024-01-20' }
```
3. 刷新页面即可看到新文章！

## 🎨 自定义样式

- 在 `styles.css` 中调整 CSS 变量来改变配色方案
- 修改 `index.html` 中的内容来个性化你的博客

## 🌟 功能演示

- 🏠 **首页** - 震撼的欢迎界面和文章网格
- 📖 **文章详情** - 点击文章卡片查看完整内容
- 🔖 **收藏文章** - 点击❤️收藏喜欢的文章
- 🔍 **搜索文章** - 快速搜索标题和内容
- 💬 **发表评论** - 为文章添加你的想法
- 📅 **文章归档** - 按时间浏览所有文章

## 📄 License

MIT License - 自由使用，尽情创造！

---

用 ❤️ 和代码构建
