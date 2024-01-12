import React, { useState, useRef, useEffect } from "react";
import { motion , useScroll, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import CardHolder from "./CardHolder";
import Card from "./Card";

function BacePlate({ activeCardIndex, setActiveCardIndex, cardHeights, screenSize, numberOfCards}) {
    let overallHeight = 0
    for (let i = 0; i < cardHeights.length; i++) {
      overallHeight += cardHeights[i];
    }
    overallHeight = overallHeight + ((cardHeights.length-1) * 700)
  
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
      
    }
  
    const moveRight = () => {
    }
  
    const moveUp = () => {
    }
  
    const moveDown = () => {
    }

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

export default BacePlate