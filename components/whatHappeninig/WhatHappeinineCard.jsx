import React from 'react'
import { Button } from '@mantine/core'
import styles from '../../styles/whatHappening.module.scss'

const WhatHappeinineCard = ({ image, titleOne, titleTwo, t }) => {
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
          <br></br>
          {titleTwo}
        </p>
        <Button
          variant='default'
          className='uppercase bg-black text-white border-none text-sm lg:text-xl h-[40px] lg:h-[60px] px-10 rounded-3xl bottom-1 hover:bg-black'
        >
          {t("buttonRead")}
        </Button>
      </div>
    </div>
  )
}

export default WhatHappeinineCard
