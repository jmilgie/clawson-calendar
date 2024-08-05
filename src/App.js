import React, { useState, useEffect } from 'react';
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

const eventDetails = {
  "2024-08-10": ["Find your dream ride or show off your own classic at this spectacular car show. Located on Main Street, South of 14 Mile Road from 8 AM-4 PM. Get ready for a day filled with vintage automobiles, live music, and community spirit!"],
  "2024-08-11": [
    "Join us at City Park from 9 AM-1 PM for the freshest produce, local crafts, and live music. It's the perfect way to spend your Sunday morning!",
    "Cool down with Clawson's finest! From 11 AM-1 PM, kids of all ages can meet Clawson Police Department officers, explore a police car, and enjoy a refreshing popsicle. Don't forget to bring school supplies for our donation drive!"
  ],
  "2024-08-19": ["Enjoy a free, family-friendly concert at Memorial Park from 7 PM-8:15 PM. Bring your blanket or lawn chair and listen to the soulful sounds of Jacki Daniels & Rob Louis performing a mix of Motown, jazz, pop & rock!"],
  "2024-08-22": ["Be a hero! Donate blood at City Hall from 1 PM-7 PM. Every minute of every day, someone needs blood. Your donation can save lives!"],
  "2024-08-24": ["Downtown Clawson comes alive from 12 PM-8 PM with this free all-ages concert, food, and art festival. Enjoy live music, delicious local cuisine, and stunning artwork in this vibrant outdoor event!"],
  "2024-08-25": ["Your last chance this summer to enjoy fresh fruit, produce, local crafts, and live music at City Park from 9 AM-1 PM. Don't miss out on the season's final market!"],
  "2024-09-13": ["Cheer on Clawson Police Department as they participate in this annual run supporting Special Olympics. Watch for fundraising links to support this incredible cause!"],
  "2024-09-14": ["Step back in time from 2 PM-5 PM in the museum's beautiful garden. Enjoy tours, games, and treats for sale. All proceeds support the Clawson Historical Society's important work!"],
  "2024-09-28": ["Celebrate autumn at Clawson City Park from 3 PM-7 PM. Enjoy hayrides, music, an artisan market, food trucks, kids' activities, cider & donuts, and a bonfire courtesy of the Clawson Fire Department!"],
  "2024-09-30": ["Support our senior programming by ordering a delicious quiche for just $10. Order in person, by phone (248-589-0334), or online at Recreation.CityofClawson.com until October 18th. Pickup on October 23rd after 1 PM at the Hunter Community Center."],
  "2024-10-20": ["Bring your flashlight and candy bag to City Park from 6 PM–7:30 PM. Collect treats from local businesses and organizations, then enjoy cider and donuts provided by the Parks and Recreation Department!"],
  "2024-10-26": [
    "From 12 PM-2 PM, downtown businesses open their doors to costumed kids seeking treats. The sidewalks will be filled with treats for all!",
    "From 8 PM-10 PM, adults can join in the Halloween fun! Dress up in costume and enjoy food & drink specials at favorite downtown spots."
  ],
  "2024-10-28": ["Treat yourself to delicious sweet bread for just $7 and support senior programming. Order in person, by phone (248-589-0334), or online at Recreation.CityofClawson.com until November 15th. Pickup on November 26th after 1 PM at the Hunter Community Center."],
  "2024-11-07": ["Join us at the Hunter Community Center at 11:30 AM for a special Veterans Day program. Enjoy a performance by the talented Clawson High School Band as we honor those who have served and continue to serve."],
  "2024-11-09": ["From 9 AM-3 PM at the Hunter Community Center, join this heartwarming opportunity to give and receive gently used items. Register in advance to secure your spot and spread joy in our community!"],
  "2024-12-04": ["Kick off the holiday season at Memorial Park from 6:30 PM-8 PM. Enjoy caroling from school and community choirs, watch Santa light the tree, and listen to the Clawson Public Schools String Orchestra. Don't forget to bring gift cards for the Goodfellows program!"],
  "2024-12-07": ["Join Santa for a festive breakfast at the Hunter Community Center from 10 AM-12 PM. Tickets are $10 per person and include breakfast, a visit with Santa, and a holiday craft. Purchase tickets in advance starting November 1st!"],
  "2024-12-12": ["Enjoy a FREE holiday-inspired concert at the Hunter Community Center from 11:30 AM-12 PM. Get into the holiday spirit with the talented young musicians of Clawson!"],
  "2024-09-02": ["Trash collection delayed to Thursday, September 5th. Enjoy the holiday!"],
  "2024-10-15": ["Our annual leaf pickup program starts today. Rake leaves to the curb in neat rows or piles, leaving about 6\" next to the curb for water flow. No branches or other yard waste, please!"],
  "2024-11-11": ["Remember to thank a veteran for their service today!"],
  "2024-11-28": ["Enjoy your holiday! Remember, there's no delay in trash collection this week."],
  "2024-12-05": ["Last day for curbside leaf pickup. Make sure to have your leaves out for collection!"],
  "2024-12-11": ["Final day for separate yard waste pickup. Plan accordingly for your yard cleanup!"]
};

const humanizeDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          <>
            {isMobile ? (
              <div 
                className="absolute bottom-1 right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                onClick={() => setSelectedEvent({ events: dayEvents, date })}
              >
                <Calendar className="w-3 h-3 text-white" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{dayEvents.length}</span>
              </div>
            ) : (
              <div className="mt-1 space-y-1 max-h-[calc(100%-2rem)] overflow-y-auto">
                {dayEvents.map((event, index) => (
                  <div 
                    key={index}
                    className="text-xs bg-blue-100 p-1 rounded cursor-pointer hover:bg-blue-200 transition-colors break-words"
                    onClick={() => setSelectedEvent({ events: dayEvents, date })}
                  >
                    {event}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4 md:mb-8">
      <div className={`bg-gradient-to-r ${theme.gradient} text-white rounded-t-lg overflow-hidden`}>
        <h2 className="text-3xl md:text-4xl font-bold p-4 md:p-6 text-center flex items-center justify-center">
          <span className="mr-2 animate-pulse">{theme.icon}</span>
          {months[month]}
          <span className="ml-2 animate-pulse">{theme.icon}</span>
        </h2>
        <p className="text-lg md:text-xl italic text-center pb-4">{theme.name}</p>
      </div>
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
          <div className={`bg-gradient-to-r ${theme.gradient} p-4 md:p-6 rounded-lg shadow-xl max-w-md w-full text-white`}>
            <h3 className="text-lg md:text-2xl font-bold mb-4">Events on {humanizeDate(selectedEvent.date)}</h3>
            {selectedEvent.events.map((event, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-lg p-3 mb-3">
                <p className="text-white">{event}</p>
                {eventDetails[selectedEvent.date] && eventDetails[selectedEvent.date][index] && (
                  <p className="text-sm mt-2 text-white opacity-90">{eventDetails[selectedEvent.date][index]}</p>
                )}
              </div>
            ))}
            <button
              className="mt-4 bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
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
      <div className="flex items-center justify-between mb-4 md:mb-8 relative">
        <button onClick={prevMonth} className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-blue-600 z-10">
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-6xl md:text-8xl font-bold text-blue-800 opacity-20">2024</h1>
        </div>
        <div className="flex items-center justify-center flex-1 z-10">
          <Calendar className="w-8 h-8 md:w-10 md:h-10 text-blue-600 mr-2" />
          <h1 className="text-2xl md:text-4xl font-bold text-center text-blue-800">
            Clawson Community Calendar
          </h1>
        </div>
        <button onClick={nextMonth} className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-blue-600 z-10">
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>
      <MonthCalendar month={currentMonth} year={2024} />
      <div className="mt-4 md:mt-8 text-center text-gray-700">
        <p className="text-sm md:text-lg">
          Visit <a href="http://www.cityofclawson.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">www.cityofclawson.com</a> for more information on events
        </p>
        <p className="font-bold mt-2 md:mt-4 text-xl md:text-3xl text-blue-600 italic">
          Little City with a Big Heart
        </p>
      </div>
    </div>
  );
};

export default ClawsonCalendar;