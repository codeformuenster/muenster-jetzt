import React, { FC, HTMLProps } from "react";

const ExternalLink: FC<HTMLProps<HTMLLinkElement>> = ({
  children,
  href,
  className,
}) => (
  <a
    href={href}
    className={className}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export default ExternalLink;
