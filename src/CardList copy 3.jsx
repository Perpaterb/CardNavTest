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

  useMotionValueEvent(scrollXProgress , "change", (x) => {
    updateActiveCard(x)
  })

  const moveHolderLeftRight = (lr) => {

    console.log("lr", lr)
    // move the holder the by LR
    setYToXmovment(yToXmovment + lr)
    // work out if a card in in the middle
    updateActiveCard(yToXmovment + lr)
  }

  const updateActiveCard = (x) => {
    setXMovment(((cardHeights.length-1) * 700 * x) + yToXmovment)
    xHasJustChanged = true
    // if ( (Math.round(((cardHeights.length-1) * x) * 10 ) / 10).toString().split(".")[1] === "1" || (Math.round(((cardHeights.length-1) * x) * 10 ) / 10).toString().split(".")[1] === undefined ||(Math.round(((cardHeights.length-1) * x) * 10 ) / 10).toString().split(".")[1] === "9" ) {
    if ( (Math.round(((cardHeights.length-1) * x + yToXmovment) * 10 ) / 10).toString().split(".")[1] === undefined) {
    setActiveCardIndex(Math.round((cardHeights.length-1) * x + yToXmovment))
    } else {
      setActiveCardIndex(-1)
    }
  }; 
      
  useMotionValueEvent(scrollYProgress , "change", (y) => {
    if (activeCardIndex !== -1){
      if (xHasJustChanged === true){
        xHasJustChanged = false
        yStartPointA = overallHeight * y
        yStartPointB = overallHeight * y
      }

      const tempArray = yMovmentArray
      if (parth1 === true){
        parth1 = false
        yA= y
        yclick = yA-yB
        yStartPointA = overallHeight * y
        if (tempArray[activeCardIndex] + (yStartPointA - yStartPointB) >= 0) {
          if (tempArray[activeCardIndex] + (yStartPointA - yStartPointB) >= (cardHeights[activeCardIndex]-600)) {
            tempArray[activeCardIndex] = (cardHeights[activeCardIndex]-600)
            if (activeCardIndex < numberOfCards-1) {
              //move left and right
              moveHolderLeftRight((tempArray[activeCardIndex] + (yStartPointA - yStartPointB) - (cardHeights[activeCardIndex]-600))*-1)
              setMoveOffY(y - yclick)


              //setYToXmovment((tempArray[activeCardIndex] + (yStartPointA - yStartPointB) - (cardHeights[activeCardIndex]-600))*-1)
              console.log("at bottom moving right" ,(tempArray[activeCardIndex] + (yStartPointA - yStartPointB) - (cardHeights[activeCardIndex]-600))*-1)
              //updateActiveCard(0)
            }
          }else{
            tempArray[activeCardIndex] = tempArray[activeCardIndex] + (yStartPointA - yStartPointB)
          }
        } else {
          tempArray[activeCardIndex] = 0
          if (activeCardIndex > 0) {
            //move left and right
            moveHolderLeftRight((tempArray[activeCardIndex] + (yStartPointA - yStartPointB))*-1)
            setMoveOffY(y - yclick)


            //setYToXmovment((tempArray[activeCardIndex] + (yStartPointA - yStartPointB))*-1)
            console.log(("at top moving left" , tempArray[activeCardIndex] + (yStartPointA - yStartPointB))*-1)
            //updateActiveCard(0)
          }
        }
      }else{
        parth1 = true
        yB= y
        yclick = yB-yA
        yStartPointB = overallHeight * y
        if (tempArray[activeCardIndex] + (yStartPointB - yStartPointA) >= 0) {
          if (tempArray[activeCardIndex] + (yStartPointB - yStartPointA) >= (cardHeights[activeCardIndex]-600)) { 
            tempArray[activeCardIndex] = (cardHeights[activeCardIndex]-600)
            if (activeCardIndex < numberOfCards-1) {
              //move left and right
              moveHolderLeftRight((tempArray[activeCardIndex] + (yStartPointB - yStartPointA) - (cardHeights[activeCardIndex]-600))*-1)
              setMoveOffY(y - yclick)


              //setYToXmovment((tempArray[activeCardIndex] + (yStartPointB - yStartPointA) - (cardHeights[activeCardIndex]-600))*-1)
              console.log("at bottom moving right" ,(tempArray[activeCardIndex] + (yStartPointB - yStartPointA) - (cardHeights[activeCardIndex]-600))*-1)
              //updateActiveCard(0)
            }
          }else{
            tempArray[activeCardIndex] = tempArray[activeCardIndex] + (yStartPointB - yStartPointA)
          }
        } else {
          tempArray[activeCardIndex] = 0
          if (activeCardIndex > 0) {
            //move left and right
            moveHolderLeftRight((tempArray[activeCardIndex] + (yStartPointB - yStartPointA))*-1)
            setMoveOffY(y - yclick)


            //setYToXmovment((tempArray[activeCardIndex] + (yStartPointB - yStartPointA))*-1)
            console.log("at top moving left" , (tempArray[activeCardIndex] + (yStartPointB - yStartPointA))*-1)
            //updateActiveCard(0)
          }
        }
      }     
      setYMovmentArray(tempArray)
    }else{
      //moveHolderLeftRight(holderWidth * y *-1)
      setYToXmovment((holderWidth * (y-moveOffY) *-1 * 4))
      //updateActiveCard(0)
    }
  })

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