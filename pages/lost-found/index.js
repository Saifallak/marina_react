import Head from "next/head";
import styles from "@/styles/information.module.scss";
import { Button, Container} from "@mantine/core";
import Link from "next/link";
import Navbar from "../../components/layouts/Navbar/index";
import img from "@/public/images/lostFound.jpg";
import img2 from "@/public/images/lostLogo.svg";
import img3 from "@/public/images/losticon.svg";
import icon from '../../public/Icon.png'
import Logo from "../../public/images/navbar/logo.svg";
import Image from "next/image";
export default function Home() {


 
  return (
    <>
      <Head>
        <title>Marina</title>
        <meta name="description" content="Marina" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon.src} />
       
      </Head>
      <Navbar />
        <section className={styles.home}>
              <img
                className={ " loaded"}
                src={img.src}
                alt="sea beach"
                width={100}
                height={100}
                style={{ minHeight: "44vh", height: "100%",width:"100%" }}
              />
            

          <Container className={styles.home__container} fluid px={20} >
            <div className={styles.home__title}>
              <img  src={img2.src} alt="lostfound" className="md:max-w-[170px]  sm:max-w-[100px] max-w-[80px] "/>
              <h1 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-[100px] lg:leading-[100px]  !important" >
              Lost <br/> & Found
              </h1>
             
              <Link href={"/whereToGo"}>
                <Button uppercase className={styles.header__btn}>
              Find out what's missing
                </Button>
              </Link>
            </div>
          </Container>
        </section>
        <section className="container" style={{margin:"auto"}}>
        <div  className={styles.information}>
          <img   src={img3.src} alt="logoLostFound"  className="md:max-w-[230px]   max-w-[150px] mx-[auto] md:mb-[52px] mb-[30px]"/>
    <form>
        
        <div  className={styles.part}>
        <label>Name</label>
        <input type="text"  />
        <label className={styles.arabic}>الاسم</label>
        </div>
        <div  className={styles.part}>
        <label>unit Number</label>
        <input type="number"  />
        <label className={styles.arabic}>رقم الوحده</label>
        </div>
        <div  className={styles.part}>
        <label>Telephone Number</label>
        <input type="number"  />
        <label className={styles.arabic}>رقم التليفون</label>
        </div>
        <div  className={styles.part}>
        <label>Description</label>
      <textarea></textarea>
        <label className={styles.arabic}>التفاصيل</label>
        </div>
      
       
    </form>
    <div  className={styles.more}>
        <h3> for more details</h3>
    
        <div className={styles.all_btn}>
            <button>upload attachments</button>
            <button className={styles.arabic}> تحميل المرفقات</button>
        </div>
    </div>

</div>
        </section>


        <section className={styles.footer}>
          <Link className={styles.footer_logo} href="/">
            <Image src={Logo} alt="logo"></Image>
          </Link>
       
        </section>
    </>
  );
}


