"use client"
import React, { useEffect, useState } from 'react'
import styles from "./profile.module.scss"
import classNames from 'classnames'
import ProfileSettings from './general-setting/page'
import PlansSettings from './plan-settings/page'
import CreatePlanPopup from '../common/popups/create-plan/page'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import { Role_Enums, SUBSCRIPTION_PLAN_TYPES } from '@/utils/enum/page'
import { useRouter } from 'next/navigation'
import useAPIClient from '@/utils/api-client'
import { Routes } from '@/routes'
export default function Profile() {
    const loaction = useRouter()
    const [active, setActive] = useState<string>("general-settings")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { user } = useSelector((state: RootState) => state.user)
    // console.log("🚀 ~ Profile ~ user:", user)
    const HTTP_CLIENT = useAPIClient()
    const [plansList, setPlansList] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)


    useEffect(() => {
        if (user?.role === Role_Enums.SUBSCRIBER) {
            loaction.push(Routes.SUBSCRIBER)
        } else if (user?.role === Role_Enums.GATEHOUSE) {
            loaction.push("Routes.GATEHOUSE")
        }
    }, [user?.role])

    const planTypes = [SUBSCRIPTION_PLAN_TYPES.MONTHLY, SUBSCRIPTION_PLAN_TYPES.YEARLY]

    const handleFetchPlansInfo = async () => {
        try {
            setLoading(true)
            const response: any = await HTTP_CLIENT.get({ url: "/subscription-package" })
            if (response) {
                setPlansList(response?.data || [])
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setPlansList([])
        }
    }

    useEffect(() => {
        handleFetchPlansInfo()
    }, [reload])

    const isOnePlanMissing = planTypes.every(type => plansList?.some(plan => plan.type === type));
    return (
        <>
            <div className={classNames(["custom-class", styles.wrapper])}>
                <div className={styles.container}>
                    <div className={styles.tabs}>
                        <div className={styles.tabsWrapper}>
                            <button className={active === "general-settings" ? styles.active : styles.inActive} onClick={() => setActive("general-settings")}>Configurações Gerais</button>
                            <button className={active === "plan-settings" ? styles.active : styles.inActive} onClick={() => setActive("plan-settings")}>Configurações de planos</button>
                        </div>
                        {active === "plan-settings" && !isOnePlanMissing && <button className={active === "plan-settings" ? styles.active : styles.inActive} onClick={() => setIsOpen(true)}>Criar plano</button>}
                    </div>
                    <div className={styles.screenWrapper}>
                        {active === "general-settings"
                            ? <ProfileSettings />
                            : active === "plan-settings"
                                ? <PlansSettings plansList={plansList} setIsOpen={setIsOpen} loading={loading} isOpen={isOpen} reload={reload} setReload={setReload} /> : ""
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
