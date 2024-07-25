import { Link } from "react-router-dom";

const Navbar = () => {
    return(
      <nav className="navbar">
        <div className="navbar-left">
          OPA
        </div>
        <div className="navbar-right">
          <Link to="/" style={{color: "rgb(184, 14, 20)"}}>
            <div className="logo-container-home">
              <h1 className="logo-text">Vital</h1>
              <img src="/Logo.png" alt="Logo" className="logo-image" />
              <h1 className="logo-text">Hero</h1>
            </div>
          </Link>
        </div>
      </nav>
    );
}