/** Data do primeiro drop e abertura do quiosque do Palladium. */
export const DROP_DATE = new Date("2026-09-25T10:00:00-03:00");
export const DROP_DATE_LABEL = "25 de setembro de 2026";
export const DROP_DATE_SHORT = "25/09";
export const TERMS_VERSION = "v1";

export const isBeforeDrop = () => Date.now() < DROP_DATE.getTime();

/** Oferta de lançamento da lista de acesso antecipado. */
export const OFFER_DISCOUNT = "20%";
export const OFFER_LINE = "Pokémon 30 anos";
export const OFFER_SHORT = `${OFFER_DISCOUNT} de desconto em produtos ${OFFER_LINE}`;
export const OFFER_FULL = `${OFFER_SHORT} — 1 unidade por CPF, por ordem de chegada, enquanto durar o estoque.`;
export const OFFER_NO_RESERVE =
  "O cadastro dá acesso ao desconto, não reserva produto. O atendimento é por ordem de chegada no quiosque, enquanto durar o estoque.";

/** Cadastros na pré-lista ficam abertos até a data do drop. */
export const SIGNUP_DEADLINE = DROP_DATE;
export const SIGNUP_DEADLINE_LABEL = DROP_DATE_LABEL;
export const isSignupOpen = () => Date.now() < SIGNUP_DEADLINE.getTime();

/** Operação aberta no quiosque (após o drop). */
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Shopping+Palladium+Curitiba";
export const STORE_OPEN_LINE = "Quiosque Pokémon 30 anos aberto no Shopping Palladium · Curitiba";
