import PageUser from '@/components/PageUser'
import NewService from '@/components/newService/NewService'
import React from 'react'
import styles from '@/styles/services.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Accordion } from '@mantine/core'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';

function index({data,userDate,userAuth}) {
    const {locale} = useRouter()
    const stringToArray = str => str.split(" ");
    const { t } = useTranslation("services");
  return (
    <div className={styles.services}>
        <PageUser>
        <h1>{t("services")+ " "+ userAuth.name }   </h1>
<div className='container mx-auto'>
<div className={styles.boxs}>
    <div className={styles.box2}>
        <h2>
       {t("hello")}<br/>{t("serve")}<br/>{stringToArray(userAuth.name)[0]}

        </h2>
    </div>
    <div className={styles.box}>
        <h3>10</h3>
        <p> {t("completed")}</p>
        <Link href="/">{t("view")}</Link>
    </div>
    <div className={styles.box}>
        <h3>3</h3>
        <p>{t("progress")}</p>
        <Link href="/">{t("view")}</Link>
    </div >
</div>


<div className={styles.pastreq}>
    <h2>{t("Past")}</h2>
<div className={styles.requests}>
{
        userDate.map((item,i)=>(
          <Accordion vvariant="filled" radius="xs"  >
          <Accordion.Item value="customization" className={styles.alldata} key={i}>   


<Accordion.Control >
<div className={styles.req} >
    <p>{item.client_id}</p>
    <p>{item.service.name[locale]}</p>
    <p>{item.status == 1?"SUBMITTED " :item.status  == 2? "ACCEPTED" : item.status  == 3?"IN_PROGRESS" :item.status  == 4?"CANCELED" :"COMPLETED"}</p>
    <p>{new Date(item.updated_at).toLocaleDateString()}</p>

</div>

</Accordion.Control>
<Accordion.Panel  >
<div className={styles.his }>
{
  item.histories.length? item.histories.map((history,i)=>(
    <div className={styles.req}   key={i}>
    <p>{item.client_id}</p>
    <p>{item.service.name[locale]}</p>
    <p>{history.status == 1?"SUBMITTED " :history.status  == 2? "ACCEPTED" : history.status  == 3?"IN_PROGRESS" :history.status  == 4?"CANCELED" :"COMPLETED"}</p>
    <p>{new Date(history.created_at).toLocaleDateString()}</p>

</div>
  ))  : null 
  
}
</div>
</Accordion.Panel>

</Accordion.Item>
</Accordion>
        ))
    }
</div>
</div>
<NewService t={t}  data={data}/>
</div>         
        </PageUser>
    </div>
  )
}

export default index
export async function getServerSideProps({req,locale}) {
   
    
    const res = await fetch(
      `https://admin.marina.com.eg/api/data/services`
    );
    const data = await res.json();
  
   
   

    let headers = {
        "Authorization": `Bearer ${req.cookies.access_token} `,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": "en",
    };

    const url = new URL("https://admin.marina.com.eg/api/auth/requests");
    const user = await fetch(url, {
        method: "GET",
        headers,
      });
    

      
      const userDate = await user.json();


      const urlUser = new URL("https://admin.marina.com.eg/api/auth/user");
      const userauth = await fetch(urlUser, {
        method: "GET",
        headers,
      });
  
      const userAuth = await userauth.json();
   
    return {
      props: {
        data,
        userDate,
        userAuth,
        ...(await serverSideTranslations(locale, ["services", "common"])),
      },
    };
  }



  