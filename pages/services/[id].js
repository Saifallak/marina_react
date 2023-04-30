import React, { useState } from 'react'
import styles from '@/styles/services.module.scss'
import PageUser from '@/components/PageUser'
import { Loader, NumberInput, Select, Textarea } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

function index({data}) {
  const { t } = useTranslation("services");
    const {locale ,query,push} = useRouter()
    const [value, setValue] = useState(new Date());
    const [valueSelect, setValueSelect] = useState(+query.id);
    const [message, setMessage] = useState("");
    const [Errormessage, setErrorMessage] = useState("");
    const [ErrorDate, setErrorDate] = useState("");

    const [urgency, setUrgency] = useState("");
    const [ErrorUrgency, setErrorUrgency] = useState("");
    const [Errorservice, setErrorservice] = useState("");
    const [Loading, setLoading] = useState(false);
    const ArraySelect =[]
    data.map((item)=> ArraySelect.push({value: item.id, label: item.name[locale]}))
   
    const handellogin = () => {
      
    setLoading(true);
        const po = axios
          .post(
            "https://admin.marina.com.eg/api/service/request",
            {
                service_id: valueSelect,
                message: message,
                available_date: value,
                urgency: urgency
            },
            {
              headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Accept-Language": `${locale}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
             setLoading(false);
             push("/services");
          })
          .catch((res) => {
             setLoading(false);
            console.log(res);
            res.response.data.errors.message ? setErrorMessage(res.response.data.errors.message[0]) : setErrorMessage("");
            res.response.data.errors.available_date ? setErrorDate(res.response.data.errors.available_date[0]) : setErrorDate("");
            res.response.data.errors.urgency ? setErrorUrgency(res.response.data.errors.urgency[0]) : setErrorUrgency("");
            res.response.data.errors.service_id ? setErrorservice(res.response.data.errors.service_id[0]) : setErrorservice("");
            
          });
  
      };


  return (
    <div className={styles.services}>
        <PageUser>
        <div className={styles.addservices}>
<div className='container mx-auto'>
<div className={styles.addservices_flex}>


    <h2>{t("new")}</h2>
<form>
            <div>
              <div className="mt-2">
              <Select
  data={ArraySelect}
  value={valueSelect}
  onChange={setValueSelect}
  placeholder={t("type")}
  variant="unstyled"
  radius="xs"
  error={Errorservice}
/>
              </div>

              <div className="mt-2 ">
              <Select
  data={[
    { value: 'low', label: locale==="ar"? "منخفض": 'low' },
    { value: 'medium', label:locale==="ar"? "متوسط":  'medium' },
    { value: 'High', label: locale==="ar"? "مرتفع": 'High' },
  ]}
  onChange={setUrgency}
  placeholder={t("urgency")}
  variant="unstyled"
  radius="xs"
error={ErrorUrgency}
/>
              </div>
              <div className="mt-2 ">
              <DatePickerInput
              clearable
      defaultValue={value}
      placeholder={t("date")}
      error={ErrorDate}
      onChange={setValue}
      mx="auto"
      maw={"100%"}
    />
              </div>
              <div className="mt-2 ">
                <Textarea  placeholder={t("description")}    error={Errormessage} onChange={(e)=>setMessage(e.target.value)} radius="xs"  />
              </div>
            </div>
{
  Loading ?  <Loader size="sm" style={{margin:"36px auto"}} variant="dots" /> :<button type="submit" className={styles.btn} onClick={(e)=>{e.preventDefault() , handellogin()}}>
  {t("sub")}
    </button>
}
            
           
          </form>
          </div>
    </div>


</div>

           
        </PageUser>
    </div>
  )
}

export default index



export async function getServerSideProps({locale}) {

    const res = await fetch(
      `https://admin.marina.com.eg/api/data/services`
    );
    const data = await res.json();
    return {
      props: {
        data,
        ...(await serverSideTranslations(locale, ["services", "common"])),
    
      },
    };
  }