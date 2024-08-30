import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "../../types/ErrorType";
import Navbar from "../../components/Navbar/Navbar";
import { Product } from "../../types/Product";
import Footer from "../../components/Footer/Footer";

const AddProduct = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && code && price && description) {
      try {
        const product: Product = {
          name: name,
          description: description,
          code: code,
          user: {
            id: auth.user!.id! as number
          },
          price: price
        }
        auth.addProduct(product).then(() => navigate("/"));
      } catch (error) {
        alert((error as ErrorType).detail);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center  min-h-[89.5vh] md: min-h-[95vh], lg: min-h-screen ">
        <div className="flex flex-col items-center bg-white rounded-lg border border-[#ff9500] py-[3%] mb-[3%] w-[260px] md:w-[340px]">
          <span className="text-4xl mb-[10%] text-[#ff9500] font-dancing">Novo Produto</span>
          <form onSubmit={handleAddProduct} className="flex flex-col items-center text-start w-full">
            <label className="w-[69%] mb-[1%] text-base opacity-85">Nome</label>
            <input
              className="w-[70%] p-1 box-border mb-[6%] rounded-[5px] border border-[#b3333308] bg-[#00000015] focus:outline-none"
              placeholder="Nome do produto"
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="w-[69%] mb-[1%] text-base opacity-85">Código</label>
            <input
              className="w-[70%] p-1 box-border mb-[6%] rounded-[5px] border border-[#b3333308] bg-[#00000015] focus:outline-none"
              placeholder="Código do produto"
              type="text"
              id="code"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              pattern="\d{6}"
              maxLength={6}
              minLength={6} 
              required
            />

            <label className="w-[69%] mb-[1%] text-base opacity-85">Preço</label>
            <input
              className="w-[70%] p-1 box-border mb-[6%] rounded-[5px] border border-[#b3333308] bg-[#00000015] focus:outline-none"
              placeholder="Preço do produto"
              type="number"
              id="code"
              name="code"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />

            <label className="w-[69%] mb-[1%] text-base opacity-85">Descrição</label>
            <textarea
              className="p-[2%] text-base w-[70%] h-24 mb-[12%] rounded-[5px] border border-[#b3333308] bg-[#00000015] focus:outline-none" 
              placeholder="Descreva seu produto..." onChange={((e) => setDescription(e.target.value))}></textarea>

            <button
              className="bg-white rounded-[5px] w-[70%] text-[#ff9500] p-[10px] border border-[#ff9500] hover:bg-[#ff9500] hover:text-white"
              type="submit">Adicionar</button>
          </form>
        </div>
      </div>
      <Footer color="#ff9500"/>
    </>
  );
};

export default AddProduct;
