import React, { useEffect, useState } from "react";

const GlobalErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const listener = (e) => {
      setError(e.error);
      setHasError(true);
    };
    window.addEventListener("error", listener);
    return () => {
      window.removeEventListener("error", listener);
    };
  }, []);
  if (hasError) {
    return (
      <div className="">
        <h1>Error</h1>
        <p className="paragraph">{error.toString()}</p>
      </div>
    );
  }
  return <>{children}</>;
};

export default GlobalErrorBoundary;
