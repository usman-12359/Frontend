"use client";
import React, { useEffect, useState } from "react";
import styles from "./step-three.module.scss";
import { MdOutlineArrowBack } from "react-icons/md";
import { TbCopy } from "react-icons/tb";
import { RotatingLines } from "react-loader-spinner";
import { FaCircleCheck } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { calculatePrice } from "@/utils/custom-functions";
import { QRCodeSVG } from "qrcode.react";

export default function StepThree(props: any) {
  const { handleNext, handleBack, loading, planInfo, navigateToHome, formik } =
    props;
  const pixString = '00020126580014br.gov.bcb.pix0136e1f2aacb-944d-4ae3-a4d0-dff197ae37815204000053039865802BR5921ARDR TECNOLOGIAS LTDA6008CURITIBA622505216nqIAH0yTR2eBMzcQIwy76304511A'
  
  const [copied, setCopied] = useState(false);
  const [selectFile, setSelectFile] = useState(null);

  const handleCopy = (item: string) => {
    navigator.clipboard.writeText(item).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleForward = () => {
    // if (selectFile) {
      handleNext();
    // } else {
    //   formik.setFieldError("proofOfPayment", "Por favor, envie o comprovante de pagamento");
    // }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelect = (item: any) => {
    // console.log("🚀 ~ handleSelect ~ item:", item.target.files[0])
    if (item?.target?.files && item?.target?.files[0]) {
      formik.setFieldValue("proofOfPayment", item.target.files[0]);
      setSelectFile(item.target.files[0]?.name);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftWrapper}>
          <div className={styles.topImg} onClick={navigateToHome}>
            <img src="/logo-with-text.svg" alt="" />
          </div>
          <div className={styles.textSection}>
            <div className={styles.title} onClick={handleBack}>
              <MdOutlineArrowBack /> &nbsp; Passo 4 de 4
            </div>
            <p className={styles.heading}>Cadastro de novo condomínio</p>
            <div className={styles.paragraph}>Plano escolhido</div>
            <div className={styles.pricePlan}>
              <span className={styles.planText}>{planInfo?.name}</span>
            </div>
            <div className={styles.textOne}> De{" "} <span className={styles.dePrice}>
                {calculatePrice(planInfo?.baseRetailPrice, formik?.values?.numberOfUnitsInCondominium, planInfo?.retailPricePerTenUnit)}
              </span>{" "}{" "}
              Por{" "}
              {calculatePrice(planInfo?.baseLaunchPrice, formik?.values?.numberOfUnitsInCondominium, planInfo?.launchPricePerTenUnit)}
            </div>
            <div className={styles.monthText}>
              {planInfo?.type === "monthly" ? "" : `${planInfo?.baseLaunchPrice ? calculatePrice((planInfo?.baseLaunchPrice / 12), formik?.values?.numberOfUnitsInCondominium, (planInfo?.launchPricePerTenUnit / 12)) : calculatePrice((planInfo?.baseRetailPrice / 12), formik?.values?.numberOfUnitsInCondominium, (planInfo?.retailPricePerTenUnit / 12))} / Mês`}
            </div>
            <div className={styles.qrImg}>
              <QRCodeSVG
                value={pixString}
                size={200}
                level="H"
                includeMargin={true}
              />
              {/* <img src="/assets/qrCode.svg" alt='' /> */}
            </div>
            {selectFile ? (
              <div className={styles.selectFile}>
                {selectFile}{" "}
                <RxCrossCircled
                  onClick={() => setSelectFile(null)}
                  className="text-xl text-red-500"
                />
              </div>
            ) : (
              <label htmlFor="fileSelect" className={styles.selectFile}>
                Enviar comprovante de pagamento
                <CiFileOn className="text-xl text-textColor" />
                <input
                  type="file"
                  id="fileSelect"
                  onChange={(e) => handleSelect(e)}
                />
              </label>
            )}
            {/* {formik.errors.proofOfPayment ? (
              <div className={styles.errorStyle}>
                {formik.errors.proofOfPayment}
              </div>
            ) : null} */}
            <div className={styles.copyTxt}>
              cdbhk’bjasbk’jdbcask’jdjbvsjdacvcahjbds{" "}
              {copied ? (
                <FaCircleCheck className="text-lg text-[#F36B31]" />
              ) : (
                <TbCopy
                  className="text-lg cursor-pointer"
                  onClick={() =>
                    handleCopy("cdbhk’bjasbk’jdbcask’jdjbvsjdacvcahjbds")
                  }
                />
              )}{" "}
            </div>
            <div className={styles.copyEmail}>
              {" "}
              Chave Pix (e-mail):{" "}
              <a href="mailto:atendimento@chegousuaencomenda.com.br">atendimento@chegousuaencomenda.com.br</a>
            </div>
            <div className={styles.copyEmailFor}>
              {" "}
              <span className="text-red-500 font-medium text-lg">Atenção</span>: o envio do comprovante de pagamento neste momento e opcional. Ele pode ser enviado no momento em que for mais conveniente no endereco:
              <a href="mailto:atendimento@chegousuaencomenda.com.br">{" "} atendimento@chegousuaencomenda.com.br</a>
            </div>
            <div className={styles.copyTxt}>
              {" "}
              Seu plano será ativado em até 24h após recebermos o comprovante de
              pagamento.
            </div>
          </div>
          <div className={styles.btnSection}>
            <button onClick={handleForward} disabled={loading}>
              {loading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="22"
                  visible={true}
                />
              ) : (
                "Inscrever-se"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
