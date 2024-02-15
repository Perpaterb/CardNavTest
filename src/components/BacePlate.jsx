import React, { useState, useRef, useEffect } from "react";
import { motion , useScroll, useMotionValue, useTransform, useMotionValueEvent, useAnimation, useSpring } from "framer-motion";
import CardHolder from "./CardHolder";

function BacePlate({screenSize, numberOfCards, displayType}) {

  const [cardHeights, setCardHeights] = useState(Array.from({length: numberOfCards}, () => Math.floor(600 + Math.random() * 2400)))

  let overallHeight = 0
  // for (let i = 0; i < cardHeights.length; i++) {
  //   overallHeight = overallHeight + cardHeights[i];
  // }
  // overallHeight = overallHeight + ((cardHeights.length-1) * 700)
  //console.log("cardHeights", cardHeights)
  // create var for the movment of each card.
  const [upDownMovment, setUpDownMovment] = useState(Array.from({length: numberOfCards},() => 0));
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  let tempCardIndex = 0

  // navigation
  useEffect(() => {
    
    const handleKeyDown = (event) => {
      event.preventDefault();
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
      event.preventDefault();
      if (event.deltaY < 0) {
        // Custom navigation logic for scroll up
        moveUp()
      } else {
        // Custom navigation logic for scroll down
        moveDown()
      }
    };

    const handleTouchstart = (event) => {
      event.preventDefault();
      if (event.deltaY < 0) {
        // Custom navigation logic for scroll up
        moveUp()
      } else {
        // Custom navigation logic for scroll down
        moveDown()
      }
      if (event.deltaX < 0) {
        // Custom navigation logic for scroll up
        moveRight()
      } else {
        // Custom navigation logic for scroll down
        moveLeft()
      }
    };

    const handleMousedown = (event) => {
      if (event.button === 1) {  // 1 for middle click
        event.preventDefault()
        // Custom navigation logic for middle click
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
    window.addEventListener('mousedown', function(event) {
      handleMousedown(event)
    }, {passive:false});

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchstart);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousedown', handleMousedown);
    };

  }, []);

  const moveLeft = () => {
    //console.log("move left")
    handleCardHolderMoveX('left')
  }
  const moveRight = () => {
    //console.log("move right")
    handleCardHolderMoveX('right')
  }
  const moveUp = () => {
    //console.log("move up")
    handleCardHolderMoveY('up')
  }
  const moveDown = () => {
    //console.log("move down")
    handleCardHolderMoveY('down')
  }

  const controls = useAnimation();
  
  // moving left and right
  const x = useSpring(0, { stiffness: 400, damping: 30 });
  const xMoveAmount = 350;
  
  useEffect(() => {
    controls.set({ x: x.get() });
  }, [controls, x]);

  const handleCardHolderMoveX = direction => {
    console.log("upDownMovment move x", upDownMovment)
    
    const currentRounded = Math.round(x.get() / xMoveAmount) * xMoveAmount;
    const newX = direction === 'right' 
      ? currentRounded - xMoveAmount
      : currentRounded + xMoveAmount;
    if (newX < (((numberOfCards-1) * 350) *-1) || newX > 0) {
      return;  // Outside the range, don't update
    }
    x.set(newX);
    controls.start({
      x: newX,
      transition: { duration: 0.5, type: "tween" }
    });
    if (newX === 0){
      setActiveCardIndex(0)
      tempCardIndex = 0
    }else{
      setActiveCardIndex(newX / 350 * -1) 
      tempCardIndex = newX / 350 * -1
    }
    //console.log("activeCardIndex", activeCardIndex,"newX" ,newX/ 350* -1)
    //setUpDownMovment(Array.from({length: numberOfCards},() => 0))
    // let tempArray = Array.from({length: numberOfCards},() => 0)
    // setUpDownMovment(tempArray)
    // console.log(tempArray)
  };

  // moving up and down
  const y = useSpring(0, { stiffness: 1000, damping: 0 });
  const yMoveAmount = 100;
  
  useEffect(() => {
    controls.set({ y: y.get() });
  }, [controls, y]);


  const handleCardHolderMoveY = direction => {
    console.log("upDownMovment move y", upDownMovment)

    let tempArray = upDownMovment
    for (let i = 0; i < upDownMovment.length; i++) {
      if (i === tempCardIndex){
        if (direction === 'down'){
          if (tempArray[i]*-1 >= cardHeights[i]-700){
            handleCardHolderMoveX('right')
          }else{
            if ((tempArray[i] - yMoveAmount) *-1 >= cardHeights[i]-700){
              tempArray[i] = (cardHeights[i]-700)*-1
            } else{
              tempArray[i] = tempArray[i] - yMoveAmount;
            }
          }
        }else{
          if (tempArray[i]===0){
            handleCardHolderMoveX('left')          
          }else{
            tempArray[i] = tempArray[i] + yMoveAmount;
          }
        }
      }
      if (tempArray[i] > 0){tempArray[i] = 0} 
    }
    setUpDownMovment(tempArray)

    // let tempArray = upDownMovment
    // let activeCardHight = upDownMovment[tempCardIndex]
    // for (let i = 0; i < upDownMovment.length; i++) {
    //   if (i === tempCardIndex){
    //     if (direction === 'down'){
    //       if (activeCardHight*-1 > cardHeights[i]-500){
    //         handleCardHolderMoveX('right')
    //       }else{
    //         activeCardHight = activeCardHight - yMoveAmount;
    //       }
    //     }else{
    //       if (activeCardHight===0){
    //         handleCardHolderMoveX('left')          
    //       }else{
    //         activeCardHight = activeCardHight + yMoveAmount;
    //       }
    //     }
    //   }
    //   if (activeCardHight > 0){activeCardHight = 0} 
    // }
    // tempArray[tempCardIndex] = activeCardHight
    // setUpDownMovment(tempArray)
  };

  return (
    <motion.div 
    style={{
      height: overallHeight,
      marginLeft: screenSize.width/2 -350,
      translateX: x
    }}
    animate={controls}
    initial={{ x: 0, y: 0 }}
    >
      <CardHolder 
        cardHeights={cardHeights}
        overallHeight={overallHeight}
        screenSize={screenSize}
        numberOfCards={numberOfCards}
        upDownMovment={upDownMovment}
        activeCardIndex={activeCardIndex}
        displayType={displayType}
        >
        {/* {cardHeights.map((height, index) => 
            <Card key={index} height={height}/>
          )} */}
      </CardHolder>
    </motion.div>
  );
}

export default BacePlate