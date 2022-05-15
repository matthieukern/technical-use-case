import React, { useCallback, useEffect, useState } from "react";

const Loader: React.FC = () => {
  const [display, setDisplay] = useState(false);
  const show = useCallback(() => setDisplay(true), [setDisplay]);

  useEffect(() => {
    const timeoutId = setTimeout(show, 100);
    return () => clearTimeout(timeoutId);
  });

  if (!display) return null;

  return <div>Loading...</div>;
};

export default Loader;
