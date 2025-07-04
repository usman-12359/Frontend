"use client"
import React, { useEffect, useState } from 'react'
import styles from "./upgrade-plan.module.scss"
import classNames from 'classnames'
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import useAPIClient from '@/utils/api-client';
import { HashLoaderCom } from '../common/loader/component-loader';
import NoData from '../common/no-data/page';
import UpgradePlanPopup from '../common/popups/upgrade-plan/page';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Role_Enums } from '@/utils/enum/page';
import moment from 'moment';
import { calculatePrice, formatBRLCurrency } from '@/utils/custom-functions';
import ProofofPaymentPopup from '../common/popups/proof-of-payment/page';

export default function UpgradePlan() {
    const router = useRouter();
    const goBack = () => {
        router.back();
    };

    const [loading, setLoading] = useState<boolean>(true)
    const [plansList, setPlansList] = useState([])
    const [reload, setReload] = useState<boolean>(false)
    // console.log("🚀 ~ UpgradePlan ~ plansList:", plansList)
    const HTTP_CLIENT = useAPIClient()

    const [editData, setEditData] = useState<any>(null)
    const [isUpgrade, setIsUpgrade] = useState<boolean>(false)
    const [condominuimDetail, setCondominuimDetail] = useState<object | any>(null)


    const { user, role, singleCondominuim } = useSelector((state: RootState) => state.user)
    // console.log("🚀 ~ UpgradePlan ~ user:", user)
    // console.log("🚀 ~ UpgradePlan ~ singleCondominuim:", singleCondominuim)




    const handleUpdate = (item) => {
        // console.log("🚀 ~ handleUpdate ~ item:", item)
        const payload = {
            condominium: condominuimDetail?.condominium,
            _id: condominuimDetail?._id,
            subscriptionPlan: item
        }
        setEditData(payload)
        setIsUpgrade(true)
    }
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

    const handleFetchCondominuim = async () => {
        try {
            setLoading(true)
            const managerId = singleCondominuim?._id ? singleCondominuim?._id : user?._id
            const { data, success }: any = await HTTP_CLIENT.get({ url: `/manager/${managerId}` })
            if (success === true) {
                setCondominuimDetail(data)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setCondominuimDetail(null)

        }
    }

    useEffect(() => {
        if (role === Role_Enums.SUBSCRIBER || role === Role_Enums.ADMIN) {
            handleFetchCondominuim()
        } else {
            router.push("Routes.GATEHOUSE")
        }
    }, [reload])

    useEffect(() => {
        if (role === Role_Enums.SUBSCRIBER || role === Role_Enums.ADMIN) {
            handleFetchPlansInfo()
        } else {
            router.push("Routes.GATEHOUSE")
        }
    }, [])
    return (
        <>
            <div className={classNames(["custom-class", styles.wrapper])}>
                <div className={styles.container}>
                    <div className={styles.header} onClick={goBack}>
                        <IoIosArrowBack /> Plano de atualização

                    </div>
                    {loading ? <HashLoaderCom /> :
                        <>
                            {plansList?.length === 0 ? <NoData /> :
                                plansList?.map((item: any, key: number) => (
                                    <div className="w-full mt-[20px] min-h-[298px] pb-6" key={key}>
                                        <div className="w-full bg-[#FFF9F6] rounded-[10px] p-[26px] box-border">
                                            {/* Left Section */}
                                            <div className="w-full flex justify-between">
                                                <div
                                                    className="bg-primary text-[16px] leading-[27px] text-white rounded-md w-[113px] h-[35px] flex justify-center  items-center font-medium">
                                                    {item?.name}
                                                </div>
                                                <div className="text-right mt-4 hidden md:block">
                                                    <span className="text-2xl font-semibold text-gray-900">{item?.baseLaunchPrice ? calculatePrice(item?.baseLaunchPrice, condominuimDetail?.condominium?.numberOfUnitsInCondominium, item?.launchPricePerTenUnit) : calculatePrice(item?.baseRetailPrice, condominuimDetail?.condominium?.numberOfUnitsInCondominium, item?.retailPricePerTenUnit)}</span>
                                                    {item?.type === "monthly" ? <span className="text-gray-500 text-sm">/Mês</span> : <span className="text-gray-500 text-sm">/Ano</span>}
                                                </div>

                                            </div>
                                            <ul className="mt-4 text-[#707070] space-y-1 text-sm" dangerouslySetInnerHTML={{ __html: item?.details }}>

                                            </ul>
                                            <div className="w-full flex items-center flex-wrap gap-x-2 justify-between">
                                                <div className="mt-3 text-[12px] leading-[14.52px] text-[#707070]">
                                                    <div className="text-right mt-4 block md:hidden">
                                                        <span className="text-2xl font-semibold text-gray-900">{item?.baseLaunchPrice ? calculatePrice(item?.baseLaunchPrice, condominuimDetail?.condominium?.numberOfUnitsInCondominium, item?.launchPricePerTenUnit) : calculatePrice(item?.baseRetailPrice, condominuimDetail?.condominium?.numberOfUnitsInCondominium, item?.retailPricePerTenUnit)}</span>
                                                        {item?.type === "monthly" ? <span className="text-gray-500 text-sm">/Mês</span> : <span className="text-gray-500 text-sm">/Ano</span>}
                                                    </div>
                                                </div>
                                                {condominuimDetail?.subscriptionPlan?._id !== item?._id &&
                                                    <button
                                                        onClick={() => handleUpdate(item)}
                                                        className="bg-primary order-1 md:order-2 text-[16px] leading-[27px] text-white rounded-md w-full mt-5 md:mt-0 md:w-[113px] h-[35px] flex justify-center  items-center font-normal">
                                                        Selecione
                                                    </button>
                                                }
                                            </div>
                                            {condominuimDetail?.subscriptionPlan?._id === item?._id &&
                                                <div className=" mt-3 text-[12px] leading-[14.52px] text-[#707070]">
                                                    <span className="text-primary font-medium">Validade do plano:</span> {moment(condominuimDetail?.planStartingDate).format("DD/MM/YYYY")}
                                                    <span className="ml-4 text-primary font-medium">Data de término:</span> {moment(condominuimDetail?.planExpirationDate).format("DD/MM/YYYY")}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))}
                        </>
                    }
                </div>
            </div>
            {/* {isUpgrade && <UpgradePlanPopup Reload={() => setReload(!reload)} editData={editData} Open={isUpgrade} handleClose={() => setIsUpgrade(false)} title="upgrade" />} */}
            {isUpgrade && <ProofofPaymentPopup isLoginProof={true} Reload={() => setReload(!reload)} editData={editData} Open={isUpgrade} handleClose={() => setIsUpgrade(false)} />}
        </>
    )
}
