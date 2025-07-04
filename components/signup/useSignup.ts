"use client";
import { Routes } from "@/routes";
import {
  saveIsRegistered,
  saveSignUpPayload,
} from "@/store/reducers/userReducer";
import { RootState, store } from "@/store/store";
import useAPIClient from "@/utils/api-client";
import { Role_Enums } from "@/utils/enum/page";
import useDebounce from "@/utils/hooks/useDebounce";
/* eslint-disable react-hooks/exhaustive-deps */
import {
  firstScreenValidationSignUp
} from "@/utils/schema";
import axios from "axios";
import { error } from "console";
import { useFormik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const UseSignUp = () => {
  const location = useRouter();
  const HTTP_CLIENT = useAPIClient();
  const [screen, setScreen] = useState<number>(0);
  // console.log("🚀 ~ UseSignUp ~ screen:", screen)
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [plansList, setPlansList] = useState([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { signUpPayload, isRegistered } = useSelector(
    (state: RootState) => state.user
  );
  const [planInfo, setPlanInfo] = useState<string | any>("");
  const [checkEmail, setCheckEmail] = useState("");

  const [isCorrectEmail, setIsCorrectEmail] = useState<any>(null);
  const debouncedValue = useDebounce<string>(checkEmail, 1000);

  const formik = useFormik({
    initialValues: signUpPayload || {
      email: "",
      password: "",
      confirmPassword: "",
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
      proofOfPayment: "",
      terms: false
    },
    enableReinitialize: true,
    validationSchema: firstScreenValidationSignUp,
    onSubmit: async (values) => {
      if (values?.email !== signUpPayload?.email) {
        dispatch(saveIsRegistered(false));
      }
      if (isCorrectEmail) {
        toast.error("O e-mail já existe");
        return;
      }
      if (formik.errors.cep) {
        formik.setFieldError("cep", "Cep inválido");
        return;
      }
      const { confirmPassword, telefone, celular, numero, ...rest } = values;
      const payload: any = {
        ...rest,
        telefone: String(telefone),
        celular: String(celular),
        numero: String(numero),
      };
      await handleSubmit(payload);
      if (confirmPassword) {
        payload.confirmPassword = confirmPassword;
      }
      dispatch(saveSignUpPayload(payload));
    },
  });

  const handleSubmit = async (values) => {
    // debugger;
    if (screen === 2) {
      await handleVerifyOTP(values?.newPin);
      return;
    }
    if (screen === 3) {
      await handleSignup(values);
    } else {
      setScreen(screen + 1);
    }
  };

  const handleBack = () => {
    if (screen === 0) {
      return;
    }
    setScreen(screen - 1);
  };

  const handleNext = async (item: any) => {
    if (screen === 1) {
      formik.setValues({
        ...formik.values,
        subscriptionID: item?._id,
      });
      setPlanInfo(item);
      setScreen(screen + 1);
    } else if (screen === 3) {
      await handleSignup(formik.values);
    } else {
      setScreen(screen + 1);
    }
  };

  const handleVerifyOTP = async (OTP: number) => {
    try {
      const params = {
        email: formik.values.email,
        otp: OTP,
        isForgotPassword: false,
      };
      setIsVerifying(true);
      const response: any = await HTTP_CLIENT.post({
        url: "/auth/verify-otp",
        data: params,
      });
      if (response.data?.success === true) {
        toast.info('Código de verificação confirmado');
        dispatch(saveIsRegistered(false));
        setScreen(screen + 1);
      } else {
        toast.error('O código de verificação é inválido');
      }
      setIsVerifying(false);
    } catch (error) {
      setIsVerifying(false);
    }
  };

  const handleSignup = async (values) => {
    try {
      const { telefone, celular, numero, ...rest } = values;
      const payload = {
        ...rest,
        telefone: String(telefone),
        celular: String(celular),
        numero: String(numero),
      };
      setLoading(true);
      const formData = new FormData();
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      formData.append("condominiumName", payload.condominiumName);
      formData.append("cnjp", payload.cnjp);
      formData.append("cep", payload.cep);
      formData.append("logradouro", payload.logradouro);
      formData.append("numero", payload.numero);
      formData.append("bairro", payload.bairro);
      formData.append("cidade", payload.cidade);
      formData.append("estado", payload.estado);
      formData.append("complemento", payload.complemento);
      formData.append("telefone", payload.telefone);
      formData.append("celular", payload.celular);
      formData.append(
        "numberOfUnitsInCondominium",
        payload.numberOfUnitsInCondominium
      );
      formData.append("gatehousePassword", payload.gatehousePassword);
      formData.append("subscriptionID", payload.subscriptionID);
      formData.append("proofOfPayment", payload.proofOfPayment);
      const response: any = await HTTP_CLIENT.post({
        url: "/auth/sign-up",
        data: formData,
      });
      if (response) {
        // toast.success(`${response?.data?.msg}`)
        toast.success("Condomínio cadastrado com sucesso");
        dispatch(saveIsRegistered(true));
        setScreen(screen + 1);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleFetchPlansInfo = async () => {
    try {
      const response: any = await HTTP_CLIENT.get({
        url: "/subscription-package",
      });
      if (response) {
        setPlansList(response?.data || []);
      }
    } catch (error) {
      setPlansList([]);
    }
  };

  useEffect(() => {
    handleFetchPlansInfo();
  }, []);

  // console.log("formik.values", formik.values)
  // console.log("formik.errors", formik.errors)

  const handleGetDetailsUsingZipCode = async (zipcode) => {
    try {
      setIsDisabled(true);
      const formattedZipcode = zipcode.replace("-", "").replace(".", "");

      if (formattedZipcode?.length > 7) {
        const url = `https://brasilapi.com.br/api/cep/v1/${formattedZipcode}`;

        try {
          // Add timeout configuration
          const { data } = await axios.get(url, {
            timeout: 10000, // 10 seconds timeout
          });

          if (data) {
            formik.setFieldValue("logradouro", data?.street);
            formik.setFieldValue("bairro", data?.neighborhood);
            formik.setFieldValue("cidade", data?.city);
            formik.setFieldValue("estado", data?.state);
            setIsDisabled(false);
          }
        } catch (e) {
          setIsDisabled(true);
          if (e.code === "ECONNABORTED") {
            formik.setFieldError("cep", "Cep inválido");
            // You could also show a toast message
            // toast.error("Connection timed out. Please try again.");
          } else if (e.response?.status === 504) {
            formik.setFieldError("cep", "Cep inválido");
            // toast.error("Gateway timeout. Please try again later.");
          } else if (e.response?.status === 404) {
            formik.setFieldError("cep", "Cep inválido");
          } else {
            formik.setFieldError("cep", "Cep inválido");
          }

          console.error("Zipcode fetch error:", e);
        }
      } else {
        setIsDisabled(true);
        formik.setFieldError("cep", "Cep inválido");
      }
    } catch (error) {
      setIsDisabled(true);
      // console.error("Unexpected error:", error);
      formik.setFieldError("cep", "Cep inválido");
    }
  };

  useEffect(() => {
    handleGetDetailsUsingZipCode(formik.values?.cep);
  }, [formik.values?.cep]);

  useEffect(() => {
    if (isDisabled) {
      formik.setFieldError("cep", "Cep inválido");
    }
  }, [formik.errors]);

  const handleCheckEmail = async () => {
    try {
      const params = {
        email: checkEmail,
      };
      const { data, success }: any = await HTTP_CLIENT.post({
        url: "/auth/check-email",
        data: params,
      });
      if (success === true) {
        if (data?.success) {
          toast.info("O e-mail já existe");
        }
        setIsCorrectEmail(data?.success);
      }
    } catch (error) {
      setIsCorrectEmail(false);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (checkEmail) handleCheckEmail();
  }, [debouncedValue]);

  useEffect(() => {
    setCheckEmail(formik.values.email);
  }, [formik.values.email]);

  const handleResendOTP = async () => {
    try {
      if (formik.values.email) {
        const params = {
          email: formik.values?.email,
        };
        const { data, success }: any = await HTTP_CLIENT.post({
          url: "/auth/resend-otp",
          data: params,
        });
        if (success === true) {
          toast.info("Um código de verificação foi enviado para o seu e-mail!");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (screen === 2) {
      handleResendOTP();
    }
  }, [screen]);

  // console.log("formik error", formik.errors)

  const navigateToHome = () => {
    location.push("/");
  };

  const pathname = usePathname();
  const role = store.getState().user.role

  useEffect(() => {
    if (role === Role_Enums.ADMIN) {
      location.push(Routes.ADMIN);
    } else if (role === Role_Enums.SUBSCRIBER) {
      location.push(Routes.SUBSCRIBER);
    } else if (role === Role_Enums.GATEHOUSE) {
      location.push(Routes.GATEHOUSE);
    }
  }, [role, pathname])


  return {
    formik,
    loading,
    screen,
    handleBack,
    handleNext,
    plansList,
    isDisabled,
    isVerifying,
    planInfo,
    isCorrectEmail,
    handleResendOTP,
    navigateToHome,
    isRegistered,
  };
};

export default UseSignUp;
