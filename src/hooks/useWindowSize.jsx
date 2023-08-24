import React, { useEffect } from "react";

// const useWindowSize = () => {
//   const [windowDimension, setWindowDimension] = useState({
//     winHeight: window.innerHeight,
//     winWidth: window.innerWidth,
//   });

//   const detectSize = () => {
//     setWindowDimension({
//       winHeight: window.innerHeight,
//       winWidth: window.innerWidth,
//     });
//   };
//   useEffect(() => {
//     window.addEventListener("resize",detectSize);

//     return () => {
//       window.removeEventListener("resize ", detectSize);
//     };
//   },[windowDimension]);
//   return { width: windowDimension.winWidth, height:windowDimension.winHeight};
// };

// export default useWindowSize;



import { useState, useLayoutEffect } from "react";
import debounce from "lodash/debounce"; // Import debounce from lodash or another debounce/throttle library

const useWindowSize = () => {
  const [windowDimension, setWindowDimension] = useState({
    winHeight: window.innerHeight,
    winWidth: window.innerWidth,
  });

  const detectSize = () => {
    setWindowDimension({
      winHeight: window.innerHeight,
      winWidth: window.innerWidth,
    });
  };

  // Debounce the resize event for smoother updates
  const debouncedResize = debounce(detectSize, 200); // Adjust debounce delay as needed

  useLayoutEffect(() => {
    // Attach the debounced resize listener
    window.addEventListener("resize", debouncedResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  return { width: windowDimension.winWidth, height: windowDimension.winHeight };
};

export default useWindowSize;

