# 浏览器渲染原理

## 从输入一段 URL 到页面呈现，中间发生了哪些事情

1. DNS 查询
2. TCP 连接
3. HTTPS
4. 请求
5. 响应
6. parse html --> DOM
7. parse css --> CSSOM
8. layout
9. paint
10. composite 将绘制在不同层的UI按照正确的方式绘制到屏幕上
