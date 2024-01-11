import React, { useState } from "react";
import { motion } from "framer-motion";

// Card Component
const Card = ({ height, isActive }) => {
  const cardVariants = {
    active: {
      y: [0, -100, 0],  // simple up and down movement, replace with actual desired values
      transition: { duration: 1, repeat: Infinity }
    },
    inactive: { y: 0 }
  };

  return (
    <motion.div 
      style={{
        flex: "0 0 auto",
        width: "700px",
        height: `${height}px`,
        border: "2px solid black",
        backgroundColor: "lightgray",
        margin: "15px",
      }}
      variants={cardVariants}
      animate={isActive ? 'active' : 'inactive'}
    >
      {height}
    </motion.div>
  );
}

// CardHolder Component
const CardHolder = ({ activeCardIndex, setActiveCardIndex, cardHeights }) => {
  console.log("cardHeights",cardHeights)
  return (
    <motion.div 
      style={{
        display: "flex",
        flexDirection: "row",
        overflowX: "auto"
      }}
      onScroll={(event) => {
        const cardIndex = Math.round(event.currentTarget.scrollLeft / 720); // Adjust based on your requirements
        setActiveCardIndex(cardIndex);
      }}
    >
      {cardHeights.map((height, index) => 
          <Card key={index} height={height} isActive={activeCardIndex === index} />
        )}
    </motion.div>
  );
}
// BasePlate Component
const BasePlate = ({ activeCardIndex, setActiveCardIndex, cardHeights }) => {
  return (
    <div>
      <CardHolder activeCardIndex={activeCardIndex} setActiveCardIndex={setActiveCardIndex} cardHeights={cardHeights} >
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