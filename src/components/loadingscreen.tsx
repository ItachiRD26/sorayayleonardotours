// components/LoadingScreen.tsx
"use client"

import React, { useEffect, useState } from "react";
import styles from "./loadingscreen.module.css"; // Crearemos este archivo CSS para las animaciones

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete();
    }, 3000); // Ajusta el tiempo según sea necesario

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`${styles.loadingScreen} ${!isLoading ? styles.fadeOut : ""}`}>
      <div className={styles.boatAnimation}></div>
    </div>
  );
};

export default LoadingScreen;