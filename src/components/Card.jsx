import React, { useState, useEffect } from "react";
import { motion, useReducedMotion} from "framer-motion";
import InerCard from "./InerCard";

function getXPoseOfset(distenceFromActivecard) {
  let output = 0
  if (distenceFromActivecard >= 0){
    output = Math.pow(distenceFromActivecard, 1.4) * -130;
  }else{
    output = (Math.pow(Math.abs(distenceFromActivecard),1.4) * -130) *-1;
  } 
  return output;
}

function Card({ height, isActive, overallHeight, index, upDownMovment, activeCardIndex,displayType,numberOfCards}) {
    const [rerender, setRerender] = useState(false)
    const shouldReduceMotion = useReducedMotion()
    let animate

    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 100);
  
      setRerender(!rerender);
      return () => clearInterval(interval);
 
    }, []);
  
    const cardVariants = {
      active: {
        y: upDownMovment[index],  // simple up and down movement, replace with actual desired values
        backgroundColor: "red",
        zIndex: numberOfCards,
      },
      inactive: {
         y: upDownMovment[index],
         backgroundColor: "blue",
         zIndex: numberOfCards - Math.abs(activeCardIndex - index),
         x: getXPoseOfset(index - activeCardIndex)
      }
    };

 
    animate = isActive ? 'active' : 'inactive'


    //console.log("upDownMovment", upDownMovment,"activeCardIndex" ,activeCardIndex)
    return (
      <motion.div 
        style={{
          //top: upDownMovment[index],
          flex: "0 0 auto",
          width: "696px",
          height: `${height}px`,
          border: "2px solid black",
          backgroundColor: "lightgray",
        }}
        variants={cardVariants}
        animate={animate}
      >
        {height} {animate}
        activeCardIndex {activeCardIndex}
        <InerCard
        activeCardIndex={activeCardIndex}
        cardIndex={index}
        numberOfCards={numberOfCards}
        
        />
      </motion.div>
    );
}

export default Card