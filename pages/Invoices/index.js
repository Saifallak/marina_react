import PageUser from '@/components/PageUser'
import NewService from '@/components/newService/NewService'
import React from 'react'
import styles from '@/styles/services.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Accordion } from '@mantine/core'
function index({userDate,userAuth}) {
    const {locale} = useRouter()
    const stringToArray = str => str.split(" ");
  return (
    <div className={styles.services}>
        <PageUser>
        <h1>WELCOME {userAuth.name}</h1>
<div className='container mx-auto'>
<div className={styles.boxs}>
    <div className={styles.box2}>
        <h2>
        Hello!<br/>How can we serve<br/>you?<br/>{stringToArray(userAuth.name)[0]}

        </h2>
    </div>
    <div className={styles.box}>
        <h3>EGP10,000</h3>
        <p>Amount Due</p>
        <Link href="/">Pay Now</Link>
    </div>
    <div className={styles.box}>
        <h3>3</h3>
        <p>Invoices Paid</p>
        <Link href="/">View Details</Link>
    </div >
</div>


<div className={styles.pastreq}>
    <h2>Past Service Requests</h2>
<div className={styles.requests}>
{
        userDate.map((item,i)=>(
      
          <div value="customization" className={styles.alldata} key={i}>   
<div className={styles.req} >
    <p>{item.client_id}</p>
    <p>{item.desc[locale]}</p>
    <p>{item.status == 1?"SUBMITTED " :item.status  == 2? "ACCEPTED" : item.status  == 3?"IN_PROGRESS" :item.status  == 4?"CANCELED" :"COMPLETED"}</p>
    <p>{new Date(item.updated_at).toLocaleDateString()}</p>

</div>
</div>
        ))
    }
</div>
</div>

</div>         
        </PageUser>
    </div>
  )
}

export default index
export async function getServerSideProps({req}) {
   
    
   
  
   
   

    let headers = {
        "Authorization": `Bearer ${req.cookies.access_token} `,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": "en",
    };

    const url = new URL("https://admin.marina.com.eg/api/auth/bills");
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
        userDate,
        userAuth
      },
    };
  }



  