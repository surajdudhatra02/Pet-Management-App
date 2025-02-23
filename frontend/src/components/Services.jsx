import { Home, Dog, Clock, Shield, Medal, Heart, Check, Star } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Premium Dog Hostel",
      description: "A home away from home for your furry friend",
      features: [
        { icon: <Clock size={18} />, text: "24/7 Supervision & Care" },
        { icon: <Shield size={18} />, text: "Secure, Climate-Controlled Spaces" },
        { icon: <Heart size={18} />, text: "Individual Care & Attention" }
      ],
      highlights: [
        "Spacious kennels with comfort bedding",
        "Regular exercise and playtime",
        "Daily health monitoring",
        "Personalized feeding schedule"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Dog className="w-8 h-8" />,
      title: "Professional Training",
      description: "Expert training programs for every breed",
      features: [
        { icon: <Medal size={18} />, text: "Certified Professional Trainers" },
        { icon: <Star size={18} />, text: "Customized Training Plans" },
        { icon: <Check size={18} />, text: "Progress Tracking & Reports" }
      ],
      highlights: [
        "Obedience & behavior training",
        "Specialized skill development",
        "Group & private sessions",
        "Ongoing support & guidance"
      ],
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <section id='services' className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6  text-gray-900">
            Services We Provide
          </h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of services designed to give your dog the best care and training experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:shadow-amber-400/20"
            >
              {/* Header */}
              <div className={`p-8 bg-gradient-to-r ${service.color} text-white`}>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">
                  {service.title}
                </h3>
                <p className="text-white/90 text-center">
                  {service.description}
                </p>
              </div>

              {/* Features */}
              <div className="p-8">
                <div className="grid gap-4 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className={`text-${service.color.split('-')[1]}`}>
                        {feature.icon}
                      </div>
                      <span className="font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    What We Offer:
                  </h4>
                  <ul className="space-y-2">
                    {service.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <Check size={16} className={`mt-1 flex-shrink-0 text-${service.color.split('-')[1]}`} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Button */}
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button
                  className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${service.color} text-white font-semibold hover:opacity-90 transition-opacity`}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;