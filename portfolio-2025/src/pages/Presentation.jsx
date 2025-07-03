import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "../components/WelcomeScreen/WelcomeScreen";
import SystemLoader from "../components/SystemLoader/SystemLoader";

export default function Presentation() {
  const [systemReady, setSystemReady] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!systemReady ? (
        <SystemLoader key="loader" onComplete={() => setSystemReady(true)} />
      ) : (
        <WelcomeScreen key="welcome" />
      )}
    </AnimatePresence>
  );
}
