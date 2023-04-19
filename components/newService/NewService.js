import React from 'react'
import styles from '@/styles/services.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'
function NewService({data ,t}) {
    const {locale} = useRouter()
  return (
    <div className={styles.new}>
        <h2>
        {t("new")}
        </h2>
        <div className={styles.allser}>
            {
                data.map((item ,i)=> (
                    <Link href={`/services/${item.id}`} className={styles.item} key={i}>
                    <img src={item.icon} alt={item.name[locale]}/>
                    <p>{item.name[locale]}</p>
                </Link>
                ))
            }
           

        </div>

    </div>
  )
}

export default NewService




/*export async function getServerSideProps() {
    const res = await fetch(
      `https://admin.marina.com.eg/api/data/services`
    );
    const data = await res.json();
  
    
  
   
    return {
      props: {
        data,
      },
    };
  }*/