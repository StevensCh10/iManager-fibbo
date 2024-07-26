import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { User } from "../../types/User";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Profile = () => {
  const auth = useContext(AuthContext);
  const user: User = auth.user!;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        setName(user!.name!);
        setEmail(user!.email!);
    };
    fetchData();
  }, [auth]);

  const handleAtt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    user!.email = email;
    auth.updateUser(user!);
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <Navbar/>
      <div className="profile-content">
        <img src="usuario-de-perfil.png" alt="Foto do usuário" />
        <form onSubmit={handleAtt} className="profile-form">
          <div className="profile-info">
            <input type="name" id="name" name="name" value={name} readOnly />
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
      <Footer color="#ff9500"/>
    </div>
  );
};

export default Profile;
