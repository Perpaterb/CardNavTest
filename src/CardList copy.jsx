import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Card Component
const Card = ({ height, isActive }) => {
  const cardVariants = {
    active: {
      y: [0, -100, 0], // just for demonstration, replace with actual values
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
  const holderRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      const holder = holderRef.current;
      const cardIndex = Math.round(holder.scrollLeft / 720);
      const scrollPastTop = event.currentTarget.scrollTop < 0;
      const scrollPastBottom = event.currentTarget.scrollTop + holder.clientHeight > holder.scrollHeight;

      if (cardIndex !== activeCardIndex && (scrollPastTop || scrollPastBottom)) {
        holder.scrollLeft = 720 * cardIndex;
        setActiveCardIndex(cardIndex);
      }
    };

    const holder = holderRef.current;
    if (holder) {
      holder.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (holder) {
        holder.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeCardIndex, setActiveCardIndex]);

  return (
    <motion.div
      ref={holderRef}
      style={{
        display: "flex",
        flexDirection: "row",
        overflowY: "auto",
        position: "sticky",
        top: "0px",
      }}
    >
      {cardHeights.map((height, index) =>
        <Card key={index} height={height} isActive={activeCardIndex === index} />
      )}
    </motion.div>
  );
}

// BasePlate Component
const BasePlate = ({ cardHeights }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  return (
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <CardHolder activeCardIndex={activeCardIndex} setActiveCardIndex={setActiveCardIndex} cardHeights={cardHeights} />
    </div>
  );
}

// Main App Component
const App = () => {
  const numberOfCards = 20;
  const cardHeights = Array(numberOfCards).fill(0).map(() => Math.floor(600 + Math.random() * 2400)); // Create an array of random card heights

  return (
    <BasePlate cardHeights={cardHeights} />
  );
}

export default App;