import { useRouter } from "next/router";
import Footer from "@/components/layouts/Footer/Index";

const Index = (props) => {
  const router = useRouter();

  return (
    <div className={router.locale === "ar" ? "rtl" : "ltr"}>
      {props.children}
      <Footer></Footer>
    </div>
  );
};

export default Index;
