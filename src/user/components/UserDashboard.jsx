import React, { useState, useEffect } from "react";
import Sponsors from "./Sponsors";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUsers, FaMapMarkedAlt, FaGlobe, FaStar } from "react-icons/fa";
import { API_BASE_URL } from "../../config/api.js";

const UserDashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});

  // Hero slider content
  const slides = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Marathon Runners",
      title: "Join the Ultimate Marathon Challenge",
      subtitle: "Run with Passion, Win with Pride",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Race Finish Line",
      title: "Cross the Finish Line",
      subtitle: "Experience the Thrill of Victory",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/2654902/pexels-photo-2654902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Marathon Crowd",
      title: "Run with the Community",
      subtitle: "Together We Achieve Greatness",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/2002209/pexels-photo-2002209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Marathon Route",
      title: "Explore Scenic Routes",
      subtitle: "Discover New Horizons",
    },
  ];

  // Testimonials content
  const testimonials = [
    {
      id: 1,
      name: "Amit Sharma",
      text: "This marathon changed my life! The energy and support were incredible.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Placeholder_Person.jpg",
      role: "3-Time Marathon Finisher",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Patel",
      text: "Amazing experience with scenic routes and great organization. Will definitely come back next year!",
      image:
        "https://www.clipartkey.com/mpngs/m/227-2271457_dummy-image-jpg.png",
      role: "First-Time Runner",
      rating: 4,
    },
    {
      id: 3,
      name: "John Smith",
      text: "The community feeling at this marathon is unlike any other. The volunteers were fantastic and the route was challenging yet beautiful.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwfLtVEZzfmdfYtO-JyY17fdqFka_UM8KtRykyt7JjO0SrGbBRREf3wJul10IYnMfPfw0&usqp=CAU",
      role: "Professional Runner",
      rating: 5,
    },
  ];

  // Stats content
  const stats = [
    { id: 1, value: "10,000+", label: "Participants", icon: FaUsers },
    { id: 2, value: "42", label: "Kilometers", icon: FaMapMarkedAlt },
    { id: 3, value: "15", label: "Countries", icon: FaGlobe },
    { id: 4, value: "98%", label: "Satisfaction", icon: FaStar },
  ];

  // Hero slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch events
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/event/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const events = res.data.filter(
          (event) => new Date(event.event_date) > new Date()
        );
        setUpcomingEvents(events.slice(0, 3));
        if (events.length > 0) {
          updateCountdown(events[0].event_date);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcomingEvents();
  }, []);

  // Countdown logic
  const updateCountdown = (eventDate) => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(eventDate);
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  // Render star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < rating ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="font-sans bg-gray-50">
      {/* Main Content */}
      <main>
        {/* Hero Slider Section */}
        <section
          id="hero"
          className="relative h-screen max-h-[700px] overflow-hidden"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 flex items-center justify-center">
                <div className="text-center px-4 md:px-0 max-w-3xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg animate-fadeIn">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-white/90 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <Link to="/user/events">
                      <button className="px-10 py-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all transform hover:scale-105 duration-300 shadow-lg text-lg font-bold">
                        Register Now
                      </button>
                    </Link>
                    <a href="#about">
                      <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all transform hover:scale-105 duration-300 shadow-lg text-lg font-bold">
                        Learn More
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-24">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-white rounded-xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 border-b-4 border-blue-500 flex items-center gap-4"
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-blue-600">
                    {stat.value}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm md:text-base text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl text-blue-500">
                    <stat.icon /> {/* Dynamic icon rendering */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div
              className="absolute inset-0 bg-repeat"
              style={{
                backgroundImage:
                  "url('data:image/jpeg;base64,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')",
              }}
            ></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-extrabold text-center mb-16">
              Next Event Countdown
              <span className="block w-32 h-1 bg-yellow-400 mx-auto mt-6 rounded-full"></span>
            </h2>
            {upcomingEvents.length > 0 && !loading ? (
              <div className="text-center space-y-10">
                <p className="text-3xl font-light">
                  {upcomingEvents[0].event_name} -{" "}
                  <span className="font-semibold">
                    {new Date(upcomingEvents[0].event_date).toLocaleDateString(
                      "en-GB"
                    )}
                  </span>
                </p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-12">
                  <div className="w-24 h-24 md:w-36 md:h-36 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center shadow-xl border border-white/20 hover:border-white/40 transition-all">
                    <p className="text-4xl md:text-6xl font-bold">
                      {timeLeft.days}
                    </p>
                    <p className="text-sm md:text-base text-white/80 mt-2">
                      Days
                    </p>
                  </div>
                  <div className="w-24 h-24 md:w-36 md:h-36 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center shadow-xl border border-white/20 hover:border-white/40 transition-all">
                    <p className="text-4xl md:text-6xl font-bold">
                      {timeLeft.hours}
                    </p>
                    <p className="text-sm md:text-base text-white/80 mt-2">
                      Hours
                    </p>
                  </div>
                  <div className="w-24 h-24 md:w-36 md:h-36 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center shadow-xl border border-white/20 hover:border-white/40 transition-all">
                    <p className="text-4xl md:text-6xl font-bold">
                      {timeLeft.minutes}
                    </p>
                    <p className="text-sm md:text-base text-white/80 mt-2">
                      Minutes
                    </p>
                  </div>
                  <div className="w-24 h-24 md:w-36 md:h-36 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center shadow-xl border border-white/20 hover:border-white/40 transition-all">
                    <p className="text-4xl md:text-6xl font-bold">
                      {timeLeft.seconds}
                    </p>
                    <p className="text-sm md:text-base text-white/80 mt-2">
                      Seconds
                    </p>
                  </div>
                </div>
                <Link to={`/user/register/${upcomingEvents[0].event_id}`}>
                  <button className="mt-12 px-10 py-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all transform hover:scale-105 duration-300 shadow-lg text-lg font-bold">
                    Join Now
                  </button>
                </Link>
              </div>
            ) : (
              <p className="text-center text-xl">
                No upcoming events to display.
              </p>
            )}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section id="events" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">
              Upcoming Events
              <span className="block w-32 h-1 bg-yellow-400 mx-auto mt-6 rounded-full"></span>
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.event_id}
                    className="rounded-3xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={`${API_BASE_URL}${event.event_image}`}
                        alt={event.event_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-start p-6">
                        <div>
                          <div className="inline-block px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full mb-2">
                            {event.event_type}
                          </div>
                          <h3 className="text-2xl font-bold text-white">
                            {event.event_name}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-5 h-5 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          <span className="text-gray-700 font-medium">
                            {new Date(event.event_date).toLocaleDateString(
                              "en-GB"
                            )}
                          </span>
                        </div>
                        <div className="bg-blue-100 text-blue-800 text-xs rounded-full px-3 py-1 font-semibold">
                          {event.event_type}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-8">
                        Join us for an incredible running experience through
                        scenic routes and enthusiastic crowds.
                      </p>
                      <Link to={`/user/register/${event.event_id}`}>
                        <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 group">
                          <span>Register Now</span>
                          <svg
                            className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-xl text-gray-600">
                  No upcoming events available.
                </p>
              </div>
            )}

            {upcomingEvents.length > 0 && (
              <div className="text-center mt-12">
                <Link to="/user/events">
                  <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold">
                    View All Events
                  </button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">
              What Our Runners Say
              <span className="block w-32 h-1 bg-yellow-400 mx-auto mt-6 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">
                        {testimonial.role}
                      </p>
                      <StarRating rating={testimonial.rating} />
                    </div>
                  </div>
                  <div className="relative">
                    <svg
                      className="absolute -top-4 -left-4 w-10 h-10 text-blue-300 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-700 italic relative z-10 text-lg">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-28 bg-blue-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="/api/placeholder/1200/600"
              className="w-full h-full object-cover"
              alt="Background"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
                Ready to Run?
              </h2>
              <p className="text-xl mb-12 text-white/80">
                Join thousands of runners and make your mark in the 2025
                Marathon Season! Challenge yourself, achieve your goals, and be
                part of something extraordinary.
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Link to="/user/events">
                  <button className="px-10 py-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all transform hover:scale-105 duration-300 shadow-xl text-lg font-bold">
                    Explore All Events
                  </button>
                </Link>
                <Link to="/user/contact">
                  <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all transform hover:scale-105 duration-300 shadow-xl text-lg font-bold">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute left-4 md:left-20 top-1/4 w-24 h-24 rounded-full bg-yellow-500 opacity-20 blur-2xl"></div>
          <div className="absolute right-4 md:right-20 bottom-1/4 w-32 h-32 rounded-full bg-blue-400 opacity-20 blur-2xl"></div>
        </section>

        {/* Partner & Sponsors Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">
              Our Partners & Sponsors
              <span className="block w-32 h-1 bg-yellow-400 mx-auto mt-6 rounded-full"></span>
            </h2>
            <Sponsors />
          </div>
        </section>

        {/* Custom Animation Styles */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
        `}</style>
      </main>
    </div>
  );
};

export default UserDashboard;
