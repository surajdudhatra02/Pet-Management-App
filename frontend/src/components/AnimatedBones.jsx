"use client";
import { useState, useEffect } from "react";
import { Bone } from "lucide-react";

const FloatingBones = () => {
  const [bones, setBones] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate random positions only on client side
    const generatedBones = [...Array(6)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: i * 0.5,
    }));

    setBones(generatedBones);
    setMounted(true);
  }, []);

  // Don't render anything until mounted on client
  if (!mounted) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bones.map((bone) => (
        <div
          key={bone.id}
          className="absolute animate-float"
          style={{
            left: `${bone.left}%`,
            top: `${bone.top}%`,
            animationDelay: `${bone.delay}s`,
            opacity: 0.1,
          }}
        >
          <Bone className="w-8 h-8 text-amber-500 transform rotate-45" />
        </div>
      ))}
    </div>
  );
};

export default FloatingBones;
