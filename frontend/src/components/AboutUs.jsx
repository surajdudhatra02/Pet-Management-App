import { useInView } from "react-intersection-observer";
import { Shield, Award, Heart, Users, Dog, Medal } from 'lucide-react';

const AboutUs = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      count: 50,
      label: "Happy Clients",
      description: "Satisfied dog owners"
    },
    {
      icon: <Dog className="w-8 h-8 text-green-600" />,
      count: 100,
      label: "Dogs Trained",
      description: "Successfully trained companions"
    },
    {
      icon: <Medal className="w-8 h-8 text-amber-600" />,
      count: 50,
      label: "Training Shelters",
      description: "Dedicated training spaces"
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Military Expertise",
      description: "Trained by Ex-Indian Army & Black Cat Commando"
    },
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      title: "Certified Trainers",
      description: "Professional dog training certification"
    },
    {
      icon: <Heart className="w-6 h-6 text-red-600" />,
      title: "Compassionate Care",
      description: "Nurturing environment for every dog"
    }
  ];

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num);
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Our Journey
          </h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-8"></div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
              Founded in January 2022, we are a team of certified dog trainers mentored by
              Vaidya Sir—an esteemed Ex-Indian Army officer and Ex-Black Cat Commando.
              Our mission is to strengthen the bond between dogs and their owners through
              professional training and compassionate care.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:shadow-amber-400/20"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gray-50">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={ref}
          className="grid md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-amber-400/20"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gray-50">
                  {stat.icon}
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 text-gray-800">
                {inView && formatNumber(stat.count)}+
              </div>
              <div className="text-xl font-semibold mb-2 text-gray-700">
                {stat.label}
              </div>
              <p className="text-gray-600">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Whether it's obedience training, behavioral correction, or protection
            training, we ensure that every dog receives personalized attention and
            expert guidance. Join us in building a stronger bond with your furry
            companion! 🐕💙
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;