"use client";
import { FirstLetterCapital } from "@/utils/custom-functions";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";

export default function FormForCondominuim(props: any) {
  const { condominuim } = props;

  const [formikValues, setFormikValues] = useState({
    condominiumID: "",
    condominiumName: "",
    email: "",
    cnjp: "",
    condominiumZipCode: "",
    address: "",
    city: "",
    state: "",
    numberOfUnitsInCondominium: "",
    numberOfRegisteredUnits: "",
    signatureDate: "",
    currentSubscriptionPlan: "",
    planStatus: "",
    planExpirationDate: "",
    gatehouseUser: "",
    gateHousePassword: "",
    proofOfPayment: "",
  });

  // For Parcel View
  const [isAttachmentOpen, setIsAttachmentOpen] = useState<boolean>(false);
  const [attachmentURL, setAttachmentURL] = useState<string>("");

  const handleOpenAttachment = (item: string) => {
    if (!item) return;
    setAttachmentURL(item);
    setIsAttachmentOpen(true);
  };

  useEffect(() => {
    if (condominuim) {
      const { condominium, subscriptionPlan, ...rest } = condominuim;
      setFormikValues({
        condominiumID: condominium?.condominiumID || "",
        condominiumName: condominium?.condominiumName || "",
        email: rest?.email || "",
        cnjp: rest?.cnjp || "",
        condominiumZipCode: condominium?.condominiumZipCode || "",
        address:
          `${condominium?.condominiumAddressLine2} ${condominium?.condominiumAddressLine1_1of3} ${condominium?.condominiumAddressLine1_2of3} ${condominium?.condominiumAddressLine1_3of3}` ||
          "",
        city: condominium?.city || "",
        state: condominium?.state || "",
        numberOfUnitsInCondominium:
          condominium?.numberOfUnitsInCondominium || "",
        numberOfRegisteredUnits: condominium?.numberOfRegisteredUnits || "",
        signatureDate: rest?.planStartingDate
          ? moment(rest?.planStartingDate)?.format("DD/MM/YY")
          : "",
        currentSubscriptionPlan: subscriptionPlan?.name || "",
        planStatus: rest?.planStatus === "pending" ? "pendente" : 
          rest?.planStatus === "cancelled"
            ? "Cancelado"
            : rest?.planStatus === "active"
            ? "Ativo"
            : rest?.planStatus === "suspended"
            ? "Suspenso"
            : rest?.planStatus,
        planExpirationDate: rest?.planExpirationDate
          ? moment(rest?.planExpirationDate)?.format("DD/MM/YY")
          : "",
        gatehouseUser: condominium?.condominiumID || "",
        gateHousePassword: rest?.gateHousePassword || "",
        proofOfPayment: rest?.proofOfPayment || "",
      });
    }
  }, [condominuim]);

  return (
    <>
      <Formik
        initialValues={formikValues}
        enableReinitialize={true}
        onSubmit={(values) => console.log(values)}
      >
        {({ errors, touched, values }) => (
          <Form className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-x-14 lg:gap-y-7">
            {[
              {
                label: "Código:",
                name: "condominiumID",
                placeholder: "",
                disabled: true,
              },
              { label: "Nome:", name: "condominiumName", placeholder: "" },
              {
                label: "E-mail:",
                name: "email",
                placeholder: "",
                disabled: true,
              },
              { label: "CNPJ:", name: "cnjp", placeholder: "" },
              { label: "CEP:", name: "condominiumZipCode", placeholder: "" },
              { label: "Endereço:", name: "address", placeholder: "" },
              { label: "Cidade:", name: "city", placeholder: "" },
              { label: "Estado:", name: "state", placeholder: "" },
              {
                label: "Número de Unidades:",
                name: "numberOfUnitsInCondominium",
                placeholder: "",
              },
              {
                label: "Número de Unidades Registradas:",
                name: "numberOfRegisteredUnits",
                placeholder: "",
                disabled: true,
              },
              {
                label: "Data da assinatura:",
                name: "signatureDate",
                placeholder: "",
              },
              {
                label: "Plano atual:",
                name: "currentSubscriptionPlan",
                placeholder: "",
              },
              {
                label: "Situação do Plano:",
                name: "planStatus",
                placeholder: "",
                disabled: true,
              },
              {
                label: "Data de Expiração do Plano:",
                name: "planExpirationDate",
                disabled: true,
              },
              {
                label: "Usuário para Portaria:",
                name: "gatehouseUser",
                placeholder: "",
                disabled: true,
              },
              {
                label: "Comprovante de pagamento:",
                name: "proofOfPayment",
                placeholder: "",
                type: "link",
              },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-[#191720] mb-3 font-medium text-[18px] leading-[21.78px]">
                  {field.label}
                </label>
                {field.type === "link" ? (
                  <button
                    type="button"
                    className="border px-[14px] py-3 box-border outline-none rounded-lg h-[46px] w-full"
                    onClick={() => handleOpenAttachment(values.proofOfPayment)}
                  >
                    {values.proofOfPayment ? "Visualizar" : "N/A"}
                  </button>
                ) : (
                  <Field
                    disabled={true}
                    type={"text"}
                    name={field.name}
                    className="border px-[14px] py-3 box-border outline-none rounded-lg h-[46px] w-full"
                    // placeholder={`enter ${field.placeholder}`}
                  />
                )}
                {errors[field.name as keyof typeof errors] &&
                  touched[field.name as keyof typeof touched] && (
                    <div className="text-red-500 text-sm">
                      {errors[field.name as keyof typeof errors]}
                    </div>
                  )}
              </div>
            ))}
          </Form>
        )}
      </Formik>
      {isAttachmentOpen && (
        <ImageViewer
          src={[attachmentURL]}
          currentIndex={0}
          onClose={() => setIsAttachmentOpen(false)}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )}
    </>
  );
}
