"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);

  const handleVideoEnd = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="site-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-[var(--background)]
          "
        >
          <motion.video
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="
              h-auto
              w-[90%]
              max-w-[430px]
              object-contain

              sm:max-w-[480px]
              lg:max-w-[520px]
             "
          >
            <source
              src="/videos/loader.mp4"
              type="video/mp4"
            />

            Your browser does not support video.
          </motion.video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}