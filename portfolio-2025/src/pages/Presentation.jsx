import React, { useState } from "react";
import WelcomeScreen from "../components/WelcomeScreen/WelcomeScreen";
import SystemLoader from "../components/SystemLoader/SystemLoader";

export default function Presentation() {
  const [systemReady, setSystemReady] = useState(false);

  return (
    <>
      {!systemReady ? (
        <SystemLoader onComplete={() => setSystemReady(true)} />
      ) : (
        <WelcomeScreen />
      )}
    </>
  );
}
