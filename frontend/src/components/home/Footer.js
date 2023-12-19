import './Footer.css';
import {Link} from 'react-router-dom';
import logo from './images/logoMCAT.png';
const Footer = () => {
    return (
        <div className='footer'>
            <div className="navbar-container">
                <Link className="logo-container-footer"to="/">
                    <img className="second-logo" src={logo} alt="Logo" />
                    <h1>MonroeCAT</h1>
                </Link>
            </div>
        </div>
    )
}

export default Footer;