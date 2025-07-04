import React, { useEffect, useState } from 'react'
import styles from "./recipients.module.scss"
import UseRecipients from './useRecipients';
import Modal from '../../modal';
import { RotatingLines } from 'react-loader-spinner';
import Select from "react-select";
import { usePathname } from 'next/navigation';
import { Routes } from '@/routes';
export default function RecipientsPopup(props: any) {
    const pathname = usePathname()
    const { handleClose, Open, editData, singleRecipient, Reload, unitList, unitId } = props;
    // console.log("🚀 ~ RecipientsPopup ~ unitList:", unitList)
    // console.log("🚀 ~ RecipientsPopup ~ editData:", editData)
    const { formik, loading } = UseRecipients({ editData: editData, unitId:unitId, singleRecipient: singleRecipient, handleClose: handleClose, Reload: Reload })
    // console.log("🚀 ~ RecipientsPopup ~ formik:", formik.errors)

    // const customStyles = {
    //     control: (provided: any, state: any) => ({
    //         ...provided,
    //         height: "47px",
    //         padding: "11.28px 15.38px",
    //         borderWidth: "1.03px",
    //         borderRadius: "8.2px",
    //         marginTop: "8.2px",
    //         cursor: "pointer",
    //         boxShadow: "none",
    //         "&:hover": {
    //             borderColor: state.isFocused ? "#2684FF" : provided.borderColor,
    //         },
    //         "@media (min-width: 1024px)": {
    //             width: "100%",
    //         },
    //         "@media (min-width: 768px) and (max-width: 1023px)": {
    //             width: "100%",
    //         },
    //         "@media (min-width: 480px) and (max-width: 767px)": {
    //             width: "100%",
    //         },
    //     }),
    //     valueContainer: (provided: any) => ({
    //         ...provided,
    //         padding: "0",
    //         "@media (min-width: 1024px)": {
    //             width: "405px",
    //         },
    //         "@media (min-width: 768px) and (max-width: 1023px)": {
    //             width: "280px",
    //         },
    //         "@media (min-width: 480px) and (max-width: 767px)": {
    //             width: "220px",
    //         },
    //     }),
    //     input: (provided: any) => ({
    //         ...provided,
    //         margin: "0",
    //         padding: "0",
    //         outline: "none",
    //     }),
    //     option: (provided: any, state: any) => ({
    //         ...provided,
    //         cursor: "pointer",
    //     }),
    //     menu: (provided: any) => ({
    //         ...provided,
    //         marginTop: "4px",
    //     }),
    //     placeholder: (provided) => ({
    //         ...provided,
    //         color: '#9CA3AF', // Tailwind Gray-400
    //         fontSize: '16px',
    //     }),
    // };
    // const emptyOption = [
    //     { label: "", value: "" }
    // ]

    // const [values, setValues] = useState(null)

    // useEffect(() => {
    //     if (editData && unitList?.length) {
    //         const findUnit = unitList?.find((item) => (item?.unitId === editData?.unitID))
    //         if (findUnit !== undefined) {
    //             setValues({
    //                 label: findUnit?.address, value: editData?.unitId

    //             })
    //         }
    //     }
    // }, [editData])
    return (
        <Modal onClose={handleClose} visible={Open} btn={true}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h2 className={styles.heading}>{editData ? "Editar destinatário" : "Adicionar destinatário"}</h2>
                    <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
                        {/* {!editData && */}
                        {/* <div className={styles.inputWrapper}>
                            <label className={styles.title}>Recipient ID</label>
                            <input  {...formik.getFieldProps("unitID")} type="text" disabled />
                            {formik.touched.unitID && formik.errors.unitID ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.unitID}
                                </div>
                            ) : null}
                        </div> */}
                        {/* // } */}
                        {/* {pathname !== Routes.VIEW_RECIPIENTS &&
                            <div className={styles.inputWrapper}>
                                <label className={styles.title}>ID da unidade</label>
                                <div className="w-full">
                                    <Select
                                        options={unitList?.length === 0 ? emptyOption : unitList?.map((item) => {
                                            return (
                                                { label: item.address, value: item.unitId }
                                            )
                                        })}
                                        value={values}
                                        placeholder="Selecione o ID da unidade"
                                        isSearchable={true}
                                        isClearable={true}
                                        styles={customStyles}
                                        onChange={(option) => {
                                            setValues(option || null);
                                            formik.setFieldValue("unitID", option?.value || "");
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
                                {formik.touched.unitID && formik.errors.unitID ? (
                                    <div className={styles.errorStyle}>
                                        {formik.errors.unitID as string}
                                    </div>
                                ) : null}
                            </div>
                        } */}
                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>Nome</label>
                            <input type="text" {...formik.getFieldProps("name")} placeholder="Nome" />
                            {formik.touched.name && formik.errors.name ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.name}
                                </div>
                            ) : null}
                        </div>

                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>E-mail</label>
                            <input type="text" {...formik.getFieldProps("email")} placeholder="E-mail" />
                            {formik.touched.email && formik.errors.email ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.email}
                                </div>
                            ) : null}
                        </div>

                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>Celular</label>
                            <input type="text"
                                value={formik.values.whatsapp}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                    formik.setFieldValue("whatsapp", numericValue);
                                }}
                                //  {...formik.getFieldProps("whatsapp")}/
                                placeholder="Celular" />
                            {formik.touched.whatsapp && formik.errors.whatsapp ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.whatsapp}
                                </div>
                            ) : null}
                        </div>



                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>Método de notificação preferido</label>
                            <select {...formik.getFieldProps("notificationType")}>
                                <option>Selecionar</option>
                                <option value='sms'>SMS</option>
                                <option value='email'>E-mail</option>
                                <option value='both'>Ambos</option>
                            </select>
                            {formik.touched.notificationType && formik.errors.notificationType ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.notificationType}
                                </div>
                            ) : null}
                        </div>
                        <button disabled={loading} type="submit">{loading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="22"
                            visible={true}
                        /> : editData ? "Atualizar" : "Adicionar"}</button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
