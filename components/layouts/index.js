import { useRouter } from "next/router";
const Index = (props) => {
  const router = useRouter();

  return (
    <div className={router.locale === "ar" ? "rtl" : "ltr"}>
      {props.children}
    </div>
  );
};

export default Index;
