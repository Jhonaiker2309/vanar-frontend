import { useEffect } from 'react';
const useFreezeBack = (values: boolean[]) => {
  useEffect(() => {
    if (values.filter(value => true == value).length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [values]);
};

export default useFreezeBack;
