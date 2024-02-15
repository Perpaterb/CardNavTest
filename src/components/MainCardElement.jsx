import React, { useState, useRef, useEffect } from "react";
import { motion , useScroll, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import BasePlate from "./BacePlate";
import CardHolder from "./CardHolder";
import Card from "./Card";
import '../App.css'


function MainCardElement() {
    const numberOfCards = 20; // Var needed
    const cardWidth = 700; // Var needed
    const cardMinimumHeight = 600; // Var needed
    const [cardHeights, setCardHeights] = useState([]);
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
   
    useEffect(() => {
      const tempHeightArray = cardHeights
      for (let i = 0; i < numberOfCards; i++) {
        tempHeightArray[i] = Math.floor(cardMinimumHeight + Math.random() * 2400)
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
      <div className="cardHolderMain"
      style={{
        marginLeft: (screenSize.width/2) - (cardWidth/2),
      }}
      >
        <CardHolder 
          cardHeights={cardHeights}
          screenSize={screenSize}
          numberOfCards={numberOfCards}
          cardMinimumHeight={cardMinimumHeight}
          cardWidth={cardWidth}
          >
        </CardHolder>
      </div>
    );
  }
  
  function getCurrentDimension(){
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
  }
export default MainCardElement