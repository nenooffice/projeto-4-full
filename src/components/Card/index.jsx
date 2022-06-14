import "./style.css";
import { useState } from "react";

const Card = ({ palette }) => {
  const [name, editName] = useState(palette.name)
  const [description, editDescription] = useState(palette.description)
  const [image, editImage] = useState(palette.image)
  const [price, editPrice] = useState(palette.price)
  const newPalette = {
    name: name, description: description,
    image: image, price: price }
  const [editing, setEditing] = useState(false);
  function handleEdit(e) {
    e.preventDefault();
    setEditing(false);
    fetch(
      `http://localhost:8080/sorvetes/${palette._id}`,
      { method: "PUT", body: JSON.stringify(newPalette), headers: { "Content-Type": "application/json" } }
    )
  }

  if (!editing) return (
    <div className="card-container">
      <div>
        <p>{`R$${price}`}</p>
        <img src={image} alt={`Paleta sabor ${name}`} />
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <button onClick={() => fetch(`http://localhost:8080/sorvetes/${palette._id}`, { method: 'DELETE'})}> Deletar </button>
      <button onClick={() => setEditing(true)}> Editar </button>
    </div>
  );
  else return (
    <div className="card-container">
      <form>
        <div>
          <input type={'number'} value={`${price}`} onChange={(e) => editPrice(e.target.value)} />
          <input value={image} onChange={(e) => editImage(e.target.value)} />
        </div>
        <input value={name} onChange={(e) => editName(e.target.value)}  />
        <input value={description} onChange={(e) => editDescription(e.target.value)}  />
        <button onClick={handleEdit} type="submit"> Finalizar </button>
      </form>
  </div>
  )
};

export default Card;