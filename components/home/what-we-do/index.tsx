import React from 'react'
import styles from "./what-we-do.module.scss"
import classNames from 'classnames'
const WhatWeDo = () => {
    return (
        <div className={styles.container}>
            <div className={classNames(["custom-class",styles.wrapper])}>
                <div className={styles.header}>
                    <div className={styles.heading}>O Que Fazemos</div>
                    <div className={styles.title}>Nossos serviços feitos para você</div>
                    <div className={styles.description}>
                    Experimente uma entrega rápida e segura que leva seus pacotes direto para sua porta com total tranquilidade. Nosso serviço confiável garante que seus pacotes cheguem no horário, sempre, sem complicações.
                        </div>
                </div>
                <div className={styles.cards}>
                    <div className={styles.cardItem}>
                        <img src="/assets/step-one.svg" alt='item' />
                        <div className={styles.cardTitle}>Encomendas entregues no seu condomínio</div>
                        {/* <div className={styles.cardDesc}>Encomendas entregues no seu condomínio</div> */}
                    </div>
                    <img src='/assets/dotted-ling-arrow.svg' className={styles.dottedImageForMobile} alt="For Mobile"/>
                    <img src='/assets/dotted-ling-arrow.svg' className={styles.dottedImageForDesktop} alt="For Desktop"/>
                    <div className={styles.cardItem}>
                        <img src="/assets/step-two.svg" alt='item' />
                        <div className={styles.cardTitle}>Portaria tira uma única foto da encomenda</div>
                        {/* <div className={styles.cardDesc}>Portaria tira uma única foto da encomenda</div> */}
                    </div>
                    <img src='/assets/dotted-ling-arrow.svg' className={styles.dottedImageForMobileTwo} alt="For Mobile"/>
                    <img src='/assets/dotted-ling-arrow.svg' className={styles.dottedImageForDesktopTwo} alt="For Desktop"/>
                    <div className={styles.cardItem}>
                        <img src="/assets/step-three.svg" alt='item' />
                        {/* <div className={styles.cardTitle}>Com a ajuda da IA, instantaneamente o destinatário é avisado que Chegou Sua Encomenda!</div> */}
                        <div className={styles.cardDesc}>Com a ajuda da IA, instantaneamente o destinatário é avisado que <b>Chegou Sua Encomenda!</b>.</div>
                    </div>
                </div>
                <div className={styles.cropImage}>
                    <img src="/assets/crop-image.svg" alt='item'/>
                </div>
            </div>
        </div>
    )
}

export default WhatWeDo
