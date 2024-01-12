import React, { useState, useRef, useEffect } from "react";
import { motion , useScroll, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import BasePlate from "./BacePlate";


function Main() {
    const numberOfCards = 20;
    const [cardHeights, setCardHeights] = useState([]);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
   
    useEffect(() => {
      const tempHeightArray = cardHeights
      for (let i = 0; i < numberOfCards; i++) {
        tempHeightArray[i] = Math.floor(600 + Math.random() * 2400)
      }
      setCardHeights(tempHeightArray)
    }, [])
    
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
      activeCardIndex={activeCardIndex}
      setActiveCardIndex={setActiveCardIndex}
      cardHeights={cardHeights}
      screenSize={screenSize}
      numberOfCards={numberOfCards}
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