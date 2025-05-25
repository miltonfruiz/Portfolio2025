import { useState, useEffect } from "react";

const TypeWriter = (textSequence, speed = 50, delayBetween = 1000) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [displayedTerminal, setDisplayedTerminal] = useState("");
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  useEffect(() => {
    let timeout;
    if (currentPhase === 0) {
      if (displayedTerminal.length < textSequence[0].length) {
        timeout = setTimeout(() => {
          setDisplayedTerminal(
            textSequence[0].substring(0, displayedTerminal.length + 1)
          );
        }, speed);
      } else {
        timeout = setTimeout(() => {
          setCurrentPhase(1);
          setIsTyping(true);
        }, delayBetween);
      }
    } else if (currentPhase === 1) {
      if (displayedTitle.length < textSequence[1].length) {
        timeout = setTimeout(() => {
          setDisplayedTitle(
            textSequence[1].substring(0, displayedTitle.length + 1)
          );
        }, speed);
      }
    }
    return () => clearTimeout(timeout);
  }, [
    currentPhase,
    displayedTerminal,
    displayedTitle,
    textSequence,
    speed,
    delayBetween,
  ]);
  return {
    displayedTerminal,
    displayedTitle,
    isTyping: isTyping && currentPhase === 1,
  };
};
export default TypeWriter;
