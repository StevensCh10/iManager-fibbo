import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
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
            
          }
        };
        fetchData();
      }, []);

    return (
      <div className="flex flex-col items-center">
        <Navbar/>
        <div className="flex flex-wrap items-center justify-center w-full min-h-[85vh] mb-6">
            {products.length === 0 ? (
                <div className="flex flex-col text-[1.4em] items-center text-[#ff9500]">
                    <label className="text-center">Você não tem nenhum produto adicionado</label>
                    <button 
                      className="rounded-md w-[30%] text-[#ff9500] p-[10px] cursor-pointer border border-[#ff9500] mt-[3%] hover:bg-[#ff9500] hover:text-white"
                      onClick={(() => navigate("/add-product"))}>
                        Adicionar
                    </button>
                </div>
            ) : (
                <div className="flex flex-wrap items-center justify-center w-full">
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