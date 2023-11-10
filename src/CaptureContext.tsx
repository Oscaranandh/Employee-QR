// // CaptureContext.tsx

// import React, { createContext, useContext, useState, ReactNode } from "react";

// type CaptureContextType = {
//   isCaptureTaken: boolean;
//   setCaptureTaken: () => void;
// };

// const CaptureContext = createContext<CaptureContextType | undefined>(undefined);

// export function CaptureProvider({ children }: { children: ReactNode }) {
//   const [isCaptureTaken, setIsCaptureTaken] = useState(false);

//   const setCaptureTaken = () => {
//     setIsCaptureTaken(true);
//   };

//   return (
//     <CaptureContext.Provider value={{ isCaptureTaken, setCaptureTaken }}>
//       {children}
//     </CaptureContext.Provider>
//   );
// }

// export function useCapture() {
//   const context = useContext(CaptureContext);
//   if (context === undefined) {
//     throw new Error("useCapture must be used within a CaptureProvider");
//   }
//   return context;
// }
