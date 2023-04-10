import { Button } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/whatToDo.module.scss'

const WhatToDoCard = ({ image, titleOne,id, t }) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url("${image}")`
      }}
    >
      <div className={styles.contantCard}>
        <p>
          {titleOne}
         
        </p>
        <Link href={`/whatToDo/${id}`}>
          <Button
            variant='default'
            className='uppercase bg-black text-white border-none text-sm lg:text-xl h-[40px] lg:h-[60px] px-10 rounded-3xl bottom-1 hover:bg-black'
          >
           {t("buttonRead")}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default WhatToDoCard
