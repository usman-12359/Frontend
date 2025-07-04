import React from 'react'
import styles from "./edit-condominuim.module.scss"
import Modal from '@/components/common/modal';
import UseCondominuim from './useEditCondominuim';
import { RotatingLines } from 'react-loader-spinner';
import InputMaskCompo from '@/components/common/input-mask/page';
import { Role_Enums } from '@/utils/enum/page';
import moment from 'moment';
export default function EditCondominuimPopup(props: any) {
    const { handleClose, Open, editData, Reload, activeTab } = props;
    const { formik, loading, showGateHousePassword,
        showPassword,
        setShowPassword,
        setShowGateHousePassword,
        plansList,
        role } = UseCondominuim({ activeTab: activeTab, editData: editData, handleClose: handleClose, Reload: Reload })
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <Modal onClose={handleClose} visible={Open} btn={true} editCondominuim>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h2 className={styles.heading}>{editData ? "Editar Condomínio" : "Criar Condomínio"}</h2>
                    <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">E-mail*</label>
                                <input
                                    type="email"
                                    disabled={editData ? true : false}
                                    {...formik.getFieldProps("email")}
                                    className="min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md"
                                    placeholder="xxx@xxx.xxx"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-500 text-xs">{formik.errors.email}</div>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium">Senha*</label>
                                <div className='flex items-center border rounded min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border  w-full justify-between'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...formik.getFieldProps("password")}
                                        className="w-full p-2 outline-none"
                                        placeholder="*****************"
                                    />
                                    <div
                                        onClick={togglePasswordVisibility}
                                        className="flex items-center cursor-pointer"
                                    >
                                        {showPassword ? (
                                            // Eye icon (hidden password)
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                            </svg>
                                        ) : (
                                            // Eye-off icon (visible password)
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-red-500 text-xs">{formik.errors.password}</div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Nome do condominio*</label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("condominiumName")}
                                    className="min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md"
                                    placeholder="Nome do condominio"
                                />
                                {formik.touched.condominiumName && formik.errors.condominiumName && (
                                    <div className="text-red-500 text-xs">{formik.errors.condominiumName}</div>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium">CNPJ</label>
                                {/* <input
                                    type="text"
                                    {...formik.getFieldProps("cnjp")}
                                    className="w-full p-2 border rounded"
                                    placeholder="XX.XXX.XXX/XXXX-XX"
                                /> */}
                                <div className='w-full border rounded'>
                                    <InputMaskCompo formik={formik} zipCode={false} />
                                </div>
                                {/* {formik.touched.cnjp && formik.errors.cnjp && (
                                    <div className="text-red-500 text-xs">{formik.errors.cnjp}</div>
                                )} */}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-[22px] leading-[26px]">Endereco do condominio*</label>
                                <label className="block font-medium text-[18px] leading-[21.7px] mt-0 lg:mt-2">CEP*</label>
                                {/* <input
                                    type="text"
                                    {...formik.getFieldProps("cep")}
                                    className="w-full p-2 border rounded"
                                    placeholder="121.121"
                                /> */}
                                <div className='w-full border rounded'>
                                    <InputMaskCompo formik={formik} zipCode={true} />
                                </div>
                                {formik.touched.cep && formik.errors.cep && (
                                    <div className="text-red-500 text-xs">{formik.errors.cep}</div>
                                )}
                            </div>

                            <div className='mt-0 sm:mt-12 lg:mt-[23px]'>
                                <label className="block font-medium mt-0 lg:mt-2">Logradouro*</label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("logradouro")}
                                    className="min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md"
                                    placeholder="Enter"
                                />
                                {formik.touched.logradouro && formik.errors.logradouro && (
                                    <div className="text-red-500 text-xs">{formik.errors.logradouro}</div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Número*</label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("numero")}
                                    className="min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md"
                                    placeholder="Enter"
                                />
                                {formik.touched.numero && formik.errors.numero && (
                                    <div className="text-red-500 text-xs">{formik.errors.numero}</div>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium">Bairro*</label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("bairro")}
                                    className="min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md"
                                    placeholder="Enter"
                                />
                                {formik.touched.bairro && formik.errors.bairro && (
                                    <div className="text-red-500 text-xs">{formik.errors.bairro}</div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Cidade*</label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("cidade")}
                                    className="min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md"
                                    placeholder="Enter"
                                />
                                {formik.touched.cidade && formik.errors.cidade && (
                                    <div className="text-red-500 text-xs">{formik.errors.cidade}</div>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium">Estado*</label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("estado")}
                                    className="min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md"
                                    placeholder="Enter"
                                />
                                {formik.touched.estado && formik.errors.estado && (
                                    <div className="text-red-500 text-xs">{formik.errors.estado}</div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Complemento</label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("complemento")}
                                    className="min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md"
                                    placeholder="Enter"
                                />
                                {formik.touched.complemento && formik.errors.complemento && (
                                    <div className="text-red-500 text-xs">{formik.errors.complemento}</div>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium">Telefone</label>
                                <input
                                    type="text"
                                    value={formik.values.telefone}
                                    onChange={(e) => {
                                        const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                        formik.setFieldValue("telefone", numericValue);
                                    }}
                                    // {...formik.getFieldProps("telefone")}
                                    className="min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md"
                                    placeholder="Enter"
                                />
                                {formik.touched.telefone && formik.errors.telefone && (
                                    <div className="text-red-500 text-xs">{formik.errors.telefone}</div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Celular</label>
                                <input
                                    type="text"
                                    value={formik.values.celular}
                                    onChange={(e) => {
                                        const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                        formik.setFieldValue("celular", numericValue);
                                    }}
                                    // {...formik.getFieldProps("celular")}
                                    className="min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md"
                                    placeholder="Enter"
                                />
                                {formik.touched.celular && formik.errors.celular && (
                                    <div className="text-red-500 text-xs">{formik.errors.celular}</div>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium">Número de unidades no condomínio</label>
                                <input
                                    type="text"
                                    value={formik.values.numberOfUnitsInCondominium}
                                    onChange={(e) => {
                                        const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                        formik.setFieldValue("numberOfUnitsInCondominium", numericValue);
                                    }}
                                    disabled={true}
                                    // {...formik.getFieldProps("numberOfUnitsInCondominium")}
                                    className="min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md"
                                    placeholder="XXXX"
                                />
                                {formik.touched.numberOfUnitsInCondominium && formik.errors.numberOfUnitsInCondominium && (
                                    <div className="text-red-500 text-xs">{formik.errors.numberOfUnitsInCondominium}</div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Senha para acesso da portaria*</label>
                                <div className='flex items-center justify-between min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border border w-full rounded-md'>
                                    <input
                                        type={showGateHousePassword ? "text" : "password"}
                                        {...formik.getFieldProps("gatehousePassword")}
                                        className="w-full p-2 outline-none"
                                        placeholder="*****************"
                                    />
                                    <div
                                        onClick={() => setShowGateHousePassword(!showGateHousePassword)}
                                        className="flex items-center cursor-pointer"
                                    >
                                        {showGateHousePassword ? (
                                            // Eye icon (hidden password)
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                            </svg>
                                        ) : (
                                            // Eye-off icon (visible password)
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                {formik.touched.gatehousePassword && formik.errors.gatehousePassword && (
                                    <div className="text-red-500 text-xs">{formik.errors.gatehousePassword}</div>
                                )}
                            </div>
                            {role === Role_Enums.ADMIN &&
                                <div>
                                    <label className="block font-medium">Selecione o plano</label>
                                    <div className=' flex items-center justify-between min-h-[50px] px-2 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none box-border border w-full rounded-md'>
                                        <select {...formik.getFieldProps("subscriptionID")} className='w-full h-full outline-none'>
                                            <option>Selecione o plano</option>
                                            {plansList?.length > 0 && plansList?.map((item: any, key: number) => (
                                                <option value={item?._id} key={key}>{item?.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {formik.touched.subscriptionID && formik.errors.subscriptionID ? (
                                        <div className="text-red-500 text-xs">
                                            {formik.errors.subscriptionID}
                                        </div>
                                    ) : null}
                                </div>
                            }
                        </div>
                        {role === Role_Enums.ADMIN &&
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium">Data de expiração do plano</label>
                                    <div className=' flex items-center justify-between min-h-[50px] px-2 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none box-border border w-full rounded-md'>
                                        <input
                                            type="date"
                                            min={moment().format("YYYY-MM-DD")}
                                            {...formik.getFieldProps("planExpirationDate")}
                                            className="w-full p-2 outline-none"
                                        />
                                    </div>
                                    {formik.touched.planExpirationDate && formik.errors.planExpirationDate ? (
                                        <div className="text-red-500 text-xs">
                                            {formik.errors.planExpirationDate}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        }
                        <button type="submit">{
                            loading ? <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="22"
                                visible={true}
                            /> :
                                editData ? "Atualizar" : "Criar"}</button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
