"use client"
import classNames from 'classnames';
import { MdEmail } from "react-icons/md";
import styles from "./get-in-touch.module.scss";
import UseGetInTouch from './useLogin';
import { RotatingLines } from 'react-loader-spinner';


const GetInTouch = () => {
    const { formik, loading } = UseGetInTouch()

    return (
        <div className={styles.container} id="contate-nos">
            <div className={classNames(["custom-class", styles.wrapper])}>
                <div className={styles.formWrapper}>
                    <div className={styles.left}>
                        <div className={styles.heading}>
                            Entre em contato com nosso time hoje mesmo!
                        </div>
                        {/* <div className={styles.phone}>
                            <FaPhoneAlt className='text-primary' /> 0425600335
                        </div> */}
                        <div className={styles.phone}>
                            <MdEmail className='text-primary text-[20px] md:text-[27px] min-w-[10px] md:min-w-[15px] lg:min-w-[27px]' /> atendimento@chegousuaencomenda.com.br
                        </div>
                        {/* <div className={styles.location}>
                            <IoLocation className='text-primary' /> Suite 409, 15 Lime Street, Sydney NSW 2000
                        </div> */}
                    </div>
                    <div className={styles.right}>
                        <form onSubmit={formik.handleSubmit} className={styles.form}>
                            <div className={styles.inputParent}>
                                <div className={styles.parentInputField}>
                                    <div className={styles.inputField}>
                                        <input type="text" placeholder='Nome' {...formik.getFieldProps("firstName")} />
                                    </div>
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div className={styles.errorStyle}>
                                            {formik.errors.firstName}
                                        </div>
                                    ) : null}
                                </div>
                                <div className={styles.parentInputField}>
                                    <div className={styles.inputField}>
                                        <input type="text" placeholder='Sobrenome' {...formik.getFieldProps("lastName")} />
                                    </div>
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div className={styles.errorStyle}>
                                            {formik.errors.lastName}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.inputParent}>
                                <div className={styles.parentInputField}>
                                    <div className={styles.inputField}>
                                        <input type="email" placeholder='E-mail' {...formik.getFieldProps("email")} />
                                    </div>
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className={styles.errorStyle}>
                                            {formik.errors.email}
                                        </div>
                                    ) : null}
                                </div>
                                <div className={styles.parentInputField}>
                                    <div className={styles.inputField}>
                                        <input type="text" 
                                        placeholder='Telefone' 
                                        value={formik.values.contact}
                                        onChange={(e) => {
                                          const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                          formik.setFieldValue("contact", numericValue);
                                        }}
                                        // {...formik.getFieldProps("contact")}
                                         />
                                    </div>
                                    {formik.touched.contact && formik.errors.contact ? (
                                        <div className={styles.errorStyle}>
                                            {formik.errors.contact}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.inputFieldText}>
                                <textarea cols={5} rows={5} placeholder='Mensagem' {...formik.getFieldProps("query")} />
                            </div>
                            {formik.touched.query && formik.errors.query ? (
                                        <div className={styles.errorStyle}>
                                            {formik.errors.query}
                                        </div>
                                    ) : null}
                            <div className={styles.btnSection}>
                                <button type='submit' disabled={loading}>
                                    {loading ? <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="25"
                                        visible={true} /> :
                                        "Enviar"
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.cropImage}>
                    <img src="/assets/right-bottom.svg" alt='item' />
                </div>
            </div>
        </div>
    )
}

export default GetInTouch
