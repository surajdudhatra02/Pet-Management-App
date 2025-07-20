import {
  Shield,
  Award,
  Heart,
  Users,
  Dog,
  Medal,
  Instagram,
  Phone,
  Youtube,
  Mail,
  MapPin,
  Bone,
  Star,
} from "lucide-react";

export const trainings = [
  {
    title: "Obedience Training",
    src: "./Trainings/Obedience.mp4",
  },
  {
    title: "Show Training",
    src: "./Trainings/Show.mp4",
  },
  {
    title: "Search Training",
    src: "./Trainings/Search.mp4",
  },
  {
    title: "Guarding Training",
    src: "./Trainings/Guarding.mp4",
  },
  {
    title: "Swimming Training",
    src: "./Trainings/Swimming.mp4",
  },
  {
    title: "Potty Training",
    src: "./Trainings/Potty.mp4",
  },
];

export const stats = [
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    count: 50,
    label: "Happy Clients",
    description: "Satisfied dog owners",
  },
  {
    icon: <Dog className="w-8 h-8 text-green-600" />,
    count: 100,
    label: "Dogs Trained",
    description: "Successfully trained companions",
  },
  {
    icon: <Medal className="w-8 h-8 text-amber-600" />,
    count: 50,
    label: "Training Shelters",
    description: "Dedicated training spaces",
  },
];

export const features = [
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: "Military Expertise",
    description: "Trained by Ex-Indian Army & Black Cat Commando",
  },
  {
    icon: <Award className="w-6 h-6 text-green-600" />,
    title: "Certified Trainers",
    description: "Professional dog training certification",
  },
  {
    icon: <Heart className="w-6 h-6 text-red-600" />,
    title: "Compassionate Care",
    description: "Nurturing environment for every dog",
  },
];

export const feedbacks = [
  {
    name: "Suraj Dudhatra",
    role: "Dog Owner",
    rating: 5,
    feed: "The training techniques have transformed my dog's behavior completely. The personalized attention and care given to each pet is remarkable.",
    image: "https://avatar.iran.liara.run/public/boy",
  },
  {
    name: "Sarah Johnson",
    role: "Pet Parent",
    rating: 5,
    feed: "Outstanding service! My anxious rescue dog has become so much more confident. The trainers are patient, knowledgeable, and truly care about each animal.",
    image: "https://avatar.iran.liara.run/public/girl",
  },
  {
    name: "Michael Chen",
    role: "Dog Enthusiast",
    rating: 4,
    feed: "The facilities are top-notch and the staff is incredibly professional. My puppy loves coming here for training sessions.",
    image: "https://avatar.iran.liara.run/public/boy",
  },
  {
    name: "Emma Williams",
    role: "Regular Client",
    rating: 5,
    feed: "From basic obedience to advanced training, they've helped my dog excel at every level. Highly recommended for any dog owner!",
    image: "https://avatar.iran.liara.run/public/girl",
  },
  {
    name: "David Martinez",
    role: "First-time Owner",
    rating: 5,
    feed: "As a first-time dog owner, their guidance has been invaluable. The training methods are effective and humane.",
    image: "https://avatar.iran.liara.run/public/boy",
  },
];

export const socialStats = [
  {
    icon: <Instagram className="transition-transform group-hover:scale-110" />,
    count: 44400,
    label: "Followers",
    href: "https://www.instagram.com/the_best_dog_training/",
    color: "group-hover:text-pink-500",
  },
  {
    icon: <Youtube className="transition-transform group-hover:scale-110" />,
    count: 22000,
    label: "Subscribers",
    href: "https://l.instagram.com/?u=https%3A%2F%2Fyoutube.com%2Fchannel%2FUCKi_7B-j3GsxiavCvpf92mQ%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAabzHmXEUJd2JAy-zw0dVaiq8jv_eMspzr7BHRsJSb3CowjPHAma4K50v0U_aem_T0Xlwr28hSXyA8QZydE09Q&e=AT2S9nSDvZWZTjoIb0r1E0P7GBMiMUBnsyM3b02dKPj-E1CBZcqdaXCfu8PB2-etf2oxiVgXQEiq-fo6TXLSsizBclps6i3IgXw90_4bKPFfNAjeAgIe3A",
    color: "group-hover:text-red-500",
  },
];

export const contactInfo = [
  {
    icon: <Phone className="transition-transform group-hover:scale-110" />,
    label: "+1 (999) 999-9999",
    href: "tel:+19999999999",
    color: "group-hover:text-blue-500",
  },
  {
    icon: <Mail className="transition-transform group-hover:scale-110" />,
    label: "contact@example.com",
    href: "mailto:contact@example.com",
    color: "group-hover:text-green-500",
  },
  {
    icon: <MapPin className="transition-transform group-hover:scale-110" />,
    label: "Visit Us",
    href: "https://maps.app.goo.gl/eWEzoQrn4UWStAWA7",
    color: "group-hover:text-purple-500",
  },
];

export const featuresHome = [
  {
    icon: <Shield className="w-5 h-5" />,
    text: "Professional Training",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    text: "Loving Care",
  },
  {
    icon: <Star className="w-5 h-5" />,
    text: "Expert Trainers",
  },
  {
    icon: <Bone className="w-5 h-5" />,
    text: "Premium Facilities",
  },
];
