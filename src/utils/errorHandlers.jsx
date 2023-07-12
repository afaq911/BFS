import { toast } from "react-toastify";

export const ErrorNotificationHandler = (error) => {
  if (error?.response?.data?.error?.details?.errors?.length) {
    toast.error(
      error?.response?.data?.error?.details?.errors[0]?.message?.replace(
        "identifier",
        "email"
      )
    );
  } else {
    toast.error(
      error?.response?.data?.error?.message?.replace("identifier", "email")
    );
  }
};
