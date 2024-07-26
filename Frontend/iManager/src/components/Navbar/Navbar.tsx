import { Link } from "react-router-dom";
import "./Navbar.css"
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";

const Navbar = () => {
  const auth = useContext(AuthContext);

  const handleLogout = (e: any) => {
    e.preventDefault();
    auth.signout();
  }

    return(
      <nav className="navbar">
        <div className="left">
          <Link to="/">iManager</Link>
        </div>
        <div className="right">
          <Link to="/add-product">Adicionar Produto</Link>
          <Link to="/home">Produtos</Link>
          <Link to="/profile">Perfil</Link>
          <Link to="/" onClick={handleLogout}>Sair</Link>
        </div>
      </nav>
    );
}

export default Navbar;