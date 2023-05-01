import React, { useState } from 'react'
import styles from '@/styles/services.module.scss'
import PageUser from '@/components/PageUser'
import { NumberInput, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

function index() {
    const {locale ,query} = useRouter()
    const [value, setValue] = useState(new Date());
    const [valueSelect, setValueSelect] = useState(+query.id);
    const [message, setMessage] = useState("");
    const [urgency, setUrgency] = useState("low");
    const { t } = useTranslation("services");

    const handellogin = () => {
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
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
    
        console.log(po);
      };


  return (
    <div className={styles.services}>
        <PageUser title={t("pay")}>
        <div className={styles.addservices}>
<div className='container mx-auto'>
<div className={styles.addservices_flex}>


    <h2>{t("pay")}</h2>
<form>
            <div>
              <div className="mt-2">
              <TextInput placeholder={t("name")} radius="xs"  />
              </div>

              <div className="mt-2 ">
              <NumberInput placeholder={t("number")} radius="xs" hideControls />
              </div>
              <div className="mt-2 ">
             <div className={styles.twoInput}>
             <NumberInput placeholder={t("expiry")} width={"500px"} radius="xs" hideControls />
              <NumberInput placeholder={t("ccv")} className={styles.cc} radius="xs" hideControls />
             </div>
              </div>
              
              <div className={styles.info}>
                <p>{t("inNumber")} 12892</p> 
                <p>{t("inDate")} 25/6/2021</p>
              </div>
              <div className={styles.total}>
             <h3> {t("total")} 10,000</h3>
              </div>
            </div>

            <button type="submit" className={styles.btn} onClick={(e)=>{e.preventDefault() , handellogin()}}>
            {t("sub2")}
            </button>
          </form>
          </div>
          <div className='ads'>
            <h5>Ad Placement</h5>
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