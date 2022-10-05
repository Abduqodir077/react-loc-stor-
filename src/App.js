import React, { useState } from "react";
import "./Style.css";
import del from "./img/delete.png";
import edit from "./img/edit.png";
import done from "./img/done.png"

function App() {

  let [test, setTest] = useState("")

  let [malumot, setMalumot] = useState({
    familiya: "",
    yosh: "",
    ism: ""
  });
  let [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );

  let inputChange = (e) => {
    setMalumot({
      ...malumot,
      [e.target.name]: e.target.value,
    });
  };

  function send(e) {
    e.preventDefault();
    if(test === ""){
        if (localStorage.getItem("data")) {
            localStorage.setItem(
              "data",
              JSON.stringify([...JSON.parse(localStorage.getItem("data")),malumot])
            );
            setLocalData(JSON.parse(localStorage.getItem("data")));
          } else {
            localStorage.setItem("data", JSON.stringify([malumot]));
            setLocalData(JSON.parse(localStorage.getItem("data")));
          }

        setMalumot({
            familiya: "",
            ism: "",
            yosh: ""
        })
    } else {
        localStorage.setItem("data", JSON.stringify([
            ...JSON.parse(localStorage.getItem("data")).slice(0, test),
            malumot,
            ...JSON.parse(localStorage.getItem("data")).slice(test + 1, localData.length),
        ]))
        setLocalData(JSON.parse(localStorage.getItem("data")));
        setMalumot({
            familiya: "",
            ism: "",
            yosh: ""
        })
    }

  }

  function del(element){
    console.log(element);
    localStorage.setItem("data", JSON.stringify(localData.filter(item => item !== element)))
    setLocalData(JSON.parse(localStorage.getItem("data")));
  }

  function edit(element, i){
    console.log(i);
    setMalumot({
        familiya: element.familiya,
        ism: element.ism,
        yosh: element.yosh
    })

    setTest(i)
  }

  function rasmChange(e){
    setMalumot({
      ...malumot,
      rasm: URL.createObjectURL(e.target.files[0])  
    })
  }

  return (
    <>
      <div className="div1">
      <form action="" onSubmit={send}>
        <input
          type="text"
          onChange={inputChange}
          name="ism"
          placeholder="malumot kiriting"
          value={malumot.ism}
        />
        <input
          type="text"
          onChange={inputChange}
          name="familiya"
          placeholder="malumot kiriting"
          value={malumot.familiya}
        />
        <input
          type="text"
          onChange={inputChange}
          name="yosh"
          placeholder="malumot kiriting"
          value={malumot.yosh}
        />
        <input type="file" onChange={rasmChange} /><br />
        <img src={done} alt="done" />
        <button>jo'nat</button>
      </form>
      </div>

      {
      localData.map((item, index) => {
        return (
          <div className="div2" key={index}>
               <p>{item.familiya}</p>
               <p>{item.ism}</p>
               <p>{item.yosh}</p>
               <img src={item.rasm} alt="rasm" /><br />
               <button onClick={() => del(item)} >delete</button>
               <button onClick={() => edit(item,index)} >edit</button>
          </div>
        );
      })
      }
    </>
  );
}

export default App;
