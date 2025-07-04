"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { Routes } from "@/routes";
import { saveAccessToken, saveAdminSetting, saveIsCondominuim, saveIsProof, saveUserData, saveUserHomePage, saveUserId, saveUserRole, setNavigatiponbar } from "@/store/reducers/userReducer";
import { store } from "@/store/store";
import useAPIClient from "@/utils/api-client";
import { checkPlanExpiration } from "@/utils/custom-functions";
import { Role_Enums } from "@/utils/enum/page";
import { LoginSchema } from "@/utils/schema";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface FormValues {
  email: string;
  password: string;
  keepMeLoggedIn: boolean
}

const UseLogin = () => {
  const pathname = usePathname();
  const role = store.getState().user.role
  const dispatch = useDispatch()
  const HTTP_CLIENT = useAPIClient();
  const location = useRouter();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      keepMeLoggedIn: false
    },
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const params: any = {
        email: values.email,
        password: values.password,
      };
      const { data, success }: any = await HTTP_CLIENT.post({
        url: "/auth/login",
        data: params,
      });
      if (success === true) {
        const userPayload = data;
        delete data.user.role;
        const payload = {
          ...data?.user,
          role: data?.role
        }
        const res = await signIn("credentials", {
          token: data?.token,
          redirect: false,
        });
        dispatch(saveUserData(payload))
        dispatch(saveAccessToken(data?.token))
        dispatch(setNavigatiponbar(true))
        dispatch(saveUserRole(data?.role))
        dispatch(saveUserHomePage(userPayload))
        localStorage.setItem("localRole", data?.role)
        toast.success(data?.message || 'Acesso realizado com sucesso');
        if (data?.role === Role_Enums.ADMIN) {
          dispatch(saveAdminSetting(data?.user))
          location.push(Routes.ADMIN);
        } else if (data?.role === Role_Enums.SUBSCRIBER) {
          if (data?.user?.subscriptionrequest?.status === 'pending' && data?.user?.subscriptionrequest?.proofOfPayment === null && checkPlanExpiration(data?.user?.planExpirationDate)) {
            dispatch(saveIsProof(true))
          }
          dispatch(saveUserId(data?.user?._id))
          dispatch(saveIsCondominuim(data?.user?.condominium?.condominiumID))
          location.push(Routes.SUBSCRIBER);
        } else if (data?.role === Role_Enums.GATEHOUSE) {
          dispatch(saveUserId(data?.user?._id))
          dispatch(saveIsCondominuim(values.email))
          location.push(Routes.GATEHOUSE);
        }
        if (res?.status === 200 && values?.keepMeLoggedIn === true) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", values.password);
        }
      }
      setLoading(false)
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message)
    }
  };
  const navigateToSignUp = () => {
    location.push("/signup");
  };

  const navigateToHome = () => {
    location.push("/");
  };

  const navigateToForgotScreen = () => {
    location.push(Routes.FORGOT_PASSWORD);
  };

  useEffect(() => {
    localStorage.getItem("email") &&
      formik.setFieldValue("email", localStorage.getItem("email") || "");
    localStorage.getItem("password") &&
      formik.setFieldValue("password", localStorage.getItem("password") || "");
    localStorage.getItem("password") && localStorage.getItem("email") && formik.setFieldValue("keepMeLoggedIn", true)
  }, []);





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
    navigateToSignUp,
    active,
    setActive,
    showPass,
    setShowPass,
    navigateToHome,
    navigateToForgotScreen
  };
};

export default UseLogin;
