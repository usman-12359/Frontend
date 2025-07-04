import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import defaultConfig from "./config";
import { store } from "@/store/store";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes";
type HttpRequestsBasePayload = {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
  errorHandlerCallback?: (error: AxiosError) => void;
};

type ErrorCodes = 400 | 401 | 403 | 404 | 500 | 413;

function useAPIClient() {
  const pathname = useRouter()
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: defaultConfig.Base_URL,
  });

  // get access token from the redux state

  const accessToken = store.getState()?.user?.accessToken;

  // const dispatch = useDispatch();
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  function handleBadRequestException(error: AxiosError) {
    const errorData = error.response?.data as { error?: { message?: string | string[] }; message?: string };

    const message: string | string[] = errorData?.error?.message || errorData?.message;

    toast.error(
      Array.isArray(message) ? message[0] || "Requisição Inválida." : message || "Requisição Inválida."
    );
  }

  function handleInternalException(error: AxiosError) {
    const errorData = error.response?.data as { error?: { message?: string | string[] }; message?: string };

    const message: string | string[] = errorData?.error?.message || errorData?.message;

    toast.error(
      Array.isArray(message) ? message[0] || "Requisição Inválida." : message || "Requisição Inválida."
    );
  }


  function handleUnauthorizedException(error: AxiosError) {
    const message: string | string[] = (error.response?.data as any)?.error?.message || (error.response?.data as any)?.message;
    toast.error(
      Array.isArray(message)
        ? message?.[0] || "Requisição Inválida."
        : message || "Requisição Inválida."
    );
    pathname.push(Routes.HOME)
  }

  function handleForbiddenException(error: AxiosError) {
    const message: string | string[] = (error.response?.data as any)?.message;
    toast.error(
      Array.isArray(message)
        ? message?.[0] || "Requisição Inválida."
        : message || "Requisição Inválida."
    );
  }

  function handleNotFoundException(error: AxiosError) {
    const message: string | string[] = (error.response?.data as any)?.message;
    toast.error(
      Array.isArray(message)
        ? message?.[0] || "Requisição Inválida."
        : message || "Requisição Inválida."
    );
  }



  function handleInternalServerException(error: AxiosError) { }
  function handleEntityTooLarge(error: AxiosError) { }

  function handleGenericErrors(error: AxiosError) {
    if (error?.code === "ERR_NETWORK" && error?.config?.url?.includes("/ocr/ocr/upload/")) {
      return toast.warning("O arquivo é muito grande");
    } else if (error?.code === "ERR_NETWORK") {
      return toast.error("Ou o servidor está fora do ar ou você não está conectado à internet!");
    }

    const statusCode = error.response?.status;
    const errorHandlersMap: Record<ErrorCodes, (error: AxiosError) => any> = {
      400: handleBadRequestException,
      401: handleUnauthorizedException,
      403: handleForbiddenException,
      404: handleNotFoundException,
      500: handleInternalException,
      413: handleEntityTooLarge
    };


    return (
      errorHandlersMap[statusCode as number](error) ||
      handleInternalServerException(error)
    );
  }

  async function get<T>(
    payload: Omit<HttpRequestsBasePayload, "data">
  ): Promise<T | undefined> {
    const { url, config, errorHandlerCallback } = payload;
    try {
      const response = await axiosInstance.get<T>(url, config);
      return response.data as T;
    } catch (error) {
      if (typeof errorHandlerCallback === "function") {
        errorHandlerCallback(error as AxiosError);
      } else {
        handleGenericErrors(error as AxiosError);
      }
    }
  }

  async function post<T>(payload: HttpRequestsBasePayload) {
    const { url, data, config, errorHandlerCallback } = payload;

    try {
      const response = await axiosInstance.post<T>(url, data, config);
      return response.data as T;
    } catch (error) {
      if (typeof errorHandlerCallback === "function") {
        errorHandlerCallback(error as AxiosError);
      } else {
        handleGenericErrors(error as AxiosError);
      }
    }
  }

  async function put<T>(payload: HttpRequestsBasePayload) {
    const { url, data, config, errorHandlerCallback } = payload;

    try {
      const response = await axiosInstance.put<T>(url, data, config);
      return response.data as T;
    } catch (error) {
      if (typeof errorHandlerCallback === "function") {
        errorHandlerCallback(error as AxiosError);
      } else {
        handleGenericErrors(error as AxiosError);
      }
    }
  }

  async function patch<T>(payload: HttpRequestsBasePayload) {
    const { url, data, config, errorHandlerCallback } = payload;

    try {
      const response = await axiosInstance.patch<T>(url, data, config);
      return response.data as T;
    } catch (error) {
      if (typeof errorHandlerCallback === "function") {
        errorHandlerCallback(error as AxiosError);
      } else {
        handleGenericErrors(error as AxiosError);
      }
    }
  }

  async function _delete<T>(payload: Omit<HttpRequestsBasePayload, "config">) {
    const { url, data, errorHandlerCallback } = payload;

    try {
      const response = await axiosInstance.delete<T>(url, data);
      return response.data as T;
    } catch (error) {
      if (typeof errorHandlerCallback === "function") {
        errorHandlerCallback(error as AxiosError);
      } else {
        handleGenericErrors(error as AxiosError);
      }
    }
  }
  return { get, put, post, patch, delete: _delete };
}

export default useAPIClient;
