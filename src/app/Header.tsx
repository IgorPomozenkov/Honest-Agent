import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clear } from '@/store/main/slicer';
import { getData } from '@/store/main/selectors';


const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { authed } = useSelector(getData, shallowEqual);

  useEffect(() => {
    const regexp1 = /\/market/;
    const regexp2 = /\/market\/organizations/;
    const menuLinks = document.querySelectorAll('.menu__link');

    menuLinks.forEach((link:HTMLLinkElement) => {
      if(link.pathname === location.pathname && !authed) return navigate('/');
      if(regexp1.test(link.pathname) && regexp1.test(location.pathname) && !authed) return navigate('/');

      if(link.pathname === location.pathname) link.classList.add('menu__link_active');
      else if(regexp1.test(link.pathname) && regexp1.test(location.pathname)) link.classList.add('menu__link_active');
      else link.classList.remove('menu__link_active');
    });

    if(regexp1.test(location.pathname)) {
      (async () => {
        await setShowMenu(true);
        const sideMenuLinks = document.querySelectorAll('.sideMenu__link');
        sideMenuLinks.forEach((link:HTMLLinkElement) => {
          if(link.pathname === location.pathname) link.classList.add('sideMenu__link_active');
          else if(regexp2.test(link.pathname) && regexp2.test(location.pathname)) link.classList.add('sideMenu__link_active');
          else link.classList.remove('sideMenu__link_active');
        });
      })();
    }else setShowMenu(false);
  }, [location.pathname]);

  const handleClick = (e:React.MouseEvent) => {
    e.preventDefault();
    dispatch(clear());
  }

  return (
    <header>
      <nav className="menu">
        <div className="menu__topLinks">
          <Link to="/" className="menu__link"><img className="menu__icon" src="/images/icons/Home.svg" alt="icon" /></Link>
          <Link to="/market" className="menu__link"><img className="menu__icon" src="/images/icons/Market.svg" alt="icon" /></Link>
          <Link to="/search" className="menu__link"><img className="menu__icon" src="/images/icons/Search.svg" alt="icon" /></Link>
        </div>
        <div className="menu__bottomLinks">
          <Link to="/settings" className="menu__link"><img className="menu__icon" src="/images/icons/Settings.svg" alt="icon" /></Link>
          <Link to="/chat" className="menu__link"><img className="menu__icon" src="/images/icons/Chat.svg" alt="icon" /></Link>
          <Link to="/exit" onClick={handleClick} className="menu__link"><img className="menu__icon" src="/images/icons/Exit.svg" alt="icon" /></Link>
        </div>
      </nav>
      {!!showMenu && <nav className="sideMenu">
        <div className="sideMenu__heading">
          <h3>ЧЕСТНЫЙ АГЕНТ</h3>
          <h4>МЕНЕДЖЕР ПРОЦЕССА</h4>
        </div>
        <div className="sideMenu__links">
          <Link to="/market/organizations" className="sideMenu__link"><img className="sideMenu__icon" src="/images/icons/Building.svg" alt="icon" />Организации</Link>
        </div>
      </nav>}
    </header>
  );
}

export default Header
