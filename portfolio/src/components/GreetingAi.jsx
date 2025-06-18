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
    <div className="fixed inset-0 w-screen h-screen z-0">
      <Spline
        scene="https://prod.spline.design/Oi0ONlU2xYqq0fW1/scene.splinecode"
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}
      />
    </div>
  );
};

export default RobotSection;
