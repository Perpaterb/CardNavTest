import React, { useState, useRef, useEffect } from "react";
import { motion , useScroll, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";

function Card({ height, isActive, overallHeight, yMovmentArray, index}) {
    const [rerender, setRerender] = useState(false)
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
        y: -yMovmentArray[index],  // simple up and down movement, replace with actual desired values
        backgroundColor: "red"
      },
      inactive: {
         y: -yMovmentArray[index],
         backgroundColor: "blue"
      }
    };
  
    return (
      <motion.div 
        style={{
          flex: "0 0 auto",
          width: "696px",
          height: `${height}px`,
          border: "2px solid black",
          backgroundColor: "lightgray",
        }}
        variants={cardVariants}
        animate={isActive ? 'active' : 'inactive'}
      >
        {height} {isActive ? 'active' : 'inactive'}
      </motion.div>
    );
}

export default Card