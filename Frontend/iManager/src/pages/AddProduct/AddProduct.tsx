import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "../../types/ErrorType";
import "./AddProduct.css";
import Navbar from "../../components/Navbar/Navbar";
import { Product } from "../../types/Product";
import { User } from "../../types/User";
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
        auth.addProduct(product);
        navigate("/");
      } catch (error) {
        alert((error as ErrorType).detail);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="addProd-container">
        <div className="addProd-content">
          <span>Novo Produto</span>
          <form onSubmit={handleAddProduct} className="addProd-form">
            <label>Nome</label>
            <input
              style={{ marginBottom: "6%" }}
              placeholder="Nome do produto"
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Código</label>
            <input
              style={{ marginBottom: "6%" }}
              placeholder="Código do produto"
              type="text"
              id="code"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <label>Preço</label>
            <input
              style={{ marginBottom: "6%" }}
              placeholder="Preço do produto"
              type="number"
              id="code"
              name="code"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />

            <label>Descrição</label>
            <textarea placeholder="Descreva seu produto..." onChange={((e) => setDescription(e.target.value))}></textarea>

            <button type="submit">Adicionar</button>
          </form>
        </div>
      </div>
      <Footer color="#ff9500"/>
    </>
  );
};

export default AddProduct;
