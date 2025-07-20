"use client";

import { trainings } from "@/data/Data";
import { useEffect, useRef, useState } from "react";

const Trainings = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.play().catch((error) => {
            console.log("Autoplay failed: ", error);
          });
        }
      });
    }
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    videoRefs.current[index].play();
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null);
    videoRefs.current[index].pause();
  };

  return (
    <section
      id="trainings"
      className="bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Dog Training Programs
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-1 w-16 bg-amber-500 rounded-full"></div>
            <span className="text-amber-600 font-medium">
              Expert Training Solutions
            </span>
            <div className="h-1 w-16 bg-amber-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainings.map((training, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 aspect-square hover:shadow-amber-400/20"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              >
                <source src={training.src} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {training.title}
                  </h3>
                  {/* <p className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Click to learn more →
                                    </p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainings;