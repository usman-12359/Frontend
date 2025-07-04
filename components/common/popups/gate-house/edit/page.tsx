"use client";
import Modal from "@/components/common/modal";
import { customStyles } from "@/utils/custom-styling";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import Select from "react-select";
import styles from "./edit-for-gate-house.module.scss";
import UseEditForGateHouse from "./useEdit";

export default function EditModalForGateHouse(props: any) {
  const { handleClose, Open, editData, Reload, tab, active, collectDisplay } =
    props;
  const {
    formik,
    updateCollectedStatus,
    loading,
    editLoading,
    unitList,
    recipientList,
    fetchRecipients,
    setValues,
    values,
    setRecipientValues,
    recipientValues,
    recipientLoading,
    unitLoading,
  } = UseEditForGateHouse({
    tab: tab,
    editData: editData,
    handleClose: handleClose,
    Reload: Reload,
  });

  const emptyOption = [{ label: "", value: "" }];

  return (
    <Modal onClose={handleClose} visible={Open} btn={true} editUnit>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Editar pacote</h2>
          <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
            {/* <div className={styles.inputWrapper}>
                            <label className={styles.title}>Condominium ID</label>
                            <input {...formik.getFieldProps("condominiumId")} type="text" />
                        </div> */}
            <div className={styles.inputWrapper}>
              <label className={styles.title}>Selecione o ID da unidade</label>
              <div className="w-full">
                <Select
                  options={
                    unitList?.length === 0
                      ? emptyOption
                      : unitList?.map((item) => {
                          return { label: item.address, value: item.unitId };
                        })
                  }
                  isLoading={unitLoading}
                  value={values}
                  placeholder="Selecione o ID da unidade"
                  isSearchable={true}
                  isClearable={true}
                  styles={customStyles}
                  onChange={async (option) => {
                    setValues(option || null);
                    await fetchRecipients(option?.value);
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
              {/* <input {...formik.getFieldProps("unitID")} type="text" /> */}
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.title}>
                Selecione o ID do destinatário
              </label>
              <div className="w-full">
                <Select
                  options={
                    recipientList?.length === 0
                      ? emptyOption
                      : recipientList?.map((item) => {
                          return { label: item.name, value: item._id };
                        })
                  }
                  isLoading={recipientLoading}
                  value={recipientValues}
                  placeholder="Selecione o ID do destinatário"
                  isSearchable={true}
                  isClearable={true}
                  styles={customStyles}
                  onChange={(option) => {
                    setRecipientValues(option || null);
                    formik.setFieldValue("recipientID", option?.value || "");
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
              {formik.touched.recipientID && formik.errors.recipientID ? (
                <div className={styles.errorStyle}>
                  {formik.errors.recipientID as string}
                </div>
              ) : null}
            </div>
            {/* <div className={styles.inputWrapper}>
                            <label className={styles.title}>Recipient Name</label>
                            <input type="text" {...formik.getFieldProps("fullName")} placeholder="Enter name" />
                            {formik.touched.fullName && formik.errors.fullName ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.fullName}
                                </div>
                            ) : null}
                        </div> */}

            {/* <div className={styles.inputWrapper}>
                            <label className={styles.title}>Address Condominium</label>
                            <input type="text" {...formik.getFieldProps("addressCondominium")} placeholder="Enter address condominium" />
                            {formik.touched.addressCondominium && formik.errors.addressCondominium ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.addressCondominium}
                                </div>
                            ) : null}
                        </div> */}

            {/* <div className={styles.inputWrapper}>
                            <label className={styles.title}>Address Unit</label>
                            <input type="text" {...formik.getFieldProps("addressUnit")} placeholder="Enter address unit" />
                            {formik.touched.addressUnit && formik.errors.addressUnit ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.addressUnit}
                                </div>
                            ) : null}
                        </div> */}

            {/* <div className={styles.inputWrapper}>
                            <label className={styles.title}>Address Appartment No</label>
                            <input type="text" {...formik.getFieldProps("addressAppartmentNo")} placeholder="Enter address Appartment number" />
                            {formik.touched.addressAppartmentNo && formik.errors.addressAppartmentNo ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.addressAppartmentNo}
                                </div>
                            ) : null}
                        </div> */}

            {/* <div className={styles.inputWrapper}>
                            <label className={styles.title}>Address Other</label>
                            <input type="text" {...formik.getFieldProps("addressOther")} placeholder="Enter address other" />
                            {formik.touched.addressOther && formik.errors.addressOther ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.addressOther}
                                </div>
                            ) : null}
                        </div> */}

            {/* <div className={styles.inputWrapper}>
                            <label className={styles.title}>Contact</label>
                            <input type="text" {...formik.getFieldProps("contact")} placeholder="Enter Contact" />
                            {formik.touched.contact && formik.errors.contact ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.contact}
                                </div>
                            ) : null}
                        </div> */}

            {/* <div className={styles.inputWrapper}>
                            <label className={styles.title}>Email</label>
                            <input type="email" {...formik.getFieldProps("email")} placeholder="Enter email" />
                            {formik.touched.email && formik.errors.email ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.email}
                                </div>
                            ) : null}
                        </div> */}

            {/* <div className={styles.inputWrapper}>
                            <label className={styles.title}>Notification Status</label>
                            <input type="text" {...formik.getFieldProps("notificationStatus")} disabled />
                            {formik.touched.notificationStatus && formik.errors.notificationStatus ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.notificationStatus}
                                </div>
                            ) : null}
                        </div> */}

            {/* <div className={styles.inputWrapper}>
                            <label className={styles.title}>Collected Date</label>
                            <input type="text" {...formik.getFieldProps("collectedDate")} disabled />
                            {formik.touched.collectedDate && formik.errors.collectedDate ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.collectedDate}
                                </div>
                            ) : null}
                        </div> */}
                        {active === "collected" ?
                            <div className={styles.CollectedbtnWrapper}>
                                <button type="submit" disabled={loading || editLoading}>
                                    {editLoading ? <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="22"
                                        visible={true}
                                    /> : "Atualizar"}
                                </button>
                            </div>
                            : collectDisplay ?
                                <div className={styles.btnWrapper}>
                                    <button type="submit" disabled={loading || editLoading}>
                                        {editLoading ? <RotatingLines
                                            strokeColor="#F36B31"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="22"
                                            visible={true}
                                        /> : "Atualizar"}
                                    </button>
                                    <button type="button" disabled={loading || editLoading} onClick={updateCollectedStatus}>
                                        {loading ? <RotatingLines
                                            strokeColor="white"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="22"
                                            visible={true}
                                        /> : "Retirado"}
                                    </button>

                                </div> : <div className={styles.CollectedbtnWrapper}>
                                    <button type="submit" disabled={loading || editLoading}>
                                        {editLoading ? <RotatingLines
                                            strokeColor="white"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="22"
                                            visible={true}
                                        /> : "Atualizar"}
                                    </button>
                                </div>}
                    </form>
                </div>
            </div>
        </Modal>
    )
}
