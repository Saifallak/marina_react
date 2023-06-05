import Script from 'next/script'
import React from 'react'

function Ad1() {
 
  return (
    <div className="speakol-widget m-auto w-[100%] flex justify-center " id="sp-wi-10905">
   
    <>
    <Script src="https://cdn.speakol.com/widget/js/speakol-widget-v2.js"/>
    <Script>{`
      (spksdk = window.spksdk || []).push({
        widget_id: "wi-10905",
        element: "sp-wi-10905"
      });
    `}</Script>
    </>
  </div>
  )
}

export default Ad1