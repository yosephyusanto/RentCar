import React, { useEffect, useState } from "react";

type CarouselProps = {
  children: React.ReactNode[];
  isThereImage: boolean;
  autoSlide : boolean;
};

const Carousel = (
  { children, isThereImage }: CarouselProps,
  autoSlide = false,
  autoSlideInterval = 3000
) => {
  const [curr, setCurr] = useState<number>(0);
  const prev = () => {
    setCurr((curr) => (curr === 0 ? children.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr === children.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  });

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {children}
      </div>
      <div className={`absolute inset-0 flex items-center justify-between p-2 ${isThereImage || "hidden"}`}>
        <i
          onClick={prev}
          className="bx bx-chevron-left text-2xl lg:text-[40px]  bg-white/80  rounded-full"
        ></i>
        <i
          onClick={next}
          className="bx bx-chevron-right text-2xl lg:text-[40px]  bg-white/80  rounded-full"
        ></i>
      </div>
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-4">
          {children.map((_, i) => (
            <div
              className={`w-3 h-3 bg-white rounded-full ${
                i === curr ? "lg:p-2" : "opacity-50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
