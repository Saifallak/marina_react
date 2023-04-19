
import '../styles/globals.scss';
import Layout from '@/components/layouts/index';
import { RecoilRoot} from 'recoil';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import Router from 'next/router';
import Loading from '../components/Loading';
function App({ Component, pageProps }) {
  useEffect(() => {
    const handleStart = () => {
      console.log('App is loading');
    };

    const handleComplete = () => {
      console.log('App is done loading');
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);
  
  
  return (
    <RecoilRoot>
        <Loading />
     
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </RecoilRoot>
  )
}
export default appWithTranslation(App)