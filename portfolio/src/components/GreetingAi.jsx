import { useEffect } from "react";
import Spline from "@splinetool/react-spline";

const RobotSection = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const iframe = document.querySelector("iframe");
      if (iframe) {
        const style = document.createElement("style");
        style.innerHTML = `
          div[style*="position: absolute"][style*="right: 12px"] {
            display: none !important;
          }
        `;
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (doc && !doc.querySelector("style[data-hide-spline-logo]")) {
          style.setAttribute("data-hide-spline-logo", "true");
          doc.head.appendChild(style);
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative lg:w-1/1 w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] flex flex-col items-center justify-center px-6 lg:px-12 overflow-visible">
      <Spline
        scene="https://prod.spline.design/fHhgpqJzMPn7-q-x/scene.splinecode"
        rel="preload"
      />
    </div>
  );
};

export default RobotSection;
