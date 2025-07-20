import { Html, Head, Main, NextScript } from "next/document";

// _document.tsx 파일에는 글로벌로 적용되는 HTML 구조를 정의합니다.
export default function Document() {
  return (
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
