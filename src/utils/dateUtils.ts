import dayjs from "dayjs";

export const formatDateValue = (date: Date) => date ? dayjs(date).format('DD/MM/YYYY') : ''
