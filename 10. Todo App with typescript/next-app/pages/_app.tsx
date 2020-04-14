import App, { AppContext, AppProps, AppInitialProps } from "next/app";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import Footer from "../components/Footer";

const MyApp = ({
  Component,
  router,
  pageProps,
}: AppProps & AppInitialProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer pathname={router.pathname} />
    </>
  );
};

export default MyApp;
