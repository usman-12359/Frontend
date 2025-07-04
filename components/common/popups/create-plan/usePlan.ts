"use client"
import useAPIClient from "@/utils/api-client";
import { addPlanSchema } from "@/utils/schema";
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";



const UsePlans = (props: any) => {
  const { editData, Reload, handleClose, plansList } = props;

  const HTTP_CLIENT = useAPIClient()
  const [loading, setLoading] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      name: "",
      baseRetailPrice: "",
      retailPricePerTenUnit: "",
      baseLaunchPrice: "",
      launchPricePerTenUnit: "",
      details: "",
      active: "true",
      type: "",
    },
    validationSchema: addPlanSchema(plansList, editData ? true : false),
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      try {
        setLoading(true)
        if (editData) {
          const { data, success }: any = await HTTP_CLIENT.put({ url: `/subscription-package/${editData?._id}`, data: values })
          if (success === true) {
            toast.success("Plano atualizado com sucesso!")
            handleClose()
            Reload()
            actions.resetForm()
          }
        } else {
          const { data, success }: any = await HTTP_CLIENT.post({ url: '/subscription-package', data: values })
          if (success === true) {
            toast.success("Plano criado com sucesso!")
            handleClose()
            Reload()
            actions.resetForm()
          }
        }

        setLoading(false)
      } catch (error) {
        toast.error(error?.response?.data?.message)
        setLoading(false)

      }
    },
  });
  
  return {
    formik,
    loading
  };
};

export default UsePlans;
