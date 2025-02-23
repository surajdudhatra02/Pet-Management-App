import { Instagram, Phone, Youtube, Mail, MapPin } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const socialStats = [
        {
            icon: <Instagram className="transition-transform group-hover:scale-110" />,
            count: 44400,
            label: 'Followers',
            href: 'https://www.instagram.com/the_best_dog_training/',
            color: 'group-hover:text-pink-500',
        },
        {
            icon: <Youtube className="transition-transform group-hover:scale-110" />,
            count: 22000,
            label: 'Subscribers',
            href: 'https://l.instagram.com/?u=https%3A%2F%2Fyoutube.com%2Fchannel%2FUCKi_7B-j3GsxiavCvpf92mQ%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAabzHmXEUJd2JAy-zw0dVaiq8jv_eMspzr7BHRsJSb3CowjPHAma4K50v0U_aem_T0Xlwr28hSXyA8QZydE09Q&e=AT2S9nSDvZWZTjoIb0r1E0P7GBMiMUBnsyM3b02dKPj-E1CBZcqdaXCfu8PB2-etf2oxiVgXQEiq-fo6TXLSsizBclps6i3IgXw90_4bKPFfNAjeAgIe3A',
            color: 'group-hover:text-red-500',
        },
    ];

    const contactInfo = [
        {
            icon: <Phone className="transition-transform group-hover:scale-110" />,
            label: '+1 (999) 999-9999',
            href: 'tel:+19999999999',
            color: 'group-hover:text-blue-500',
        },
        {
            icon: <Mail className="transition-transform group-hover:scale-110" />,
            label: 'contact@example.com',
            href: 'mailto:contact@example.com',
            color: 'group-hover:text-green-500',
        },
        {
            icon: <MapPin className="transition-transform group-hover:scale-110" />,
            label: 'Visit Us',
            href: 'https://maps.app.goo.gl/eWEzoQrn4UWStAWA7',
            color: 'group-hover:text-purple-500',
        },
    ];

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(num);
    };

    return (
        <footer id='contact' className="relative pt-20 pb-5 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto max-w-7xl px-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-gray-900">
                    Connect With Us
                </h2>

                <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-8"></div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-12" ref={ref}>
                        {/* Social Stats */}
                        <div className="space-y-6 ">
                            {socialStats.map((stat, index) => (
                                <a
                                    key={index}
                                    href={stat.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group flex items-center gap-4 p-4 rounded-lg hover:bg-white hover:shadow-2xl transition-all duration-300 ${stat.color} hover:shadow-amber-400/20`}
                                >
                                    {stat.icon}
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold">
                                            {inView && formatNumber(stat.count)}
                                        </span>
                                        <span className="text-gray-600">{stat.label}</span>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    // target="_blank"
                                    className={`group flex items-center gap-4 p-4 rounded-lg hover:bg-white hover:shadow-2xl transition-all duration-300 ${item.color} hover:shadow-amber-400/20`}
                                >
                                    {item.icon}
                                    <span className="text-lg font-medium text-gray-700">{item.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="h-[450px] rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-400/20">
                        <iframe
                            title="Location Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.3117887710046!2d70.7450953747387!3d21.922562056482164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39583973c0018489%3A0x21efe9b588e382a9!2sThe%20best%20dog%20training%20center%20and%20hostel!5e0!3m2!1sen!2sin!4v1738751133659!5m2!1sen!2sin"
                            className="w-full h-full border-0"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>

            <hr className='h-1 my-14 text-gray-400' />

            <div className="container mx-auto">
                <p className='text-center text-gray-600'>@ Copyright 2025</p>
            </div>
        </footer>
    );
};

export default Footer;