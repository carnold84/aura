import { Link, LinkProps, To } from "react-router-dom";

import Logo from "../Logo";

interface LogoLinkProps extends Omit<LinkProps, "to"> {
  size?: `${number}%`;
  to?: To;
}

const LogoLink = ({ size = "80%", to = "/", ...rest }: LogoLinkProps) => {
  return (
    <Link
      className="mt-0.5 text-neutral-600 hover:text-primary-700"
      to={to}
      {...rest}
    >
      <Logo size={size} />
    </Link>
  );
};

export default LogoLink;
