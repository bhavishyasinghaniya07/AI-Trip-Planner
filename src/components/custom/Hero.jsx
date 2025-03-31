import React from "react";
import { Link } from "react-router-dom";
import { testimonials } from "./testomonials";
import "./Hero.css"; // Importing the CSS file

const Hero = () => {
  return (
    <div className="hero-container">
      <h1 className="hero-title">
        <span className="highlight">Discover Your Next Adventure with AI:</span>
        <br className="hidden sm:block" /> Personalized Itineraries at Your
        Fingertips
      </h1>
      <p className="hero-description">
        Build, personalize, and optimize your itineraries with our free AI trip
        planner. Designed for vacations, workations, and everyday adventures.
      </p>
      <Link to="/create-trip">
        <button className="hero-button">Get Started, It’s Free</button>
      </Link>

      <div className="hero-info">
        <h2 className="sub-heading">TRIP PLANNER AI</h2>
        <h1 className="main-heading">The only tool you'll ever need!</h1>
        <p className="sub-description">
          Say goodbye to the stress of planning and hello to personalized
          recommendations, efficient itineraries, and seamless dining
          experiences.
        </p>
        <div className="features-grid">
          {[
            {
              img: "https://tripplanner.ai/_next/image?url=%2Fillustrations%2Fmap.webp&w=640&q=75",
              title: "Optimal Route Planning",
              text: "Our AI algorithms analyze your preferences to craft the most efficient route, saving you time and effort.",
            },
            {
              img: "https://tripplanner.ai/_next/image?url=%2Fillustrations%2Fstory.webp&w=640&q=75",
              title: "Personalize Your Adventure",
              text: "Shape your journey by freely adding, editing, or deleting activities from your itinerary.",
            },
            {
              img: "https://tripplanner.ai/_next/image?url=%2Fillustrations%2Ffood.webp&w=640&q=75",
              title: "Local Cuisine Recommendations",
              text: "Discover local cuisines and hidden gems recommended by our AI, tailored to your taste buds.",
            },
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <img
                src={feature.img}
                alt={feature.title}
                className="feature-img"
              />
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials-section">
        <div className="text-center">
          <h2 className="testimonials-title">Don't take our word for it</h2>
          <p className="testimonials-description">
            See what our users have to say about revolutionizing their travel
            experiences with Trip Planner AI.
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${testimonial.bgColor} ${testimonial.borderColor}`}
            >
              <div className="testimonial-header">
                <img
                  className="testimonial-img"
                  src={testimonial.image}
                  alt={`Profile picture of ${testimonial.name}`}
                />
                <div className="testimonial-user">
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
              <div className="testimonial-content">
                <div className="stars">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <i key={i} className="fas fa-star star-icon"></i>
                  ))}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
