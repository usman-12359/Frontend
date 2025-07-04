"use client"
import React from 'react'
import styles from "./add-units.module.scss"
import Modal from '@/components/common/modal'
import UseAddUnits from './useAddUnit';
import { RotatingLines } from 'react-loader-spinner';

export default function AddUnitsPopup(props: any) {
    const { handleClose, Open, editData, isAdmin, Reload } = props;
    const { formik, loading } = UseAddUnits({ editData: editData, handleClose: handleClose, Reload: Reload, Open: Open, })
    return (
        <Modal onClose={handleClose} visible={Open} btn={true} editUnit>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h2 className={styles.heading}>{editData ? "Editar unidade" : "Adicionar unidade"}</h2>
                    <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
                        
                            <div className={styles.inputWrapper}>
                                <label className={styles.title}>{isAdmin ? "ID da unidade" : "Condomínio"}</label>
                                <input  {...formik.getFieldProps("condominuimName")} type="text" disabled />
                                {formik.touched.condominuimName && formik.errors.condominuimName ? (
                                    <div className={styles.errorStyle}>
                                        {formik.errors.condominuimName}
                                    </div>
                                ) : null}
                            </div>
                            
                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>Complemento</label>
                            <input type="text" {...formik.getFieldProps("address")} placeholder="Complemento" />
                            {formik.touched.address && formik.errors.address ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.address}
                                </div>
                            ) : null}
                        </div>

                        {editData &&
                            <div className={styles.inputWrapper}>
                                <label className={styles.title}>Número de destinatários na unidade</label>
                                <input type="text" {...formik.getFieldProps("recipients")} disabled />
                                {formik.touched.recipients && formik.errors.recipients ? (
                                    <div className={styles.errorStyle}>
                                        {formik.errors.recipients}
                                    </div>
                                ) : null}
                            </div>
                        }
                        <button  disabled={loading} type="submit">{loading ? <RotatingLines
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
