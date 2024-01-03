import { NavLink as NavLinkReactRouter } from "react-router-dom";
import React from "react";

export const NavLink = ({
  to,
  children,
  ...props
}: {
  to: string;
  children: React.ReactElement | string;
}) => {
  return (
    <NavLinkReactRouter
      {...props}
      className={({ isActive }) => {
        return isActive ? "is-active" : undefined;
      }}
      to={to}
    >
      {children}
    </NavLinkReactRouter>
  );
};
