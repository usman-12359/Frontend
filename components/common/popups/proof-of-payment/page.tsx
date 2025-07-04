import { saveIsProof } from '@/store/reducers/userReducer';
import useAPIClient from '@/utils/api-client';
import { calculatePrice } from '@/utils/custom-functions';
import { AddProofSchema } from '@/utils/schema';
import { useFormik } from 'formik';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { CiFileOn } from 'react-icons/ci';
import { RxCrossCircled } from 'react-icons/rx';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '../../modal';
import styles from "./proof-of-payment.module.scss";

export default function ProofofPaymentPopup(props: any) {
    const { handleClose, Open, editData, Reload, isLoginProof, isPendingProof } = props;


    const QRString = '00020126580014br.gov.bcb.pix0136e1f2aacb-944d-4ae3-a4d0-dff197ae37815204000053039865802BR5921ARDR TECNOLOGIAS LTDA6008CURITIBA622505216nqIAH0yTR2eBMzcQIwy76304511A'
    const HTTP_CLIENT = useAPIClient()
    const [loading, setLoading] = useState<boolean>(false)
    const [selectFile, setSelectFile] = useState(null);
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            proofOfPayment: null
        },
        enableReinitialize: true,
        validationSchema: AddProofSchema,
        onSubmit: async (values) => {
            const formData = new FormData()
            formData.append("file", values.proofOfPayment)
            try {
                setLoading(true)
                if (isPendingProof) {
                    const { data, success }: any = await HTTP_CLIENT.put({ url: `/manager/update-subscription/${editData?.subscriptionrequest?.subscriberId}/${editData?.subscriptionrequest?.subscriptionId}/1`, data: formData })
                    if (success === true) {
                        toast.success("Assinatura atualizada com sucesso!")
                        handleClose()
                        Reload()
                        dispatch((saveIsProof(false)))
                    }
                } else {
                    const { data, success }: any = await HTTP_CLIENT.put({ url: `/manager/update-subscription/${editData?._id}/${editData?.subscriptionPlan?._id}/0`, data: formData })
                    if (success === true) {
                        toast.success("Assinatura atualizada com sucesso!")
                        handleClose()
                        Reload()
                        dispatch((saveIsProof(false)))
                    }
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)

            }
        },
    });
    const [uploadProof, setUploadProof] = useState<boolean>(false)
    const handleUpdatePlan = async () => {
        try {
            setUploadProof(true)

            const { data, success }: any = await HTTP_CLIENT.put({ url: `/manager/update-subscription/${editData?._id}/${editData?.subscriptionPlan?._id}/0`, data: null })
            if (success === true) {
                toast.success("Assinatura atualizada com sucesso!")
                handleClose()
                Reload()
            }
            setUploadProof(false)
        } catch (error) {
            setUploadProof(false)

        }
    }
    // const handleUpdatePlan = async () => {
    //     try {
    //         setLoading(true)
    //         if (title === "cancel") {
    //             const { data, success }: any = await HTTP_CLIENT.put({ url: `/manager/cancel-subscription/${editData?._id}` })
    //             if (success === true) {
    //                 toast.success(data?.message || "Subscription canceled successfully!")
    //                 handleClose()
    //                 Reload()
    //             }
    //         } else if (title === "renew" || title === "upgrade") {

    //             const { data, success }: any = await HTTP_CLIENT.put({ url: `/manager/update-subscription/${editData?._id}/${editData?.subscriptionPlan?._id}` })
    //             if (success === true) {
    //                 toast.success(data?.message || "Subscription upgraded successfully!")
    //                 handleClose()
    //                 Reload()
    //                 if (typeof activeTab === 'function') {
    //                     activeTab()
    //                 }
    //             }
    //         }
    //         setLoading(false)
    //     } catch (error) {
    //         setLoading(false)

    //     }
    // }



    return (
        <Modal onClose={handleClose} visible={Open} btn={true} editCondominuim>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <form onSubmit={formik.handleSubmit} className={styles.leftWrapper}>
                        <div className={styles.textSection}>
                            <div className={styles.pricePlan}>
                                <span className={styles.planText}>{isPendingProof ? editData?.subscriptionrequest?.subscriptionPackage?.name : editData?.subscriptionPlan?.name}</span>
                            </div>
                            {isPendingProof ?
                                <>
                                    <div className={styles.textOne}>
                                        De{" "} <span className='line-through'>{calculatePrice(editData?.subscriptionrequest?.subscriptionPackage?.baseRetailPrice, editData?.condominium?.numberOfUnitsInCondominium, editData?.subscriptionrequest?.subscriptionPackage?.retailPricePerTenUnit)}</span> {" "}
                                        Por {calculatePrice(editData?.subscriptionrequest?.subscriptionPackage?.baseLaunchPrice, editData?.condominium?.numberOfUnitsInCondominium, editData?.subscriptionrequest?.subscriptionPackage?.launchPricePerTenUnit)}</div>
                                    <div className={styles.textOne}>{editData?.subscriptionrequest?.subscriptionPackage?.type === "monthly" ? "" : `${editData?.subscriptionrequest?.subscriptionPackage?.baseLaunchPrice ? calculatePrice((editData?.subscriptionrequest?.subscriptionPackage?.baseLaunchPrice / 12), editData?.condominium?.numberOfUnitsInCondominium, (editData?.subscriptionrequest?.subscriptionPackage?.launchPricePerTenUnit / 12)) : calculatePrice((editData?.subscriptionrequest?.subscriptionPackage?.baseRetailPrice / 12), editData?.condominium?.numberOfUnitsInCondominium, (editData?.subscriptionrequest?.subscriptionPackage?.retailPricePerTenUnit / 12))} / Mês`}</div>
                                </>
                                :
                                <>
                                    <div className={styles.textOne}>
                                        De{" "} <span className='line-through'>{calculatePrice(editData?.subscriptionPlan?.baseRetailPrice, editData?.condominium?.numberOfUnitsInCondominium, editData?.subscriptionPlan?.retailPricePerTenUnit)}</span> {" "}
                                        Por {calculatePrice(editData?.subscriptionPlan?.baseLaunchPrice, editData?.condominium?.numberOfUnitsInCondominium, editData?.subscriptionPlan?.launchPricePerTenUnit)}</div>
                                    <div className={styles.textOne}>{editData?.subscriptionPlan?.type === "monthly" ? "" : `${editData?.subscriptionPlan?.baseLaunchPrice ? calculatePrice((editData?.subscriptionPlan?.baseLaunchPrice / 12), editData?.condominium?.numberOfUnitsInCondominium, (editData?.subscriptionPlan?.launchPricePerTenUnit / 12)) : calculatePrice((editData?.subscriptionPlan?.baseRetailPrice / 12), editData?.condominium?.numberOfUnitsInCondominium, (editData?.subscriptionPlan?.retailPricePerTenUnit / 12))} / Mês`}</div>
                                </>
                            }
                            <div className={styles.qrImg}>
                                <QRCodeSVG value={QRString} size={200} level="H" includeMargin={true} />
                            </div>
                            {selectFile ?
                                <div className={styles.selectFile}>{selectFile}  <RxCrossCircled onClick={() => setSelectFile(null)} className='text-xl text-red-500' />
                                </div>
                                :
                                <label htmlFor='fileSelect' className={styles.selectFile}>Carregar comprovante de pagamento <CiFileOn className='text-xl text-textColor' />
                                    <input
                                        accept='image/*,.pdf'
                                        type="file"
                                        id="fileSelect"
                                        onChange={(e) => {
                                            formik.setFieldValue("proofOfPayment", e.target.files[0])
                                            setSelectFile(e.target.files[0]?.name)
                                        }
                                        } />
                                </label>
                            }
                            {formik.errors.proofOfPayment ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.proofOfPayment as string}
                                </div>
                            ) : null}
                            <div className={styles.copyEmail}> Chave Pix (e-mail): <label>assinatura@chegousuaencomenda.com.br</label></div>
                            <div className={styles.copyEmail}> Envie o comprovante de pagamento para o endereço <label>assinatura@chegousuaencomenda.com</label></div>
                            <div className={styles.copyTxt}> Seu plano será ativado em até 24h após recebermos o comprovante de pagamento.</div>
                            <div className={styles.copyTxt}> Anexe o comprovante de pagamento em até 7 dias. A solicitação poderá ser rejeitada até que o pagamento seja confirmado</div>
                        </div>
                        <div className={styles.btnSection}>
                            <button disabled={uploadProof || loading} type='submit'>
                                {loading ?
                                    <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="22"
                                        visible={true}
                                    /> : "continuar com a prova"
                                }
                            </button>
                            {isLoginProof &&
                                <button className={styles.cancelInfo} onClick={handleUpdatePlan} disabled={uploadProof || loading} type='button'>
                                    {uploadProof ?
                                        <RotatingLines
                                            strokeColor="#F36B31"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="22"
                                            visible={true}
                                        /> : "Continuar sem provas"
                                    }
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
