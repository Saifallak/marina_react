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

  const formData = new FormData();
  const handellogin = () => {
    formData.append("name", FullName);
    formData.append("telephone_number", Phone);
    formData.append("description", Description);
    formData.append("unit_number", Unit);
    formData.append("image", selectedFile);
    const po = axios
      .post("https://admin.marina.com.eg/api/complaint", formData, {
        headers: {
          Accept: " application/json",
        },
      })
      .then((res) => {
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
                for improve service
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
                <label className={[styles.arabic + " cursor-pointer "]}>
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
            <input
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handellogin();
              }}
            />
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
