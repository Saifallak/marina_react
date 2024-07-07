"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/mangment.module.scss";
import img from "@/public/images/mangment/jamie-street-gZlQZFCA1Vc-unsplash.png";
import PageComponent from "@/components/PageComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { getDirectors, getYears } from "@/components/useApi/dataApi";
import { Skeleton } from "@mantine/core";

const Index = () => {
  const { t } = useTranslation("mangment");
  const { locale } = useRouter();
  const [directors, setDirectors] = useState([]);
  const [years, setYears] = useState([]);
  const [SelectYears, setSelectYears] = useState('2024');
  const [Load1, setLoad1] = useState(false);
  useEffect(() => {
    FetchDataYears();
    FetchDataDirectors();
  }, []);

  const FetchDataDirectors = async () => {
    setLoad1(true);
    const Directors = await getDirectors();
    if (!Directors) console.log(Directors?.message);
setDirectors(Object.entries(Directors))
    setLoad1(false);
  };

  const FetchDataYears = async () => {
    const Years = await getYears();
    if (!Years) console.log(Years?.message);
    setYears(Years);
  };
  const groupSize = 4;
  const groups = [];
  const manger = directors?.filter((item) => item.is_head_of_board == 1);
  const directorsWithOutManger = directors?.filter(
    (item) => item.is_head_of_board !== 1
  );
  for (let i = 0; i < directorsWithOutManger.length; i += groupSize) {
    groups.push(directorsWithOutManger.slice(i, i + groupSize));
  }


  
  return (
    <>
      <PageComponent styles={styles} title={t("mangment")} hero={img.src}>
        <span className="text-2xl sm:text-3xl md:text-5xl text-[#3a3a3a] font-extrabold text-center">
          <p className="mt-2 md:mt-[40px] mb-5 md:mb-10">{t("border")}</p>
        </span>
        {Load1 && (
          <div className="loadDiv" style={{ marginTop: "50px" }}>
            <Skeleton height={300} width={"90%"} radius="8px" />
            <Skeleton height={300} width={"90%"} radius="8px" />
            <Skeleton height={300} width={"90%"} radius="8px" />
          </div>
        )}
        <div className="container mx-auto">
         
          <div className="boxmanege">
           
            <div className="options">
              {
                years.length>0 ? <>
                {years.sort((a, b)=> b - a).map((item,i)=>{
                  return (<Link href={`/mangment#${item}`} onClick={(e)=>{setSelectYears(item)}}  className={`${SelectYears===item?"active":"" }`}>{item}</Link>)
                })}
                </>: null
              }
            
            </div>
            <div className="allMembers">
            {
            directors.sort((a, b)=> b[0] - a[0]).map((item,i)=>{
              return(
                <div className="boxDirectors" id={item[0]}>
                <h2>{item[0]}</h2>
                {item[1].head_of_board.length  ? (
                  <Link
                    href={`/mangment/${item[1].head_of_board[0].id}`}
                    style={{
                      backgroundImage: `url(${item[1].head_of_board[0].image.url})`,
                    }}
                    className={styles.CardOne}
                  >
                    <p>{item[1].head_of_board[0].name[locale]}</p>
                  </Link>
                ) : null}
                <div className={styles.imgContainerTwo}>
                   
                    <>
                      {  item[1].members.map((member, j) => {
                        return (
                          <div className="itemImg" key={i}>
                                  <Link
                                  key={j}
                                  href={`/mangment/${member.id}`}
                                  style={{
                                    backgroundImage: `url(${member.image.url})`,
                                  }}
                                  className={styles.CardTwo}
                                >
                                  <p>{member.name[locale]}</p>
                                </Link>
                          </div>
                        );
                      })}
                    </>
                  
                </div>
              </div>
              )
            })
          }
            </div>
           
           
          </div>
        </div>
      </PageComponent>
    </>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["mangment", "common"])),
    },
  };
};
