import Head from "next/head";
import styles from "@/styles/information.module.scss";
import {
  Button,
  Container,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "../../components/layouts/Navbar/index";
import img from "@/public/images/complaints.jpg";
import img2 from "@/public/images/complaintsicon.svg";
import img3 from "@/public/images/complaintsLogo.svg";
import icon from "../../public/Icon.png";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Logo from "../../public/images/navbar/logo.png";
import Image from "next/image";
import { useState , useEffect } from "react";
import axios from "axios";
import { getMessgaeTypes } from "@/components/useApi/dataApi";
export default function Home() {
  const { t } = useTranslation("home");
  const { locale } = useRouter();
  //data
  const [FullName, setFullName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Description, setDescription] = useState("");
  const [Unit, setUnit] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [complaintIds, setCompliantIds] = useState([]);
  //Error
  const [ErrorFullName, setErrorFullName] = useState("");
  const [ErrorPhone, setErrorPhone] = useState("");
  const [ErrorDescription, setErrorDescription] = useState("");
  const [ErrorUnit, setErrorUnit] = useState("");

  // Submission status
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formData = new FormData();

  const handleLogin = () => {
    formData.append("name", FullName);
    formData.append("telephone_number", Phone);
    formData.append("description", Description);
    formData.append("unit_number", Unit);
    formData.append("complaint_type_ids[]", complaintIds);
    formData.append("image", selectedFile);

    setSubmitting(true);
    const po = axios
    .post("https://admin.marina.com.eg/api/complaint", formData, {
      headers: {
        Accept: " application/json",
      },
    })
      .then((res) => {
        setSubmitSuccess(true);
        setFullName("");
        setPhone("");
        setDescription("");
        setUnit("");
        setSelectedFile(null);

        setErrorFullName("");
        setErrorPhone("");
        setErrorDescription("");
        setErrorUnit("");
      })
      .catch((error) => {
        if (error.response) {
          setErrorFullName(error.response.data.errors.name?.[0] || "");
          setErrorDescription(error.response.data.errors.description?.[0] || "");
          setErrorUnit(error.response.data.errors.unit_number?.[0] || "");
          setErrorPhone(error.response.data.errors.telephone_number?.[0] || "");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleHeaderInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFileSelected(true);
  };

  const [messageTypes, setMessageTypes] = useState([]);
  const fetchMessageTypes = async () => {
    const data = await getMessgaeTypes()
    setMessageTypes(data.data)
  }
  useEffect(() => {
    fetchMessageTypes();
  }, []);  

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
          className={" loaded"}
          src={img.src}
          alt="sea beach"
          width={100}
          height={100}
          style={{ minHeight: "44vh", height: "100%", width: "100%" }}
        />

        <Container className={styles.home__container} fluid px={20}>
          <div className={styles.home__title}>
            <img
              src={img2.src}
              alt="lostfound"
              className="md:max-w-[170px]  sm:max-w-[100px] max-w-[80px] "
            />
            <h1 className="mt-4 text-2xl leading-tight sm:text-4xl lg:text-6xl">
              complaints <br /> & suggestions
            </h1>

            <Link href={"#improveService"}>
              <Button uppercase className={styles.header__btn}>
                To improve service
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      <section id="improveService" className="container" style={{ margin: "auto" }}>
        <div className={styles.information}>
          <img
            src={img3.src}
            alt="logoLostFound"
            className="md:max-w-[230px]   max-w-[150px] mx-[auto] md:mb-[52px] mb-[30px]"
          />
          <form>
            <div className={styles.part}>
              <div className=" flex justify-between gap-3 mb-3 w-[100%] max-w-[800px] mx-auto">
                <label>Name</label>
                <label className={styles.arabic}>الاسم</label>
              </div>
              <TextInput
                error={ErrorFullName}
                value={FullName}
                type="text"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </div>
            <div className={styles.part}>
              <div className=" flex justify-between gap-3 mb-3 w-[100%] max-w-[800px] mx-auto">
                <label>Unit Number</label>
                <label className={styles.arabic}>رقم الوحده</label>
              </div>
              <NumberInput
                type="number"
                error={ErrorUnit}
                value={Unit}
                onChange={setUnit}
                hideControls
              />
            </div>
            <div className={styles.part}>
              <div className=" flex justify-between gap-3 mb-3 w-[100%] max-w-[800px] mx-auto">
                <label>Telephone Number</label>
                <label className={styles.arabic}>رقم التليفون</label>
              </div>
              <TextInput
                type="number"
                error={ErrorPhone}
                value={Phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>

            <div className="form-part flex flex-col justify-between gap-3 mb-3 w-[100%] max-w-[800px] mx-auto"  dir={locale === "ar" ? "rtl" : "ltr"}>
              <div className="form-labels">
                <label className="mb-3">{t("problemType")}</label>
              </div>
              <div className="checkbox-group" style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                {messageTypes.map((type, index) => (
                  <div className="checkbox-item" key={index}>
                    <input 
                      type="checkbox" 
                      id={type.name[locale]} 
                      name={type.name[locale]} 
                      className="!size-5 !mx-[10px]"
                      onChange={() => setCompliantIds(prev => 
                        prev.includes(type.id) 
                          ? prev.filter(t => t !== type.id) 
                          : [...prev, type.id]
                      )}
                      />
                    <label htmlFor={type.name[locale]}>{type.name[locale]}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.part}>
              <div className=" flex justify-between gap-3 mb-3 w-[100%] max-w-[800px] mx-auto">
                <label>Description</label>
                <label className={styles.arabic}>التفاصيل</label>
              </div>
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                value={Description}
                error={ErrorDescription}
              />
            </div>

          </form>
          <div className={styles.more}>
            <h3> for more details</h3>

            <div className={styles.all_btn} id="file-input1">
              <div className="relative cursor-pointer">
                <label className=" cursor-pointer ">Upload Attachments </label>
                <input
                  type="file"
                  className="absolute top-0 left-0 w-[100%] opacity-0 cursor-pointer"
                  onChange={handleHeaderInputChange}
                />{" "}
              </div>
              <div className="relative cursor-pointer">
      <label
        className={`${
          isFileSelected ? 'bg-green-200' : 'bg-transparent'
        } cursor-pointer block w-[310px] h-[65px] text-center flex items-center justify-center`}
      >
        {isFileSelected ? (
          <span>تم اختيار الملف</span> // Indication text when file is selected
        ) : (
          'تحميل المرفقات'
        )}
      </label>
      <input
        type="file"
        className="absolute top-0 left-0 w-[100%] opacity-0 cursor-pointer"
        onChange={handleHeaderInputChange}
      />
    </div>
              <input
                type="file"
                className={[
                  styles.arabic,
                  " absolute top-0 left-0 w-[100%] opacity-0 cursor-pointer",
                ]}
              />
              </div>

            <div style={{display:'flex',justifyContent:'center'}}>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="mt-4"
                style={{backgroundColor:'black', width:'310px',height:'55px', borderRadius:'12px',fontSize:'26px',fontWeight:'900'}}
              >
                Submit
              </Button>
            </div>

          </div>
          {submitSuccess && (
            <p className="text-green-500 mt-4 flex justify-center">
              Your complaint has been submitted successfully!
            </p>
          )}
          {submitting && !submitSuccess && (
            <p className="text-blue-500 mt-4 flex justify-center">
              Submitting your complaint...
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["home", "common"])),
    },
  };
}
