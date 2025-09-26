"use client";
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

type BaseProps = {
  as?: 'button' | 'a';
  className?: string;
  children: React.ReactNode;
  hoverIcon?: boolean;
  size?: 'md' | 'sm';
  textWeight?: 'medium' | 'bold';
};

// If href is provided (string), anchor variant is assumed unless as='button' explicitly
type ButtonVariantProps = BaseProps & { as: 'button'; href?: undefined } & ComponentProps<'button'>;
type AnchorVariantProps = BaseProps & { as?: 'a'; href: string } & ComponentProps<'a'>;

export function CTAButton(props: AnchorVariantProps): JSX.Element;
export function CTAButton(props: ButtonVariantProps): JSX.Element;
export function CTAButton(props: AnchorVariantProps | ButtonVariantProps): JSX.Element {
  const { locale } = useI18n();
  const { as = 'a', className, children, hoverIcon = false, size = 'md', textWeight = 'medium' } = props as BaseProps;
  const href = (props as AnchorVariantProps).href;
  const isButton = as === 'button';
  const isAnchor = !isButton && typeof href === 'string';
  const base = cn(
    'inline-flex items-center justify-center rounded-full bg-accent text-white',
    'shadow-sm hover:opacity-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
    className
  );

  if (hoverIcon) {
    const classes = cn('group relative', base);

    const textPos =
      size === 'sm'
        ? 'left-[85px] top-[22px] group-hover:left-[108px] group-focus-visible:left-[108px]'
        : 'left-[88px] top-[28px] group-hover:left-[116px] group-focus-visible:left-[116px]';
    const textPosCentered = size === 'sm' ? 'left-1/2 -translate-x-1/2 top-[22px]' : 'left-1/2 -translate-x-1/2 top-[28px]';
    const iconBoxPos = size === 'sm' ? 'left-[48px] top-[21px] h-[32px] w-[32px]' : 'left-[60px] top-[26px] h-[40px] w-[40px]';
    const iconImgPos = size === 'sm' ? 'left-[4px] top-[2.66px] h-[28px] w-[24px]' : 'left-[5px] top-[3.33px] h-[35px] w-[30px]';
    const textTypographyBase = size === 'sm' ? 'text-[26px] leading-[32px]' : 'text-[32px] leading-[40px]';
    const textTypographyEn = size === 'sm' ? 'text-[24px] leading-[30px]' : textTypographyBase;
    const textTypography = locale === 'en' ? textTypographyEn : textTypographyBase;
    const weightClass = textWeight === 'bold' ? 'font-bold' : 'font-medium';

    const content = locale === 'en'
      ? (
        <>
          <span className={cn(
            'pointer-events-none absolute font-display text-white capitalize transition-all duration-200 whitespace-nowrap',
            textTypography,
            weightClass,
            textPosCentered
          )}>
            {children}
          </span>
        </>
      ) : (
        <>
          <span className={cn(
            'pointer-events-none absolute font-display text-white capitalize transition-all duration-200 whitespace-nowrap',
            textTypography,
            weightClass,
            textPos
          )}>
            {children}
          </span>
          <span className={cn(
            'pointer-events-none absolute overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100',
            iconBoxPos
          )} aria-hidden="true">
            <img src="/images/Vector.png" alt="" className={cn('absolute', iconImgPos)} />
          </span>
        </>
      );
    if (isButton) {
      const { as: _as, className: _cn, children: _ch, hoverIcon: _hi, size: _sz, textWeight: _tw, ...buttonRest } =
        props as ButtonVariantProps;
      return (
        <button className={classes} {...buttonRest}>
          {content}
        </button>
      );
    }
    const { as: _as2, className: _cn2, children: _ch2, hoverIcon: _hi2, size: _sz2, textWeight: _tw2, href: _href2, ...anchorRest } =
      props as AnchorVariantProps;
    const finalHref = href ?? '#';
    return (
      <a href={finalHref} className={classes} role="button" {...(anchorRest as Omit<ComponentProps<'a'>, 'href'>)}>
        {content}
      </a>
    );
  }

  const classes = base;
  if (isButton) {
    const { as: _as, className: _cn, children: _ch, hoverIcon: _hi, size: _sz, textWeight: _tw, ...buttonRest } =
      props as ButtonVariantProps;
    return (
      <button className={classes} {...buttonRest}>
        {children}
      </button>
    );
  }
  const { as: _as2, className: _cn2, children: _ch2, hoverIcon: _hi2, size: _sz2, textWeight: _tw2, href: _href2, ...anchorRest } =
    props as AnchorVariantProps;
  const finalHref = href ?? '#';
  return (
    <a href={finalHref} className={classes} role="button" {...(anchorRest as Omit<ComponentProps<'a'>, 'href'>)}>
      {children}
    </a>
  );
}


