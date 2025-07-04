'use client'
import React, { useContext, useState } from 'react'
import styles from './delete.module.scss'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import Modal from '@/components/common/modal'
import useAPIClient from '@/utils/api-client'
import { useRouter } from 'next/navigation'
import { Routes } from '@/routes'
interface props {
    handleClose: () => void
    Open: boolean;
    Reload: Function;
    editData: string | any;
}
const DeleteCondominuimModal = (props: props) => {
    const HTTP_CLIENT = useAPIClient()
    const { handleClose, Open, editData } = props
    // console.log("🚀 ~ DeleteModal ~ chat:", chat)
    // console.log("🚀 ~ DeleteModal ~ editData:", editData)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    // console.log("🚀 ~ DeleteModal ~ DataItems:", DataItems)

    const handleDelete = async () => {
        try {
            setLoading(true)
            const { data, success }: any = await HTTP_CLIENT.delete({ url: `/manager/${editData?._id}` })
            if (success === true) {
                toast.success('Gerente excluído com sucesso')
            }
            handleClose()
            router.push(Routes.ADMIN)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            // console.log("🚀 ~ deleteConversation ~ error:", error)
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <Modal
            onClose={handleClose}
            visible={Open}
            btn={true}
            isDelete
        >

            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.heading}>Excluir Condomínio</div>
                    <div className={styles.text1}>
                        Tem certeza de que deseja excluir?
                    </div>
                    <div className={styles.btnsContainer}>
                        <button
                            disabled={loading}
                            type="submit"
                            onClick={() => handleDelete()}
                            className={styles.deleteBtn}
                        >
                            {loading ? (
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="22"
                                    visible={true}
                                />
                            ) : (
                                "Sim"
                            )}{" "}
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

export default DeleteCondominuimModal
