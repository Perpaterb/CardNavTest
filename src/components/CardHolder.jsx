import React, { useState, useRef, useEffect } from "react";
import { motion , useScroll, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import Card from "./Card";

function CardHolder({ activeCardIndex, setActiveCardIndex, cardHeights , overallHeight, screenSize, numberOfCards}) {
    const [xMovment, setXMovment] = useState(0);
    const [moveOffY, setMoveOffY] = useState(0);
    const [yToXmovment, setYToXmovment] = useState(0);
    const targetRef = useRef(null);
    const [yMovmentArray, setYMovmentArray] = useState(new Array(numberOfCards).fill(0));
    const { scrollYProgress, scrollXProgress} = useScroll({
      target: targetRef,
    });
    const holderWidth = ((screenSize.width/2) - 350) + (cardHeights.length * 700)
    let yA = 0
    let yB = 0
    let yclick = 0
    let yStartPointA = 0
    let yStartPointB = 0
    let parth1 = true
    let xHasJustChanged = true 
  
    setActiveCardIndex(-1)
  
    console.log("yToXmovment", yToXmovment,"xMovment" ,xMovment)
    return (
      <motion.div 
        style={{
          position: "sticky",
          top: "0",
          display: "flex",
          flexDirection: "row",
          width: holderWidth,
          x: yToXmovment
        }}
          animate='active'
        >
        {cardHeights.map((height, index) => 
            <Card 
              key={index}
              height={height}
              isActive={activeCardIndex === index}
              overallHeight={overallHeight}
              yMovmentArray={yMovmentArray}
              index={index}
              />
          )}
      </motion.div>
    );
}

export default CardHolder