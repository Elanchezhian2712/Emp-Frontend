import React from "react";
import { useSpring, animated } from "react-spring";

const useBubbleAnimation = () => {
  const generateBubbleProps = () => ({
    from: {
      left: `${Math.random() * window.innerWidth}px`,
      top: `${Math.random() * window.innerHeight}px`,
      opacity: 1,
    },
    to: async (next) => {
      while (true) {
        await next({
          left: `${Math.random() * window.innerWidth}px`,
          top: `${Math.random() * window.innerHeight}px`,
          opacity: 0,
        });
        await next({
          left: `${Math.random() * window.innerWidth}px`,
          top: `${Math.random() * window.innerHeight}px`,
          opacity: 1,
        });
      }
    },
    config: { duration: Math.random() * 20000 + 2000 },
    loop: true,
  });

  return useSpring(generateBubbleProps());
};

const AnimatedBubble = ({ index }) => {
  const bubbleProps = useBubbleAnimation();
  const colors = [
    "#0ed4c8",
    "#c11287",
    "#f87c38",
    "#005cf4",
    "#fa8b2a",
    "#FFFFFF",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <animated.div
      style={{
        ...bubbleProps,
        position: "fixed",
        width: "13px",
        height: "13px",
        background: randomColor,
        borderRadius: "50%",
      }}
    />
  );
};

const BackgroundAnimation = () => {
  const bubbles = [...Array(70).keys()];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        overflow: "hidden",
        background: "#080434",
        zIndex: -1,
      }}
    >
      {bubbles.map((_, index) => (
        <AnimatedBubble key={index} index={index} />
      ))}
    </div>
  );
};

export default BackgroundAnimation;
