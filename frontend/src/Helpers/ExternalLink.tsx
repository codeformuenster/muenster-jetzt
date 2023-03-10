/* eslint-disable react/jsx-no-target-blank */
import React, { FC, HTMLProps } from "react";

const ExternalLink: FC<HTMLProps<HTMLLinkElement>> = ({
  children,
  href,
  className,
}) => (
  <a href={href} className={className} target="_blank" rel="noopener">
    {children}
  </a>
);

export default ExternalLink;
