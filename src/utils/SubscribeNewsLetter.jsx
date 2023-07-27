import { axiosinstance } from "./axiosinstance";

const SubscribeNewsLetter = async (email) => {
  const res = await axiosinstance.post("/news-letters", {
    data: { email },
  });
  return res.data;
};

export default SubscribeNewsLetter;
