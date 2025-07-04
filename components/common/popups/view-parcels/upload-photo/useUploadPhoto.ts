"use client"
import { RootState } from "@/store/store";
import useAPIClient from "@/utils/api-client";
import { Role_Enums } from "@/utils/enum/page";
import { parcelAssignSchema } from "@/utils/schema";
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const UseUploadPhoto = (props: any) => {
  const { singleRecipient, handleClose, Reload, setActive } = props;
  // console.log("🚀 ~ UseUploadPhoto ~ singleRecipient:", singleRecipient)
  const HTTP_CLIENT = useAPIClient()
  const [loading, setLoading] = useState<boolean>(false)
  const [postloading, setPostLoading] = useState<boolean>(false)
  const [active, setActiveScreen] = useState<boolean>(false)
  const [payload, setPayload] = useState<object | any>(null)
  // console.log("🚀 ~ UseUploadPhoto ~ payload:", payload)
  const { condominuimID, role, userId } = useSelector((state: RootState) => state.user)
  // console.log("🚀 ~ UseUploadPhoto ~ userId:", userId)

  // const pathname = usePathname()

  const [values, setValues] = useState(null)
  const [recipientValues, setRecipientValues] = useState(null)




  const [unitList, setUnitList] = useState<any>([])
  const handleFetchUnits = async () => {
    try {
      // setIsLoading(true)
      let paramID: any;
      if (role === Role_Enums.SUBSCRIBER) {
        paramID = condominuimID
      } else if (role === Role_Enums.GATEHOUSE) {
        paramID = condominuimID
      }
      const { data, success }: any = await HTTP_CLIENT.get({ url: `/unit/${paramID}` })
      if (success === true) {
        setUnitList(data?.reverse())
      }
      // setIsLoading(false)
    } catch (error) {
      setUnitList([])
      // setIsLoading(false)
    }
  }

  const [recipientList, setRecipientList] = useState<any>([])
  // console.log("🚀 ~ UseUploadPhoto ~ recipientList:", recipientList)
  const fetchRecipients = async (unitId: string | number, Data: any) => {
    try {
      setLoading(true)
      const { data, success }: any = await HTTP_CLIENT.get({ url: `/recipient/${condominuimID}/${unitId}` })
      if (success === true) {
        setRecipientList(data?.reverse())
        if (Data?.recipientId !== null) {
          // debugger
          // console.log("🚀 ~ fetchRecipients ~ payload:", Data)
          const findId = data?.find((item) => (item?._id?.toLowerCase() === Data?.recipientId?.toLowerCase()))
          // console.log("🚀 ~ fetchRecipients ~ findId:", findId)
          setRecipientValues([{ label: findId?.name, value: findId?._id }])
          innerFormik.setFieldValue("recipientID", findId?._id)
        }
      }
      setLoading(false)
    } catch (error) {
      setRecipientList([])
      setLoading(false)

    }
  }

  useEffect(() => {
    handleFetchUnits()
  }, [])

  const innerFormik = useFormik({
    initialValues: {
      unitID: "",
      recipientID: ""
    },
    enableReinitialize: true,
    validationSchema: parcelAssignSchema,
    onSubmit: async (values, actions) => {
      try {
        setPostLoading(true)
        const { success }: any = await HTTP_CLIENT.put({ url: `/parcel/parcel/associate-recipient/${payload?.parcelId}`, data: values })
        // debugger
        if (success === true) {
          handleClose()
          toast.success("Informações do pedido salvas com sucesso!")
          setActive("un-assigned")
          actions.resetForm()
          setTimeout(() => {
            Reload()
          }, 3000)
        }
        setPostLoading(false)
      } catch (error) {
        setPostLoading(false)
        toast.error(error?.response?.data?.message)
      }

    },
  });

  const handleUploadPhoto = async (event) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }
      setLoading(true)
      const formData = new FormData();
      formData.append("file", file);
      const { data, success }: any = await HTTP_CLIENT.post({ url: `/ocr/ocr/upload/${userId}`, data: formData })
      if (success === true) {
        if (data?.unitId !== null) {
          const selectedUnit = unitList?.find((item) => {
            return item?.unitId == data?.unitId
          })
          await fetchRecipients(data?.unitId, data)
          innerFormik.setFieldValue("unitID", data?.unitId)
          // setValues([{ label: data?.address, value: data?.unitId }])
          setValues([{ label: selectedUnit?.address, value: data?.unitId }])
        }
        setPayload(data)
        setActiveScreen(true)
        
      } else {
        setActiveScreen(false)
      }
      setLoading(false)
    } catch (error) {
      handleClose()
      setActiveScreen(false)
      toast.error(error?.response?.data?.message)
      setLoading(false)
    }
  }

  return {
    // formik,
    loading,
    active,
    handleUploadPhoto,
    postloading,
    payload,
    unitList,
    fetchRecipients,
    recipientList,
    innerFormik,
    recipientValues,
    values,
    setValues,
    setRecipientValues
  };
};

export default UseUploadPhoto;
