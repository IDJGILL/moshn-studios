import Image from 'next/image';
import { cn } from '@/lib/utils';

import blackLogoIcon from '@/assets/brand/logo-icon-black.png';
import blackLogoText from '@/assets/brand/logo-text-black.png';

import grayLogoIcon from '@/assets/brand/logo-icon-gray.png';
import grayLogoText from '@/assets/brand/logo-text-gray.png';
import Link from 'next/link';

interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  colorVariant: 'black' | 'gray';
  type: 'icon' | 'text' | 'both';
}

export default function Logo({ ...props }: LogoProps) {
  const {} = props;

  const logoIcon =
    props.colorVariant === 'black' ? blackLogoIcon : grayLogoIcon;

  const logoText =
    props.colorVariant === 'black' ? blackLogoText : grayLogoText;

  return (
    <Link href="/" className="max-w-max">
      <div
        className={cn('', props.className, {
          'flex items-center gap-2': props.type === 'both',
        })}
      >
        {(props.type === 'icon' || props.type === 'both') && (
          <div className="h-[15.38vw] w-[15.38vw] md:h-[clamp(45px,3.57vw,200px)] md:w-[clamp(45px,3.57vw,200px)]">
            <Image src={logoIcon} alt="" className="w-full h-full" />
          </div>
        )}

        {(props.type === 'text' || props.type === 'both') && (
          <div className="w-[30.38vw] md:w-[clamp(45px,10.57vw,100px)]">
            <Image src={logoText} alt="" className="w-full h-full" />
          </div>
        )}
      </div>
    </Link>
  );
}
