import Head from "next/head";
import styles from "@/styles/information.module.scss";
import { Button, Container, NumberInput, TextInput, Textarea} from "@mantine/core";
import Link from "next/link";
import Navbar from "../../components/layouts/Navbar/index";
import img from "@/public/images/lostFound.jpg";
import img2 from "@/public/images/lostLogo.svg";
import img3 from "@/public/images/losticon.svg";
import icon from '../../public/Icon.png'
import Logo from "../../public/images/navbar/logo.svg";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
export default function Home() {

  //data
  const [FullName, setFullName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Description, setDescription] = useState("");
  const [Unit, setUnit] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  //Error
  const [ErrorFullName, setErrorFullName] = useState("");
  const [ErrorPhone, setErrorPhone] = useState("");
  const [ErrorDescription, setErrorDescription] = useState("");
  const [ErrorUnit, setErrorUnit] = useState("");


  const formData = new FormData();
  const handellogin = () => {
    formData.append("name", FullName);
    formData.append("telephone_number", Phone);
    formData.append("description", Description);
    formData.append("unit_number", Unit);
    formData.append("image", selectedFile);
    const po = axios
      .post(
        "https://admin.marina.com.eg/api/lost_and_found", formData,
        {
          headers: {
            "Accept": " application/json",
          },
        }
      )
      .then((res) => {
        setFullName("")
        setPhone("")
        setDescription("")
        setUnit("")
        setSelectedFile(null)

        setErrorFullName("")
        setErrorPhone("")
        setErrorDescription("")
        setErrorUnit("")
        
      })
      .catch((res) => {
        res.response.data.errors.name
        ? setErrorFullName(res.response.data.errors.name[0])
        : setErrorFullName("");
         res.response.data.errors.description
        ? setErrorDescription(res.response.data.errors.description[0])
        : setErrorDescription("");
         res.response.data.errors.unit_number
        ? setErrorUnit(res.response.data.errors.unit_number[0])
        : setErrorUnit("");
        res.response.data.errors.telephone_number
        ? setErrorPhone(res.response.data.errors.telephone_number[0])
        : setErrorPhone("");
      });
  };

  const handleHeaderInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
 
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
        <TextInput error={ErrorFullName} value={FullName} type="text" onChange={(e)=>{setFullName(e.target.value)}} />
        <label className={styles.arabic}>الاسم</label>
        </div>
        <div  className={styles.part}>
        <label>Unit Number</label>
        <NumberInput type="number" value={Unit} error={ErrorUnit}   onChange={setUnit} hideControls/>
        <label className={styles.arabic}>رقم الوحده</label>
        </div>
        <div  className={styles.part}>
        <label>Telephone Number</label>
        <TextInput type="number" error={ErrorPhone} value={Phone}  onChange={(e)=>{setPhone(e.target.value)}}  />
        <label className={styles.arabic}>رقم التليفون</label>
        </div>
        <div  className={styles.part}>
        <label>Description</label>
      <Textarea onChange={(e)=>setDescription(e.target.value)} value={Description} error={ErrorDescription}/>
        <label className={styles.arabic}>التفاصيل</label>
        </div>
      
       
    </form>
    <div  className={styles.more}>
        <h3> for more details</h3>
    
        <div className={styles.all_btn}        id="file-input1">
         
          <div className="relative cursor-pointer">
            <label className=" cursor-pointer ">Upload Attachments </label>
          <input
                        type="file"
                        
                        className="absolute top-0 left-0 w-[100%] opacity-0 cursor-pointer"
                        onChange={handleHeaderInputChange}
                      />{" "}
          </div>
          <div className="relative cursor-pointer">
            <label className={[styles.arabic +  ' cursor-pointer ']}>تحميل المرفقات </label>
          <input
                        type="file"
                        
                        className=" absolute top-0 left-0 w-[100%] opacity-0 cursor-pointer"
                        onChange={handleHeaderInputChange}
                      />{" "}
          </div>
       
            <input type="file" className={[styles.arabic," absolute top-0 left-0 w-[100%] opacity-0 cursor-pointer"]} />
        </div>
        <input type="submit" onClick={(e)=>{e.preventDefault() ; handellogin()}} />
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


