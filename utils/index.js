import { formatDate } from './helpers';

export const formatNumber = (num: number) => {
  return num.toLocaleString('en-US');
};

export const formatPercentage = (num: number) => {
  return `${(num * 100).toFixed(0)}%`;
};

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatCalories = (calories: number) => {
  return `${calories} calories`;
};

export const formatDate = (date: Date) => {
  return formatDate(date, 'MMM dd, yyyy');
};