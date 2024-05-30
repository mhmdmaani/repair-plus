import useTranslation from 'next-translate/useTranslation';

export const useTranslate = () => {
  const { t, lang } = useTranslation('common');

  return {
    t,
    lang,
  };
};
