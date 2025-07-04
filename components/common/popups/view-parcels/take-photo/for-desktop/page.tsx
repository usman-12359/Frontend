import { RootState } from '@/store/store';
import useAPIClient from '@/utils/api-client';
import React, { useEffect, useRef, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function ForDesktop(props: any) {
    const { Open, setPayload, setActiveTab, condominuimID } = props
    const HTTP_CLIENT = useAPIClient()
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSecureContext, setIsSecureContext] = useState(true);
    const [apiSupported, setApiSupported] = useState(true);    
    const { userId } = useSelector((state: RootState) => state.user)
    

    // Check if we're in a secure context and if the API is supported
    useEffect(() => {
        // Check if we're in a secure context
        const secure = window.isSecureContext;
        setIsSecureContext(secure);
        // console.log("Is secure context:", secure);


        // Check if the API is supported
        const supported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        setApiSupported(supported);
        // console.log("MediaDevices API supported:", supported);

        // Mobile detection
        //@ts-ignore
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        // console.log("Device detection:", { userAgent, isMobileDevice });
        setIsMobile(isMobileDevice);
    }, []);

    // List available cameras for debugging
    const listCameras = async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                // console.log("Media devices API not supported");
                return [];
            }

            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            return videoDevices;
        } catch (err) {
            console.error("Error listing cameras:", err);
            return [];
        }
    };

    // Start camera stream with better error handling and fallbacks
    const startCamera = async () => {


        // Check if the video element is available
        if (!videoRef.current) {
            console.error("videoRef is null - video element not mounted");
            toast.info("O componente da câmera não foi inicializado corretamente. Atualize a página.");
            return;
        }

        // Check if we're in a secure context
        if (!isSecureContext) {
            toast.error("Não em um contexto seguro");
            return;
        }

        // Check if the API is supported
        if (!apiSupported) {
            console.error("MediaDevices API not supported");
            toast.info("Seu navegador não suporta acesso à câmera. Tente outro navegador, como Chrome, Firefox ou Safari.");
            return;
        }

        try {
            // First, list available cameras for debugging
            await listCameras();

            // console.log("Requesting camera access...");
            // console.log("Is mobile device:", isMobile);

            // Safety check for API availability
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("Camera API not available in your browser.");
            }

            // Try with environment camera first on mobile
            let stream = null;
            let errorMsg = "";


            // First attempt - use preferred mode based on device
            try {
                const constraints = {
                    video: {
                        facingMode: { exact: 'environment' },
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    },
                    audio: false
                };

                // console.log("Attempting with constraints:", constraints);
                stream = await navigator.mediaDevices.getUserMedia(constraints);
                // console.log("Success with primary camera choice");
            } catch (err) {
                errorMsg = `Primary camera selection failed: ${err.message}. `;
                console.warn(errorMsg);

                // If that fails, try with any camera
                try {
                    // console.log("Trying fallback to any camera");
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false
                    });
                    // console.log("Success with fallback camera");
                } catch (fallbackErr) {
                    throw new Error(`${errorMsg} Fallback also failed: ${fallbackErr.message}`);
                }
            }

            // We have a stream now
            // console.log("Camera access granted:", stream);

            if (stream && videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    // console.log("Video metadata loaded");
                    videoRef.current.play().catch(playErr => {
                        // console.error("Error playing video:", playErr);
                    });
                    setCameraActive(true);
                };
            } else {
                throw new Error("Stream or video element unavailable");
            }
        } catch (err) {
            console.error("Camera access error:", err);

            let errorMessage = "Failed to access camera. ";

            if (err.name === "NotAllowedError") {
                errorMessage += "Please allow camera access permissions in your browser settings.";
            } else if (err.name === "NotFoundError") {
                errorMessage += "No camera device found on your device.";
            } else if (err.name === "NotReadableError") {
                errorMessage += "Camera is already in use by another application.";
            } else if (err.name === "OverconstrainedError") {
                errorMessage += "Camera doesn't support the requested constraints. Trying with default camera.";
                // Try again with simpler constraints
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    videoRef.current.srcObject = stream;
                    setCameraActive(true);
                    return;
                } catch (retryErr) {
                    errorMessage += " Retry also failed.";
                }
            } else {
                errorMessage += `${err.name || 'Unknown error'}: ${err.message}`;
            }


        }
    };

    // Stop camera stream
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setCameraActive(false);
        }
    };

    // Capture photo from video stream
    const capturePhoto = () => {
        if (!cameraActive || !videoRef.current || !canvasRef.current) {
            toast.info("Não é possível capturar a foto: câmera não está ativa");
            return;
        }

        try {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            // Make sure video is playing and has dimensions
            if (video.videoWidth === 0 || video.videoHeight === 0) {
                toast.info("Transmissão de vídeo indisponível. Tente novamente.");
                return;
            }

            // Set canvas dimensions to match video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw current video frame to canvas
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert canvas to blob
            canvas.toBlob((blob) => {
                if (blob) {
                    // Generate unique filename with timestamp
                    const timestamp = Date.now();
                    const fileName = `${1000000000 + Math.floor(Math.random() * 9000000)}.jpg`;

                    // Create a File object from the blob
                    const file = new File([blob], fileName, {
                        type: 'image/jpeg',
                        lastModified: timestamp
                    });

                    console.log('handleUploadPhoto ~ file:', file);

                    // Set captured image as File
                    setCapturedImage(file);

                    // Optional: stop camera after capture
                    stopCamera();
                } else {
                    toast.error("Failed to process captured image");
                }
            }, 'image/jpeg', 0.9);
        } catch (err) {


        }
    };

    // Upload captured image to API
    const uploadImage = async () => {
        if (!capturedImage) {
            toast.info("No image to upload");
            return;
        }
        setUploading(true)
        try {
            const formData = new FormData();
            formData.append("file", capturedImage);
            const { data, success }: any = await HTTP_CLIENT.post({ url: `/ocr/ocr/upload/${userId}`, data: formData })

            if (success === true) {
                setPayload(data)
                setActiveTab(false)
            }
            setUploading(false);
        } catch (err) {
            setUploading(false);
        }
    };

    // Reset everything to take another photo
    const resetCapture = () => {
        setCapturedImage(null);
        startCamera();
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    // Start camera when modal opens
    useEffect(() => {
        if (Open) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                startCamera();
            }, 300);
        } else {
            stopCamera();
        }
    }, [Open]);
    return (
        <div className='w-full h-full'>
            <div className="flex flex-col items-center max-w-md mx-auto p-4 space-y-4">
                <h2 className="text-xl font-bold">Digitalizar detalhes do pacote</h2>
                <div className="mt-[20px] relative w-full aspect-video bg-gray-200 rounded overflow-hidden">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                        onLoadedMetadata={() => console.log("Video metadata loaded")}
                    />

                    {capturedImage && (
                        <img
                            src={URL.createObjectURL(capturedImage)}
                            alt="Captured"
                            className="w-full h-full object-cover"
                        />
                    )}

                    {!cameraActive && !capturedImage && (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Câmera inativa</p>
                        </div>
                    )}
                </div>

                {/* Hidden canvas for image processing */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Camera controls */}
                <div className="flex justify-center space-x-4 w-full">
                    {!cameraActive && !capturedImage && (
                        <button
                            onClick={startCamera}
                            className="text-[18px] leading-[34px] font-normal flex justify-center items-center mt-[10px] w-full h-[40px] bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        >
                            Iniciar câmera
                        </button>
                    )}

                    {cameraActive && (
                        <>
                            <button
                                onClick={capturePhoto}
                                className="text-[18px] leading-[34px] font-normal flex justify-center items-center mt-[10px] w-full h-[40px] bg-orange-500 text-white rounded-md hover:bg-orange-600"
                            >
                               Tirar foto
                            </button>
                            <button
                                onClick={stopCamera}
                                className="text-[18px] leading-[34px] font-normal flex justify-center items-center mt-[10px] w-full h-[40px] border border-primary bg-transparent text-primary rounded-md"
                            >
                                Cancelar
                            </button>
                        </>
                    )}

                    {capturedImage && (
                        <>
                            <button
                                onClick={uploadImage}
                                disabled={uploading}
                                className="text-[18px] leading-[34px] font-normal flex justify-center items-center mt-[10px] w-full h-[40px] bg-orange-500 text-white rounded-md hover:bg-orange-600"
                            >
                                {uploading ? <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="22"
                                    visible={true}
                                /> : 'Carregar foto'}
                            </button>
                            <button
                                onClick={resetCapture}
                                disabled={uploading}
                                className="text-[18px] leading-[34px] font-normal flex justify-center items-center mt-[10px] w-full h-[40px] border border-primary bg-transparent text-primary rounded-md"
                            >
                                Reiniciar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
