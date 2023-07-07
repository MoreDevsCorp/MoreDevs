import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistance } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDifferenceInDays(start: string) {
  return formatDistance(new Date(), new Date(start));
}
