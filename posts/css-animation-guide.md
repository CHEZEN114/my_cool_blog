# CSS 动画的艺术：从基础到高级

欢迎来到这篇关于 CSS 动画的深度指南！

## 为什么 CSS 动画很重要？

在现代网页设计中，动画不仅仅是装饰，它是用户体验的核心部分。

## 基础：过渡动画

```css
.element {
    transition: all 0.3s ease;
}
```

## 进阶：关键帧动画

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

## 性能优化建议

1. 优先使用 transform 和 opacity
2. 避免动画 layout 属性
3. 使用 will-change 提示浏览器

---

*感谢阅读！继续探索，继续创造！* 🚀
