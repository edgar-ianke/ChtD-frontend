import { mockData } from "./mockData";
export const fakeRequest = async () => {
  let res = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
  return res;
};