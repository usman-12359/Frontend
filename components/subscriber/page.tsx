"use client";
import React from "react";
import styles from "./subscriber.module.scss";
import classNames from "classnames";
import HeaderBar from "../common/header/page";
import SubscriberDetail from "./details/page";
export default function Subscriber() {
  return (
    <div className={classNames(["custom-class", styles.wrapper])}>
      <HeaderBar
        title="Painel do Assinante"
        mode="Mudar para Painel da Portaria"
      />
      <SubscriberDetail />
    </div>
  );
}
