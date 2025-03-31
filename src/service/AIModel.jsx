import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: '"Generate a detailed 3-day travel itinerary for a couple visiting Las Vegas on a budget. Provide affordable hotel options, including:\n\nHotel name\n\nAddress\n\nPrice per night\n\nHotel image URL\n\nGeo-coordinates\n\nRating\n\nBrief description\n\nAdditionally, suggest a well-planned itinerary for each day, including:\n\nPlace name\n\nPlace details\n\nPlace image URL\n\nGeo-coordinates\n\nTicket pricing (if applicable)\n\nRating\n\nBest time to visit\n\nEstimated travel time between locations\n\nRecommendations for budget-friendly meals and activities\n\nFormat the entire response in structured JSON."',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripName": "Las Vegas Budget Trip for Couples",\n  "duration": "3 Days",\n  "budget": "Budget-Friendly",\n  "hotels": [\n    {\n      "name": "Circus Circus Hotel & Casino",\n      "address": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "pricePerNight": {\n        "min": 40,\n        "max": 80\n      },\n      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/CircusCircusLasVegas.jpg/1280px-CircusCircusLasVegas.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1262,\n        "longitude": -115.1714\n      },\n      "rating": 3.5,\n      "description": "A classic Vegas hotel with a circus theme, offering affordable rooms and family-friendly entertainment.  Can be noisy due to its location and activities."\n    },\n    {\n      "name": "The LINQ Hotel + Experience",\n      "address": "3535 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "pricePerNight": {\n        "min": 60,\n        "max": 120\n      },\n      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/The_LINQ_Hotel_%26_Experience_Exterior.jpg/1280px-The_LINQ_Hotel_%26_Experience_Exterior.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1267,\n        "longitude": -115.1736\n      },\n      "rating": 4.0,\n      "description": "Offers a modern experience with a central location on the Strip.  Rooms can be a bit smaller but offer good value."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "title": "Exploring the Strip & Fremont Street",\n      "places": [\n        {\n          "name": "Bellagio Fountains",\n          "details": "Free water show with music and lights.",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bellagio_Fountains_01.jpg/1280px-Bellagio_Fountains_01.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1146,\n            "longitude": -115.1726\n          },\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "bestTime": "Evening",\n          "travelTime": "10 minutes walk from most hotels on the Strip"\n        },\n        {\n          "name": "Fremont Street Experience",\n          "details": "A pedestrian mall with vibrant light shows and street performers.",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/FremontStreetExperience.jpg/1280px-FremontStreetExperience.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1699,\n            "longitude": -115.1403\n          },\n          "ticketPricing": "Free (some shows may have costs)",\n          "rating": 4.0,\n          "bestTime": "Evening",\n          "travelTime": "20-30 minutes by taxi or rideshare from the Strip"\n        }\n      ],\n      "meals": [\n        {\n          "name": "In-N-Out Burger",\n          "type": "Fast Food",\n          "price": "$10-$15"\n        },\n        {\n          "name": "Secret Pizza (The Cosmopolitan)",\n          "type": "Casual",\n          "price": "$20-$30"\n        }\n      ],\n      "activities": [\n        "Free walking tour of the Strip"\n      ]\n    },\n    "day2": {\n      "title": "Pool Day and Downtown Exploration",\n      "places":[\n        {\n          "name": "Hotel Pool (Circus Circus or LINQ)",\n          "details": "Relax and enjoy the hotel\'s pool facilities.",\n          "imageUrl": null, // Hotel-specific image needed\n          "geoCoordinates": null, //Hotel-specific coordinates needed\n          "ticketPricing": "Free for hotel guests",\n          "rating": null, //Hotel-specific rating needed\n          "bestTime": "Afternoon",\n          "travelTime": "0 minutes"\n        },\n        {\n          "name": "Neon Museum",\n          "details": "Explore the history of Las Vegas\'s iconic neon signs.",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Neon_Museum_Las_Vegas.jpg/1280px-Neon_Museum_Las_Vegas.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1523,\n            "longitude": -115.1354\n          },\n          "ticketPricing": "$25-$30",\n          "rating": 4.2,\n          "bestTime": "Afternoon",\n          "travelTime": "20 minutes by taxi or rideshare from the Strip"\n        }\n      ],\n      "meals": [\n        {\n          "name": "Earl of Sandwich",\n          "type": "Fast Casual",\n          "price": "$10-$15"\n        },\n        {\n          "name": "Tacos El Gordo",\n          "type": "Street Food",\n          "price": "$10-$15"\n        }\n      ],\n      "activities": [\n        "Explore Downtown Container Park"\n      ]\n    },\n    "day3": {\n      "title": "High Roller and Departure",\n      "places": [\n        {\n          "name": "High Roller Observation Wheel",\n          "details": "Enjoy breathtaking views of the Las Vegas Strip from a giant observation wheel.",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/High_Roller_Observation_Wheel.jpg/1280px-High_Roller_Observation_Wheel.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1236,\n            "longitude": -115.1714\n          },\n          "ticketPricing": "$30-$40",\n          "rating": 4.3,\n          "bestTime": "Sunset",\n          "travelTime": "5-10 minutes walk from many hotels on the Strip"\n        }\n      ],\n      "meals": [\n        {\n          "name": "Yard House",\n          "type": "Casual Dining",\n          "price": "$20-$30"\n        }\n      ],\n      "activities": [\n        "Souvenir shopping at a local store"\n      ]\n    }\n  }\n}\n```\n\n**Note:** Prices are estimates and can vary depending on the season and availability.  Hotel images and ratings may change. Always check current pricing and reviews before booking.  Geo-coordinates are approximations for some locations.  Consider using a mapping application for precise locations and travel times. Remember to factor in transportation costs, which can be significant in Las Vegas.  Using public transport or walking where possible will help keep costs down.\n',
        },
      ],
    },
  ],
});
