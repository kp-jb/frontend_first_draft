import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Monofett&display=swap" rel="stylesheet"/>
      </Head>
      <body className="min-h-screen bg-cover bg-corona-fore-typewriter">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
