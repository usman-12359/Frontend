"use client";
import { Routes } from "@/routes";
/* eslint-disable react-hooks/exhaustive-deps */
import useAPIClient from "@/utils/api-client";
import { ForgotPasswordSchema, VerifyPasswordSchrema } from "@/utils/schema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface FormValues {
  email: string;
  newPin: string | any;
  password: string;
  repeatPassword: string;
}

const UseForgotPassword = () => {
  const dispatch = useDispatch();
  const HTTP_CLIENT = useAPIClient();
  const location = useRouter();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [screen, setScreen] = useState<number>(1);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      newPin: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema:
      screen === 3 ? VerifyPasswordSchrema : ForgotPasswordSchema,
    onSubmit: (values, actions) => {
      if (screen === 1) {
        handleSubmit(values);
      } else if (screen === 2) {
        handleVerifyOTP(values);
      } else if (screen === 3) {
        handleSetPassword(values);
      }
    },
  });

  const handleSubmit = async (values: any) => {
    // debugger;
    try {
      setLoading(true);
      const payload = {
        email: values.email,
      };
      const { data, success }: any = await HTTP_CLIENT.post({
        url: "/auth/resend-otp",
        data: payload,
      });
      if (success === true) {
        toast.success("Um código de verificação foi enviado para o seu e-mail!");
        setScreen(screen + 1);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleVerifyOTP = async (values: any) => {
    // debugger;
    try {
      setLoading(true);
      const payload = {
        email: values.email,
        otp: values.newPin,
        isForgotPassword: true,
      };
      const { data, success }: any = await HTTP_CLIENT.post({
        url: "/auth/verify-otp",
        data: payload,
      });
      if (success === true) {
        toast.success("Um código de verificação foi enviado para o seu e-mail!");
        setScreen(screen + 1);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const handleSetPassword = async (values: any) => {
    // debugger;
    try {
      setLoading(true);
      const payload = {
        email: values.email,
        password: values.password,
      };
      const { data, success }: any = await HTTP_CLIENT.post({
        url: "/auth/set-password",
        data: payload,
      });
      if (success === true) {
        toast.success("Senha alterada com sucesso!");
        setScreen(screen + 1);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const navigateToHome = () => {
    location.push("/");
  };

  const navigateToLogin = () => {
    location.push(Routes.LOGIN);
  };

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

  return {
    formik,
    loading,
    active,
    setActive,
    showPass,
    setShowPass,
    navigateToHome,
    navigateToLogin,
    screen,
    handleResendOTP,
  };
};

export default UseForgotPassword;
