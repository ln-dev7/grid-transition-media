"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { motion, AnimatePresence, spring } from "framer-motion";

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [activePhoto, setActivePhoto] = useState<
    (typeof PHOTOS)[number] | null
  >(null);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setActivePhoto(null));
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePhoto(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <main className="relative w-full h-screen flex items-center justify-center p-12">
      <div className="w-full h-full max-w-6xl flex flex-col items-center justify-start">
        <motion.button
          className="px-8 py-2 text-white bg-black rounded-full absolute top-1"
          onClick={() => setExpanded(false)}
          animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : -100 }}
        >
          Close
        </motion.button>
        <motion.div
          className="relative cursor-pointer flex items-center justify-center w-64 h-64 gap-4 place-items-center"
          onClick={() => setExpanded(true)}
          animate={{
            width: expanded ? 900 : 256,
            height: expanded ? 700 : 256,
            display: expanded ? "grid" : "flex",
            gridTemplateColumns: expanded ? "1fr 1fr 1fr" : "auto",
          }}
        >
          {PHOTOS.map((photo, index) => {
            let rotate = 0;
            if (index === 0) rotate = -30;
            if (index === 1) rotate = -15;
            if (index === 3) rotate = 15;
            if (index === 4) rotate = 30;
            if (index === 5) rotate = 45;
            if (index === 6) rotate = 60;
            return (
              <motion.div
                className="absolute w-36 h-36 border border-white shadow-lg overflow-hidden flex items-center justify-center"
                style={{ borderRadius: 12 }}
                onClick={() => {
                  if (expanded) {
                    setActivePhoto(photo);
                  }
                }}
                animate={{
                  width: expanded ? 280 : 144,
                  height: expanded ? 340 : 144,
                  position: expanded ? "static" : "absolute",
                  rotate: expanded ? 0 : rotate,
                }}
                transition={spring}
                layoutId={`card-${photo.title}`}
              >
                <motion.div
                  className=""
                  layoutId={`image-${photo.title}`}
                  style={{
                    borderRadius: 12,
                  }}
                >
                  <Image
                    className="object-cover w-full h-full bg-slate-100"
                    width={867}
                    height={1300}
                    src={photo.src}
                    alt="Photo"
                    key={index}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {activePhoto ? (
          <div className="absolute inset-0 grid place-items-center z-20">
            <motion.div
              layoutId={`card-${activePhoto.title}`}
              className="flex w-96 h-fit cursor-pointer flex-col overflow-hidden bg-white p-4"
              style={{ borderRadius: 20 }}
              ref={ref}
            >
              <motion.div
                className="w-full h-56 overflow-hidden"
                layoutId={`image-${activePhoto.title}`}
                style={{
                  borderRadius: 12,
                }}
              >
                <Image
                  className="object-cover w-full h-full bg-slate-100"
                  width={867}
                  height={1300}
                  src={activePhoto.src}
                  alt="Photo"
                />
              </motion.div>
              <motion.h3
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="text-2xl font-bold mt-2 mb-1"
              >
                {activePhoto.title}
              </motion.h3>
              <motion.p
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="text-sm text-slate-700"
              >
                {activePhoto.description}
              </motion.p>
              <motion.button
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="py-2 px-4 mt-4 bg-black text-white rounded-full w-full"
              >
                buy now
              </motion.button>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activePhoto ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay"
          />
        ) : null}
      </AnimatePresence>
      {/* <CopyRight /> */}
    </main>
  );
}

export const CopyRight = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 p-4 border-t bg-white z-20">
      <a href="https://lndev.me" className="underline underline-offset-2">
        Code by LN
      </a>
      <a
        href="https://github.com/ln-dev7/grid-transition-media"
        className="underline underline-offset-2"
      >
        GitHub
      </a>
    </div>
  );
};

const PHOTOS = [
  {
    title: "Beach Sunset",
    description:
      "Beach Sunset is a beautiful view of the sun setting over the ocean. It is a perfect view for a romantic evening. It is a perfect view for a romantic evening.",
    src: "/image1.jpeg",
  },
  {
    title: "Virgin Mojito",
    description:
      "Virgin Mojito is a non-alcoholic mocktail and is a perfect drink for summers. It is a refreshing drink made with mint leaves and lemon. It is a perfect drink for summers.",
    src: "/image2.jpeg",
  },
  {
    title: "Crispy Chicken",
    description:
      "Crispy Chicken is a delicious dish made with chicken, flour, and spices. It is a perfect dish for lunch or dinner. It is a perfect dish for lunch or dinner.",
    src: "/image3.jpeg",
  },
  {
    title: "Chocolate Cake",
    description:
      "Chocolate Cake is a delicious dessert made with chocolate, flour, sugar, and eggs. It is a perfect dessert for any occasion. It is a perfect dessert for any occasion.",
    src: "/image4.jpeg",
  },
  {
    title: "Margarita",
    description:
      "Margarita is a classic cocktail made with tequila, lime juice, and triple sec. It is a perfect drink for any occasion. It is a perfect drink for any occasion.",
    src: "/image5.jpeg",
  },
  {
    title: "Blue Lagoon",
    description:
      "Blue Lagoon is a beautiful cocktail made with blue curacao, vodka, and lemonade. It is a perfect drink for a hot summer day. It is a perfect drink for a hot summer day.",
    src: "/image6.jpeg",
  },
];
