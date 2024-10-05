import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../img/logo.png"

const HeaderMenu = [
  {
    label: "Home",
    url: "/",
    selected: true,
  },
  {
    label: "Crud Form",
    url: "/crud-form",
    selected: false,
  },
  {
    label: "Form",
    url: "/form",
    selected: false,
  },
  {
    label: "Form Data",
    url: "/form-data",
    selected: false,
  },
];

const Header = () => {
  const [headerMenuList, setHeaderMenuList] = useState(HeaderMenu);
  const location = useLocation();

  useEffect(() => {
    const _headerMenu = headerMenuList;
    setHeaderMenuList(
      _headerMenu.map((data) => {
        const selectedURL = data.url === location.pathname;
        if (selectedURL) {
          return { ...data, selected: true };
        } else {
          return { ...data, selected: false };
        }
      })
    );
  }, [location.pathname]);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="container">
            <div className="inner">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12">
                  <div className="logo">
                    <Link to="/">
                      <img src={Logo} alt="logo" />
                    </Link>
                  </div>
                  <div className="mobile-nav"></div>
                </div>
                <div className="col-lg-7 col-md-9 col-12">
                  <div className="main-menu">
                    <nav className="navigation">
                      <ul className="nav menu">
                        {headerMenuList?.map((menu, index) => (
                          <li
                            key={index}
                            className={menu.selected ? "active" : undefined}
                          >
                            <Link to={menu.url}>{menu.label}</Link>
                          </li>
                        ))}
                        {/* <NavLink
                          to="/messages"
                          className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                          }
                        >
                          Messages
                        </NavLink> */}
                        {/* <li>
                          <Link to="/about">About</Link>
                        </li>
                        <li>
                          <Link to="/form">Form</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact</Link>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </div>
                {/* <div className="col-lg-2 col-12">
                  <div className="get-quote">
                    <button className="btn">Book Appointment</button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
