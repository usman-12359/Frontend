"use client"
import React, { useEffect, useState } from 'react'
import styles from "./header.module.scss"
import "react-toggle/style.css"
import CustomToggle from '@/components/common/toggle/page'
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Role_Enums } from '@/utils/enum/page'
import useAPIClient from '@/utils/api-client'
import { Routes } from '@/routes'
export default function HeaderBar(props: any) {
    const { title, mode } = props
    const pathname = usePathname()
    const HTTP_CLIENT = useAPIClient()
    const { user, reloadName } = useSelector((state: RootState) => state.user)
    const [name, setName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const handleFetchCondominuim = async () => {
        try {
            setLoading(true)
            const managerId = user?._id
            const { data, success }: any = await HTTP_CLIENT.get({ url: `/manager/${managerId}` })
            if (success === true) {
                setName(data?.condominium?.condominiumName)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setName('')
        }
    }

    useEffect(() => {
        if (user?.role === Role_Enums.GATEHOUSE || user?.role === Role_Enums.SUBSCRIBER) {
            handleFetchCondominuim()
        } else {
            setName(null)
        }
    }, [user, reloadName])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.heading}>
                {loading ? "..." : user?.fullName ? user?.fullName : name ? name : user?.condominium?.condominiumName} - Bem vindo ao {title}
                    <img src="/assets/header-icon.svg" alt='header-icon' />
                </div>
                {pathname === Routes.ADMIN ? null : user?.role === Role_Enums.SUBSCRIBER ? <div className={styles.toggle}> {mode} <CustomToggle /></div> : null}
            </div>
        </div>
    )
}
