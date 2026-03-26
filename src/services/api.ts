import { emissions } from "../data/emissions";
export const fetchEmissions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(emissions);
    }, 2000);
  });
};
