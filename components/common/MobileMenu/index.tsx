"use client"
import { Routes } from "@/routes";
import { resetUserState } from "@/store/reducers/userReducer";
import { store } from "@/store/store";
import { Role_Enums } from "@/utils/enum/page";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import styles from "./mobileMenu.module.scss";


export type Props = {
  mobileMenuHandler: () => void;
  handleNavigate: Function;
}
const MobileMenu = ({ mobileMenuHandler, handleNavigate }: Props) => {


  const [loading, setLoading] = useState<boolean>(false)
  const pathname = usePathname()
  const { role, accessToken, userHome } = store.getState().user
  const location = useRouter();


  const handleNavigateToHome = async () => {
    if (!Boolean(accessToken) && !Boolean(localStorage.getItem("localRole") || userHome?.role || role)) {
      // If no session, redirect to login
      location.push(Routes.LOGIN);
      return;
    } else {
      await signIn("credentials", {
        token: accessToken,
        redirect: false,
      });
    }
    const findRole = localStorage.getItem("localRole") || userHome?.role || role;
    console.log("TCL: handleNavigateToHome -> findRole", findRole)
    if (findRole === Role_Enums.ADMIN) {
      location.push(Routes.ADMIN);
    } else if (findRole === Role_Enums.SUBSCRIBER) {
      location.push(Routes.SUBSCRIBER);
    } else if (findRole === Role_Enums.GATEHOUSE) {
      location.push(Routes.GATEHOUSE);
    }
  }

  const handleLogOut = async () => {
    try {
      setLoading(true)
      await signOut({
        callbackUrl: "/",
      });
      toast.success("Sair com sucesso!");
      store.dispatch(resetUserState());
    } catch (error: any) {
      setLoading(false)
      toast.error(error?.response?.data?.message);
    }
  };


  return (
    <>

      <div className={styles.wrapper}>
        <div className={styles.closeRow} onClick={mobileMenuHandler}>
          <CgClose className={styles.closeIcon} />
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.links}>


            <Link
              href="#sobre-nós"
              onClick={mobileMenuHandler}
              className={
                pathname === "/about" ? styles.active : styles.inactive
              }
            >
              Sobre Nós
            </Link>
            <Link
              href="#nosso-processo"
              onClick={mobileMenuHandler}
              className={
                pathname === "/our-process" ? styles.active : styles.inactive
              }
            >
              Nosso Processo
            </Link>
            <Link
              href="#IA"
              onClick={mobileMenuHandler}
              className={
                pathname === "/#IA" ? styles.active : styles.inactive
              }
            >
              IA
            </Link>
            <Link
              href="#nossos-preços"
              onClick={mobileMenuHandler}
              className={
                pathname === "/about" ? styles.active : styles.inactive
              }
            >
              Nossos Planos
            </Link>
            <Link
              href="#contate-nos"
              onClick={mobileMenuHandler}
              className={
                pathname === "/contact-us" ? styles.active : styles.inactive
              }
            >
              Contato
            </Link>

          </div>
          <div className={styles.LanguageAndLogin}>
            {!Boolean(accessToken) && !Boolean(userHome?.role || role) ?
              <>
                <button className={styles.register} onClick={() => handleNavigate("register")}>
                  Registre-se
                </button>
                <button onClick={() => handleNavigate("login")}>
                  Entrar
                </button>
              </>
              :
              <>
                <button onClick={() => handleNavigateToHome()}>Painel</button>
                <button className={styles.logout} onClick={() => handleLogOut()} disabled={loading}>
                  {loading ?
                    <div className='w-full flex justify-between items-center'>
                      <img src="/assets/logout.svg" alt="logout" />
                      <RotatingLines
                        strokeColor="#F36B31"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="22"
                        visible={true}
                      />
                    </div>
                    :
                    <img src="/assets/logout.svg" alt="logout" />
                  }
                </button>
              </>


            }
          </div>
        </div>
      </div>
    </>
  );
};
export default MobileMenu;
