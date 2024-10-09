import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../img/logo.png";
import { useAuth } from "../../../utils/AuthContext";

const HeaderMenu = [
  {
    label: "Home",
    url: "/",
    selected: true,
  },
  {
    label: "Products",
    url: "/products",
    selected: false,
  },
  // {
  //   label: "Login",
  //   url: "/login",
  //   selected: false,
  // },
];

const Header = () => {
  const [headerMenuList, setHeaderMenuList] = useState(HeaderMenu);
  const location = useLocation();
  // const navigation = useNavigate();

  const { user, logoutUser } = useAuth();

  useEffect(() => {
    const _headerMenu = headerMenuList;
    setHeaderMenuList(
      _headerMenu.map((data) => {
        let selectedURL = data.url === location.pathname;
        let singlePro = "/products";
        if (location.pathname.indexOf(singlePro) > -1) {
          selectedURL = singlePro === data.url;
          // console.log("urlmatch", location.pathname);
        }
        // console.log('url++', location.pathname);
        // if(data.url === )
        // console.log("url--", selectedURL);
        if (selectedURL) {
          return { ...data, selected: true };
        } else {
          return { ...data, selected: false };
        }
      })
    );
  }, [location.pathname]);

  // const handelLogout = () => {
  //   navigation("/login");
  // };

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
                <div className="col-lg-2 col-12">
                  <div className="py-3 ml-auto text-right">
                    {/* {console.log("useAuth:", user)} */}
                    {user ? (
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={logoutUser}
                      >
                        Sign Out
                      </button>
                    ) : (
                      <Link to="/login" className="btn btn-outline-primary">
                        Login
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
