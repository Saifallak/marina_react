import Script from 'next/script'
import React from 'react'

function Ad2() {
 
  return (
    <div className="speakol-widget m-auto w-[100%] flex justify-center container" id="sp-wi-10906">
   
    <>
    <Script src="https://cdn.speakol.com/widget/js/speakol-widget-v2.js"/>
    <Script>{`
     (spksdk = window.spksdk || []).push({
        widget_id: "wi-10906",
        element: "sp-wi-10906"
    });
    `}</Script>
    </>
  </div>
  )
}

export default Ad2