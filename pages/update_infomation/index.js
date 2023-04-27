import PageUser from "@/components/PageUser";
import React, { useState } from "react";
import styles from "@/styles/signin.module.scss";
import { NumberInput, Select, TextInput } from "@mantine/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import img from "@/public/images/navbar/persone.png";
import { DatePickerInput } from "@mantine/dates";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
function index() {
  const { t } = useTranslation("sign");
  const {locale} = useRouter()

  //data
  const [FullName, setFullName] = useState("");
  const [email, setemail] = useState("");
  const [date, setDate] = useState("");
  const [State, setState] = useState("");
  const [Nationality, setNationality] = useState("");
  const [Gender, setGender] = useState("");
  const [National, setNational] = useState("");
  const [Phone, setPhone] = useState("");
  const [Profession, setProfession] = useState("");
  const [Address, setAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  //Error
  const [ErrorFullName, setErrorFullName] = useState("");
  const [ErrorEmail, setErrorEmail] = useState("");
  const [ErrorDate, setErrorDate] = useState("");
  const [ErrorState, setErrorState] = useState("");
  const [ErrorNationality, setErrorNationality] = useState("");
  const [ErrorGender, setErrorGender] = useState("");
  const [ErrorNational, setErrorNational] = useState("");
  const [ErrorPhone, setErrorPhone] = useState("");
  const [ErrorProfession, setErrorProfession] = useState("");
  const [ErrorAddress, setErrorAddress] = useState("");


  //loading
  const [Loading, setLoading] = useState(false);

  const formData = new FormData();
  const handellogin = () => {
    setLoading(true);
    
    formData.append("name", FullName);
    formData.append("email", email);
    formData.append("birth_date", date&&date.toISOString());
    formData.append("gender", Gender);
    formData.append("country", Nationality);
    formData.append("social_status", State);
    formData.append("nid", National);
    formData.append("phone", Phone);
    formData.append("profession", Profession);
    formData.append("address", Address);
    formData.append("img", selectedFile);
    const po = axios
      .post(
        "https://admin.marina.com.eg/api/auth/update", formData,
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("access_token")}`, 
            "Accept": " application/json",
            "Accept-Language": `${locale}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);  
        console.log(res)
      })
      .catch((res) => {
        setLoading(false);
        console.log(res);
        res.response.data.errors.email
          ? setErrorEmail(res.response.data.errors.email[0])
          : setErrorEmail("");
        res.response.data.errors.name
          ? setErrorFullName(res.response.data.errors.name[0])
          : setErrorFullName("");
          res.response.data.errors.gender
          ? setErrorGender(res.response.data.errors.gender[0])
          : setErrorGender("");
          res.response.data.errors.phone
          ? setErrorPhone(res.response.data.errors.phone[0])
          : setErrorPhone("");
      });
  };

  const handleHeaderInputChange = (e) => {
  
    setSelectedFile(e.target.files[0]);
  };
  return (
    <section className={styles.sign}>
      <PageUser>
        <div className=" container mt-[24px] md:mt-[100px] gap-[30px]  mx-auto flex justify-between items-stretch lg:items-center flex-col   xl:flex-row-reverse	">
          <div className="flex  flex-col-reverse xl:flex-col gap-[30px]">
            <div className="">
            <div className={styles.file}>
                  {!selectedFile && (
                    <>
                     <label
                        htmlFor="file-input1"
                        className={styles.file_input_label}
                      >
                       <img src={img.src}   htmlFor="file-input1" className={styles.img2} alt="persone" />
                      </label>
                      
                      <input
                        type="file"
                        id="file-input1"
                        className={styles.file_input}
                        onChange={handleHeaderInputChange}
                      />{" "}
                    </>
                  )}

                  {selectedFile && (
                    <div className="image-preview">
                      <button onClick={() => setSelectedFile("")}>x</button>
                      <img src={URL.createObjectURL(selectedFile)} />
                    </div>
                  )}
                </div>
             
            </div>
            <h1>{t("update")}</h1>
          </div>

          <form className={styles.form3}>
            <div className="mt-6">
              <TextInput label={t("full")} autoComplete="true" error={ErrorFullName} onChange={(e)=>setFullName(e.target.value)} radius="xs" />
            </div>
            <div className="mt-6 ">
              <TextInput label={t("email")} error={ErrorEmail} onChange={(e)=>setemail(e.target.value)} radius="xs" />
            </div>
            <div className="mt-6 datebtn">
              <DatePickerInput
                clearable
                label={t("date")}
                mx="auto"
                maw={"100%"}
                onChange={setDate}
               
              />
            </div>
            <div className="mt-6">
              <Select
                data={[
                  { value: "Married", label: "Married" },
                  { value: "Single", label: "Single" },
                  { value: "Divorced", label: "Divorced" },
                ]}
                label={t("state")}
                variant="unstyled"
                radius="xs"
                onChange={setState}
              />
            </div>
            <div className="mt-6">
              <Select
                data={[
                  { value: "Married", label: "Married" },
                  { value: "Single", label: "Single" },
                  { value: "Divorced", label: "Divorced" },
                ]}
                label={t("nationality")}
                variant="unstyled"
                radius="xs"
                onChange={setNationality}
              />
            </div>
            <div className="mt-6">
              <Select
                data={[
                  { value: "1", label: "Male" },
                  { value: "2", label: "Female" },
                ]}
                label={t("gender")}
                variant="unstyled"
                radius="xs"
                onChange={setGender}
                error={ErrorGender}
              />
            </div>
            <div className="mt-6 ">
              <TextInput label={t("national")} onChange={(e)=> setNational(e.target.value)} radius="xs"  />
            </div>
            <div className="mt-6">
              <TextInput label={t("phone")} error={ErrorPhone} onChange={(e)=>setPhone(e.target.value)} radius="xs" />
            </div>
            <div className="mt-6">
              <TextInput label={t("profession")} onChange={(e)=>setProfession(e.target.value)} radius="xs" />
            </div>
            <div className="mt-6">
              <TextInput label={t("address")} onChange={(e)=>setAddress(e.target.value)} radius="xs" />
            </div>
           
            <button type="submit" onClick={(e)=>{e.preventDefault() ; handellogin()}} className={styles.btnSign}>
              {t("confirm")}
            </button>
          </form>
        </div>
      </PageUser>
    </section>
  );
}

export default index;

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["sign", "common"])),
    },
  };
};
