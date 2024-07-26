import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css"
import { Product } from "../../types/Product";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";

const Home = () => {
    const auth = useContext(AuthContext);
    const[products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const resultProducts = await auth.productsByUser(auth.user!.id!);
            setProducts(resultProducts);

          } catch (error) {
;
          }
        };
        fetchData();
      }, []);

    return (
      <div className="home-container">
        <Navbar/>
        <div className="home-content">
            {products.length === 0 ? (
                <div className="noProd">
                    <label>Você não tem nenhum produto adicionado</label>
                    <button onClick={(() => navigate("/add-product"))}>Adicionar</button>
                </div>
            ) : (
                <div className="withProd">
                    {products.map((prod, index) => (
                      
                      <Card key={index} product={prod}/>
                    ))}
                </div>
            )}
        </div>
        <Footer color="#ff9500"/>
      </div>
    )
}

export default Home;