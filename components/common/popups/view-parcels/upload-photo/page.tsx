"use client"
import Modal from '@/components/common/modal';
import { customStyles } from '@/utils/custom-styling';
import { IoMdPhotos } from "react-icons/io";
import { RotatingLines } from 'react-loader-spinner';
import Select from "react-select";
import styles from "./upload.module.scss";
import UseUploadPhoto from './useUploadPhoto';


export default function UploadPhoto(props: any) {
    const { handleClose, Open, editData, singleRecipient, Reload, setActive } = props;
    const { loading, active, handleUploadPhoto,
        // formik, 
        postloading, payload, unitList, fetchRecipients, recipientList, innerFormik,
        recipientValues,
        values,
        setValues,
        setRecipientValues
    } = UseUploadPhoto({ setActive: setActive, Reload: Reload, handleClose: handleClose, editData: editData, singleRecipient: singleRecipient })
        

    const emptyOption = [
        { label: "", value: "" }
    ]

    const handelCancel = () => {
        setActive("un-assigned")
        Reload()
        handleClose()
    }

    return (
        <Modal onClose={handleClose} visible={Open} btn={true} isParcel={true} payload>
            <div className={styles.wrapper}>
                <div className={styles.container}>

                    {active && payload ?
                        <div className={`${styles.formContainer}`}>
                            <h2 className={styles.heading}>Confirmar Unidade e Destinatário da Encomenda</h2>
                            <form className={styles.formWrapper} onSubmit={innerFormik.handleSubmit}>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.title}>Selecionar Unidade</label>
                                    <div className="w-full">
                                        <Select
                                            options={unitList?.length === 0 ? emptyOption : unitList?.map((item) => {
                                                return (
                                                    { label: item.address, value: item.unitId }
                                                )
                                            })}
                                            value={values}
                                            placeholder="Selecionar Unidade"
                                            isSearchable={true}
                                            isClearable={true}
                                            styles={customStyles}
                                            onChange={async (option) => {
                                                setValues(option || null);
                                                await fetchRecipients(option?.value, null)
                                                innerFormik.setFieldValue("unitID", option?.value);
                                            }}
                                            classNames={{
                                                control: () =>
                                                    "flex items-center !h-[47px] !py-0 !px-[15.38px] w-full",
                                                valueContainer: () => "flex items-center p-0",
                                                input: () => "flex items-center m-0 p-0",
                                                indicatorsContainer: () => "flex items-center",
                                            }}
                                            components={{
                                                IndicatorSeparator: () => null,
                                            }}
                                        />
                                    </div>
                                    {innerFormik.touched.unitID && innerFormik.errors.unitID ? (
                                        <div className={styles.errorStyle}>
                                            {innerFormik.errors.unitID as string}
                                        </div>
                                    ) : null}
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.title}>Selecionar Destinatario</label>
                                    <div className="w-full">
                                        <Select
                                            options={recipientList?.length === 0 ? emptyOption : recipientList?.map((item) => {
                                                return (
                                                    { label: item.name, value: item._id }
                                                )
                                            })}
                                            value={recipientValues}
                                            placeholder="Selecionar Destinatario"
                                            isSearchable={true}
                                            isClearable={true}
                                            styles={customStyles}
                                            onChange={(option) => {
                                                setRecipientValues(option || null);
                                                innerFormik.setFieldValue("recipientID", option?.value);
                                            }}
                                            classNames={{
                                                control: () =>
                                                    "flex items-center !h-[47px] !py-0 !px-[15.38px] w-full",
                                                valueContainer: () => "flex items-center p-0",
                                                input: () => "flex items-center m-0 p-0",
                                                indicatorsContainer: () => "flex items-center",
                                            }}
                                            components={{
                                                IndicatorSeparator: () => null,
                                            }}
                                        />
                                    </div>
                                    {innerFormik.touched.recipientID && innerFormik.errors.recipientID ? (
                                        <div className={styles.errorStyle}>
                                            {innerFormik.errors.recipientID as string}
                                        </div>
                                    ) : null}
                                </div>
                                <div className={styles.btnWrapper}>

                                    <button disabled={postloading} type="submit">{postloading ? <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="22"
                                        visible={true}
                                    /> :
                                        "Enviar Notificação"
                                    }
                                    </button>
                                    <button disabled={postloading} className={styles.continue} type="button" onClick={handelCancel}>
                                        Continuar sem destinatário
                                    </button>
                                </div>
                            </form>
                        </div>
                        // : 
                        // active ?
                        //     <div className={`${styles.formContainer} overflow-y-auto`}>
                        //         <h2 className={styles.heading}>Scanned Parcel Details</h2>
                        //         <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
                        //             <div className={styles.inputContainer}>
                        //                 <div className={styles.inputWrapper}>
                        //                     <label className={styles.title}>Fullname</label>
                        //                     <input  {...formik.getFieldProps("fullname")} type="text" placeholder='Enter name' />
                        //                     {formik.touched.fullname && formik.errors.fullname ? (
                        //                         <div className={styles.errorStyle}>
                        //                             {formik.errors.fullname}
                        //                         </div>
                        //                     ) : null}
                        //                 </div>
                        //                 <div className={styles.inputWrapper}>
                        //                     <label className={styles.title}>Email</label>
                        //                     <input type="email" {...formik.getFieldProps("email")} placeholder="Enter email" />
                        //                     {formik.touched.email && formik.errors.email ? (
                        //                         <div className={styles.errorStyle}>
                        //                             {formik.errors.email}
                        //                         </div>
                        //                     ) : null}
                        //                 </div>
                        //             </div>

                        //             <div className={styles.inputContainer}>
                        //                 <div className={styles.inputWrapper}>
                        //                     <label className={styles.title}>Contact</label>
                        //                     <input type="text" {...formik.getFieldProps("contact")} placeholder="Enter contact" />
                        //                     {formik.touched.contact && formik.errors.contact ? (
                        //                         <div className={styles.errorStyle}>
                        //                             {formik.errors.contact}
                        //                         </div>
                        //                     ) : null}
                        //                 </div>

                        //                 <div className={styles.inputWrapper}>
                        //                     <label className={styles.title}>Condominum</label>
                        //                     <input type="text" {...formik.getFieldProps("condominum")} placeholder='Enter condominuim' />
                        //                     {formik.touched.condominum && formik.errors.condominum ? (
                        //                         <div className={styles.errorStyle}>
                        //                             {formik.errors.condominum}
                        //                         </div>
                        //                     ) : null}
                        //                 </div>


                        //             </div>
                        //             <div className={styles.inputContainer}>
                        //                 <div className={styles.inputWrapper}>
                        //                     <label className={styles.title}>Appartment No</label>
                        //                     <input type="text" {...formik.getFieldProps("appartmentNo")} placeholder='Enter appartment no' />
                        //                     {formik.touched.appartmentNo && formik.errors.appartmentNo ? (
                        //                         <div className={styles.errorStyle}>
                        //                             {formik.errors.appartmentNo}
                        //                         </div>
                        //                     ) : null}
                        //                 </div>
                        //                 <div className={styles.inputWrapper}>
                        //                     <label className={styles.title}>Unit</label>
                        //                     <input type="text" {...formik.getFieldProps("unit")} placeholder='Enter unit' />
                        //                     {formik.touched.unit && formik.errors.unit ? (
                        //                         <div className={styles.errorStyle}>
                        //                             {formik.errors.unit}
                        //                         </div>
                        //                     ) : null}
                        //                 </div>
                        //             </div>
                        //             <div className={styles.inputContainer}>
                        //                 <div className={styles.inputWrapper}>
                        //                     <label className={styles.title}>Other</label>
                        //                     <input type="text" {...formik.getFieldProps("other")} placeholder='Enter other' />
                        //                     {formik.touched.other && formik.errors.other ? (
                        //                         <div className={styles.errorStyle}>
                        //                             {formik.errors.other}
                        //                         </div>
                        //                     ) : null}
                        //                 </div>
                        //             </div>
                        //             <div className={styles.btnWrapper}>
                        //                 <button disabled={postloading} type="submit">{postloading ? <RotatingLines
                        //                     strokeColor="white"
                        //                     strokeWidth="5"
                        //                     animationDuration="0.75"
                        //                     width="22"
                        //                     visible={true}
                        //                 /> : editData ? "Update" : "Add"}</button>
                        //             </div>
                        //         </form>
                        //     </div>

                        :
                        <label className={styles.selectPhoto} htmlFor='uploadPhoto'>


                            {loading ?

                                <>
                                    Carregando...
                                    <RotatingLines
                                        strokeColor="#F36B31"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="42"
                                        visible={true}
                                    />
                                </>
                                :
                                <>
                                    <IoMdPhotos size={40} />
                                    Selecione a foto
                                </>

                            }
                            <input disabled={loading} accept="image/png, image/gif, image/jpeg" type="file" id="uploadPhoto" onChange={(event) => handleUploadPhoto(event)} />
                        </label>
                    }
                </div>
            </div>
        </Modal>
    )
}
