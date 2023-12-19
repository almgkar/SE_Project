import { useNavigate, Link } from "react-router-dom";
import userSession from "./userSession";
import logo from "../home/images/logoMCAT.png";

const Logout = () => {
  userSession.setUserId(null);
  const type = userSession.getUserType();
  userSession.setUserType(null);

  const navigate = useNavigate();

  navigate("/");

  return (
    <div>
      <nav className="navbar" id="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <Link className="logo-container" to="/">
              <img className="home-logo" src={logo} alt="Logo" />
              <span className="site-name">MonroeCAT</span>
            </Link>
          </div>
        </div>
      </nav>
      <div> {type} Logged Out Successfully!!</div>
    </div>
  );
};

export default Logout;
