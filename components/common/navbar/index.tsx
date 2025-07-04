"use client";
import { Routes } from "@/routes";
import { resetUserState } from "@/store/reducers/userReducer";
import { RootState } from "@/store/store";
import { Role_Enums } from "@/utils/enum/page";
import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MobileMenu from "../MobileMenu";
import styles from "./navbar.module.scss";

const Navigation = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const pathname = usePathname();
  // console.log("🚀 ~ Navigation ~ pathname:", pathname)
  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  // This function is used for the Mobile Menu toggle.

  const mobileMenuHandler = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  const handleLogOut = async () => {
    try {
      setLoading(true)
      await signOut({
        callbackUrl: "/",
      });
      toast.success("Sair com sucesso!");
      dispatch(resetUserState());
    } catch (error: any) {
      setLoading(false)
      toast.error(error?.response?.data?.message);
    }
  };


  const handleNavigate = (item: string) => {
    if (item === "register") {
      router.push(Routes.SIGNUP);
    } else {
      router.push(Routes.LOGIN);
    }
  };
  const { role, accessToken, userHome } = useSelector((state: RootState) => state.user)
  // console.log("TCL: Navigation -> userHome", userHome?.role)
  // console.log("TCL: Navigation -> user", user)
  // console.log("TCL: Navigation -> role", role)
  // console.log("TCL: Navigation -> accessToken", accessToken)
  const location = useRouter();
  const handleNavigateToHome = async () => {
    if (!Boolean(accessToken) && !Boolean(role)) {
      // If no session, redirect to login
      router.push(Routes.LOGIN);
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


  return (
    <>
      <div className={styles.wrapper}>
        <div className={classNames(["custom-class", styles.container])}>
          <div className={styles.logo}>
            <Link href="/">
              <img
                src={"/logo-with-text.svg"}
                className={styles.icon}
                alt="light Logo"
              />
            </Link>
          </div>

          <div className={styles.linkWrapper}>
            <div className={styles.links}>
              <Link
                href="#sobre-nós"
                className={
                  pathname === "/#sobre-nós" ? styles.active : styles.inactive
                }
              >
                <div className={styles.link}>
                  <div className={styles.text}>Sobre Nós</div>
                  <div className={styles.activeBar} />
                </div>
              </Link>
              <Link
                href="#nosso-processo"
                className={
                  pathname === "/our-process" ? styles.active : styles.inactive
                }
              >
                <div className={styles.link}>
                  <div className={styles.text}>Nosso Processo</div>
                  <div className={styles.activeBar} />
                </div>
              </Link>
              <Link
                href="#IA"
                className={
                  pathname === "/our-process" ? styles.active : styles.inactive
                }
              >
                <div className={styles.link}>
                  <div className={styles.text}>IA</div>
                  <div className={styles.activeBar} />
                </div>
              </Link>
              <Link
                href="#nossos-preços"
                className={
                  pathname === "/our-pricing" ? styles.active : styles.inactive
                }
              >
                <div className={styles.link}>
                  <div className={styles.text}>Nossos Planos</div>
                  <div className={styles.activeBar} />
                </div>
              </Link>
              <Link
                href="#contate-nos"
                className={
                  pathname === "/contact-us" ? styles.active : styles.inactive
                }
              >
                <div className={styles.link}>
                  <div className={styles.text}>Contato</div>
                  <div className={styles.activeBar} />
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.LanguageAndLogin}>
            {!Boolean(accessToken) && !Boolean(userHome?.role || role) ?

              <>
                <button
                  className={styles.register}
                  onClick={() => handleNavigate("register")}
                >
                  Registre-se
                </button>
                <button onClick={() => handleNavigate("login")}>Entrar</button>
              </>
              :
              <>
                <button onClick={() => handleNavigateToHome()}>Painel</button>
                <button className={styles.logout} onClick={handleLogOut} disabled={loading}>
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
            <RxHamburgerMenu
              className={styles.menuIcon}
              onClick={() => mobileMenuHandler()}
            />
          </div>
        </div>
      </div>
      {isMobileMenu && (
        <MobileMenu
          handleNavigate={handleNavigate}
          mobileMenuHandler={mobileMenuHandler}
        />
      )}
    </>
  );
};

export default Navigation;
