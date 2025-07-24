import React from "react";

const FooterMarquee = ({ glitchActive, glitchedFooter, footerData }) => {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 h-8 px-4 py-2 overflow-hidden z-50 border-t text-[10px] ${
        glitchActive
          ? "border-red-500 bg-black/90 shadow-[0_0_10px_#ff0000]"
          : "border-cyber-primary bg-black"
      }`}
    >
      <div className="relative h-full w-full overflow-hidden font-montserrat">
        <div
          className={`absolute flex gap-4 items-center h-full ${
            glitchActive
              ? "text-red-500 font-bold [text-shadow:_0_0_5px_#ff0000] text-sm"
              : "text-cyber-code"
          }`}
          style={{
            animation: "marquee 60s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {glitchActive ? (
            <span className="flex gap-4">
              {glitchedFooter || "SYSTEM FAILURE DETECTED ••• "}
            </span>
          ) : (
            <>
              {footerData.map((item, index) => (
                <span
                  key={`original-${index}`}
                  className="inline-flex items-center"
                >
                  <span className="mr-1 text-[11px]">{item.icon}</span>
                  <span className="mr-1 font-bold tracking-wider">
                    {item.label}:
                  </span>
                  <span className="mr-3">{item.value}</span>
                  {index < footerData.length - 1 && (
                    <span className="mx-4">•</span>
                  )}
                </span>
              ))}
              {footerData.map((item, index) => (
                <span
                  key={`clone-${index}`}
                  className="inline-flex items-center"
                >
                  <span className="mr-1 text-[11px]">{item.icon}</span>
                  <span className="mr-1 font-bold tracking-wider">
                    {item.label}:
                  </span>
                  <span className="mr-3">{item.value}</span>
                  {index < footerData.length - 1 && (
                    <span className="mx-4">•</span>
                  )}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FooterMarquee;
