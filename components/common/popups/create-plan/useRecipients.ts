"use client"
import { EditGateHouse } from "@/utils/schema";
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";


const UseRecipients = (props:any) => {
  const{ editData} = props;
  
  const formik = useFormik({
    initialValues: {
      recipientID:"",
        name: "",
        email: "",
        recipientsNumber: "",
        type: "",
    },
    validationSchema: EditGateHouse,
    onSubmit: (values, actions) => {
      console.log("🚀 ~ UseEditForGateHouse ~ values:", values)
      
    },
  });

 

  return {
    formik
  };
};

export default UseRecipients;
