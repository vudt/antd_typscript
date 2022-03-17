import '../styles/globals.css'
import 'antd/dist/antd.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import LayoutContainer from '../components/LayoutContainer';
import LayoutLogin from '../components/LayoutLogin';

const layouts = {
  Login: LayoutLogin,
  Dashboard: LayoutContainer
};

function MyApp({ Component, pageProps }) {
  // const l_name = Component.layout 
  const Layout = layouts[pageProps.layout] || ((children: any) => <>{children}</>)
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
