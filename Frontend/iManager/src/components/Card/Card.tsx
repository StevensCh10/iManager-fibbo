import { useContext, useState } from "react";
import { Product } from "../../types/Product";
import "./Card.css"
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
      <div className="card">
        <h3>{name}</h3>
        <form>
          <p>Código: <input readOnly onChange={((e) => setCode(e.target.value))} value={code}/></p>
          <p>Descrição: <input onChange={((e) => setDescription(e.target.value))} value={description}/></p>
          <p>Preço: R$<input
            type="number"
            value={price}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (!isNaN(newValue)) {
                setPrice(newValue);
              }
            }}
          /></p>

        </form>
        <div className="options">
          <button onClick={handleUpdated}>Salvar alterações</button>
          <button onClick={handleDelete}>Apagar produto</button>
        </div>
      </div>
    );
  };
  
  export default Card;