import { useEffect, useRef } from "react";

interface StickyConfig {
    keepWidthWhenResize?: boolean;
    boxSizing?: "border-box" | "content-box";
    direction?: "top" | "right" | "bottom" | "left";
    distance?: number;
}

interface InitialPosition {
    top: number;
    left: number;
    right: number;
    width: number;
}

const removePX = (str: string): number => {
    return Number.parseFloat(str.substring(0, str.length - 2));
};

export function useSticky(config?: StickyConfig) {
    const { keepWidthWhenResize = false, boxSizing, direction, distance } = config;
    const elRef = useRef<HTMLDivElement>(null);
    const initialPositionRef = useRef<InitialPosition>({
        top: 0,
        left: 0,
        right: 0,
        width: 0,
    });
    useEffect(() => {
        const $body = document.documentElement;
        if (elRef.current) {
            const $el = elRef.current;
            const elComputedStyle = getComputedStyle($el);
            const { top: elTop, left: elLeft, right: elRight, width: elWidth } = $el.getBoundingClientRect();
            const { scrollLeft: bodyScrollLeft, scrollTop: bodyScrollTop, clientWidth: bodyClientWidth } = $body;
            console.log(elTop, elWidth, elLeft);

            const {
                marginLeft,
                marginRight,
                borderLeftWidth,
                borderRightWidth,
                paddingLeft,
                paddingRight,
            } = elComputedStyle;
            initialPositionRef.current.left = elLeft + bodyScrollLeft;
            initialPositionRef.current.top = elTop + bodyScrollTop;
            initialPositionRef.current.right = bodyClientWidth - elRight;
            const initialWidth =
                elWidth -
                removePX(marginLeft) -
                removePX(marginRight) -
                removePX(borderLeftWidth) -
                removePX(borderRightWidth) -
                removePX(paddingLeft) -
                removePX(paddingRight);
            initialPositionRef.current.width = initialWidth;

            if (elTop <= 0) {
                const elStyle = $el.style;
                elStyle.position = "fixed";
                elStyle.top = "0";
                elStyle.width = `${initialWidth}px`;
            }
        }

        const scrollHandler = () => {
            const { scrollTop: bodyCurrentScrollTop } = $body;
            const initialPosition = initialPositionRef.current;
            if (elRef.current) {
                if (bodyCurrentScrollTop > initialPosition.top) {
                    const node = elRef.current;
                    const nodeStyle = node.style;
                    nodeStyle.position = "fixed";
                    nodeStyle.top = "0";
                    nodeStyle.width = `${initialPosition.width}px`;
                } else {
                    const node = elRef.current;
                    const nodeStyle = node.style;
                    nodeStyle.position = "static";
                    nodeStyle.top = "";
                    nodeStyle.width = "";
                }
            }
        };

        const resizeHandler = () => {
            if (elRef.current) {
                const elComputedStyle = getComputedStyle(elRef.current);
                const { clientWidth } = $body;
                const {
                    marginLeft,
                    marginRight,
                    borderLeftWidth,
                    borderRightWidth,
                    paddingLeft,
                    paddingRight,
                } = elComputedStyle;

                const newWidth =
                    clientWidth -
                    initialPositionRef.current.left -
                    initialPositionRef.current.right -
                    removePX(marginLeft) -
                    removePX(marginRight) -
                    removePX(borderLeftWidth) -
                    removePX(borderRightWidth) -
                    removePX(paddingLeft) -
                    removePX(paddingRight);
                if (!keepWidthWhenResize) {
                    elRef.current.style.width = `${newWidth}px`;
                    initialPositionRef.current.width = newWidth;
                }
            }
        };

        window.addEventListener("scroll", scrollHandler);
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler);
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);
    return elRef;
}
