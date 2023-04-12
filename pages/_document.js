import { Html, Head, Main, NextScript } from "next/document";
import { useRouter } from "next/router";

export default function Document(props) {

  const router = useRouter;
  const locale = props.__NEXT_DATA__.locale;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <Html dir={dir} lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
