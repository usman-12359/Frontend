import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup.string().required("e-mail/Id é obrigatório"),
  password: yup.string().max(255).required("A senha é obrigatória"),
  keepMeLoggedIn: yup.boolean().required("Lembre-se de mim é obrigatório"),
});

export const GetInTouchSchema = yup.object({
  firstName: yup.string().required("O nome é obrigatório"),
  lastName: yup.string().required("O sobrenome é obrigatório"),
  email: yup.string().required("e-mail é obrigatório"),
  contact: yup.string().required("É necessário contato"),
  query: yup.string().max(500).required("a mensagem é obrigatória"),
});

export const ForgotPasswordSchema = yup.object({
  email: yup.string().required("e-mail é obrigatório"),
  newPin: yup.string(),
});

export const VerifyPasswordSchrema = yup.object({
  email: yup.string().required("e-mail é obrigatório"),
  newPin: yup.string(),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
      "A senha deve ter uma letra maiúscula, uma minúscula, um número e um caractere especial"
    )
    .required("A senha é obrigatória")
    .trim(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem corresponder")
    .required("O campo Repetir senha é obrigatório")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
      "A senha deve ter uma letra maiúscula, uma minúscula, um número e um caractere especial"
    ),
});

export const EditGateHouse = yup.object({
  firstName: yup
    .string()
    .email("E-mail inválido")
    .required("e-mail é obrigatório"),
  age: yup.string().required("A idade é obrigatória"),
  year: yup.string().required("O ano é obrigatório"),
});

export const parcelScannedSchema = yup.object({
  fullname: yup.string().required("O nome é obrigatório!"),
  email: yup.string().email("E-mail inválido").optional(),
  contact: yup.string(),
  appartmentNo: yup.string(),
  condominum: yup.string(),
  unit: yup.string(),
  other: yup.string(),
  imageURL: yup.string(),
});

export const parcelAssignSchema = yup.object({
  unitID: yup.string().required("Selecione pelo menos um unitID!"),
  recipientID: yup
    .string()
    .required("Selecione pelo menos um ID de destinatário!"),
});

export const AddProofSchema = yup.object({
  proofOfPayment: yup.string().required("Selecione o comprovante de pagamento"),
});

export const addPlanSchema = (plansList, isUpdate = false) =>
  yup.object({
    name: yup.string().required("O nome é obrigatório!"),
    baseRetailPrice: yup.string().required("é necessário o preço de varejo básico"),
    retailPricePerTenUnit: yup.string().required("preço de varejo é necessário"),
    baseLaunchPrice: yup.string().required("é necessário o preço base de lançamento"),
    launchPricePerTenUnit: yup.string().required("lançamento O preço é obrigatório"),
    details: yup.string().required("O detalhe é obrigatório"),
    type: yup
      .string()
      .oneOf(["monthly", "yearly"], "Tipo de plano inválido")
      .required("O tipo de plano é obrigatório")
      .test(
        "tipo-já-existe",
        "Este plano já existe",
        function (value) {
          if (isUpdate) return true; // ✅ skip validation if updating
          const exists = plansList?.some((plan) => plan.type === value);
          return !exists;
        }
      ),
  });

export const editCondominuim = yup.object({
  email: yup.string().email("E-mail inválido").required("Obrigatória"),
  password: yup.string().required("Obrigatória"),
  name: yup.string().required("Obrigatória"),
  cnpj: yup.string().required("Obrigatória"),
  code: yup.string().required("Obrigatória"),
  cep: yup.string().required("Obrigatória"),
  logradouro: yup.string().required("Obrigatória"),
  number: yup.string().required("Obrigatória"),
  bairro: yup.string().required("Obrigatória"),
  city: yup.string().required("Obrigatória"),
  state: yup.string().required("Obrigatória"),
  complemento: yup.string(),
  phone: yup.string().required("Obrigatória"),
  units: yup.string().required("Obrigatória"),
  gatehousePassword: yup.string().required("Obrigatória"),
});

