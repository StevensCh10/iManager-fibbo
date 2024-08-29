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

  const pStyle = "text-[#333] my-2 ml-4";
  const inputStyle = "border-none text-base";

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
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  return (
    <div className="border border-[#ff9500] rounded-lg p-4 my-4 mx-4 flex flex-col box-border">
      <h3 className="m-0 mb-[8%] text-center text-[#b86b00] text-lg w-full h-[35px]">
        {name}
      </h3>
      <form>
        <p className={pStyle}>
          Código: <input readOnly onChange={(e) => setCode(e.target.value)} value={code} className={inputStyle} />
        </p>
        <p className={pStyle}>
          Descrição: <input onChange={(e) => setDescription(e.target.value)} value={description} className={inputStyle} />
        </p>
        <p className={pStyle}>
          Preço: R$
          <input
            className={inputStyle}
            type="number"
            value={price}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (!isNaN(newValue)) {
                setPrice(newValue);
              }
            }}
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