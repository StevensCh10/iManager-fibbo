import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { ErrorType } from "../../types/ErrorType";
import { User } from "../../types/User";
import "./Register.css";

const Register = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await auth.register(newUser);
      if (response.id !== undefined) {
        navigate("/");
      }
    } catch (error) {
      alert((error as ErrorType).detail);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <span>Cadastre-se</span>
        <form onSubmit={handleRegister} className="register-form">
          <label htmlFor="name">Nome</label>
          <input
            style={{ marginBottom: "5%" }}
            placeholder="Nome completo"
            type="text"
            id="name"
            name="name"
            pattern="\S.*"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            style={{ marginBottom: "5%" }}
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Senha</label>
          <input
            style={{ marginBottom: "10%" }}
            placeholder="Senha"
            type="password"
            id="password"
            name="password"
            pattern="\S.*"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
          <p className="signup-link" style={{ marginBottom: "1.7%" }}>
            Já tem uma conta? <Link to="/login">Conecte-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
