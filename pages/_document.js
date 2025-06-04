import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="canonical" href={`http://localhost:3000/`} />
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="author" content="Your Name" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
