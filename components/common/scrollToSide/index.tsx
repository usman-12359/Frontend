"use client"
import { useEffect, useState } from "react";

export default function ScrollToSide({children}: Readonly<{
    children: React.ReactNode;
  }>) {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const getScrollbarWidth = () => {
      return window.innerWidth - document.documentElement.clientWidth;
    };
    setScrollbarWidth(getScrollbarWidth());
  }, []);

  return (
    <div className="w-screen h-auto" style={{ width: `calc(100vw - ${scrollbarWidth}px)` }}>
        {children}
    </div>
  );
}
