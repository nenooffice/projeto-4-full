import { useState } from "react";
import Card from "../Card";

const Home = () => {
  const [palette, setPalette] = useState([]);
  const [filterInput, setfilterInput] = useState("");
  if (!filterInput&&!palette.length) {
    fetch("http://localhost:8080/sorvetes")
      .then(res => res.json())
      .then(setPalette)
      .catch(err => console.log(err));
  } else if (filterInput) {
  fetch(`http://localhost:8080/sorvetes?search=${filterInput}`)
    .then(res => res.json())
    .then(setPalette)
    .catch(err => console.log(err));
  }

  return (
    <div className="home-container">
      <h2>Lista de Paletas</h2>
      <input
        value={filterInput}
        onChange={(event) =>setfilterInput(event.target.value)}
        placeholder="Filtrar por nome"
      />
      <div>
        {palette.map((element) => {
          return <Card key={element._id} palette={element} />;
        })}
      </div>
    </div>
  );
};

export default Home;