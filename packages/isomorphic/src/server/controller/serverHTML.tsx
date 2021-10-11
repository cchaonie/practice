import React from "react";

export function ServerHTML({ title, content, scripts, styles, helmet }) {
    console.log(helmet)
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                {styles.map(style => style)}
                <title>{title}</title>
            </head>
            <body>
                <div id="root">{content}</div>
                {scripts}
            </body>
        </html>
    );
}
