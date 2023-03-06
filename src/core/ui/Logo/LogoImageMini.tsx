import Image from 'next/image';

import iconMentan from '../../../../public/assets/images/brain.png';

const LogoImageMini = () => {
  return (
    <Image
      src={iconMentan}
      alt="Description of the icon"
      width={50}
      height={50}
    />
  );
};

export default LogoImageMini;
