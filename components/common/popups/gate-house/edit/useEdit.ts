"use client"
import { RootState } from "@/store/store";
import useAPIClient from "@/utils/api-client";
import { Role_Enums } from "@/utils/enum/page";
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const UseEditForGateHouse = (props: any) => {
  const { editData, handleClose, Reload, tab } = props;
  const HTTP_CLIENT = useAPIClient()
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const { condominuimID, role } = useSelector((state: RootState) => state.user)

  const [values, setValues] = useState(null)
  const [recipientValues, setRecipientValues] = useState(null)


  const formik = useFormik({
    initialValues: {
      // condominiumId: "",
      unitID: "",
      recipientID: ""
      // fullName: "",
      // addressCondominium: "",
      // addressUnit: "",
      // addressAppartmentNo: "",
      // addressOther: "",
      // contact: '',
      // email: '',
      // notificationStatus: "",
      // collectedDate: ""
    },
    enableReinitialize: true,
    // validationSchema: EditGateHouse,
    onSubmit: async (values, actions) => {
      // console.log("🚀 ~ UseEditForGateHouse ~ values:", values)
      try {
        // debugger
        setEditLoading(true)
        // delete values['condominiumId']
        // values.condominiumID = condominuimID
        // const payload = {
        //   ...values,
        //   condominiumID: condominuimID,
        // };
        const { success }: any = await HTTP_CLIENT.put({ url: `/parcel/parcel/${editData?._id}`, data: values })
        if (success === true) {
          handleClose()
          Reload()
          tab()
          actions.resetForm()
        }
        setEditLoading(false)
      } catch (error) {
        setEditLoading(false)
        toast.error(error?.response?.data?.message)
      }

    },
  });


  const updateCollectedStatus = async () => {
    try {
      setLoading(true)
      const { success }: any = await HTTP_CLIENT.post({ url: `/parcel/parcel/collect/${editData?._id}` })
      if (success === true) {
        handleClose()
        Reload()
        tab()
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.message)
    }
  }

  const [unitList, setUnitList] = useState<any>([])
  const [unitLoading, setUnitLoading] = useState<boolean>(false)
  const handleFetchUnits = async () => {
    try {
      setUnitLoading(true)
      let paramID: any;
      if (role === Role_Enums.SUBSCRIBER) {
        paramID = condominuimID
      } else if (role === Role_Enums.GATEHOUSE) {
        paramID = condominuimID
      }
      const { data, success }: any = await HTTP_CLIENT.get({ url: `/unit/${paramID}` })
      if (success === true) {
        debugger;
        setUnitList(data?.reverse())
        const findId = data?.find((item) => (item?.unitId?.toLowerCase() === editData?.unitID?.toLowerCase()))
        if (findId !== undefined) {
          setValues([{ label: findId?.address, value: findId?.unitId }])
          formik.setFieldValue("unitID", findId?.unitId)
        }
      }
      setUnitLoading(false)
    } catch (error) {
      setUnitList([])
      setUnitLoading(false)
    }
  }

  const [recipientList, setRecipientList] = useState<any>([])
  const [recipientLoading, setRecipientLoading] = useState<boolean>(false)
  const fetchRecipients = async (recipientid: string | number) => {
    try {
      setRecipientLoading(true)
      const { data, success }: any = await HTTP_CLIENT.get({ url: `/recipient/${condominuimID}/${recipientid}` })
      if (success === true) {
        debugger
        // console.log("🚀 ~ fetchRecipients ~ data:", data)
        const findRecipientId = data?.find((item) => (item?._id?.toLowerCase() === editData?.recipientID?.toLowerCase()))
        // console.log("🚀 ~ fetchRecipients ~ findRecipientId:", findRecipientId)
        if (findRecipientId !== undefined) {
          setRecipientValues({ label: findRecipientId?.name, value: findRecipientId?._id })
        }
        setRecipientList(data?.reverse())
      }
      setRecipientLoading(false)
    } catch (error) {
      setRecipientList([])
      setRecipientLoading(false)

    }
  }

  useEffect(() => {
    handleFetchUnits()
  }, [])


  useEffect(() => {
    if (editData) {
      formik.setValues({
        ...editData
      })
      
      fetchRecipients(editData?.unitID)
    }
  }, [])
  return {
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
    unitLoading
  };
};

export default UseEditForGateHouse;
