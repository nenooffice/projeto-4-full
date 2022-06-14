import "./style.css";
import logo from "../../assets/icons/logo.svg";
import checkoutIcon from "../../assets/icons/sacola.svg";
import { useState } from "react"; 

const Header = () => {
  const [name, editName] = useState("");
  const [description, editDescription] = useState("");
  const [image, editImage] = useState("");
  const [price, editPrice] = useState(0);
  const newPalette = {
    name: name, description: description,
    image: image, price: price }
  const [editing, setEditing] = useState(false);  
  
  function handleEdit(e) {
    e.preventDefault();
    setEditing(false);
    console.log(newPalette);
    fetch(
      `https://projeto4api.herokuapp.com/sorvetes`,
      { method: "POST", body: JSON.stringify(newPalette), headers: { "Content-Type": "application/json" } }
    )
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }
  
  return (
    <div className="header-container">
      <div>
        <img alt="El Geladon Logo" src={logo} />
        <h2>El Geladon</h2>
      </div>
      <img alt="Sacola de Checkout" src={checkoutIcon} />

      <div>
        <button onClick={() => setEditing(!editing)}>
          <h3>Cadastre uma paleta</h3>
        </button>
        { editing ? (
          <form>
          <div>
            <input type={'number'} onChange={(e) => editPrice(Number(e.target.value))}  />
            <input onChange={(e) => editImage(e.target.value)} />
          </div>
          <input onChange={(e) => editName(e.target.value)}  />
          <input onChange={(e) => editDescription(e.target.value)}  />
          <button onClick={handleEdit} type="submit"> Finalizar </button>
        </form>) : null }
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Header;