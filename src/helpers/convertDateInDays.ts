import { differenceInDays, parse } from 'date-fns';

export const convertDateInDays = (date: string): string => {
  const dateNews = parse(
    date,
    'dd/MM/yyyy HH:mm:ss',
    new Date(),
  );
  const dateNow = new Date();
  const day = differenceInDays(dateNow, dateNews);
  let message = '';
  if (day === 0) {
    message = 'Hoje';
  }
  if (day > 0) {
    message = `${day} ${day === 1 ? 'dia' : 'dias'} atrás`;
  }
  return message;
};
