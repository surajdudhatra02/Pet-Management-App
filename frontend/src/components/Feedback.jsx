import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCards } from "swiper/modules";
import { Star, Quote } from 'lucide-react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

const feedbacks = [
  {
    name: "Suraj Dudhatra",
    role: "Dog Owner",
    rating: 5,
    feed: "The training techniques have transformed my dog's behavior completely. The personalized attention and care given to each pet is remarkable.",
    image: "https://avatar.iran.liara.run/public/boy"
  },
  {
    name: "Sarah Johnson",
    role: "Pet Parent",
    rating: 5,
    feed: "Outstanding service! My anxious rescue dog has become so much more confident. The trainers are patient, knowledgeable, and truly care about each animal.",
    image: "https://avatar.iran.liara.run/public/girl"
  },
  {
    name: "Michael Chen",
    role: "Dog Enthusiast",
    rating: 4,
    feed: "The facilities are top-notch and the staff is incredibly professional. My puppy loves coming here for training sessions.",
    image: "https://avatar.iran.liara.run/public/boy"
  },
  {
    name: "Emma Williams",
    role: "Regular Client",
    rating: 5,
    feed: "From basic obedience to advanced training, they've helped my dog excel at every level. Highly recommended for any dog owner!",
    image: "https://avatar.iran.liara.run/public/girl"
  },
  {
    name: "David Martinez",
    role: "First-time Owner",
    rating: 5,
    feed: "As a first-time dog owner, their guidance has been invaluable. The training methods are effective and humane.",
    image: "https://avatar.iran.liara.run/public/boy"
  }
];

const Feedback = () => {
  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <Star
        key={index}
        size={20}
        className="fill-amber-400 text-amber-400"
      />
    ));
  };

  return (
    <section id="feedback" className="relative py-20 overflow-hidden">


      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            What Our Dog Parents Say
          </h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, EffectCards]}
          loop={true}
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            bulletActiveClass: 'bg-amber-900'
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-16"
        >
          {feedbacks.map((feedback, index) => (
            <SwiperSlide key={index}>
              <div className="card mt-6 p-8 rounded-2xl bg-gray-800 border border-gray-700 shadow-xl transition-all duration-500 hover:shadow-amber-400/20 hover:-translate-y-2 h-full flex flex-col">
                <div className="flex items-start mb-6">
                  <img
                    src={feedback.image}
                    alt={feedback.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-400"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white mb-1">{feedback.name}</h3>
                    <p className="text-amber-400 text-sm">{feedback.role}</p>
                    <div className="flex gap-1 mt-2">
                      {renderStars(feedback.rating)}
                    </div>
                  </div>
                </div>

                <div className="relative flex-grow">
                  <Quote className="absolute -left-2 -top-2 text-amber-400/20 w-8 h-8" />
                  <p className="text-gray-300 leading-relaxed relative z-10">
                    {feedback.feed}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Feedback;