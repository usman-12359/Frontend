"use client";
import { useEffect, useState } from "react";
import Cleave from "cleave.js/react";

export default function InputMaskCompo({ formik, zipCode }) {
  const [value, setValue] = useState("");
  const [customPlaceholder, setCustomPlaceholder] = useState("99.999-999")
  const [options, setOptions] = useState({})

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    // If using with formik, update the formik field
    if (zipCode) {
      if (formik && formik.setFieldValue) {
        formik.setFieldValue("cep", newValue);
      }
    } else {
      if (formik && formik.setFieldValue) {
        formik.setFieldValue("cnjp", newValue);
      }
    }
  };

  useEffect(() => {
    if (zipCode) {
      setCustomPlaceholder("99.999-999")
      setValue(formik.values?.cep)
    } else {
      setCustomPlaceholder("xx.xxx.xxx/xxxx-xx")
      setValue(formik.values?.cnjp)
    }
  }, [formik.values?.cep, formik.values?.cnjp, zipCode])

  return (
    <Cleave
      placeholder={customPlaceholder}
      options={zipCode ? {
        delimiters: ['.', '-'],
        blocks: [2, 3, 3],
        numericOnly: true
      } : {
        delimiters: ['.', '.', '/', '-'],
        blocks: [2, 3, 3, 4, 2],
        numericOnly: true
      }}
      className="input-mask min-h-[50px] 3xl:min-h-[55px] placeholder-[#DEDEDE] text-textColor outline-none px-7 box-border"
      value={value}
      onChange={handleChange}
      style={{
        width: '100%',
        fontSize: "14px",
        outline: "none",
        border: "0px solid transparent",
        color: '#212529',

      }}
    />
  );
}


