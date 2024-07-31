import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMediaQueryState } from '../slices/mediaQuery';

const useMediaQuery = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateMediaQueryState = () => {
      const isSmallScreen = window.matchMedia('(max-width: 767px)').matches;
      const isMediumScreen = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;

      dispatch(setMediaQueryState({ isSmallScreen, isMediumScreen, isLargeScreen }));
    };

    updateMediaQueryState();

    window.addEventListener('resize', updateMediaQueryState);

    return () => window.removeEventListener('resize', updateMediaQueryState);
  }, [dispatch]);
};

export default useMediaQuery;
