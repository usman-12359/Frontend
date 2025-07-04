"use client"
import { RootState } from "@/store/store";
import useAPIClient from "@/utils/api-client";
import { AddUnitSchema, EditGateHouse } from "@/utils/schema";
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const UseAddUnits = (props: any) => {
  const { editData, handleClose, Reload, Open, } = props;

  const HTTP_CLIENT = useAPIClient()
  const [loading, setLoading] = useState<boolean>(false)

  // For Redux State
  const { condominuimID, user } = useSelector((state: RootState) => state.user)

  const formik = useFormik({
    initialValues: {
      condominiumID: "",
      condominuimName: "",
      address: "",
      recipients: ""
    },
    enableReinitialize: true,
    validationSchema: AddUnitSchema,
    onSubmit: async (values, actions) => {
      try {
        setLoading(true)
        delete values.recipients
        delete values.condominuimName;
        if (editData) {
          const { success }: any = await HTTP_CLIENT.put({ url: `/unit/${editData?._id}`, data: values })
          if (success === true) {
            handleClose()
            toast.success("Unidade atualizada com sucesso!")
            actions.resetForm()
            Reload()
          }
        } else {
          
          const { success }: any = await HTTP_CLIENT.post({ url: '/unit', data: values })
          if (success === true) {
            handleClose()
            toast.success("Unidade adicionada com sucesso!")
            actions.resetForm()
            Reload()
          }
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast.error(error?.response?.data?.message)
      }
    },
  });

  useEffect(() => {
    if (condominuimID) {
      formik.setFieldValue("condominuimName", user?.condominium?.condominiumName)
      formik.setFieldValue("condominiumID", condominuimID)
    }
    if (editData) {
      formik.setFieldValue("recipients", editData?.numberOfRecipients)
      formik.setFieldValue("address", editData?.address)
    }
  }, [Open, editData, condominuimID])


  return {
    formik,
    loading
  };
};

export default UseAddUnits;
