import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "./Card";

function CardHolder({ cardHeights , overallHeight, screenSize, numberOfCards, upDownMovment,activeCardIndex,displayType}) {

    const holderWidth = ((screenSize.width/2) - 350) + (cardHeights.length * 700)

    //console.log("cardHeights from holder", cardHeights)
  
    //setActiveCardIndex(-1)
    
    return (
      <motion.div 
        style={{
          position: "sticky",
          top: "0",
          display: "flex",
          flexDirection: "row",
          width: holderWidth,
        }}
        >
        {cardHeights.map((height, index) => 
            <Card 
              key={index}
              height={height}
              isActive={activeCardIndex === index}
              overallHeight={overallHeight}
              displayType={displayType}
              index={index}
              upDownMovment={upDownMovment}
              activeCardIndex={activeCardIndex}
              numberOfCards={numberOfCards}
              />
          )}
      </motion.div>
    );
}

export default CardHolder