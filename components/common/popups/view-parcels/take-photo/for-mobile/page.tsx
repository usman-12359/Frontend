"use client"
import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam';
import { toast } from 'react-toastify';
import useAPIClient from '@/utils/api-client';
import { RotatingLines } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function ForMobile(props: any) {
    const { setPayload, setActiveTab, handleClose, condominuimID } = props;
    const HTTP_CLIENT = useAPIClient()
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const { userId } = useSelector((state: RootState) => state.user)

    const videoConstraints = {
        height: 250,
        facingMode: { exact: "environment" }
    };

    const capture = () => {
        if (!webcamRef.current) {
            toast.info("Camera is not ready");
            return;
        }

        // Get base64 image from webcam
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
            toast.error("Failed to capture image");
            return;
        }

        // Convert base64 to Blob
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                if (blob) {
                    const timestamp = Date.now();
                    const fileName = `${1000000000 + Math.floor(Math.random() * 9000000)}.jpg`;

                    // Convert Blob to File
                    const file = new File([blob], fileName, {
                        type: "image/jpeg",
                        lastModified: timestamp
                    });

                    // console.log("Captured File:", file);

                    // Set captured image as a File object
                    setCapturedImage(file);
                } else {
                    toast.error("Failed to process captured image");
                }
            })
            .catch(() => {
                toast.error("Error processing image");
            });
    };

    const uploadImage = async () => {
        if (!capturedImage) {
            toast.info("No image to upload");
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", capturedImage);

            const { data, success }: any = await HTTP_CLIENT.post({ url: `/ocr/ocr/upload/${userId}`, data: formData });

            if (success === true) {
                setPayload(data);
                // toast.success("Image uploaded successfully!");
                setActiveTab(false);
            }
            setUploading(false);
        } catch (err) {
            setUploading(false);
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };



    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold py-6">Digitalizar detalhes do pacote</h2>
            <div className="border rounded-lg max-h-[300px] overflow-hidden">
                {capturedImage ?
                    <img src={URL.createObjectURL(capturedImage)} alt='' className='w-full h-full' />
                    :
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        className='w-full max-h-[300px]'
                        screenshotFormat="image/jpeg"
                        height={250} // Adjust to fit the screen
                        videoConstraints={videoConstraints}
                    />
                }
            </div>
            <div className="flex items-center gap-4 my-3">
                {capturedImage ?
                    <button
                        onClick={uploadImage}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md min-w-[100px] max-w-[190px] flex items-center justify-center"
                        disabled={uploading}
                    >
                        {uploading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="22"
                            visible={true}
                        /> : "Upload Photo"
                        }
                    </button>
                    :
                    <button
                        onClick={capture}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md"
                        disabled={uploading}
                    >
                        Tirar foto
                    </button>
                }
                {capturedImage &&
                    <button className="border px-4 py-2 rounded-md" onClick={() => setCapturedImage(null)}>
                        Cancelar
                    </button>
                }
            </div>
        </div>
    );
}