export const firstScreenValidation = (editData?: any) =>
  yup.object().shape({
    email: yup
      .string()
      .email("Formato de e-mail inválido")
      .required("O e-mail é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
        "A senha deve ter uma letra maiúscula, uma minúscula, um número e um caractere especial"
      )
      .required("A senha é obrigatória")
      .trim(),
    condominiumName: yup
      .string()
      .required("Nome do condomínio necessário")
      .trim(),
    cnjp: yup.string().required("CNPJ é obrigatório").trim(),
    cep: yup.string().required("O CEP é obrigatório").trim(),
    logradouro: yup.string().required("A rua é obrigatória").trim(),
    numero: yup.string().required("O número é obrigatório").trim(),
    subscriptionID: yup.string().when([], {
      is: () => !!editData,
      then: (schema) => schema.required("Selecione pelo menos um plano"),
      otherwise: (schema) => schema.notRequired(),
    }),
    bairro: yup.string().required("Bairro é necessário").trim(),
    cidade: yup.string().required("A cidade é obrigatória").trim(),
    estado: yup.string().required("O estado é obrigatório").trim(),
    complemento: yup.string().trim(),
    telefone: yup
      .string()
      .min(10, "Telefone should be exact 10 digits")
      .max(10, "Telefone should be exact 10 digits")
      .optional()
      .trim(),
    celular: yup
      .string()
      .min(11, "Celular should be exact 11 digits")
      .max(11, "Celular should be exact 11 digits")
      .optional()
      .trim(),
    numberOfUnitsInCondominium: yup
      .number()
      .required("Número de unidades é necessário")
      .positive("O número de unidades deve ser um número positivo"),
    gatehousePassword: yup
      .string()
      .min(8, "A senha do Gatehouse deve ter pelo menos 8 caracteres")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
        "A senha deve ter uma letra maiúscula, uma minúscula, um número e um caractere especial"
      )
      .required("A senha do Gatehouse é necessária")
      .trim(),
  });

export const firstScreenValidationSignUp = yup.object().shape({
  email: yup
    .string()
    .email("Formato de e-mail inválido")
    .required("O e-mail é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
      "A senha deve ter uma letra maiúscula, uma minúscula, um número e um caractere especial"
    )
    .required("A senha é obrigatória")
    .trim(),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "A confirmação da senha deve corresponder"
    )
    .required("O campo Confirmar senha é obrigatório"),
  condominiumName: yup
    .string()
    .required("Nome do condomínio necessário")
    .trim(),
  // cnjp: yup.string().required("CNPJ é obrigatório").trim(),
  cnjp: yup.string().trim(),
  cep: yup.string().required("O CEP é obrigatório").trim(),
  logradouro: yup.string().required("A rua é obrigatória").trim(),
  numero: yup.string().required("O número é obrigatório").trim(),
  bairro: yup.string().required("Bairro é necessário").trim(),
  cidade: yup.string().required("A cidade é obrigatória").trim(),
  estado: yup.string().required("O estado é obrigatório").trim(),
  complemento: yup.string().trim(),
  telefone: yup
    .string()
    .min(10, "Telefone deve ter exatamente 10 dígitos")
    .max(10, "Telefone deve ter exatamente 10 dígitos")
    .optional()
    .trim(),
  celular: yup
    .string()
    .min(11, "Celular deve ter exatamente 11 dígitos")
    .max(11, "Celular deve ter exatamente 11 dígitos")
    .optional()
    .trim(),
  numberOfUnitsInCondominium: yup
    .number()
    .required("Número de unidades é necessário")
    .positive("O número de unidades deve ser um número positivo"),
  gatehousePassword: yup
    .string()
    .min(8, "A senha do Gatehouse deve ter pelo menos 8 caracteres")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
      "A senha deve ter uma letra maiúscula, uma minúscula, um número e um caractere especial"
    )
    .required("A senha do Gatehouse é necessária")
    .trim(),
  terms: yup.boolean()
    .oneOf([true], "Por favor, aceite os termos e condições e a política de privacidade.")
    .required("Por favor, aceite os termos e condições e a política de privacidade.")
});
export const editManagerValidation = yup.object().shape({
  email: yup.string().email("Formato de e-mail inválido").optional(),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
      "A senha deve ter uma letra maiúscula, uma minúscula, um número e um caractere especial"
    )
    .required("A senha é obrigatória")
    .optional()
    .trim(),
  condominiumName: yup.string().trim(),
  cnjp: yup.string().trim().optional(),
  cep: yup.string().required("O CEP é obrigatório").trim(),
  logradouro: yup.string().trim(),
  numero: yup.string().trim(),
  bairro: yup.string().trim(),
  cidade: yup.string().trim(),
  estado: yup.string().trim(),
  complemento: yup.string().trim(),
  telefone: yup
    .string()
    .min(10, "Telefone deve ter exatamente 10 dígitos")
    .max(10, "Telefone deve ter exatamente 10 dígitos")
    .optional()
    .trim(),
  celular: yup
    .string()
    .min(11, "Celular deve ter exatamente 11 dígitos")
    .max(11, "Celular deve ter exatamente 11 dígitos")
    .optional()
    .trim(),
  numberOfUnitsInCondominium: yup
    .number()
    .positive("O número de unidades deve ser um número positivo"),
  gatehousePassword: yup
    .string()
    .min(8, "A senha do Gatehouse deve ter pelo menos 8 caracteres")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
      "A senha deve ter uma letra maiúscula, uma minúscula, um número e um caractere especial"
    )
    .optional()
    .trim(),
});

