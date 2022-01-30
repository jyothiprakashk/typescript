import Confetti from "react-confetti";
import React, { useState, useRef, useEffect } from "react";

import styles from "./style.module.css";

const names = ["Akshay", "Silky", "Mehran", "Mitch", "Oleksii", "Ahmed", "Breno", "Sergey", "Michal", "Raphael"];

const RandomName: React.FC<{}> = () => {
  const [isDisplay, setDisplay] = useState<boolean>(false);
  const [isStart, setStart] = useState<boolean>(false);
  const [isbuttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const randomRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  let name = "";
  let timeout = 2000;
  let intervaldata = 100;
  useEffect(() => {
    setStart(true);
  }, []);

  const random = () => {
    setDisplay(false);
    setStart(false);
    setButtonDisabled(true)
    let interval = setInterval(() => {
      name = names[Math.floor(Math.random() * names.length)];
      randomRef.current.innerHTML = name;
    }, intervaldata);

    setTimeout(() => {
      let prevName = localStorage.getItem("name");
      if (name !== prevName) {
        setDisplay(true);
        localStorage.setItem("name", name);
        clearInterval(interval);
        setButtonDisabled(false)
      } else {
        intervaldata = 200;
        timeout = 2000;
        random();
        clearInterval(interval);
      }
    }, timeout);
  };

  const handleAnotherName=()=>{
    setDisplay(false)
    random()
  }

  let date=new Date().toLocaleString().replace(',','')
  return (
    <div className='App'>
      <Confetti style={isDisplay ? { display: "block" } : { display: "none" }} />
      <div className={styles.randomWrapper}>
        {isStart ? (
          <>
            <div className={styles.pickerTiTle}>PICK A RANDOM NAME</div>
            <button onClick={random} className={styles.startButton}>START</button>
          </>
        ) : (
          <div className={styles.userCard}>
            <div>WINNER(S):</div>
            <div ref={randomRef} className={styles.randomName}></div>
            <div>Total names: {names.length}</div>
            <div>Date: {date}</div>
            <button onClick={handleAnotherName} disabled={isbuttonDisabled}>Pick Another Name</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomName;
