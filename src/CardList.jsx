import React, { useState, useRef, useEffect } from "react";
import { motion , useScroll, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";

// Card Component
const Card = ({ height, isActive, overallHeight, yMovmentArray, index}) => {

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

// CardHolder Component
const CardHolder = ({ activeCardIndex, setActiveCardIndex, cardHeights , overallHeight, screenSize, numberOfCards}) => {

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

// BasePlate Component
const BasePlate = ({ activeCardIndex, setActiveCardIndex, cardHeights, screenSize, numberOfCards}) => {

  let overallHeight = 0
  for (let i = 0; i < cardHeights.length; i++) {
    overallHeight += cardHeights[i];
  }
  overallHeight = overallHeight + ((cardHeights.length-1) * 700)

  return (
    <div
    style={{
      height: overallHeight,
      marginLeft: screenSize.width/2 -350,
    }}
    >
      <CardHolder 
        activeCardIndex={activeCardIndex}
        setActiveCardIndex={setActiveCardIndex}
        cardHeights={cardHeights}
        overallHeight={overallHeight}
        screenSize={screenSize}
        numberOfCards={numberOfCards}
        >
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
  const [cardHeights, setCardHeights] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

    // navigation
    useEffect(() => {
      const handleKeyDown = (event) => {
        switch(event.keyCode) {
          case 37: // arrow left
            //event.preventDefault();
            // navigation logic for left
            moveLeft()
            break;
          case 38: // arrow up
            //event.preventDefault();
            // navigation logic for up
            moveUp()
            break;
          case 39: // arrow right
            //event.preventDefault();
            // navigation logic for right
            moveRight()
            break;
          case 40: // arrow down
            //event.preventDefault();
            // navigation logic for down
            moveDown()
            break;
          default:
            break;
        }
      };
  
      const handleWheel = (event) => {
        if (event.deltaY < 0) {
          // Custom navigation logic for scroll up
          moveUp()
        } else {
          // Custom navigation logic for scroll down
          moveDown()
        }
      };
  
      const handleTouchstart = (event) => {
        if (event.deltaY < 0) {
          // Custom navigation logic for scroll up
          moveUp()
        } else {
          // Custom navigation logic for scroll down
          moveDown()
        }
      };
  
      window.addEventListener('keydown', function(event) {
        handleKeyDown(event)
      }, {passive:false});
      window.addEventListener('touchstart', function(event) {
        handleTouchstart(event)
      }, {passive:false});
      window.addEventListener('wheel', function(event) {
        handleWheel(event)
      }, {passive:false});
  
      // Cleanup function to remove event listener on component unmount
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('touchstart', handleTouchstart);
        window.removeEventListener('wheel', handleWheel);
      };
    }, []);
  
    const moveLeft = () => {
    }
  
    const moveRight = () => {
    }
  
    const moveUp = () => {
    }
  
    const moveDown = () => {
    }


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
export default App;