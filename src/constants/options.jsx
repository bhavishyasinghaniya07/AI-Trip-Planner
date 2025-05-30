export const SelectTravelesList = [
  {
    id: 1,
    title: "Solo",
    desc: "A sole travels in exploration",
    icon: "🙎‍♂️",
    people: "1 People (solo traveler)",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Two travelers in tandem",
    icon: "❤️",
    people: "2 People (Couple)",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "👨‍👩‍👦‍👦",
    people: "3 to 5 People (Family)",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "🫂",
    people: "5 to 10 People (Friends)",
  },
];

export const SelectDestinationList = [
  {
    id: 1,
    title: "Mountains",
    desc: "Explore the peaks and valleys",
    icon: "⛰️",
  },
  {
    id: 2,
    title: "Beach",
    desc: "Relax by the waves",
    icon: "🏖️",
  },
  {
    id: 3,
    title: "City",
    desc: "Discover urban adventures",
    icon: "🏙️",
  },
  {
    id: 4,
    title: "Countryside",
    desc: "Enjoy peace and nature",
    icon: "🌾",
  },
];

export const SelectInterestsList = [
  {
    id: 1,
    title: "Adventure",
    desc: "Thrilling activities & nature",
    icon: "🌲",
  },
  {
    id: 2,
    title: "Culture",
    desc: "Museums, history & heritage",
    icon: "🏛️",
  },
  {
    id: 3,
    title: "Food",
    desc: "Savor the local cuisines",
    icon: "🍜",
  },
  {
    id: 4,
    title: "Shopping",
    desc: "Markets and luxury brands",
    icon: "🛍️",
  },
];

export const SelectAccommodationList = [
  {
    id: 1,
    title: "Hotel",
    desc: "Classic comfort and service",
    icon: "🏨",
  },
  {
    id: 2,
    title: "Hostel",
    desc: "Affordable stays with community",
    icon: "🛖",
  },
  {
    id: 3,
    title: "Homestay",
    desc: "Local experiences & comfort",
    icon: "🏠",
  },
  {
    id: 4,
    title: "Camping",
    desc: "Outdoor adventure stays",
    icon: "⛺",
  },
];

export const SelectTransportList = [
  {
    id: 1,
    title: "Walking",
    desc: "Explore on foot",
    icon: "🚶",
  },
  {
    id: 2,
    title: "Public",
    desc: "Buses & metro for easy travel",
    icon: "🚌",
  },
  {
    id: 3,
    title: "Rental Car",
    desc: "Drive around freely",
    icon: "🚗",
  },
  {
    id: 4,
    title: "Bike",
    desc: "Two-wheel travel",
    icon: "🏍️",
  },
];

export const SelectTripPaceList = [
  {
    id: 1,
    title: "Relaxed",
    desc: "Few activities per day",
    icon: "😌",
  },
  {
    id: 2,
    title: "Balanced",
    desc: "Moderate activities",
    icon: "⏳",
  },
  {
    id: 3,
    title: "Fast-Paced",
    desc: "Maximize sightseeing",
    icon: "⚡",
  },
  {
    id: 4,
    title: "Flexible",
    desc: "Adjust as you go",
    icon: "🔄",
  },
];

export const SelectFoodList = [
  {
    id: 1,
    title: "Vegetarian",
    desc: "Plant-based and healthy",
    icon: "🌱",
  },
  {
    id: 2,
    title: "Non-Veg",
    desc: "Includes meat & poultry",
    icon: "🥩",
  },
  {
    id: 3,
    title: "Seafood",
    desc: "Fish & ocean flavors",
    icon: "🐟",
  },
  {
    id: 4,
    title: "FastFood",
    desc: "Quick and tasty bites",
    icon: "🍕",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💰",
  },
  {
    id: 2,
    title: "Mid-Range",
    desc: "Keep cost on the average side",
    icon: "💵",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💎",
  },
  {
    id: 3,
    title: "Flexible",
    desc: "Budget doesn't matter",
    icon: "🔄",
  },
];

export const AI_PROMPT = `Generate a travel plan in **strict JSON format**. Do not include any additional text or explanations.

### **Input:**
- Location: {location}  
- Number of Days: {noOfDays}  
- Traveler: {traveler}  
- Food: {food}  
- Transport: {transport}  
- Budget: {budget}  
- TripPace: {tripPace}  
- Interest: {interest}  
- Accommodation: {accommodation}  


### **Expected JSON Format:**
json
{
  "location": "{location}",
  "noOfDays": {noOfDays},
  "traveler": "{traveler}",
  "budget": "{budget}(Must consider the response according to budget)",
  "hotels": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "price": "float"(in US Dollors),
      "hotelImageUrl": "string",
      "rating": "float",
      "description": "string (in 10-15 words)"
    }
  ] (atleast 3 hotels according to accommodation type),
  "itinerary": [
    {
      "day": "integer",
      "places": [
        {
          "timeDuration":"string"(example from 9:30 AM to 11:30 AM),
          "placeName": "string",
          "placeDetails": "string"(in US Dollors),
          "placeImageUrl": "string",
          "ticketPricing": "float" (in indian rupee),
          "bestTimeToVisit": "string",
          "mustDoThing":"string",
          "suggestions":"string",
        }
      ] 
    }
  ](itinerary must include the whole day plan from morning to evening , including food options at any famous cafe or resturent there , consider Trip pace , transportaion , interset , budget in response)
}`;
