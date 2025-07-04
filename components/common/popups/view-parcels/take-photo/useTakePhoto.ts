"use client";
import { RootState } from "@/store/store";
import useAPIClient from "@/utils/api-client";
import { Role_Enums } from "@/utils/enum/page";
import {
  EditGateHouse,
  parcelAssignSchema,
  parcelScannedSchema,
} from "@/utils/schema";
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UseTakePhoto = (props: any) => {
  const { singleRecipient, handleClose, Reload, payload } = props;
  // console.log("🚀 ~ UseTakePhoto ~ payload:", payload)
  const HTTP_CLIENT = useAPIClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const { condominuimID, role } = useSelector((state: RootState) => state.user);
  // const pathname = usePathname()
  // const [postPayload, setPostPayload] = useState<Object | null | any>(null)

  const [values, setValues] = useState(null);
  const [recipientValues, setRecipientValues] = useState(null);
  // const formik = useFormik({
  //   initialValues: {
  //     fullname: "",
  //     email: "",
  //     contact: "",
  //     appartmentNo: "",
  //     condominum: "",
  //     unit: "",
  //     other: "",
  //     imageURL: ""
  //   },
  //   enableReinitialize: true,
  //   validationSchema: parcelScannedSchema,
  //   onSubmit: async (values, actions) => {
  //     try {
  //       setLoading(true)
  //       const payload = {
  //         condominiumID: condominuimID || "",
  //         unitID: pathname === Routes.SUBSCRIBER ? "" : singleRecipient?.unitId || "",
  //         fullName: values.fullname || "",
  //         email: values?.email || "",
  //         contact: values?.contact || "",
  //         addressCondominium: values?.condominum || "",
  //         addressUnit: values?.unit || "",
  //         addressAppartmentNo: values?.appartmentNo || "",
  //         addressOther: values?.other || "",
  //         imageURL: values?.imageURL
  //       }
  //       const { data, success }: any = await HTTP_CLIENT.post({ url: '/parcel/parcel/save-parcel', data: payload })
  //       if (success === true) {
  //       // if (success === true && data?.recipientID !== null) {
  //       //   handleClose()
  //       //   toast.success("Parcel detail saved successfully!")
  //       //   actions.resetForm()
  //       //   setTimeout(() => {
  //       //     Reload()
  //       //   }, 3000)
  //       // } else if (success === true && data?.recipientID === null) {
  //         setPostPayload(data)
  //         setPostPayload(data)
  //       }
  //       setLoading(false)
  //     } catch (error) {
  //       setLoading(false)
  //       toast.error(error?.response?.data?.message)
  //     }

  //   },
  // });

  // useEffect(() => {
  //   if (payload) {
  //     formik.setFieldValue("fullname", payload?.fullname)
  //     formik.setFieldValue("email", payload?.email)
  //     formik.setFieldValue("contact", payload?.contact)
  //     formik.setFieldValue("appartmentNo", payload?.address?.appartmentNo)
  //     formik.setFieldValue("condominum", payload?.address?.condominum)
  //     formik.setFieldValue("unit", payload?.address?.unit)
  //     formik.setFieldValue("other", payload?.address?.other)
  //     formik.setFieldValue("imageURL", payload?.imageURL)
  //   }
  // }, [payload])

  const innerFormik = useFormik({
    initialValues: {
      unitID: "",
      recipientID: "",
    },
    enableReinitialize: true,
    validationSchema: parcelAssignSchema,
    onSubmit: async (values, actions) => {
      try {
        setLoading(true);
        const { success }: any = await HTTP_CLIENT.put({
          url: `/parcel/parcel/associate-recipient/${payload?.parcelId}`,
          data: values,
        });
        if (success === true) {
          handleClose();
          toast.success("Informações da encomenda gravadas com sucesso!");
          actions.resetForm();
          setTimeout(() => {
            Reload();
          }, 3000);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const [unitList, setUnitList] = useState<any>([]);
  const [unitLoading, setUnitLoading] = useState<boolean>(false)
  const handleFetchUnits = async () => {
    try {
      setUnitLoading(true)
      let paramID: any;
      if (role === Role_Enums.SUBSCRIBER) {
        paramID = condominuimID;
      } else if (role === Role_Enums.GATEHOUSE) {
        paramID = condominuimID;
      }
      const { data, success }: any = await HTTP_CLIENT.get({
        url: `/unit/${paramID}`,
      });
      if (success === true) {
        debugger;
        setUnitList(data?.reverse());
        const findId = data?.find((item) => (item?.unitId?.toLowerCase() === payload?.unitId?.toLowerCase()))
        if (findId !== undefined) {

          setValues([{ label: findId?.address, value: findId?.unitId }])
        }
        innerFormik.setFieldValue("unitID", payload?.unitId);
      }
      setUnitLoading(false)
    } catch (error) {
      setUnitList([]);
      setUnitLoading(false)
    }
  };

  const [recipientList, setRecipientList] = useState<any>([]);
  const [recipientLoading, setRecipientLoading] = useState<boolean>(false)
  const fetchRecipients = async (unitid: string | number) => {
    try {
      setRecipientLoading(true)
      const { data, success }: any = await HTTP_CLIENT.get({
        url: `/recipient/${condominuimID}/${unitid}`,
      });
      if (success === true) {
        debugger
        setRecipientList(data?.reverse());
        const findRecipientId = data?.find((item) => (item?._id?.toLowerCase() === payload?.recipientId?.toLowerCase()))
        if (findRecipientId !== undefined) {
          setRecipientValues({ label: findRecipientId?.name, value: findRecipientId?._id })
        }
        innerFormik.setFieldValue("recipientID", payload?.recipientId);
      }
      setRecipientLoading(false)
    } catch (error) {
      setRecipientLoading(false)
      setRecipientList([]);
    }
  };

  useEffect(() => {
    handleFetchUnits();
  }, []);



  useEffect(() => {
    if (payload) {
      handleFetchUnits();
      fetchRecipients(payload?.unitId)
    }
  }, [payload]);

  return {
    // formik,
    loading,
    activeTab,
    setActiveTab,
    innerFormik,
    unitList,
    fetchRecipients,
    recipientList,
    // postPayload,
    recipientValues,
    values,
    setValues,
    setRecipientValues,
    unitLoading,
    recipientLoading
  };
};

export default UseTakePhoto;
