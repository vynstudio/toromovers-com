import type { CSSProperties } from "react";
import { COMPANY_PHONES } from "@/lib/site";

type CompanyPhoneLinksProps = {
  /** Existing data-cta on the main line. The second line uses `${cta}-2`. */
  cta: string;
  linkClassName: string;
  /** Wrap the pair when they should sit together (footer, contact card). */
  groupClassName?: string;
  /** Optional label before each formatted number, e.g. "Call ". */
  prefix?: string;
  style?: CSSProperties;
};

/**
 * Both company numbers, same display format, as click-to-call links.
 * Link text is the number. No aria-label — existing phone links don't use one.
 */
export function CompanyPhoneLinks({
  cta,
  linkClassName,
  groupClassName,
  prefix = "",
  style,
}: CompanyPhoneLinksProps) {
  const links = COMPANY_PHONES.map((phone, index) => (
    <a
      key={phone.tel}
      href={phone.tel}
      data-cta={index === 0 ? cta : `${cta}-2`}
      className={linkClassName}
      style={style}
    >
      {prefix}
      {phone.display}
    </a>
  ));

  if (groupClassName) {
    return <span className={groupClassName}>{links}</span>;
  }

  return <>{links}</>;
}
