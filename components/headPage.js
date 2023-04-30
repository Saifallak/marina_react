import React from 'react'
import icon from '@/public/images/icon.png'

function headPage(props) {
  return (
   <>
   <Head>
    <title>{props.title} </title>
        <meta name="description" content={props.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon.src} />
    </Head>
   </>
  )
}

export default headPage