import { MyStoreContextProvider } from "../store/storeContext";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MyStoreContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MyStoreContextProvider>
  );
}

export default MyApp;
