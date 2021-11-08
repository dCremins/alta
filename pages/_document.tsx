
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx:DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;300;400;600;700&display=swap" rel="stylesheet" />
          <link
            rel="preload"
            href="/fonts/AracneCondensedRegular/ARACNE-CONDENSED_regular.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/AracneCondensedRegular/ARACNE-CONDENSED_regular_italic.ttf"
            as="font"
            crossOrigin=""
          />
          {/* General Images */}
          <link rel="preload" as="image" href="/bg_generic.jpeg" />
          <link rel="preload" as="image" href="/bg_news.jpeg" />
          <link rel="preload" as="image" href="/header.svg" />
          <link rel="preload" as="image" href="/item_header.svg" />
          <link rel="preload" as="image" href="/item_header_reverse.svg" />
          <link rel="preload" as="image" href="/dividers/top_center.svg" />
          <link rel="preload" as="image" href="/dividers/top_left.svg" />
          <link rel="preload" as="image" href="/dividers/top_right.svg" />
          {/* Authors */}
          <link rel="preload" as="image" href="/authors/boramy.png" />
          <link rel="preload" as="image" href="/authors/joel.png" />
          <link rel="preload" as="image" href="/authors/serena.png" />
          <link rel="preload" as="image" href="/authors/timo.png" />
          <link rel="preload" as="image" href="/authors/victor.png" />
          {/* Preview Images */}
          <link rel="preload" as="image" href="/preview/quest_ship_tale_thumbnail_1280_720.jpeg" />
          <link rel="preload" as="image" href="/preview/launch_post_image_quest.jpeg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument