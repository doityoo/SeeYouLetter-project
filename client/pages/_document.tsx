import Document, { Head, Main, Html, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='kor'>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="notifications"></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument;