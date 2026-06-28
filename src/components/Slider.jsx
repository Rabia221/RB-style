"use client";

import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    image: "/images/banner.png",
    title: "Summer Collection 2026",
    subtitle: "Light fabrics. Bold colors. New vibes.",
  },
  {
    image: "/images/banner2.png",
    title: "Elegance Redefined",
    subtitle: "Discover premium fashion for every occasion.",
  },
  {
    image: "/images/bridal-1.jpg",
    title: "New Arrivals",
    subtitle: "Shop the latest trends before they're gone.",
  },
];

export default function Slider() {

  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));

  const next = () =>
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  useEffect(() => {
    const timer = setInterval(next, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">

      {slides.map((slide, i) => (

        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            i === current
              ? "opacity-100"
              : "opacity-0"
          }`}
        >

          {/* IMAGE */}
          <img
            loading="eager"
            decoding="async"
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40" />

          {/* TEXT */}
          <div className="absolute bottom-10 md:bottom-20 left-6 md:left-16 text-white max-w-2xl">

            <h2 className="text-3xl md:text-6xl font-black leading-tight">
              {slide.title}
            </h2>

            <p className="text-sm md:text-lg text-gray-200 mt-4">
              {slide.subtitle}
            </p>

            <button className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
              Shop Now
            </button>

          </div>

        </div>

      ))}

      {/* LEFT BUTTON */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition"
      >
        <FaChevronLeft />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition"
      >
        <FaChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">

        {slides.map((_, i) => (

          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all rounded-full ${
              i === current
                ? "w-6 h-2 bg-white"
                : "w-2 h-2 bg-white/50"
            }`}
          />

        ))}

      </div>

    </div>
  );
}