"use client"
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import useAPIClient from "@/utils/api-client";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { passwordSchema } from "@/utils/schema";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { saveAdminSetting } from "@/store/reducers/userReducer";


const ProfileSettings = () => {
    const dispatch = useDispatch()

    const HTTP_CLIENT = useAPIClient()
    const { user, adminSetting } = useSelector((state: RootState) => state.user)
    // console.log("🚀 ~ ProfileSettings ~ user:", user)
    // console.log("🚀 ~ ProfileSettings ~ adminSetting:", adminSetting)
    const [profileLoading, setProfileLoading] = useState<boolean>(false)
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState<boolean>(false)


    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phoneNumber: ""
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setProfileLoading(true)
                values.phoneNumber = values.phoneNumber.toString()
                const { success, data }: any = await HTTP_CLIENT.post({ url: `/auth/admin/edit/profile/${user?._id}`, data: values })
                if (success === true) {
                    // console.log("🚀 ~ onSubmit: ~ data:", data)
                    dispatch(saveAdminSetting(data))
                    toast.success("Configurações de perfil atualizadas com sucesso!")
                    setPreviewImage(null)
                }
                setProfileLoading(false)
            } catch (error) {
                setProfileLoading(false)
                toast.error(error?.response?.data?.message)
            }

        },
    });
    const [passwordLoading, setPasswordLoading] = useState<boolean>(false)

    const passwordformik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        enableReinitialize: true,
        validationSchema: passwordSchema,
        onSubmit: async (values) => {
            try {
                delete values.confirmPassword;
                setPasswordLoading(true)
                const { success, data }: any = await HTTP_CLIENT.post({ url: `/auth/admin/edit/profile-password/${user?._id}`, data: values })
                if (success === true) {
                    dispatch(saveAdminSetting(data))
                    toast.success("Senha atualizada com sucesso!")
                    setPreviewImage(null)

                }
                setPasswordLoading(false)
            } catch (error) {
                setPasswordLoading(false)
                toast.error(error?.response?.data?.message)
            }

        },
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            const formData = new FormData()
            formData.append("file", file)
            try {
                setLoading(true)
                const { success, data }: any = await HTTP_CLIENT.post({ url: `/auth/admin/edit/profile-image/${user?._id}`, data: formData })
                if (success === true) {
                    dispatch(saveAdminSetting(data))
                    toast.success("Foto do perfil atualizada com sucesso!")
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                toast.error(error?.response?.data?.message)

            }
        }
    };

    useEffect(() => {
        if (user || adminSetting) {
            formik.setFieldValue("fullName", adminSetting?.fullName)
            formik.setFieldValue("email", adminSetting?.email)
            formik.setFieldValue("phoneNumber", adminSetting?.phoneNumber.toString())
        }
    }, [user, adminSetting])

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex flex-col items-center my-12  min-h-screen">
            <div className="w-full mb-5">
                <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 3xl:w-[154px] 3xl:h-[154px] border rounded-full flex justify-center items-center">
                        {loading ? <RotatingLines
                            strokeColor="#F36B31"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="32"
                            visible={true}
                        />
                            :
                            <img
                                src={previewImage || (adminSetting?.profilePicture || user?.profilePicture || "/assets/profile.svg")}
                                alt="Profile"
                                className="relative rounded-full w-full h-full box-border"
                            />
                        }
                        <label className="" htmlFor="fileInput">
                            <FaUserEdit className="absolute text-primary text-2xl bottom-2 right-0 cursor-pointer" />
                        </label>
                        <input
                            disabled={profileLoading || loading || passwordLoading}
                            id="fileInput"
                            type='file'
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <h2 className="text-[18px] leading-[21.78px] font-semibold text-textColor">{user?.fullName || ""}</h2>
                    <p className="mt-2 text-[14px] leading-[16.94px] text-[#707070]">{user?.email || ""}</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="mt-6">
                    <h3 className="font-bold text-[20px] leading-[24.2px] text-textColor">Configurações Gerais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <div>
                            <label className="block text-[18px] leading-[21.78px] text-textColor mb-3">Nome</label>
                            <input
                                type="text"
                                placeholder="Nome"
                                className="px-6 py-3  box-border h-[45px] rounded-[10px] outline-none w-full border border-[#D3D3D3]"
                                {...formik.getFieldProps("fullName")}

                            />
                        </div>
                        <div>
                            <label className="block text-[18px] leading-[21.78px] text-textColor mb-3">E-mail</label>
                            <input
                                readOnly={true}
                                type="email"
                                className="px-6 py-3  box-border h-[45px] rounded-[10px] outline-none w-full border border-[#D3D3D3]"
                                {...formik.getFieldProps("email")}

                            />
                        </div>
                        <div>
                            <label className="block text-[18px] leading-[21.78px] text-textColor mb-3">Número de telefone</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    className="px-6 py-3  box-border h-[45px] rounded-[10px] outline-none w-full border border-[#D3D3D3]"
                                    {...formik.getFieldProps("phoneNumber")}

                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={profileLoading || loading || passwordLoading}
                            className="flex justify-center items-center mt-6 w-[182px] h-[45px] bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                        >
                            {profileLoading ? <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="22"
                                visible={true}
                            /> :
                                "Atualizar"
                            }
                        </button>
                    </div>


                </form>
                <form onSubmit={passwordformik.handleSubmit} className="mt-6">
                    <h3 className="font-semibold text-lg">Configurações de senha</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        {/* Current Password Field */}
                        <div className="relative">
                            <label className="block text-[18px] leading-[21.78px] text-textColor mb-3">Senha atual</label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    placeholder="Digite a senha"
                                    className="px-6 py-3 box-border h-[45px] rounded-[10px] outline-none w-full border border-[#D3D3D3] pr-10"
                                    {...passwordformik.getFieldProps("currentPassword")}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {passwordformik.touched.currentPassword && passwordformik.errors.currentPassword ? (
                                <div className="text-red-500 text-xs mt-1">{passwordformik.errors.currentPassword}</div>
                            ) : null}
                        </div>

                        {/* New Password Field */}
                        <div className="relative">
                            <label className="block text-[18px] leading-[21.78px] text-textColor mb-3">Nova Senha</label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Nova Senha"
                                    className="px-6 py-3 box-border h-[45px] rounded-[10px] outline-none w-full border border-[#D3D3D3] pr-10"
                                    {...passwordformik.getFieldProps("newPassword")}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {passwordformik.touched.newPassword && passwordformik.errors.newPassword ? (
                                <div className="text-red-500 text-xs mt-1">{passwordformik.errors.newPassword}</div>
                            ) : null}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative">
                            <label className="block text-[18px] leading-[21.78px] text-textColor mb-3">Confirme sua senha</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Digite confirmar senha"
                                    className="px-6 py-3 box-border h-[45px] rounded-[10px] outline-none w-full border border-[#D3D3D3] pr-10"
                                    {...passwordformik.getFieldProps("confirmPassword")}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {passwordformik.touched.confirmPassword && passwordformik.errors.confirmPassword ? (
                                <div className="text-red-500 text-xs mt-1">{passwordformik.errors.confirmPassword}</div>
                            ) : null}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={profileLoading || loading || passwordLoading}
                        className="flex justify-center items-center mt-6 w-[182px] h-[45px] bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                    >
                        {passwordLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="22"
                            visible={true}
                        /> :
                            "Atualizar senha"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileSettings;
