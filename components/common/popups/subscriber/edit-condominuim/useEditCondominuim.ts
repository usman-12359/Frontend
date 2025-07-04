"use client"
import { saveReload } from "@/store/reducers/userReducer";
import { saveUserData } from "@/store/reducers/userReducer";
import { RootState } from "@/store/store";
import useAPIClient from "@/utils/api-client";
import { Role_Enums } from "@/utils/enum/page";
import { editManagerValidation, firstScreenValidation } from "@/utils/schema";
import axios from "axios";
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const UseCondominuim = (props: any) => {
  const { editData, handleClose, Reload, activeTab } = props;
  // console.log("🚀 ~ UseCondominuim ~ editData:", editData)
  const dispatch = useDispatch()
  const HTTP_CLIENT = useAPIClient()
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showGateHousePassword, setShowGateHousePassword] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const { reloadName, role } = useSelector((state: RootState) => state.user)
  const [plansList, setPlansList] = useState([])



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      condominiumName: "",
      cnjp: "",
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      complemento: "",
      telefone: "",
      celular: "",
      numberOfUnitsInCondominium: "",
      gatehousePassword: "",
      subscriptionID: "",
      planExpirationDate: ""
    },
    enableReinitialize: true,
    validationSchema: editData ? editManagerValidation : firstScreenValidation(editData ? true : false),
    onSubmit: async (values, actions) => {

      try {
        if (isDisabled) {
          return;
        }
        setLoading(true)
        if (editData) {
          const payload = {
            ...values,
            userStatus: true,
            planStatus: editData?.planStatus
          }
          if (!values.gatehousePassword) {
            delete payload.gatehousePassword
          }
          if (!values.password) {
            delete payload.password
          }
          const { data, success }: any = await HTTP_CLIENT.put({ url: `/manager/${editData?._id}`, data: payload })
          if (success === true) {
            dispatch(saveReload(!reloadName))
            handleClose()
            Reload()
            activeTab()
            toast.success("Detalhes do assinante atualizados com sucesso!")
            // actions.resetForm()
          }
        } else {
          const { data, success }: any = await HTTP_CLIENT.post({ url: "/manager", data: values })
          if (success === true) {
            toast.success("Condomínio criado com sucesso!")
            handleClose()
            Reload()
            actions.resetForm()
          }
          // console.log("🚀 ~ UseEditForGateHouse ~ values:", values)
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }

    },
  });

  useEffect(() => {
    if (editData) {
      const { condominium, subscriptionPlan, ...rest } = editData
      formik.setFieldValue("email", rest?.email)
      // formik.setFieldValue("password", rest?.password)
      formik.setFieldValue("condominiumName", condominium?.condominiumName)
      formik.setFieldValue("cnjp", rest?.cnjp)
      formik.setFieldValue("cep", condominium?.condominiumZipCode)
      formik.setFieldValue("logradouro", condominium?.condominiumAddressLine1_1of3)
      formik.setFieldValue("numero", condominium?.condominiumAddressLine1_2of3)
      formik.setFieldValue("complemento", condominium?.condominiumAddressLine2)
      formik.setFieldValue("bairro", condominium?.condominiumAddressLine1_3of3)
      formik.setFieldValue("cidade", condominium?.city)
      formik.setFieldValue("estado", condominium?.state)
      formik.setFieldValue("telefone", rest?.phoneNumber)
      formik.setFieldValue("celular", rest?.cellPhoneNumber)
      formik.setFieldValue("numberOfUnitsInCondominium", condominium?.numberOfUnitsInCondominium)
      formik.setFieldValue("subscriptionID", editData?.subscriptionPlan?._id)
      formik.setFieldValue("planExpirationDate", moment(rest?.planExpirationDate).format("YYYY-MM-DD"))
    }
  }, [editData, open])


  const handleGetDetailsUsingZipCode = async (zipcode) => {
    try {
      setIsDisabled(true);
      const formattedZipcode = zipcode.replace('-', '').replace('.', '');

      if (formattedZipcode?.length > 7) {
        const url = `https://brasilapi.com.br/api/cep/v1/${formattedZipcode}`;

        try {
          // Add timeout configuration 
          const { data } = await axios.get(url);

          if (data) {
            formik.setFieldValue("logradouro", data?.street);
            formik.setFieldValue("bairro", data?.neighborhood);
            formik.setFieldValue("cidade", data?.city);
            formik.setFieldValue("estado", data?.state);
            setIsDisabled(false);
          }
        } catch (e) {
          setIsDisabled(true);
          if (e.code === 'ECONNABORTED') {
            formik.setFieldError("cep", "CEP inválido");
            // You could also show a toast message
            // toast.error("Connection timed out. Please try again.");
          } else if (e.response?.status === 504) {
            formik.setFieldError("cep", "CEP inválido");
            // toast.error("Gateway timeout. Please try again later.");
          } else if (e.response?.status === 404) {
            formik.setFieldError("cep", "CEP inválido");
          } else {
            formik.setFieldError("cep", "CEP inválido");
          }

          console.error("Zipcode fetch error:", e);
        }
      } else {
        setIsDisabled(true);
        formik.setFieldError("cep", "CEP inválido");
      }
    } catch (error) {
      setIsDisabled(true);
      // console.error("Unexpected error:", error);
      formik.setFieldError("cep", "CEP inválido");
    }
  };



  useEffect(() => {
    handleGetDetailsUsingZipCode(formik.values?.cep)
  }, [formik.values?.cep])

  useEffect(() => {
    if (isDisabled) {
      formik.setFieldError("cep", "CEP inválido")
    }
  }, [formik.errors])

  const handleFetchPlansInfo = async () => {
    try {

      const response: any = await HTTP_CLIENT.get({ url: "/subscription-package" })
      if (response) {
        setPlansList(response?.data || [])
      }

    } catch (error) {
      setPlansList([])
    }
  }

  useEffect(() => {
    handleFetchPlansInfo()
  }, [])



  return {
    formik,
    loading,
    showGateHousePassword,
    showPassword,
    setShowPassword,
    setShowGateHousePassword,
    plansList,
    role
  };
};

export default UseCondominuim;
