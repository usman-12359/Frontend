import React, { useState } from 'react'
import styles from "./upgrade-plan.module.scss"
import Modal from '../../modal'
import useAPIClient from '@/utils/api-client';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
export default function UpgradePlanPopup(props: any) {
    const { handleClose, Open, editData, title, Reload, activeTab } = props;

    const HTTP_CLIENT = useAPIClient()
    const [loading, setLoading] = useState<boolean>(false)
    const updateTitle = title === 'cancel' ? 'cancelar' : title === 'renew' ? 'renovar' : title === 'upgrade' ? 'Atualizar' : title; 
    const handleUpdatePlan = async () => {
        try {
            setLoading(true)
            if (title === "cancel") {
                const { data, success }: any = await HTTP_CLIENT.put({ url: `/manager/cancel-subscription/${editData?._id}` })
                if (success === true) {
                    toast.success(data?.message || "Assinatura cancelada com sucesso!")
                    handleClose()
                    Reload()
                }
            } else if (title === "renew" || title === "upgrade") {

                const { data, success }: any = await HTTP_CLIENT.put({ url: `/manager/update-subscription/${editData?._id}/${editData?.subscriptionPlan?._id}` })
                if (success === true) {
                    toast.success(data?.message || "Assinatura atualizada com sucesso!")
                    handleClose()
                    Reload()
                    if (typeof activeTab === 'function') {
                        activeTab()
                    }
                }
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)

        }
    }
    return (
        <Modal onClose={handleClose} visible={Open} btn={true} isDelete>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h2 className={styles.heading}>Tem certeza que quer {updateTitle} o plano?</h2>
                    <div className={styles.btnsContainer}>
                        <button
                            disabled={loading}
                            type="submit"
                            onClick={() => handleUpdatePlan()}
                            className={styles.deleteBtn}
                        >
                            {loading ?
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="22"
                                    visible={true}
                                />
                                :
                                "Sim"
                            }
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            onClick={() => handleClose()}
                            className={styles.cancelBtn}
                        >
                            Não
                        </button>

                    </div>
                </div>
            </div>
        </Modal>
    )
}
