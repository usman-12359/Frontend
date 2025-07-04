"use client"
import { calculatePrice } from '@/utils/custom-functions'
import { useEffect } from 'react'
import { MdOutlineArrowBack } from 'react-icons/md'
import styles from "./step-two.module.scss"
export default function StepTwo(props: any) {
  const { handleNext, handleBack, formik, plansList, navigateToHome } = props
  // console.log("🚀 ~ StepTwo ~ plansList:", plansList)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftWrapper}>
          <div className={styles.topImg} onClick={navigateToHome}>
            <img src="/logo-with-text.svg" alt="" />
          </div>
          <div className={styles.textSection}>
            <div className={styles.title} onClick={handleBack}><MdOutlineArrowBack /> &nbsp; Passo 2 de 4</div>
            <p className={styles.heading}>Cadastro de novo condomínio</p>
            <div className={styles.paragraph}>Por favor selecione um plano:</div>
          </div>

          <div className={styles.cardContainer}>
            {plansList?.length > 0 && plansList?.map((item: any, key: number) => (
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div className={styles.pricePlan}>
                    <span className={styles.planText}>{item?.name}</span>
                  </div>
                  <div className={styles.pricePermonth}>
                    <div className={styles.priceFrom}> De <span className='line-through'>{calculatePrice(item?.baseRetailPrice, formik?.values?.numberOfUnitsInCondominium, item?.retailPricePerTenUnit)}</span></div>
                    <div className={styles.priceTo}>Por {calculatePrice(item?.baseLaunchPrice, formik?.values?.numberOfUnitsInCondominium, item?.launchPricePerTenUnit)}</div>
                    <div className={styles.monthText}>{item?.type === "monthly" ? "" : `${item?.baseLaunchPrice ? calculatePrice((item?.baseLaunchPrice / 12), formik?.values?.numberOfUnitsInCondominium, (item?.launchPricePerTenUnit / 12)) : calculatePrice((item?.baseRetailPrice / 12), formik?.values?.numberOfUnitsInCondominium, (item?.retailPricePerTenUnit / 12))} / Mês`}</div>
                  </div>

                </div>
                <div className={styles.cardBody}>
                  <div className={styles.text} dangerouslySetInnerHTML={{ __html: item?.details }} />
                </div>
                <div className={styles.btnSection}>
                  <button onClick={() => handleNext(item)}>Selecionar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
