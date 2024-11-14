import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { appUrl } from "../../api/appUrl";
import logoR from "../../img/logoR.png";
import data from "bootstrap/js/src/dom/data";

export default function Main() {
  const [item, setItem] = useState([{ id: 0, title: "", price: 0 }]);

  useEffect(() => {
    appUrl
      .get("/list")
      .then((result) => {
        console.log(result.data);
        setItem(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const add = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const price = e.target.price.value;
    appUrl
      .post("/add", null, { params: { title: title, price: price } })
      .then((response) => {
        console.log(response.data);
        console.log("GOOD~");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <title>메인페이징</title>
      </Helmet>
      <div className="App">
        <div>
          <img src={logoR} className="App-logo" alt="logo" />
          <p>Main</p>
          {item.map((item) => (
            <div key={item.id}>
              ID : {item.id}, Title : {item.title}, Price : {item.price}
            </div>
          ))}
        </div>
        <form onSubmit={add}>
          <input type={"text"} name={"title"} placeholder={"title"} />
          <input type={"number"} name={"price"} placeholder={"price"} />
          <button type={"submit"}>전송</button>
        </form>
      </div>
    </>
  );
}
