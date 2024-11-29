import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { appUrl } from "../../api/appUrl";
import logoR from "../../img/logoR.png";
import { useDispatch, useSelector } from "react-redux";
import { plus, minus, parameterplus } from "../../store/testSlice";
import { changeName } from "../../store/user/userSlice";

export default function Main() {
  //redux
  let count = useSelector((state) => state.count);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();

  const [item, setItem] = useState([{ id: 0, title: "", price: 0 }]);

  const getItem = async () => {
    const list = await appUrl
      .get("/list")
      .then((result) => {
        console.log(result.data);
        setItem(result.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    localStorage.clear();
    //getItem();
  }, []);

  const add = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const price = e.target.price.value;
    if (!title || !price) {
      alert("제대로 입력하세요!");
      return;
    }
    appUrl
      .post("/add", null, { params: { title: title, price: price } })
      .then((response) => {
        if (response.data === "success") {
          console.log("success!");
          alert("GOOD-");
        } else {
          console.log("failed...");
          alert("숫자 0보다 커야됨! 상품이름 공백안됨!");
          return;
        }
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
          {/*{item.map((item) => (*/}
          {/*  <div key={item.id}>*/}
          {/*    ID : {item.id}, Title : {item.title}, Price : {item.price}*/}
          {/*  </div>*/}
          {/*))}*/}
          <p>test : {count}</p>
          <p>
            name : {user.name} , age : {user.age}
          </p>
          <button
            onClick={() => {
              dispatch(plus());
            }}
          >
            up
          </button>
          <button
            onClick={() => {
              dispatch(minus());
            }}
          >
            minus
          </button>
          <button
            onClick={() => {
              dispatch(parameterplus(100));
            }}
          >
            plus100
          </button>
          <button
            onClick={() => {
              dispatch(changeName());
            }}
          >
            changeName
          </button>
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
