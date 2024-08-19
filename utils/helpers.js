import { format } from 'date-fns';

export const formatDate = (date: Date, formatString = 'MMM dd, yyyy') => {
  return format(date, formatString);
};