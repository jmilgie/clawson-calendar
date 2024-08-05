import React, { useState } from 'react';
import { Calendar, Heart, Sun, Leaf, Umbrella, Book, Music, Car, Star, Snowflake, Flag, School, Ghost, ChevronLeft, ChevronRight, Thermometer, Droplets } from 'lucide-react';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weatherData = [
  { temp: 30, precip: 2.0 }, { temp: 34, precip: 2.0 }, { temp: 44, precip: 2.4 },
  { temp: 56, precip: 3.0 }, { temp: 67, precip: 3.1 }, { temp: 76, precip: 3.4 },
  { temp: 80, precip: 3.2 }, { temp: 78, precip: 3.3 }, { temp: 71, precip: 3.3 },
  { temp: 59, precip: 2.6 }, { temp: 48, precip: 2.7 }, { temp: 34, precip: 2.3 }
];

const themes = [
  { name: "Winter Wonderland", icon: <Snowflake className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-blue-700 to-indigo-900", cellColor: "bg-blue-50", season: "winter" },
  { name: "Valentine's Day", icon: <Heart className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-pink-700 to-red-900", cellColor: "bg-pink-50", season: "winter" },
  { name: "Spring Awakening", icon: <Leaf className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-green-700 to-emerald-900", cellColor: "bg-green-50", season: "spring" },
  { name: "April Showers", icon: <Umbrella className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-blue-700 to-purple-900", cellColor: "bg-purple-50", season: "spring" },
  { name: "May Flowers", icon: <Leaf className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-yellow-700 to-orange-900", cellColor: "bg-yellow-50", season: "spring" },
  { name: "Summer Fun", icon: <Sun className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-orange-700 to-red-900", cellColor: "bg-orange-50", season: "summer" },
  { name: "Independence", icon: <Flag className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-red-700 to-blue-900", cellColor: "bg-red-50", season: "summer" },
  { name: "Beach Days", icon: <Sun className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-cyan-700 to-blue-900", cellColor: "bg-cyan-50", season: "summer" },
  { name: "Back to School", icon: <School className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-purple-700 to-indigo-900", cellColor: "bg-indigo-50", season: "fall" },
  { name: "Autumn Leaves", icon: <Leaf className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-yellow-700 to-red-900", cellColor: "bg-amber-50", season: "fall" },
  { name: "Harvest Time", icon: <Leaf className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-orange-700 to-amber-900", cellColor: "bg-orange-100", season: "fall" },
  { name: "Holiday Cheer", icon: <Star className="w-6 h-6 md:w-8 md:h-8" />, gradient: "from-red-700 to-green-900", cellColor: "bg-red-50", season: "winter" }
];

const events = {
  "2024-08-10": ["Down on Main Street 26th Annual Lions Club Car Show"],
  "2024-08-11": ["Sunday Summer Market", "Copsicles at City Park"],
  "2024-08-19": ["2024 Summer Gazebo Concert Series"],
  "2024-08-22": ["American Red Cross Blood Drive"],
  "2024-08-24": ["Clawson Fest"],
  "2024-08-25": ["Sunday Summer Market"],
  "2024-09-13": ["Law Enforcement Torch Run for Special Olympics MI"],
  "2024-09-14": ["Garden Party at Clawson Historical Museum"],
  "2024-09-28": ["City of Clawson Parks & Recreation Annual Fall Festival"],
  "2024-09-30": ["Senior Center Quiche Sale begins"],
  "2024-10-20": ["Halloween Trick or Treat Trail"],
  "2024-10-26": ["Trick or Treasure and The Great Pubkin Crawl"],
  "2024-10-28": ["Senior Center Sweet Bread Sale begins"],
  "2024-11-07": ["A Salute to Our Veterans - Clawson High School Band Performs"],
  "2024-11-09": ["Buy Nothing City-Wide Giving Event"],
  "2024-12-04": ["Annual Christmas Tree Lighting"],
  "2024-12-07": ["Breakfast with Santa"],
  "2024-12-12": ["Clawson Public Schools Orchestra Performs"],
  "2024-09-02": ["Labor Day - Trash collection delayed"],
  "2024-10-15": ["Street Leaf Collection begins"],
  "2024-11-11": ["Veterans Day"],
  "2024-11-28": ["Thanksgiving Day"],
  "2024-12-05": ["Street Leaf Collection ends"],
  "2024-12-11": ["End of Separate Yard Waste Collection"]
};

const getMoonPhase = (year, month, day) => {
  let c = 0, e = 0, jd = 0, b = 0;
  
  if (month < 3) {
    year--;
    month += 12;
  }
  
  ++month;
  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  b = parseInt(jd);
  jd -= b;
  b = Math.round(jd * 8);
  if (b >= 8) b = 0;
  
  return ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"][b];
};

const MonthCalendar = ({ month, year }) => {
  const theme = themes[month];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  const today = new Date();

  const [selectedEvent, setSelectedEvent] = useState(null);

  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className={`${theme.cellColor} border border-gray-300 p-1 h-16 md:h-32`}></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const dayEvents = events[date] || [];
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === i;
    const moonPhase = getMoonPhase(year, month + 1, i);

    days.push(
      <div key={i} className={`${theme.cellColor} border border-gray-300 p-1 h-16 md:h-32 overflow-hidden relative ${isToday ? 'ring-2 ring-blue-500' : ''}`}>
        <div className="flex justify-between items-start">
          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-500 text-white' : 'text-gray-800'}`}>
            <span className="text-xs md:text-sm font-bold">{i}</span>
          </div>
          <div className="text-xs md:text-sm">{moonPhase}</div>
        </div>
        {dayEvents.length > 0 && (
          <div className="mt-1 space-y-1 hidden md:block">
            {dayEvents.map((event, index) => (
              <div
                key={index}
                className="bg-blue-200 text-blue-800 rounded-md px-1 py-0.5 text-xs cursor-pointer hover:bg-blue-300"
                onClick={() => setSelectedEvent({ event, date })}
              >
                {event}
              </div>
            ))}
          </div>
        )}
        {dayEvents.length > 0 && (
          <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-1 right-1 md:hidden"></div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4 md:mb-8">
      <h2 className={`text-xl md:text-3xl font-bold mb-2 md:mb-4 flex items-center justify-center p-3 md:p-6 rounded-t-lg bg-gradient-to-r ${theme.gradient} text-white`}>
        <span className="mr-2 animate-pulse">{theme.icon}</span>
        {months[month]} {year} - {theme.name}
        <span className="ml-2 animate-pulse">{theme.icon}</span>
      </h2>
      <div className="grid grid-cols-7 gap-1 bg-white rounded-lg shadow-lg p-1 md:p-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-bold text-center p-1 md:p-2 text-xs md:text-lg">{day}</div>
        ))}
        {days}
      </div>
      <div className={`mt-2 md:mt-4 p-2 md:p-4 rounded-b-lg bg-gradient-to-r ${theme.gradient} text-white flex flex-col sm:flex-row justify-between items-start sm:items-center`}>
        <div className="flex items-center mb-2 sm:mb-0">
          <Thermometer className="w-4 h-4 mr-2" />
          <span className="text-xs md:text-sm">Avg. Temp: {weatherData[month].temp}°F</span>
        </div>
        <div className="flex items-center">
          <Droplets className="w-4 h-4 mr-2" />
          <span className="text-xs md:text-sm">Avg. Precipitation: {weatherData[month].precip}"</span>
        </div>
      </div>
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">{selectedEvent.event}</h3>
            <p className="mb-4">Date: {selectedEvent.date}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ClawsonCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const nextMonth = () => setCurrentMonth((prev) => (prev + 1) % 12);
  const prevMonth = () => setCurrentMonth((prev) => (prev - 1 + 12) % 12);

  return (
    <div className="max-w-7xl mx-auto my-4 md:my-8 bg-gradient-to-br from-blue-100 to-purple-100 p-2 md:p-8 rounded-xl shadow-2xl">
      <h1 className="text-2xl md:text-5xl font-bold flex items-center justify-center mb-4 md:mb-8 text-blue-800">
        <Calendar className="mr-2 md:mr-4 w-8 h-8 md:w-16 md:h-16 text-blue-600" />
        Clawson 2024 Community Calendar
      </h1>
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-blue-600">
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button onClick={nextMonth} className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-blue-600">
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>
      <MonthCalendar month={currentMonth} year={2024} />
      <div className="mt-4 md:mt-8 text-center text-gray-700">
        <p className="text-sm md:text-lg">Visit www.cityofclawson.com for more information on events</p>
        <p className="font-bold mt-2 md:mt-4 text-xl md:text-3xl text-blue-600">
          "Little City with a Big Heart"
        </p>
      </div>
    </div>
  );
};

export default ClawsonCalendar;