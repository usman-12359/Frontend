"use client"
import InputMaskCompo from "@/components/common/input-mask/page";
import { MdOutlineArrowBack } from "react-icons/md";
import styles from "./step-one.module.scss";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Routes } from "@/routes";
// import InputMask from "react-input-mask-next"
// import dynamic from "next/dynamic";
// const InputMask = dynamic(() => import("react-input-mask-next"), { ssr: false });
export default function StepOne(props: any) {
  const { formik, handleBack, isDisabled, isCorrectEmail, navigateToHome } = props
  console.log("🚀 ~ StepOne ~ formik:", formik.values)
  const [isPassword, setIsPassword] = useState<boolean>(false)
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(false)
  const [isGateHousePassword, setIsGateHousePassword] = useState<boolean>(false)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftWrapper}>
          <div className={styles.topImg} onClick={navigateToHome}>
            <img src="/logo-with-text.svg" alt="" />
          </div>
          <div className={styles.textSection}>
            <div className={styles.title} onClick={handleBack}><MdOutlineArrowBack /> &nbsp; Passo 1 de 4</div>
            <p className={styles.heading}>Cadastro de novo condomínio</p>
            <div className={styles.paragraph}>
              Informações básicas
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.inputHeading}>E-mail*</div>
            <div className={styles.inputContainer}>
              <input
                type="email"
                className={styles.input}
                placeholder="xxx@xxx.xxx"
                {...formik.getFieldProps("email")}
              />
              {isCorrectEmail === true ? (
                <RxCross1 className={styles.pIcon} />

              ) : isCorrectEmail === false ? (
                <GiCheckMark className={styles.pIcon} />
              ) : null}
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.errorStyle}>
                {formik.errors.email}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Senha*</div>
            <div className={styles.inputContainer}>
              <input
                type={isPassword ? "text" : "password"}
                className={styles.input}
                placeholder="*****************"
                {...formik.getFieldProps("password")}
              />
              {!isPassword ? (
                <IoEyeOutline
                  className="text-lg text-[#707070] cursor-pointer"
                  onClick={() => setIsPassword(!isPassword)}
                />
              ) : (
                <BsEyeSlashFill
                  className="text-lg text-[#707070] cursor-pointer"
                  onClick={() => setIsPassword(!isPassword)}
                />
              )}
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.errorStyle}>
                {formik.errors.password}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Confirmar Senha*</div>
            <div className={styles.inputContainer}>
              <input
                type={isConfirmPassword ? "text" : "password"}
                className={styles.input}
                placeholder="*****************"
                {...formik.getFieldProps("confirmPassword")}
              />
              {!isConfirmPassword ? (
                <IoEyeOutline
                  className="text-lg text-[#707070] cursor-pointer"
                  onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                />
              ) : (
                <BsEyeSlashFill
                  className="text-lg text-[#707070] cursor-pointer"
                  onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                />
              )}
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className={styles.errorStyle}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Nome do condomínio*</div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.input}
                placeholder="Nome do condomínio"
                {...formik.getFieldProps("condominiumName")}
              />
            </div>
            {formik.touched.condominiumName && formik.errors.condominiumName ? (
              <div className={styles.errorStyle}>
                {formik.errors.condominiumName}
              </div>
            ) : null}
            <div className={styles.inputHeading}>CNPJ</div>
            <div className={styles.inputContainer}>
              {/* <input
                type="text"
                className={styles.input}
                placeholder="XX.XXX.XXX/XXXX-XX"
                {...formik.getFieldProps("cnjp")}
              /> */}
              <InputMaskCompo formik={formik} zipCode={false} />
            </div>
            {formik.touched.cnjp && formik.errors.cnjp ? (
              <div className={styles.errorStyle}>
                {formik.errors.cnjp}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Endereco do Condomínio* <br />CEP*</div>
            <div className={styles.inputContainer}>
              <InputMaskCompo formik={formik} zipCode={true} />
            </div>
            {formik.touched.cep && formik.errors.cep ? (
              <div className={styles.errorStyle}>
                {formik.errors.cep}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Logradouro*</div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.input}
                placeholder="Entre"
                {...formik.getFieldProps("logradouro")}
              />
            </div>
            {formik.touched.logradouro && formik.errors.logradouro ? (
              <div className={styles.errorStyle}>
                {formik.errors.logradouro}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Número*</div>
            <div className={styles.inputContainer}>
              <input
                type="number"
                className={styles.input}
                placeholder="Entre"
                {...formik.getFieldProps("numero")}
              />
            </div>
            {formik.touched.numero && formik.errors.numero ? (
              <div className={styles.errorStyle}>
                {formik.errors.numero}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Bairro*</div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.input}
                placeholder="Entre"
                {...formik.getFieldProps("bairro")}
              />
            </div>
            {formik.touched.bairro && formik.errors.bairro ? (
              <div className={styles.errorStyle}>
                {formik.errors.bairro}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Cidade*</div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.input}
                placeholder="Entre"
                {...formik.getFieldProps("cidade")}
              />
            </div>
            {formik.touched.cidade && formik.errors.cidade ? (
              <div className={styles.errorStyle}>
                {formik.errors.cidade}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Estado*</div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.input}
                placeholder="Entre"
                {...formik.getFieldProps("estado")}
              />
            </div>
            {formik.touched.estado && formik.errors.estado ? (
              <div className={styles.errorStyle}>
                {formik.errors.estado}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Complemento</div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.input}
                placeholder="Entre"
                {...formik.getFieldProps("complemento")}
              />
            </div>
            {formik.touched.complemento && formik.errors.complemento ? (
              <div className={styles.errorStyle}>
                {formik.errors.complemento}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Telefone</div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.input}
                value={formik.values.telefone}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, '');
                  formik.setFieldValue("telefone", numericValue);
                }}
                placeholder="(XX)XXXX-XXXX"
              // {...formik.getFieldProps("telefone")}
              />
            </div>
            {formik.touched.telefone && formik.errors.telefone ? (
              <div className={styles.errorStyle}>
                {formik.errors.telefone}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Celular</div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={formik.values.celular}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, '');
                  formik.setFieldValue("celular", numericValue);
                }}
                className={styles.input}
                placeholder="(XX)XXXX-XXXX"
              // {...formik.getFieldProps("celular")}
              />
            </div>
            {formik.touched.celular && formik.errors.celular ? (
              <div className={styles.errorStyle}>
                {formik.errors.celular}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Número de unidades no condomínio <div className="text-xs font-semibold">(apartamentos, casas, quartos, conjuntos, etc)</div></div>
            <div className={styles.inputContainer}>
              <input
                type="number"
                className={styles.input}
                placeholder="XXXX"
                {...formik.getFieldProps("numberOfUnitsInCondominium")}
              />
            </div>
            {formik.touched.numberOfUnitsInCondominium && formik.errors.numberOfUnitsInCondominium ? (
              <div className={styles.errorStyle}>
                {formik.errors.numberOfUnitsInCondominium}
              </div>
            ) : null}
            <div className={styles.inputHeading}>Senha para acesso da portaria*</div>
            <div className={styles.inputContainer}>
              <input
                type={isGateHousePassword ? "text" : "password"}
                className={styles.input}
                placeholder="*****************"
                {...formik.getFieldProps("gatehousePassword")}
              />
              {!isGateHousePassword ? (
                <IoEyeOutline
                  className="text-lg text-[#707070] cursor-pointer"
                  onClick={() => setIsGateHousePassword(!isGateHousePassword)}
                />
              ) : (
                <BsEyeSlashFill
                  className="text-lg text-[#707070] cursor-pointer"
                  onClick={() => setIsGateHousePassword(!isGateHousePassword)}
                />
              )}
            </div>
            {formik.touched.gatehousePassword && formik.errors.gatehousePassword ? (
              <div className={styles.errorStyle}>
                {formik.errors.gatehousePassword}
              </div>
            ) : null}
            <div className="w-full mt-1 2xl:mt-[11px] flex items-center justify-between gap-x-4">
              <input
                type="checkbox"
                className="w-[20%] h-[20px]"
                checked={formik.values.terms ? true : false}
                {...formik.getFieldProps("terms")}
              />
              <span className="text-base">
                Marque esta caixa para confirmar que você leu e aceita os <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${Routes.TERMS_AND_CONDITIONS}`} target="_blank" className="text-primary">Termos e Condições de Uso</a> e a <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${Routes.PRIVACY}`} target="_blank" className="text-primary">Política de Privacidade</a> para utilização do Chegou Sua Encomenda.
              </span>
            </div>
            {formik.touched.terms && formik.errors.terms ? (
              <div className={styles.errorStyle}>
                {formik.errors.terms}
              </div>
            ) : null}
            <div className={styles.btn}>
              <button type="submit"
              // disabled={isDisabled}
              >
                Próximo
              </button>
            </div>
          </form>
        </div>
        <div className={styles.rightContainer}>
          <img src="/assets/sign-up.svg" alt="" />
        </div>
      </div>
    </div>
  )
}
