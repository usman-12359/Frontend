'use client'
import React, { useContext, useState } from 'react'
import styles from './accept-reject-request.module.scss'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import Modal from '@/components/common/modal'
import useAPIClient from '@/utils/api-client'
interface props {
    handleClose: () => void
    Open: boolean;
    Reload: Function;
    editData: string | any;
}
const AcceptRejectRequestModal = (props: props) => {
    const HTTP_CLIENT = useAPIClient()
    const { handleClose, Open, Reload, editData } = props
    const [loading, setLoading] = useState<boolean>(false)

    const handleRequest = async () => {
        try {
            setLoading(true)
            const { data, success }: any = await HTTP_CLIENT.put({ url: `/manager/${editData?._id}/${editData.clicked === "Accept" ? 1 : 0}` })
            if (success === true) {
                toast.success(data?.message || `Request ${editData.clicked} successfully!`)
            }
            handleClose()
            Reload()
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
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
                    {/* <div className={styles.heading}>Condominuim Request</div> */}
                    <div className={styles.text1}>
                        Are you sure you want to {editData.clicked} the request?
                    </div>
                    <div className={styles.btnsContainer}>
                        <button
                            disabled={loading}
                            type="submit"
                            onClick={() => handleRequest()}
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
                                "Yes"
                            )}{" "}
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            onClick={() => handleClose()}
                            className={styles.cancelBtn}
                        >
                            No
                        </button>

                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AcceptRejectRequestModal
