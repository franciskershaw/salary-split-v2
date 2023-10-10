import axios from 'axios';

const useAxios = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  return api;
};

export default useAxios;
