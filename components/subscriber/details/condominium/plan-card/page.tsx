"use client"
import UpgradePlanPopup from "@/components/common/popups/upgrade-plan/page";
import { saveSingleCondominuim } from "@/store/reducers/userReducer";
import { RootState } from "@/store/store";
import { calculatePrice, formatBRLCurrency } from "@/utils/custom-functions";
import { Role_Enums } from "@/utils/enum/page";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgMoreVertical } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import styles from "./plan.module.scss"
import ProofofPaymentPopup from "@/components/common/popups/proof-of-payment/page";
import { Routes } from "@/routes";

const PlanCard = (props: any) => {
    const { plan, Reload, activeTab } = props
    // console.log("🚀 ~ PlanCard ~ plan:", plan)
    const [menuOpen, setMenuOpen] = useState(false);
    const { push } = useRouter()

    const [editData, setEditData] = useState<any>(null)

    const [isCancel, setIsCancel] = useState<boolean>(false)
    const [isRenew, setIsRenew] = useState<boolean>(false)
    const [isUpgrade, setIsUpgrade] = useState<boolean>(false)
    const { role } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()



    // handle Cacel plan
    const handleCancelPlan = (item: any, status: string) => {
        setEditData(item)
        if (status === "cancel") {
            setIsCancel(true)
        } else if (status === "upgrade") {
            setIsUpgrade(true)
        } else if (status === "renew") {
            setIsRenew(true)
        }
    }

    function validateDate(targetDateString) {
        if (!targetDateString) return
        const targetDate = moment(targetDateString);
        const currentDate = moment();
        return currentDate.isSameOrBefore(targetDate);
    }


    const handleNavigateToPlan = () => {
        if (role === Role_Enums.ADMIN) {
            dispatch(saveSingleCondominuim(plan))
            push(Routes.PLAN)
        } else {
            push(Routes.PLAN)
        }
    }
    return (
        <>
            {plan?.planStatus === 'cancelled' || plan?.subscriptionPlan === null ?
                <div className="w-full mt-[20px] min-h-[100px] pb-6">
                    <h2 className="text-[18px] leading-[27px] font-medium mb-[14px] text-textColor">Plano Atual</h2>
                    <div className="w-full bg-[#FFF9F6] rounded-[10px] min-h-[100px] p-[26px] box-border flex justify-between items-center">
                        <div className="flex flex-col items-start font-medium">
                            <div className="text-[#191720] text-[32px] leading-[30px]">Você ainda não tinha nenhum plano de assinatura</div>
                            <div className="text-[#707070] text-[14px] leading-[30px] font-normal mt-3">Você ainda não tem nenhuma assinatura. Se quiser continuar, atualize seu plano agora.</div>
                        </div>
                        <div onClick={() => handleNavigateToPlan()} className="bg-primary cursor-pointer text-[16px] leading-[27px] text-white rounded-md w-[113px] h-[35px] flex justify-center  items-center font-medium">
                            Atualizar
                        </div>
                    </div>
                </div>
                : plan?.planStatus === 'pending' ?
                    <div className="w-full mt-[20px] min-h-[100px] pb-6">
                        <h2 className="text-[18px] leading-[27px] font-medium mb-[14px] text-textColor">Plano Atual</h2>
                        <div className="w-full bg-[#FFF9F6] rounded-[10px] min-h-[100px] p-[26px] box-border flex justify-between items-center">
                            <div className="flex flex-col items-start font-medium">
                                <div className="text-[#191720] text-[32px] leading-[30px]">Você ainda não tinha nenhum plano de assinatura</div>
                                <div className="text-[#707070] text-[14px] leading-[30px] font-normal mt-3">Você ainda não tem nenhuma assinatura. Se quiser continuar, atualize seu plano agora.</div>
                            </div>
                            {/* <div onClick={() => handleNavigateToPlan()} className="bg-primary cursor-pointer text-[16px] leading-[27px] text-white rounded-md w-[113px] h-[35px] flex justify-center  items-center font-medium">
                            Atualizar 
                        </div> */}
                        </div>
                    </div>
                    :
                    //       plan?.planStatus === "pending" ?
                    //       <div className="w-full mt-[20px] min-h-[100px] pb-6">
                    //       <h2 className="text-[18px] leading-[27px] font-medium mb-[14px] text-textColor">Plan Info</h2>
                    //       <div className="w-full bg-[#FFF9F6] rounded-[10px] min-h-[100px] p-[26px] box-border flex justify-between items-center">
                    //           <div className="flex flex-col items-start font-medium">
                    //               <div className="text-[#191720] text-[32px] leading-[30px]">Your subscription plan request is pending admin approval.</div>
                    //               <div className="text-[#707070] text-[14px] leading-[30px] font-normal mt-3">You didn't have any subscription yet. if you want to continue other plan then please upgrade your plan.</div>
                    //           </div>
                    //           <div onClick={() => handleNavigateToPlan()} className="bg-primary cursor-pointer text-[16px] leading-[27px] text-white rounded-md w-[113px] h-[35px] flex justify-center  items-center font-medium">
                    //               Upgrade
                    //           </div>
                    //       </div>
                    //   </div>
                    //       :
                    <div className="w-full mt-[20px] min-h-[298px] pb-6">
                        <h2 className="text-[18px] leading-[27px] font-medium mb-[14px] text-textColor">Plano Atual</h2>
                        <div className="w-full bg-[#FFF9F6] rounded-[10px] p-[26px] box-border">
                            {/* Left Section */}
                            <div className="w-full flex justify-between items-end">
                                <div className="bg-primary text-[16px] leading-[27px] text-white rounded-md w-[113px] h-[35px] flex justify-center  items-center font-medium">
                                    {plan?.subscriptionPlan?.name}
                                </div>
                                <div className="relative mt-4 md:mt-0">
                                    {/* More Options Button */}
                                    <button
                                        onClick={() => setMenuOpen(!menuOpen)}
                                        className="p-2 rounded-full hover:bg-gray-200"
                                    >
                                        <CgMoreVertical size={20} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {menuOpen &&
                                        <div className=" max-w-[245px] px-4 absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 font-normal z-10">
                                            <button className="block py-2 w-full  text-[12px] leading-[21.78px] text-left border-b hover:text-primary" onClick={() => handleCancelPlan(plan, "renew")}>Renovar plano</button>
                                            <button className="block py-2 w-full text-[12px] leading-[21.78px] text-left border-b hover:text-primary" onClick={() => handleNavigateToPlan()}>Melhorar plano</button>
                                            <button className="block py-2 w-full text-[12px] leading-[21.78px] text-left hover:text-primary" onClick={() => handleCancelPlan(plan, "cancel")}>
                                                {role === Role_Enums.ADMIN ? "Cancelar assinatura" : "Gerenciar/Cancelar assinatura"}
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                            <ul className={styles.listedItems} dangerouslySetInnerHTML={{ __html: plan?.subscriptionPlan?.details }}>

                            </ul>
                            <div className="w-full flex items-center flex-wrap gap-x-2 justify-between">
                                <div className="mt-3 text-[12px] leading-[14.52px] text-[#707070] order-2 md:order-1 flex flex-col sm:flex-row gap-x-4 gap-y-2 items-start">
                                    {validateDate(plan?.planExpirationDate) ?
                                        <>
                                            <label>
                                                <span className="text-primary font-medium">Validade do plano::</span> {moment(plan?.planStartingDate).format("DD/MM/YYYY")}
                                            </label>
                                            <label>
                                                <span className="ml-0 md:ml-4 text-primary font-medium">Data de término:</span> {moment(plan?.planExpirationDate).format("DD/MM/YYYY")}
                                            </label>
                                        </>
                                        :
                                        <label className="text-[#EB001B] text-[16px] leading-[100%] font-medium">
                                            {
                                                plan?.planStatus === "pending" ?
                                                    'O plano atual precisa de aprovação do administrador.'
                                                    :
                                                    'Seu plano atual expirou. Se você quiser continuar, renove ou atualize seu plano.'
                                            }
                                        </label>
                                    }

                                </div>
                                <div className="text-right mt-4 order-1 md:order-2">
                                    {/* <div className={styles.textOne}>De <span className='line-through'>{calculatePrice(editData?.subscriptionPlan?.baseRetailPrice, editData?.condominium?.numberOfUnitsInCondominium, editData?.subscriptionPlan?.retailPricePerTenUnit)}</span> {" "} */}
                                    {/* Por {calculatePrice(editData?.subscriptionPlan?.baseLaunchPrice, editData?.condominium?.numberOfUnitsInCondominium, editData?.subscriptionPlan?.launchPricePerTenUnit)}</div> */}
                                    {/* <div className={styles.textOne}>{editData?.subscriptionPlan?.type === "monthly" ? "" : `${editData?.subscriptionPlan?.baseLaunchPrice ? calculatePrice((editData?.subscriptionPlan?.baseLaunchPrice / 12), editData?.condominium?.numberOfUnitsInCondominium, (editData?.subscriptionPlan?.launchPricePerTenUnit / 12)) : calculatePrice((editData?.subscriptionPlan?.baseRetailPrice / 12), editData?.condominium?.numberOfUnitsInCondominium, (editData?.subscriptionPlan?.retailPricePerTenUnit / 12))} / Mês`}</div> */}

                                    <span className="text-2xl font-semibold text-gray-900">{plan?.subscriptionPlan?.baseLaunchPrice ? calculatePrice(plan?.subscriptionPlan?.baseLaunchPrice, plan?.condominium?.numberOfUnitsInCondominium, plan?.subscriptionPlan?.launchPricePerTenUnit) : calculatePrice(plan?.subscriptionPlan?.baseRetailPrice, plan?.condominium?.numberOfUnitsInCondominium, plan?.subscriptionPlan?.retailPricePerTenUnit)}</span>
                                    <span className="text-gray-500 text-sm">{plan?.subscriptionPlan?.type === "monthly" ? "/Mês" : "/Ano" }</span>
                                </div>
                            </div>
                            {/* {plan?.cancelledSubscription &&
                                    <div className="text-primary text-[16px] leading-[100%] font-medium mt-2">
                                        Your current subscription plan has been applied for cancellation.
                                    </div>
                                } */}
                        </div>
                    </div>
            }

            {isCancel && <UpgradePlanPopup activeTab={activeTab} Reload={Reload} editData={editData} Open={isCancel} handleClose={() => setIsCancel(false)} title="cancel" />}
            {/* {isRenew && <UpgradePlanPopup activeTab={activeTab} Reload={Reload} editData={editData} Open={isRenew} handleClose={() => setIsRenew(false)} title="renew" />} */}
            {isUpgrade && <UpgradePlanPopup activeTab={activeTab} Reload={Reload} editData={editData} Open={isUpgrade} handleClose={() => setIsUpgrade(false)} title="upgrade" />}
            {isRenew && <ProofofPaymentPopup isLoginProof={true} Reload={Reload} editData={editData} Open={isRenew} handleClose={() => setIsRenew(false)} />}

        </>
    );
};

export default PlanCard;