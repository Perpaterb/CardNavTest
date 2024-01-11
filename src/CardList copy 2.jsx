import React, { useState, useRef } from "react";
import { motion , useScroll, useTransform, useMotionValueEvent } from "framer-motion";

// Card Component
const Card = ({ height, isActive, overallHeight}) => {

    const [yMovment, setYMovment] = useState(0);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useMotionValueEvent(scrollYProgress , "change", (y) => {
    if (isActive === true){
      setYMovment(overallHeight * y)
    }
  })

  const cardVariants = {
    active: {
      y: -yMovment,  // simple up and down movement, replace with actual desired values
    },
    inactive: {
       y: -yMovment 
    }
  };

  return (
    <motion.div 
      style={{
        flex: "0 0 auto",
        width: "700px",
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

// CardHolder Component
const CardHolder = ({ activeCardIndex, setActiveCardIndex, cardHeights , overallHeight}) => {
  console.log("cardHeights",cardHeights)
  return (
    <motion.div 
      style={{
        position: "sticky",
        top: "0",
        display: "flex",
        flexDirection: "row",
        paddingLeft: 'calc(50vw - 350px)',
        paddingRight: 'calc(50vw - 350px)',
      }}
      onScroll={(event) => {
        const cardIndex = Math.round(event.currentTarget.scrollLeft / 700); // Adjust based on your requirements
        setActiveCardIndex(cardIndex);
        console.log("cardIndex",cardIndex)
      }}
    >
      {cardHeights.map((height, index) => 
          <Card key={index} height={height} isActive={activeCardIndex === index} overallHeight={overallHeight}/>
        )}
    </motion.div>
  );
}
// BasePlate Component
const BasePlate = ({ activeCardIndex, setActiveCardIndex, cardHeights }) => {
  let overallHeight = 0
  for (let i = 0; i < cardHeights.length; i++) {
    overallHeight += cardHeights[i];
  }
  overallHeight = overallHeight + (cardHeights.length * 700)

  console.log("overallHeight",overallHeight)
  return (
    <div
    style={{
      height: overallHeight
    }}
    >
      <CardHolder activeCardIndex={activeCardIndex} setActiveCardIndex={setActiveCardIndex} cardHeights={cardHeights} overallHeight={overallHeight}>
        {cardHeights.map((height, index) => 
            <Card key={index} height={height} onClick={() => setActiveCardIndex(index)} />
          )}
      </CardHolder>
    </div>
  );
}

// Main App Component
const App = () => {
  const numberOfCards = 20;
  const cardHeights = new Array(numberOfCards).fill(0).map(() => Math.floor(600 + Math.random() * 2400));
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  return (
    <BasePlate activeCardIndex={activeCardIndex} setActiveCardIndex={setActiveCardIndex} cardHeights={cardHeights} />
  );
}

export default App;