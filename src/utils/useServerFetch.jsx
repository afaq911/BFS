import { axiosinstance } from "./axiosinstance";

const useServerFetch = async (url) => {
  try {
    const res = await axiosinstance.get(process.env.NEXT_PUBLIC_URL + `${url}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default useServerFetch;
