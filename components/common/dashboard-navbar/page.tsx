"use client"
import React, { useState } from 'react'
import styles from "./dashboard-navbar.module.scss"
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Role_Enums } from '@/utils/enum/page'
import { toast } from 'react-toastify'
import { signOut } from 'next-auth/react'
import { resetUserState } from '@/store/reducers/userReducer'
import { RotatingLines } from 'react-loader-spinner'
import { Routes } from '@/routes'
export default function DashboardNavbar() {
  const { push } = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  // Fetch  User
  const { user } = useSelector((state: RootState) => state.user)
  // console.log("🚀 ~ DashboardNavbar ~ user:", user)

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

  const handleNavigateToDashboard = () => {
    if (user?.role === Role_Enums.ADMIN) {
      push(Routes.ADMIN)
    } else if (user?.role === Role_Enums.SUBSCRIBER) {
      push(Routes.SUBSCRIBER)
    } else if (user?.role === Role_Enums.GATEHOUSE) {
      push(Routes.GATEHOUSE)
    }
  }

  return (
    <div className={classNames(["custom-class", styles.wrapper])}>
      <div className={styles.logo} onClick={handleNavigateToDashboard}>
        <img src="/logo-with-text.svg" alt='logo' />
      </div>
      {user?.role === Role_Enums.ADMIN ?
        <div className='flex items-center gap-x-2'>
          <div className={styles.profileAndSettings}>
            <img src="/assets/setting.svg" className={styles.setting} alt='profile' onClick={() => push(Routes.PROFILE)} />
            {/* <img className={styles.profile} src={user?.profilePicture ? user?.profilePicture : "/assets/profile-two.svg"} alt='profile' onClick={() => push(Routes.PROFILE)} /> */}
          </div>
          <button className={styles.logoutProfile} onClick={handleLogOut} disabled={loading}>
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
              : <img src="/assets/logout.svg" alt="logout" />}
          </button>
        </div>
        :
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
      }
    </div>
  )
}
