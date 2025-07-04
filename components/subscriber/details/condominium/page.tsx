"use client";
import React from "react";
import styles from "./condominiuim.module.scss";
import FormForCondominuim from "./form/page";
import PlanCard from "./plan-card/page";
export default function Condominium(props: any) {
  const { condominuim, Reload, activeTab } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Informações do Condomínio</div>
      <FormForCondominuim condominuim={condominuim} />
      <PlanCard activeTab={activeTab} plan={condominuim} Reload={Reload} />
    </div>
  );
}
