
import '../styles/globals.scss';
import Layout from '@/components/layouts/index';
import { RecoilRoot} from 'recoil';
import { appWithTranslation } from 'next-i18next';
function App({ Component, pageProps }) {

  
  
  return (
    <RecoilRoot>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </RecoilRoot>
  )
}
export default appWithTranslation(App)