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
            width: 375px;
            height: 812px;
            margin: auto;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
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
