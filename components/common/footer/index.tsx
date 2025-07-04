"use client"
import classNames from "classnames";
import Link from "next/link";
import styles from "./footer.module.scss";
import { Routes } from "@/routes";

const Footer = () => {

  return (
    <div className={styles.bg}>
      <div className={classNames(["custom-class", styles.wrapper])}>
        <div className={styles.logoAndLinks}>
          <div className={styles.logoAndText}>
            <div className={styles.logo}>
              <Link
                href="/"
              >
                <img src="/logo-text.svg" alt="Logo" />
              </Link>
            </div>
          </div>
          <div className={styles.linkWrapper}>
            <div className={styles.links}>


              <Link
                href="#sobre-nós"
                className={
                  styles.inactive
                }
              >
                <div className={styles.link}>
                  <div className={styles.text}>
                    Sobre Nós
                  </div>

                </div>
              </Link>
              <Link
                href="#nosso-processo"
                className={
                  styles.inactive
                }
              >
                <div className={styles.link}>
                  <div className={styles.text}>
                    Nosso Processo
                  </div>

                </div>
              </Link>
              <Link
                href="#AI"
                className={
                  styles.inactive
                }
              >
                <div className={styles.link}>
                  <div className={styles.text}>
                    IA
                  </div>

                </div>
              </Link>
              <Link
                href="#nossos-preços"
                className={
                  styles.inactive
                }
              >
                <div className={styles.link}>
                  <div className={styles.text}>
                    Nossos Planos
                  </div>

                </div>
              </Link>
              <Link
                href="#contate-nos"
                className={
                  styles.inactive
                }
              >
                <div className={styles.link}>
                  <div className={styles.text}>
                    Contato
                  </div>

                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.bottomWarapper}>
        <div className={classNames(["custom-class", styles.socialAndBottom])}>
          <div className={styles.bottomWrapper}>
            <p><a href="https://macromodule.com/" target="_blank"> &copy; Direitos autorais {new Date().getFullYear()} Chegou Sua  Encomenda </a></p>
            <p>ARDR Technologias LTDA</p>
            <p>CPNJ 59.622.675-0001-15</p>
            <p>Rua Carlos Leinig Jr., 354. Vista Alegre</p>
            <p>CEP: 80820-280 - Curitiba - PR</p>
            <p>E-Mail: <a href="mailto:atendimento@chegousuaencomenda.com.br">atendimento@chegousuaencomenda.com.br</a></p>
          </div>
          <div className={styles.bottomWrapper}>
            <Link href={Routes.TERMS_AND_CONDITIONS}>Termos e Condições de Uso</Link>
          </div>
          <div className={styles.bottomWrapper}>
            <Link href={Routes.PRIVACY}>Política de Privacidade</Link>
          </div>
          {/* <div className={styles.socialLinks}> */}
          {/* <div className={styles.link}>
              {socialLinks.map((item, index) => (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                >
                  <item.icon className="lg:text-[14px] text-white hover:text-primary" />
                </a>
              ))}
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>

  );
};

export default Footer;