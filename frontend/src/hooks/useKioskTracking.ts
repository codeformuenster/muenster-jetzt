import SwiperCore from "swiper";
import { useHistory, useLocation } from "react-router-dom";
import useTrackingRequest from "./useTrackingRequest";
import useQuery from "./useQuery";

const useKioskTracking = () => {
  const params = useQuery();
  const history = useHistory();
  const location = useLocation();
  const sendRequest = useTrackingRequest();

  return {
    onSlide: (state: SwiperCore) => {
      const currSlideDiv: HTMLElement = state.slides[
        state.realIndex
      ] as HTMLElement;

      const slideId = currSlideDiv.dataset.kioskSlideId ?? "";

      if (params?.track) {
        const strParams = Object.entries({
          ...params,
          slide: slideId,
        } as Record<string, string | boolean>)
          .map((pair) => {
            if (pair[1] === true) {
              return pair[0];
            }
            return pair.join("=");
          })
          .join("&");

        const newURL = `${location.pathname}?${strParams}${location.hash}`;
        history.replace(newURL);
      }
    },
    sendRequest,
  };
};

export default useKioskTracking;
