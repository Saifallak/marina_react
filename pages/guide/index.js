/* eslint-disable jsx-a11y/alt-text */
import { Container, Button, Grid } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import styles from '@/styles/guide.module.scss';
import img from '@/public/Images/guide/joseph-barrientos-oQl0eVYd_n8-unsplash.jpg';
import imgOne from '@/public/Images/guide/oliver-sjostrom-4pxycrNRhvg-unsplash.jpg';
import imgTwo from '@/public/Images/guide/two.jpg';
import imgThree from '@/public/Images/guide/three.jpg';
import PageComponent from '@/components/PageComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Index = ({ quidePdf }) => {
  const { t } = useTranslation('guide');
  const [pdf] = quidePdf;

  return (
    <>
      <PageComponent
        styles={styles}
        title={t('guide')}
        hero={img.src}
        button="buttonDownload"
        link={pdf.pdf}
      >
        <div className="container mx-auto">
          <div className="flex items-center mt-[100px] mb-[100px] md:mb-[150px] flex-col-reverse sm:flex-row">
            <ul className="flex-1 flex sm:gap-1 md:gap-2 flex-col text-[#7f7f7f] text-[12px]  md:text-[14px]">
              <li>
                -The owner should know all the main data about his unit and the
                area he lives in (unit address/
                <br /> <span className="mr-11">area </span>
                <span className="mr-11"> number/ </span> sector number)
              </li>
              <li>
                -Keep the directory with department and service data for the
                required service (distributed free of charge with annual service
                payment)
              </li>
              <li>
                -Resort to the head of the competent sector in all the problems
                encountered by the owner
                (electricity/agriculture/security/water/cleanliness)
              </li>
              <li>
                -Report if a representative is assigned to enter the unit or the
                key is passed to a relative
              </li>
              <li>
                -Attention to repairing any defects with locks or trapeze the
                entrances of the special unit overlooking the skylights
              </li>
              <li>
                -Attention to cutting fences and vegetable fences around the
                unit to the appropriate heights that are easy to monitor and
                follow from the security staff, which do not bother the
                neighbors and the rear units
              </li>
              <li>
                -Securing the windows of the kitchen and bathroom with the
                necessary means for the floor rotor
              </li>
              <li>
                -Obtaining a permit for the employees of the unit( a
                gardener/private guard) from the security department to be able
                to identify the workers and monitor their movements
              </li>
              <li>
                -Obtaining a permit from the village tourism agency before
                carrying out any construction or annexing flats to the unit and
                raising the waste of construction first
              </li>
              <li>
                -Refrain from using municipal fertilizers and protection in
                gardens as of may first
              </li>
              <li>
                -All the beaches of the center are public beaches for all
                gentlemen owners, it is not allowed to allocate any area of the
                beaches with fences or fences
              </li>
              <li>
                -Fishing spikes or fishing nets are not allowed in all water
                bodies within the center.
              </li>
            </ul>
            <div className="flex-1">
              <div className="text-lg sm:text-3xl lg:text-6xl font-extrabold text-right text-[#3a3a3a] leading-tight">
                <p className=" text-center sm:text-start">{t('insctructions')}</p>
              </div>
              <img src={imgOne.src} className="h-full sm:w-[917px] w-[70%] m-auto" alt="Img One" />
            </div>
          </div>

          <div className="flex  items-start mb-[100px] flex-col sm:flex-row">
            <div className="flex-1">
              <div className="text-lg sm:text-2xl lg:text-6xl font-extrabold text-[#3a3a3a] leading-tight">
                <p className=" text-center sm:text-start">{t('activity')}</p>
              </div>
              <img src={imgTwo.src} className="mt-10 sm:w-[917px] w-[70%] sm:w-[100%] m-auto" alt="Img One" />
            </div>
            <ul className="flex-1 flex  md:gap-1 lg:gap-2 flex-col text-[#7f7f7f] text-[12px] text-end  md:text-[14px]">
              <li>
                No marine unit will be allowed to descend into the lakes without
                its own number obtained by the management company after
                registering the vehicle with the company<br></br>
                and giving it permission to use the lakes and provided that it
                is owned by one of the owners of the residential units in marina
                center
              </li>
              <li>
                Only the maritime units are authorized to enter the gates: Gate
                2, yacht entrance, gate 3, gate 5, gate 7.
              </li>
              <li>
                The age of those who drive a marine unit must not be less than
                16 years with the need to obtain a driving license for the
                establishments from<br></br>
                the competent maritime inspection department
              </li>
              <li>
                We must make sure that all safety equipment is <br></br>{' '}
                available freely and this equipment is: Fire extinguisher
                conforms to the specifications of the Egyptian Maritime Safety
                Authority<br></br>
                Number of 6 rubber shock inhibitions and the number increases
                according to the length of the unit<br></br>
                Life jackets for the number specified in the valid license of
                the unit<br></br>A hook in addition to 30 meters of ropes
              </li>
              <li>
                The speed of any marine unit in the big lakes should not exceed
                30 km/h for
                <br></br>
                the boats and jet ski 50 km/h and under bridges 20 km/h for all
                units
              </li>
              <li>
                Timing of use of marine units in lakes from sunrise to sunset
              </li>
              <li>
                Do not allow the work of various marine sports such as water
                skiing after 2 pm <br></br>
                due to the congestion in the lakes to keep the users of these
                sports safe from collision
              </li>
              <li>
                Commanders of naval units must be obliged to walk in their
                designated shipping lanes <br></br>
                and are strictly prohibited from entering the designated areas
                for bathing and swimming.
              </li>
              <li>
                The commanders of the naval units must commit to walking on the
                right side of<br></br>
                the shipping lane and under the bridges.
              </li>
              <li>
                Border guards must authorize any marine unit before leaving to
                the sea
              </li>
              <li>
                The owner of any marine unit located in the bathing areas or the
                owner of which destroys the<br></br>
                ropes of the chimandorate will be prevented from going down in
                the lakes while <br></br>
                taking legal measures against it
              </li>
              <li>
                Commanders of marine units are prohibited from disposing of any
                residues or oils <br></br>
                taking legal measures against it in lake waters and are
                subjected to legal actions.
              </li>

              <li>
                The need to follow the instructions of the maritime security
                personnel who have been assigned to monitor<br></br>
                the lakes and follow up the implementation of those instructions
              </li>

              <li>
                The management company calls on all gentlemen owners of marine
                units and lake <br></br>
                users to abide by these instructions for the sake of their lives
                and confirms that it is <br></br>
                not responsible in case any person violates it and bears sole
                legal and criminal responsibility
              </li>

              <li>
                The construction company for development and tourism management
                is doing its best to <br></br>
                provide a comfortable stay while you are at marina al Alamein
                tourist center so <br></br>
                you can contact the person responsible for the service you want
                in the sector of <br></br>
                your residence and the head of the sector that follows it and
                god willing you will receive <br></br>a complaint And your note
                all the attention and in case of non-response from the sector{' '}
                <br></br>
                which is taken seriously by the management of the company we ask
                you<br></br>
                to contact the main center of the administration and inform{' '}
                <br></br>
                the officials about the failure of the sector to eliminate the
                complaint and hold the<br></br>
                officials in the sectors accountable for their inaction
              </li>
            </ul>
          </div>

          <div className="flex items-center items-center flex-col sm:flex-row">
            <div className="flex-1">
              <Image src={imgThree} width="917" height="967" className="sm:w-[917px] w-[70%] m-auto"  />
            </div>
            <ul className="flex-1 flex flex-col gap-4 text-[12px] text-end  md:text-[14px] text-[#7f7f7f]">
              <div className="text-lg font-extrabold leading-tight text-black sm:text-2xl lg:text-6xl">
                <p className=" text-center sm:text-end">{t('ill')}</p>
              </div>

              <li>
                Inside Marina El Alamein Center Marina Central Hospital is
                located, <br></br>
                run by elite doctors from the Ministry of Health and Population,{' '}
                <br></br>
                and the center has all the emergency equipment and emergency
                services. The hospital is headed by Dr. Mahmoud Al-Helwani.{' '}
                <br></br>
                Tel: 01222387383, 4060833/046<br></br>
              </li>

              <li>
                There are also four ambulances in the center owners&apos;
                service <br></br>
                and they can be called by calling 4060833/046-123-01222387383
              </li>
            </ul>
          </div>

          <div className="">
            <p className="text-2xl sm:text-2xl lg:text-6xl font-extrabold text-center leading-tight mt-[100px] mb-[20px] sm:mb-[70px]">
            {t('landing')}
            
            </p>
          </div>
          <div className="text-[10px] sm:text-sm text-center text-[#7f7f7f] leading-relaxed">
            <p>
              The company&apos;s management provides the owners with insect
              control service within the unit under the supervision of
              specialized engineers in the <br></br>
              field of control and trained technical workers using pesticides
              authorized by the Ministry of Health and according to a specific
              price list according to the area of the units
              <br></br>
              For information:
              <br></br>
              Eng / Jamal Ibrahim 01002333318
              <br></br>
              Eng/ Mohammed Abdulaziz 01227885455
            </p>
          </div>
        </div>
      </PageComponent>
    </>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  const quidePdf = await fetch(
    'https://admin.marina.com.eg/api/data/pdfs'
  ).then((res) => res.json());
  return {
    props: {
      quidePdf: quidePdf,
      ...(await serverSideTranslations(context.locale, ['guide', 'common'])),
    },
  };
};
