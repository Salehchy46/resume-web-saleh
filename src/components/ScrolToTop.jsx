import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Try to scroll the window
    window.scrollTo(0, 0);
    // Also try scrolling any potential main container
    document.getElementById("main")?.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;