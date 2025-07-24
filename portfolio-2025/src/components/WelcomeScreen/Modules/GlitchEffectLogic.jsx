import { useState, useCallback, useEffect } from "react";

const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\";
const glitchText = (text, iterations, intensity) => {
  return text
    .split("")
    .map((char, index) =>
      index < iterations || Math.random() > intensity / 10
        ? char
        : glitchChars[Math.floor(Math.random() * glitchChars.length)]
    )
    .join("");
};

export const GlitchEffectLogic = (baseTexts, footerData) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchedTexts, setGlitchedTexts] = useState({
    terminal: "",
    title: "",
    subtitle: "",
    footer: "",
  });

  const triggerGlitch = useCallback(() => {
    setGlitchActive(true);
    let iterations = 0;

    const glitchInterval = setInterval(() => {
      setGlitchedTexts({
        terminal: glitchText(baseTexts.terminal, iterations, 10),
        title: glitchText(baseTexts.title, iterations, 8),
        subtitle: glitchText(baseTexts.subtitle, iterations, 5),
        footer: glitchText(
          footerData.map((item) => `${item.label}: ${item.value}`).join(" • "),
          iterations,
          15
        ),
      });

      iterations++;
      if (iterations > 10) {
        clearInterval(glitchInterval);
        setGlitchActive(false);
      }
    }, 50);
  }, [baseTexts, footerData]);

  useEffect(() => {
    let recurringInterval;
    const initialGlitchTimer = setTimeout(() => {
      triggerGlitch();
      recurringInterval = setInterval(() => {
        triggerGlitch();
      }, 5000 + Math.random() * 1000);
    }, 10000);

    return () => {
      clearTimeout(initialGlitchTimer);
      if (recurringInterval) clearInterval(recurringInterval);
    };
  }, [triggerGlitch]);

  return { glitchActive, glitchedTexts, triggerGlitch };
};
