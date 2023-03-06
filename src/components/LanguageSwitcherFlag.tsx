import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image, { StaticImageData } from 'next/image';

import usFlag from '../../public/assets/images/us.png';
import brFlag from '../../public/assets/images/br.png';

type FlagIcon = {
  [key: string]: {
    label: string;
    src: StaticImageData;
    alt: string;
  };
};

const flagIcons: FlagIcon = {
  en: { label: 'English', src: usFlag, alt: 'EN flag' },
  pt: { label: 'Português', src: brFlag, alt: 'PT flag' },
};

const LanguageSwitcherFlag: React.FC<{
  onChange?: (locale: string) => unknown;
}> = ({ onChange }) => {
  const { i18n } = useTranslation();
  const { language: currentLanguage } = i18n;
  const router = useRouter();
  const locales = router.locales ?? [currentLanguage];

  const languageNames = useMemo(() => {
    return new Intl.DisplayNames([currentLanguage], {
      type: 'language',
    });
  }, [currentLanguage]);

  const [value, setValue] = useState(i18n.language);

  const switchToLocale = useCallback(
    (locale: string) => {
      const path = router.asPath;

      return router.push(path, path, { locale });
    },
    [router]
  );

  const languageChanged = useCallback(
    async (locale: string) => {
      setValue(locale);

      if (onChange) {
        onChange(locale);
      }

      await switchToLocale(locale);
    },
    [switchToLocale, onChange]
  );

  const handleLanguageChange = (locale: string) => () => {
    languageChanged(locale);
  };

  return (
    <div style={{ display: 'flex' }}>
      {locales.map((locale) => {
        const flag = flagIcons[locale];

        const selected = value === locale;

        return (
          <div key={locale} className="">
            <button
              key={locale}
              onClick={handleLanguageChange(locale)}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <Image width="25" height="25" src={flag.src} alt={flag.alt} />
              <span
                style={{
                  marginLeft: '0.5rem',
                  fontWeight: selected ? 'bold' : 'normal',
                }}
              ></span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSwitcherFlag;
