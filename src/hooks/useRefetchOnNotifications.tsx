import { baseApi } from "@/redux/api/baseApi";
import { useDispatch } from "react-redux";

const useRefetchOnNotifications = () => {
  const dispatch = useDispatch();

  /**
   * This function is used to invalidate tags when a message is received
   */
  const handleInvalidateTags = (tags: any) => {
    if (!tags) return;
    dispatch(baseApi.util.invalidateTags(tags));
  };

  return { handleInvalidateTags };
};

export default useRefetchOnNotifications;
