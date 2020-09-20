import { useRef } from "react";
import SwiperCore from "swiper";

interface IStartAutoplayResume {
  (swiperState: SwiperCore): void;
}

interface IStopAutoplayResume {
  (): void;
}

interface IUseAutoplayResume {
  (timeout: number): {
    startAutoplayResume: IStartAutoplayResume;
    stopAutoplayResume: IStopAutoplayResume;
  };
}

const useAutoplayResume: IUseAutoplayResume = (timeout) => {
  const autoplayTimeout = useRef<number>(-1);

  const stopAutoplayResume: IStopAutoplayResume = () => {
    window.clearTimeout(autoplayTimeout.current);
  };

  const startAutoplayResume: IStartAutoplayResume = (swiperState) => {
    stopAutoplayResume();

    autoplayTimeout.current = window.setTimeout(() => {
      swiperState?.autoplay?.start();
    }, timeout);
  };

  return { startAutoplayResume, stopAutoplayResume };
};

export default useAutoplayResume;
