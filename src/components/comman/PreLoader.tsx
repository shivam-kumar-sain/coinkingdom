// src/components/PreLoader.tsx
import React from "react";
import styles from "../../styles/PreLoader.module.css"; // Import styles for the loader

const PreLoader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default PreLoader;
