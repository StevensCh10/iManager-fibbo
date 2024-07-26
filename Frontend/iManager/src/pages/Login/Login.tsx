import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ErrorType } from "../../types/ErrorType";
import "./Login.css"
import Footer from "../../components/Footer/Footer";

const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (email && password) {
        try{
          const isLogged = await auth.signin(email, password);
          if (isLogged) {
            navigate("/");
          }
        }catch(error){
          alert((error as ErrorType).detail);
        }
      }
    };
  
    return (
      <div className="login-container">
        <div className="login-content">
          <div className="logo-container">
            <h1 className="logo-text">iManager</h1>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <label>Email</label>
            <input
              style={{marginBottom: "6%"}}
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
  
            <label>Senha</label>
            <input
              style={{marginBottom: "12%"}}
              placeholder="Senha"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
  
            <button type="submit">
              Entrar
            </button>
          </form>
  
          <p className="signup-link">
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </p>

        </div>
        <Footer color="white"/>
      </div>
    );
  };
  
  export default Login;