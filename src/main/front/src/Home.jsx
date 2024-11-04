import logoR from "./img/logoR.png";
import "./App.css";
import { useEffect, useState } from "react";
import { appUrl } from "./api/appUrl";
import Header from "./layouts/Header";

export default function Home() {
  const [hello, setHello] = useState([{ id: 0, title: "", price: 0 }]);

  useEffect(() => {
    appUrl
      .get("/list")
      .then((result) => {
        console.log(result.data);
        setHello(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header></Header>
      <div className="App">
        <header className="App-header">
          <img src={logoR} className="App-logo" alt="logo" />
          <p>Main</p>
          {hello.map((item) => (
            <div key={item.id}>
              ID : {item.id}, Title : {item.title}, Price : {item.price}
            </div>
          ))}
        </header>
      </div>
    </>
  );
}
