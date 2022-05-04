import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Header.css';

import logo from '../../assets/logo-wallapop.jpeg';

import './Header.css';
import AuthButton from '../auth/AuthButton';

function Header({ className }) {
  return (
    /* imagen corporativa */
    <header className={classNames('header', className)}>
      <Link to="/">
        <img src={logo} className="header-logo" alt="logo-advertpop"></img>
      </Link>
      {/* links a crear anuncio y todos los anuncios */}
      <nav className="header-nav">
        <NavLink
          to="/adverts/new"
          className={classNames(
            ({ isActive }) => (isActive ? 'active' : ''),
            'header-navLink',
          )}
        >
          Nuevo Anuncio
        </NavLink>
        <NavLink
          to="/adverts"
          className={classNames(
            ({ isActive }) => (isActive ? 'active' : ''),
            'header-navLink',
          )}
          end
        >
          Todos los anuncios
        </NavLink>
        {/* botón para ir a login/logout */}
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}

export default Header;
