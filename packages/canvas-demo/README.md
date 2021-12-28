# Canvas

## API
1. HTMLCanvasElement
    - height
    - width
    - `getContext(<contextType>, [contextAttribute])` 返回上下文对象
        - contextType
            - "2d" => CanvasRenderingContext2D
            - "webgl" / "experimental-webgl" => WebGLRenderingContext
            - "webgl2" => WebGL2RenderingContext
            - "bitmaprenderer" => ImageBitmapRenderingContext
        - contextAttribute
            - "2d"
                ```js
                    {
                        alpha: boolean;
                        desynchronized: boolean
                    }
                ```
            - "webgl"
                ```js
                    {
                        alpha: boolean;
                        desynchronized: boolean;
                        antialias: boolean;
                        depth: boolean;
                        failIfMajorPerformanceCaveat: boolean;
                        powerPreference: "default" | "high-performance" | "low-power";
                        permultipliedAlpha: boolean;
                        preserveDrawingBuffer: boolean;
                        stencil: boolean;
                    }
                ```
    - `toDataUrl([mimeType][, encoderOPtions])` 返回base64图片
        - mimetype, 默认image/png
        - encodeOptions, 0-1之间的数，标识图片质量
2. CanvasRenderingContext2D
    - rectangles
        - `fillRect(x, y, width, height)`;
        - `strokeRect(x, y, width, height)`;
        - `clearRect(x, y, width, height)`;
    - path
        - 画笔相关
            - `beginPath()`;
            - `moveTo(x, y)`;
            - `endPath()`;
            - `fill()`;
            - `stroke()`;
        - 图形相关
            - 线段
                - `lineTo(x, y)`;
            - 弧线
                - `arc(x, y, radius, startAngle, endAngle, anticlockwise)`;
                - `arcTo(x1, y1, x2, y2, radius)`;
            - 贝塞尔曲线
                - `quadraticCurveTo(cp1x, cp1y, x, y)`;
                - `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`;
    - 颜色
        - `fillStyle: <color>`
        - `strokeStyle: <color>`
        - `globalAlpha: <0.0 ~ 1.0>`
    - 渐变 CanvasGradient
        - 创建渐变对象
            - `createLinearGradient(x1, y1, x2, y2)`
            - `createRadialGradient(x1, y1, r1, x2, y2, r2)`
        - 为渐变对象添加颜色
            - `gradient.addColorStop(position: <0.0 ~ 1.0>, color: <color>)`
    - Pattern
        - `createPattern(image: CanvasImageSource, type: "repeat" | "repeat-x" | "repeat-y" | "no-repeat")`
    - Shadow
        - `shadowOffsetX: <float>`
        - `shadowOffsetY: <float>`
        - `shadowBlur: <float>`
        - `shadowColor: <color>`
    - Line Style
        - `lineWidth: <number>`
        - `lineCap: butt | round | square`
        - `lineJoin: round | bevel | miter`
        - `miterLimit: <number>`
        - `lineDashOffset: <number>`
        - `get/setLineDash()`
    - text
        - `fillText(text, x, y [, maxWidth])`
        - `strokeText(text, x, y [, maxWidth])`
        - `font: <font>`
        - `textAlign: "start" | "end" | "left" | "right" | "center"`
        - `textBaseline: "alphabetic" | "top" | "middle" | "bottom" | "ideographic"`
        - `direction: "ltr" | "rtl" | "inherit"`
        - `measureText(text: string)`
    - image
        - `drawImage(image: CanvasImageSource, x, y)`
        - 缩放：`drawImage(image: CanvasImageSource, x, y, width, height)`
        - 剪切+缩放：`drawImage(image, sx,sy,swidth,sheight, dx, dy, dwidth, dheight)`
        - `imageSmoothingEnabled: boolean`
    - context的状态保存和恢复
        - `save()`
        - `restore()`
    - transformations
        - `translate(x, y)`
        - `rotate(angle)`, angle是弧度
        - `scale(x, y)`
    
    - 组合：相同位置的元素如何堆叠
        - `globalCompositeOperation: string`
    - 剪切：路径以外的内容不显示
        - `clip()` 
