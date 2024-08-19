import { useContext, useState } from "react";
import { Product } from "../../types/Product";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { ErrorType } from "../../types/ErrorType";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({product}) => {
  const auth = useContext(AuthContext);

  const name = product.name;
  const [code, setCode] = useState(product.code);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState<number>(product.price);

  const handleUpdated = () => {
    try {
      const productAux: Product = {
        id: product.id,
        name: name,
        description: description,
        code: code,
        user: {
          id: product.user as number
        },
        price: price
      }
      console.log(price)
      auth.updateProduct(productAux);
      window.location.reload();
    } catch (error) {
      alert((error as ErrorType).detail);
    }
  }
  
  const handleDelete = () => {
    auth.deleteProduct(product);
    window.location.reload();
  }

  return (
    <div className="border border-[#ff9500] rounded-lg p-4 m-4 flex flex-col box-border">
      <h3 className="m-0 mb-[15%] text-center text-[#b86b00] w-full h-[35px]">
        {name}
      </h3>
      <form>
        <p className="m-0 text-[#333] my-2 ml-4">
          Código: <input readOnly onChange={(e) => setCode(e.target.value)} value={code} className="border-none text-base w-1/2" />
        </p>
        <p className="m-0 text-[#333] my-2 ml-4">
          Descrição: <input onChange={(e) => setDescription(e.target.value)} value={description} className="border-none text-base w-1/2" />
        </p>
        <p className="m-0 text-[#333] my-2 ml-4">
          Preço: R$<input
            type="number"
            value={price}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (!isNaN(newValue)) {
                setPrice(newValue);
              }
            }}
            className="border-none text-base w-1/2"
          />
        </p>
      </form>
      <div className="flex justify-between">
        <button onClick={handleUpdated} className="m-5 bg-white rounded-lg w-[48%] text-[#ff9500] p-2 border border-[#ff9500] cursor-pointer box-border hover:bg-[#ff9500] hover:text-white">
          Salvar alterações
        </button>
        <button onClick={handleDelete} className="m-5 bg-white rounded-lg w-[48%] text-[#ff9500] p-2 border border-[#ff9500] cursor-pointer box-border hover:bg-[#ff9500] hover:text-white">
          Apagar produto
        </button>
      </div>
    </div>
    );
  };
  
  export default Card;