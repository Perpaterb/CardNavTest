import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function getProportionalValue(x, y, a, b) {
  const proportion = a / b;
  return x + ((y - x) * proportion);
}

const InerCard = ({activeCardIndex, cardIndex, numberOfCards}) => {
  // Variable that will define the size of the component.
  const [size, setSize] = useState(1);

  // This effect mimics the changes to size over time.
  // In reality, you would change the value of 'size' based on your own needs.
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSize(getProportionalValue(0.4,1,numberOfCards-(Math.abs(cardIndex - activeCardIndex)), numberOfCards))

  //     if(cardIndex === 4){
  //       console.log("cardIndex:", cardIndex, "    activeCardIndex:", activeCardIndex, "       size:", size)
  //     }
  //   }, 100);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);


  useEffect(() => {
      setSize(getProportionalValue(0.4,1,numberOfCards-(Math.abs(cardIndex - activeCardIndex)), numberOfCards))
  }, [activeCardIndex]);

  //let distenceFromActiveCard = getProportionalValue(0,1,numberOfCards-(Math.abs(cardIndex - activeCardIndex)), numberOfCards)
  
  
  

  return (
    // Notice the 'style' attribute that implements a CSS blur filter.
    // It increases as size decreases.
    <motion.div
      style={{
        width: '98%',
        height: '96%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        filter: `blur(${(1 - size) * 50}px)`,
        backgroundColor: 'white',
        transformOrigin: "top center",
        marginLeft: '1%',
      }}
      animate={{ scale: size }}
      transition={{ transformOrigin: "top center" }}
    >
      {/* Your content goes here. It will automatically scale with the parent element. */}
      <p>Keep me in proportion as I scale! </p>
    </motion.div>
  );
}

export default InerCard;