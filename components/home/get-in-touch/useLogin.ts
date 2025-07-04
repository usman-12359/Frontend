"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetInTouchSchema, LoginSchema } from "@/utils/schema";
import useAPIClient from "@/utils/api-client";

interface FormValues {
  firstName: string,
  lastName: string,
  email: string,
  contact: string,
  query: string
}

const UseGetInTouch = () => {
  const HTTP_CLIENT = useAPIClient();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      query: ""
    },
    validationSchema: GetInTouchSchema,
    onSubmit: async (values, actions) => {
      try {
        setLoading(true);
        const { data, success }: any = await HTTP_CLIENT.post({
          url: "/contact",
          data: values,
        });
        if (success === true) {
          toast.success(data?.message || "Query submitted successfully!");
          actions.resetForm()
        }
        setLoading(false)
      } catch (error: any) {
        setLoading(false);
        toast.error(error?.response?.data?.message)
      }
    },
  });




  return {
    formik,
    loading
  };
};

export default UseGetInTouch;
