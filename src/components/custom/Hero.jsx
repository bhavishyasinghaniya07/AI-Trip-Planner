import React from "react";
import { Link } from "react-router-dom";
import { testimonials } from "./testomonials.jsx";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__main">
        <div className="hero__content-wrapper">
          <h1 className="hero__title">
            <span className="hero__highlight">
              Discover Your Next Adventure with AI:
            </span>
            <br className="hero__break" />
            Personalized Itineraries at Your Fingertips
          </h1>
          <p className="hero__description">
            Build, personalize, and optimize your itineraries with our free AI
            trip planner. Designed for vacations, workations, and everyday
            adventures.
          </p>
          <Link to="/create-trip" className="hero__cta-link">
            <button className="hero__cta-button">Get Started, It's Free</button>
          </Link>
        </div>
      </div>

      <div className="info-section">
        <div className="info-section__container">
          <span className="info-section__tagline">TRIP PLANNER AI</span>
          <h2 className="info-section__heading">
            The only tool you'll ever need!
          </h2>
          <p className="info-section__description">
            Say goodbye to the stress of planning and hello to personalized
            recommendations, efficient itineraries, and seamless dining
            experiences.
          </p>

          <div className="features">
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
                <div className="feature-card__image-container">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="feature-card__image"
                  />
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="testimonials">
        <div className="testimonials__header">
          <h2 className="testimonials__title">Don't take our word for it</h2>
          <p className="testimonials__subtitle">
            See what our users have to say about revolutionizing their travel
            experiences with Trip Planner AI.
          </p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${testimonial.bgColor} ${testimonial.borderColor}`}
            >
              <div className="testimonial-card__header">
                <img
                  className="testimonial-card__avatar"
                  src={testimonial.image}
                  alt={`Profile picture of ${testimonial.name}`}
                />
                <div className="testimonial-card__user-info">
                  <h3 className="testimonial-card__name">{testimonial.name}</h3>
                  <p className="testimonial-card__role">{testimonial.role}</p>
                </div>
              </div>

              <div className="testimonial-card__content">
                <div className="testimonial-card__rating">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star testimonial-card__star"
                    ></i>
                  ))}
                </div>
                <p className="testimonial-card__text">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
