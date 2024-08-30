import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { User } from "../../types/User";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const Profile = () => {
  const auth = useContext(AuthContext);
  const user: User = auth.user!;
  const name = user?.name;
  const email = user?.email;

  const inputStyle = "text-center w-[70%] p-[10px] box-border mb-[4%] rounded-sm bg-[#00000015] text-[1em] focus:outline-none";

  const handleAtt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    auth.updateUser(user!);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img className="w-[180px] mb-[3%]" src="usuario-de-perfil.png" alt="Foto do usuário" />
        <form className="text-center" onSubmit={handleAtt}>
            <input
              className={inputStyle} 
              type="name" id="name" name="name" value={name} readOnly />
            <input
              className={inputStyle}
              id="email"
              name="email"
              value={email}
              readOnly
            />
          <p className="mt-[3%] opacity-75 text-sm mb-[4%] md:mb-0 md:text-base">
            <Link className="text-[#b86b00] hover:text-[#ff9500cb]" to="/change-password">Alterar senha</Link>
          </p>
          <button
            className="rounded-sm w-[70%] text-[#ff9500] p-[10px] cursor-pointer border border-[#ff9500] text-[1em] mt-[7%]
             hover:bg-[#ff9500] hover:text-white"
            type="submit">Salvar</button>
        </form>
      </div>
      <Footer color="#ff9500"/>
    </div>
  );
};

export default Profile;
