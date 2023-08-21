
import { Button } from '@mantine/core'
import React from 'react'
import styles from "@/styles/admin.module.scss";
import img from "@/public/images/navbar/blue.svg";
import PageComponent from '@/components/PageComponent';
function index() {
  return (
   <PageComponent styles={styles} title="ARTICLE" hero={img.src} over={"false"}>

<div className=" container  mx-auto ">
<div className={styles.admin}>
    <div className={styles.addnew}>
        <h2>ADD NEW</h2>
        <div className={styles.carts}>
            <div className={styles.cart}>
                <p>31/5/2021</p>
                <h3>ARTICLE TITLE</h3>
                <h4>CATEGORY</h4>
                <button>EDIT</button>
            </div>
            <div className={styles.cart}>
                  <p>31/5/2021</p>
                <h3>ARTICLE TITLE</h3>
                <h4>CATEGORY</h4>
                <button>EDIT</button>
            </div>
            <div className={styles.cart}>
                  <p>31/5/2021</p>
                <h3>ARTICLE TITLE</h3>
                <h4>CATEGORY</h4>
                <button>EDIT</button>
            </div>
        </div>
        <Button>VIEW MORE</Button>
    </div>
</div>
</div>


</PageComponent>
  )
}

export default index