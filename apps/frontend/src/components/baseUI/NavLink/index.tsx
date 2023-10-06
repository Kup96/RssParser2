import React, { FC, ElementType } from 'react';
import { NavLink } from 'react-router-dom';

type NavProps = {
  to: string;
  text: any;
  icon?: ElementType;
};

const LinkNavigation: FC<NavProps> = ({ to, text, icon }) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      color: isActive ? '#3480F3' : 'black',
      textDecoration: 'none',
      textAlign: 'center',
      borderRadius: '6px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      padding: '6px 16px',
      fontFamily: 'Rubik',
    })}
  >
    {text}
  </NavLink>
);

export default LinkNavigation;
