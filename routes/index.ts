const Routes = Object.freeze({
  LOGIN: "/entrar" as const,
  SIGNUP: "/registro" as const,
  SUBSCRIBER: "/assinante" as const,
  GATEHOUSE: "/portaria" as const,
  ADMIN: "/administrador" as const,
  FORGOT_PASSWORD: "/esqueceu-senha" as const,
  CONDOMINIO: "/condominio" as const,
  PARCEL_DETAIL: "/detalhe-da-encomenda" as const,
  PLAN: "/plano" as const,
  PRIVACY: "/privacidade" as const,
  PROFILE: "/perfil" as const,
  VIEW_RECIPIENTS: "/ver-destinatarios" as const,
  TERMS_AND_CONDITIONS: "/termos-e-condicoes" as const,
  HOME: "/" as const
});

export { Routes };