export const newPinValidation = yup.object().shape({
  newPin: yup.string().required("Pin is required!"),
});

export const createManagerSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  password: yup
    .string()
    .min(4, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
  condominiumName: yup.string().required("O nome do condomínio é obrigatório"),
  cnjp: yup.string().required("CNPJ é obrigatório"),
  cep: yup.string().required("O CEP é obrigatório"),
  logradouro: yup.string().required("A rua é obrigatória"),
  numero: yup.string().required("O número é obrigatório"),
  bairro: yup.string().required("Bairro é necessário"),
  cidade: yup.string().required("A cidade é obrigatória"),
  estado: yup.string().required("O estado é obrigatório"),
  complemento: yup.string(),
  telefone: yup.string().required("Telefone é obrigatório"),
  celular: yup.string().required("O celular é obrigatório"),
  numberOfUnitsInCondominium: yup
    .number()
    .positive("O número de unidades deve ser um número positivo")
    .integer("O número de unidades deve ser um inteiro")
    .required("Número de unidades é necessário"),
  gatehousePassword: yup
    .string()
    .min(4, "A senha do Gatehouse deve ter pelo menos 4 caracteres")
    .required("A senha do Gatehouse é necessária"),
});

export const AddUnitSchema = yup.object({
  address: yup.string().required("O endereço é obrigatório"),
});

export const AddRecipientSchema = yup.object({
  unitID: yup.string().optional(),
  name: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .email("E-mail não é válido")
    .required("O e-mail é obrigatório"),
  whatsapp: yup
    .string()
    .min(11, "O número do celular deve ter 11 dígitos")
    .required("O número do celular é obrigatório"),
  notificationType: yup
    .string()
    .oneOf(["email", "whatsapp", "both", "sms"], "Tipo de notificação inválido")
    .required("O tipo de notificação é obrigatório"),
});

export const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("A senha atual é obrigatória"),
  newPassword: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
      "A senha deve ter uma letra maiúscula, uma minúscula, um número e um caractere especial"
    )
    .required("A senha é obrigatória")
    .trim(),
  confirmPassword: yup
    .string()
    .required("A confirmação da senha é obrigatória")
    .oneOf([yup.ref("newPassword"), null], "As senhas devem corresponder"),
});
