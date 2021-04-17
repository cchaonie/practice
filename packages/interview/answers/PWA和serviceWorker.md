## 概念
pwa是指使用一定的技术和标准来开发的web应用。一个pwa应用一般具有以下特点：

1. **Discoverable**，应用的内容能够被搜索引擎发现。
2. **Installable**，应用能够被添加到主屏幕
3. **Linkable**，应用能够通过URL分享
4. **Network independent**，应用能够在网络环境差或者断网的环境下运行
5. **Progressive**，应用在老的浏览器上也能正常运行
6. **Re-engageable**，无论何时有新的内容应用都能发送通知
7. **Responsive**，应用应该是响应式的，在各种尺寸的设备上都能正常使用
8. **Safe**，应用与用户之间的连接必须是安全的，能够阻止第三方访问敏感数据

## Service workers 和caches
Service Workers是浏览器和网络之间的虚拟代理，使用步骤如下：

* 注册service worker——navigator.serviceWorker.register(pathToScript)


```js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pwa-examples/js13kpwa/sw.js');
};
```

* 安装——install事件


```js
self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
});
```
* 激活——active事件

* 拦截请求——fetch事件

## add to home screen
### 前提条件

1. .webmanifest文件，并配置合适的字段
    1. <link rel="manifest" href="mywebmanifest.webmanifest">
    2. 必须提供name属性
    3. icons是一个数组<src/sizes/type>，至少需要提供一个尺寸的icon

```json

{
    "name": "Progressive Web App",
    "short_name": "PWA",
    "description": "Progressive Web App.",
    "icons": [
        {
            "src": "icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "start_url": "/index.html",
    "display": "fullscreen",
    "theme_color": "#B12A34",
    "background_color": "#B12A34"
}
```
2. 通过https访问的域名
3. 一个icon，用来在主屏幕上访问
4. 一个已经注册了的Service worker，确保应用能离线应用

## Notification 和 Push




