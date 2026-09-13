/** Data do primeiro drop e abertura do quiosque do Palladium. */
export const DROP_DATE = new Date("2026-09-25T10:00:00-03:00");
export const DROP_DATE_LABEL = "25 de setembro de 2026";
export const DROP_DATE_SHORT = "25/09";
export const TERMS_VERSION = "v1";

export const isBeforeDrop = () => Date.now() < DROP_DATE.getTime();
