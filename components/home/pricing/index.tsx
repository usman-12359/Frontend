"use client";
import React, { useEffect, useState } from "react";
import styles from "./pricing.module.scss";
import classNames from "classnames";
import useAPIClient from "@/utils/api-client";
import { formatBRLCurrency } from "@/utils/custom-functions";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes";
const Pricing = () => {
  const router = useRouter()
  const HTTP_CLIENT = useAPIClient();
  const [plansList, setPlansList] = useState<any>([]);
  // const [loading, setLoading] = useState<boolean>(false)
  // console.log("🚀 ~ Pricing ~ plansList:", plansList)

  const plansInfo = [
    {
      _id: "67cc812307201e6402bc31ef",
      isDeleted: false,
      name: "Monthly plan",
      priceFrom: 46.9,
      details:
        "<ul >  <li >Aproveite o preço superpromocional de lançamento por um ano</li>  <li >Avise a chegada de encomendas com apenas um click</li>  <li >Controle todas as encomendas em apenas uma tela</li>  <li >Uso de inteligência artificial</li>  <li >Avisos enviados pelo SMS e/ou e-mail (cada unidade decide como prefere ser notificada)</li>  <li >Cadastre todos os condôminos de uma só vez enviando as informações em um arquivo de texto.</li></ul>",
      active: true,
      type: "monthly",
      createdAt: "2025-03-08T17:40:51.827Z",
      updatedAt: "2025-03-08T17:40:51.827Z",
      __v: 0,
      priceTo: 56.9,
    },
    {
      _id: "67cc818c07201e6402bc31f2",
      isDeleted: false,
      name: "Annual plan",
      priceFrom: 526.9,
      details:
        "<ul >  <li >Aproveite o preço superpromocional de lançamento por um ano</li>  <li >Avise a chegada de encomendas com apenas um click</li>  <li >Controle todas as encomendas em apenas uma tela</li>  <li >Uso de inteligência artificial</li>  <li >Avisos enviados pelo SMS e/ou e-mail (cada unidade decide como prefere ser notificada)</li>  <li >Cadastre todos os condôminos de uma só vez enviando as informações em um arquivo de texto.</li></ul>",
      active: true,
      type: "yearly",
      createdAt: "2025-03-08T17:42:36.221Z",
      updatedAt: "2025-03-08T17:42:36.221Z",
      __v: 0,
      priceTo: 626.9,
    },
  ];
  const handleFetchPlansInfo = async () => {
    try {
      // setLoading(true)
      const { data, success }: any = await HTTP_CLIENT.get({
        url: "/subscription-package",
      });
      if (success === true) {
        setPlansList(data || plansInfo);
      }
      // setLoading(false)
    } catch (error) {
      // setLoading(false)
      setPlansList(plansInfo);
    }
  };

  useEffect(() => {
    handleFetchPlansInfo();
  }, []);

  return (
    <div
      className={classNames(["custom-class", styles.container])}
      id="OurPricing"
    >
      <div className={styles.headingSection}>
        <div className={styles.subHeading}>Nossos planos</div>
        <div className={styles.heading}>
          Conheça nossos planos e aproveite a promoção por tempo limitado
        </div>
        {/* <div className={styles.discount}>
          Pronto para agilizar e simplificar o gerenciamento de encomendas do seu condomínio?
          Começar Agora
        </div> */}
      </div>

      <div className={styles.cardContainer}>
        {plansList?.length > 0 &&
          plansList?.map((item: any, key: number) => (
            <div className={styles.card} key={key}>
              <div className={styles.cardHead}>
                <div className={styles.pricePlan}>
                  <span className={styles.planText}>{item?.name}</span>
                </div>
                <div className={styles.pricePermonth}>
                  <div className={styles.priceFrom}>
                    A partir <br/>
                    De <span>{formatBRLCurrency(item?.baseRetailPrice)}</span>
                  </div>
                  <div className={styles.priceTo}>
                    Por {formatBRLCurrency(item?.baseLaunchPrice)}
                  </div>
                  <div className={styles.monthText}>
                    {item?.type === "monthly"
                      ? ""
                      : `${
                          item?.baseLaunchPrice
                            ? formatBRLCurrency(item?.baseLaunchPrice / 12)
                            : formatBRLCurrency(item?.baseRetailPrice / 12)
                        } / Mês`}
                  </div>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div
                  className={styles.text}
                  dangerouslySetInnerHTML={{ __html: item?.details }}
                />
              </div>
              <div className={styles.btnSection}>
                <button onClick={()=>router.push(Routes.SIGNUP)}>Selecionar</button>
              </div>
            </div>
          ))}
      </div>

      {/* <div className={styles.cardContainer}>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <div className={styles.pricePlan}>
              <span className={styles.planText}>Plano mensal</span>
            </div>
            <div className={styles.pricePermonth}>
              <div className={styles.price}>From R$46.90
                to R$34.90</div>
              <div className={styles.monthText}>/ Month</div>
            </div>

          </div>
          <div className={styles.cardBody}>
            <div className={styles.text}>- Avise a chegada de encomendas com  apenas um click</div>
            <div className={styles.text}>- Controle todas as encomendas em  apenas uma tela</div>
            <div className={styles.text}>- Uso de inteligência artificial</div>
            <div className={styles.text}>- Avisos enviados pelo Whatsapp e/ou e mail (cada unidade decide como   prefere ser notificada)</div>
            <div className={styles.text}>- cadastre todos os condôminos de  uma só vez enviando as informações em  um arquivo de texto.</div>
          </div>
          <div className={styles.btnSection}>
            <button>Selecionar</button>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <div className={styles.pricePlan}>
              <span className={styles.planText}>Annual plan</span>
            </div>
            <div className={styles.pricePermonth}>
              <div className={styles.price}>From R$526.90 to R$286.80</div>
              <div className={styles.monthText}>R$ 23.90 /Month</div>
            </div>

          </div>
          <div className={styles.cardBody}>
            <div className={styles.text}>- Aproveite o preço superpromocional de  lançamento por um ano</div>
            <div className={styles.text}>- Avise a chegada de encomendas com  apenas um click</div>
            <div className={styles.text}>- Controle todas as encomendas em  apenas uma tela</div>
            <div className={styles.text}> Uso de inteligência artificial</div>
            <div className={styles.text}>- Avisos enviados pelo Whatsapp e/ou e mail (cada unidade decide como prefere  ser notificada)</div>
            <div className={styles.text}>- cadastre todos os condôminos de uma  só vez enviando as informações em um  arquivo de texto.</div>
          </div>
          <div className={styles.btnSection}>
            <button>Selecionar</button>
          </div>
        </div>

      </div> */}
    </div>
  );
};

export default Pricing;
