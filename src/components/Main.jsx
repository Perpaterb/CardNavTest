import React, { useState, useEffect } from "react";
import BasePlate from "./BacePlate";


function Main() {
    const numberOfCards = 20;
    
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    const [displayType, setDisplayType] = useState(0);
   
   
    useEffect(() => {
      const updateDimension = () => {
        setScreenSize(getCurrentDimension())
      }
      window.addEventListener('resize', updateDimension);
      
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      }
  
      return(() => {
          window.removeEventListener('resize', updateDimension);
      })
    }, [screenSize])
    
    return (
      <BasePlate 
      screenSize={screenSize}
      numberOfCards={numberOfCards}
      displayType={displayType}
      />
    );
  }
  
  function getCurrentDimension(){
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
  }
export default Main