"use client";

import Image from "next/image";
import FloatingBones from "./AnimatedBones";
import { featuresHome } from "@/data/Data";

const HeroSection = () => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for the header offset
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center py-16 px-4 overflow-hidden bg-gradient-to-b from-amber-50/50 to-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(30deg,rgba(251,191,36,0.05)_12%,transparent_12.5%,transparent_87%,rgba(251,191,36,0.05)_87.5%,rgba(251,191,36,0.05))] opacity-60"></div>

      {/* Floating Bones Animation */}
      <FloatingBones />

      <div className="container mx-auto max-w-7xl relative">
        <div className="flex flex-wrap justify-center items-center flex-col-reverse lg:flex-row gap-12 lg:gap-16">
          {/* Image  */}
          <div className="flex-1 relative group">
            <div className="max-w-[450px] mx-auto relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Image
                  src="/d.png"
                  alt="Hero Dog"
                  priority={true}
                  width={450}
                  height={450}
                  className="w-full h-auto object-cover scale-x-[-1] relative z-10 transform transition-transform duration-700 group-hover:scale-x-[-1.02]"
                />
              </div>
            </div>
          </div>

          {/* Text  */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-medium text-sm mb-4 md:mb-4">
              Welcome to Your Dog's Second Home
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-gray-900 mb-6 md:mb-4">
              The Best Dog{" "}
              <span className="text-amber-500">Training Center</span> and Hostel
            </h1>

            <p className="text-lg text-gray-600 mb-6 md:mb-4 max-w-2xl lg:max-w-none">
              Transform your furry friend with our expert training programs and
              premium boarding services. Professional care tailored to your
              dog's needs.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 sm:mb-6">
              {featuresHome.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700 bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-amber-500">{feature.icon}</span>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 cursor-pointer rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors shadow-lg hover:shadow-xl">
                Book Training
              </button>

              <button
                onClick={() => handleScroll("services")}
                className="px-8 py-4 cursor-pointer rounded-full border-2 border-amber-500 text-amber-500 font-semibold hover:bg-amber-50 transition-colors"
              >
                View Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;