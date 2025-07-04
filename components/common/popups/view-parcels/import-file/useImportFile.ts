"use client"
import { RootState } from "@/store/store";
import useAPIClient from "@/utils/api-client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const UseImportFile = (props: any) => {
  const { handleClose, Reload, isUnit } = props;
      const { condominuimID } = useSelector((state: RootState) => state.user)

  const HTTP_CLIENT = useAPIClient()
  const [loading, setLoading] = useState<boolean>(false)



  const handleUploadPhoto = async (event) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }
      setLoading(true)
      const formData = new FormData();
      formData.append("file", file);
      if (isUnit) {
        const { data, success }: any = await HTTP_CLIENT.post({ url: `/unit/import/${condominuimID}`, data: formData })
        if (success === true) {
          toast.success(data?.message || 'Units imported successfully')
          handleClose()
          Reload()
        }
      } else {
        const { data, success }: any = await HTTP_CLIENT.post({ url: `/recipient/import/${condominuimID}`, data: formData })
        if (success === true) {
          toast.success(data?.message || 'Recipients imported successfully')
          handleClose()
          Reload()
        }
      }
      setLoading(false)
    } catch (error) {
      handleClose()
      toast.error(error?.response?.data?.message)
      setLoading(false)
    }
  }




  return {
    loading,
    handleUploadPhoto
  };
};

export default UseImportFile;
