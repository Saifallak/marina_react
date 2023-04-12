import PageUser from '@/components/PageUser'
import React from 'react'
import styles from "@/styles/signin.module.scss";
import { Container, PasswordInput, TextInput } from '@mantine/core';
import Link from 'next/link';
function index() {
  return (
    <section className={styles.sign}>
        <PageUser>
            <div className=' container mt-[50px] sm:mt-[100px]  mx-auto flex justify-between items-stretch lg:items-center flex-col   lg:flex-row' >
                <h1>SIGN IN </h1>
            <form > 
      <div >
          
              <div className="mt-2">
              <TextInput
  
  label="Username"

  radius="xs"
/>
              </div>
          
            <div className={styles.pass}>
             
              <div className="mt-2 ">
              <PasswordInput
  label="Password"
  radius="xs"
  variant="unstyled"
/>
              </div>
            </div>
      </div>
   
        <button
          type="submit"
        className={styles.btnSign}
      
        >
        SIGN IN
        </button>
     <div className={styles.SignLinks}>
        <Link href={'/signup'} >SIGN UP</Link>
        <Link href={'/forgetpassword'} >FORGOT YOUR PASSWORD?</Link>
     </div>
    </form>
            </div>
        
        </PageUser>

    </section>
  )
}

export default index