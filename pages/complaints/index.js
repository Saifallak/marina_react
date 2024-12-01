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
import Navbar from "../../components/layouts/Navbar/index";
import img from "@/public/images/complaints.jpg";
import img2 from "@/public/images/complaintsicon.svg";
import img3 from "@/public/images/complaintsLogo.svg";
import icon from "../../public/Icon.png";
import Logo from "../../public/images/navbar/logo.png";
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

  // Submission status
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formData = new FormData();

  const handleLogin = () => {
    formData.append("name", FullName);
    formData.append("telephone_number", Phone);
    formData.append("description", Description);
    formData.append("unit_number", Unit);
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

            <div class="form-part ml-0 xl:ml-[350px] lg:ml-[100px]">
              <div class="form-labels">
                <label>Milestones</label>
              </div>
                <div class="checkbox-group" style={{display: 'grid', gridTemplateColumns: "1fr 1fr", gap: "15px"}}>
                  <div class="checkbox-item">
                    <input type="checkbox" id="agriculture" name="agriculture" value="agriculture" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="agriculture">الزراعة</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="plumber" name="plumber" value="plumber" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="plumber">سباك</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="cleanliness" name="cleanliness" value="cleanliness" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="cleanliness">النظافة</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="NetworkTechnician" name="NetworkTechnician" value="NetworkTechnician" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="NetworkTechnician">فني شبكات</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="projects" name="projects" value="projects" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="projects">مشروعات</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="carpenter" name="carpenter" value="carpenter" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="carpenter">نجار</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="electricity" name="electricity" value="electricity" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="electricity">كهرباء</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="Spraying" name="Spraying" value="Spraying" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="Spraying">رش المبيدات</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="Sanitation" name="Sanitation" value="Sanitation" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="Sanitation">صرف صحي</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="beaches" name="beaches" value="beaches" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="beaches">شواطئ</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="security" name="security" value="security" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="security">الأمن</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="central" name="central" value="central" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="central">الدش المركزي</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="device" name="device" value="device" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="device">البوتاجاز الجهاز</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="financialInquiries" name="financialInquiries" value="financialInquiries" style={{width:"20px" , height:"20px" , marginRight:'10px'}} />
                    <label for="financialInquiries">استفسارات مالية</label>
                  </div>
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
                <label className={[styles.arabic + " cursor-pointer "]} style={{display:'block',width:'310px' , height:'65px'}}>
                  تحميل المرفقات{" "}
                </label>
                <input
                  type="file"
                  className=" absolute top-0 left-0 w-[100%] opacity-0 cursor-pointer"
                  onChange={handleHeaderInputChange}
                />{" "}
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
