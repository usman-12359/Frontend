"use client"
import { Routes } from "@/routes";
import { RootState } from "@/store/store";
import useAPIClient from "@/utils/api-client";
import { AddRecipientSchema, EditGateHouse } from "@/utils/schema";
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const UseRecipients = (props: any) => {
  const { editData, singleRecipient, handleClose, Reload, unitId } = props;
  // console.log("🚀 ~ UseRecipients ~ singleRecipient:", singleRecipient)
  // console.log("🚀 ~ UseRecipients ~ editData:", editData)
  const { condominuimID } = useSelector((state: RootState) => state.user)


  const [loading, setLoading] = useState<boolean>(false)
  const HTTP_CLIENT = useAPIClient()
  const formik = useFormik({
    initialValues: {
      condominiumID: "",
      unitID: "",
      name: "",
      email: "",
      whatsapp: "",
      notificationType: "",
    },
    enableReinitialize: true,
    validationSchema: AddRecipientSchema,
    onSubmit: async (values, actions) => {
      const { whatsapp, ...rest } = values
      const payload = {
        ...rest,
        unitID: editData?.unitID || values?.unitID || singleRecipient?.unitId,
        whatsapp: whatsapp?.toString()
      }
      try {
        setLoading(true)
        if (editData) {
          const { success }: any = await HTTP_CLIENT.put({ url: `/recipient/${editData?._id}`, data: payload })
          if (success === true) {
            toast.success("Destinatário atualizado com sucesso!")
            Reload()
            handleClose()
            actions.resetForm()
          }
        } else {
          const createPayload = {
            ...rest,
            unitID: values?.unitID,
            whatsapp: whatsapp?.toString(),
            condominiumID: values?.condominiumID || condominuimID,
          }
          const { success }: any = await HTTP_CLIENT.post({ url: '/recipient', data: createPayload })
          if (success === true) {
            toast.success("Destinatário adicionado com sucesso!")
            Reload()
            handleClose()
            actions.resetForm()
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
    if (singleRecipient || editData || unitId || condominuimID) {
      formik.setFieldValue("unitID", singleRecipient?.unitID || singleRecipient?.unitId || editData?.unitId || editData?.unitID || unitId)
      formik.setFieldValue("condominiumID", singleRecipient?.condominiumID || condominuimID)
    }
    if (editData) {
      formik.setFieldValue("name", editData?.name)
      formik.setFieldValue("email", editData?.email)
      formik.setFieldValue("whatsapp", editData?.whatsapp)
      formik.setFieldValue("notificationType", editData?.notificationType)
    }
  }, [singleRecipient, editData, unitId, condominuimID])


  return {
    formik,
    loading
  };
};

export default UseRecipients;
