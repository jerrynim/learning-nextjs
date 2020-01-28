import App, { AppContext, AppProps, AppInitialProps } from "next/app";
import Header from "../components/Header";

const MyApp = ({ Component, pageProps }: AppProps & AppInitialProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            margin: 0;
            margin: auto;
            font-family: Noto Sans, Noto Sans KR;
          }
        `}
      </style>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
export default MyApp;
