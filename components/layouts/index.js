import { useRouter } from 'next/router';
import Navbar from './Navbar';

const Index = (props) => {
  const router = useRouter();
 
 
  return (
    <div className={router.locale === 'ar' ? 'rtl' : "ltr"}>
      <Navbar />
      {props.children}
    </div>
  );
};

export default Index;
