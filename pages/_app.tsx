import '../styles/globals.css'
import 'antd/dist/antd.css';
import LayoutContainer from '../components/LayoutContainer';
function MyApp({ Component, pageProps }) {
  return (
    <LayoutContainer>
      <Component {...pageProps} />
    </LayoutContainer>
  )
}

export default MyApp
