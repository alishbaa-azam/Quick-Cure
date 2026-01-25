import React, { useState } from 'react';

const Schedule = () => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const timeRanges = [
    "05:00 PM – 09:00 PM",
    "08:00 PM – 10:00 PM",
    "09:00 AM – 12:00 PM",
    "02:00 PM – 05:00 PM",
    "06:00 PM – 08:00 PM"
  ];

  const [availability, setAvailability] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        "05:00 PM – 09:00 PM": day === "Sunday",
        "08:00 PM – 10:00 PM": day === "Sunday",
        "09:00 AM – 12:00 PM": day !== "Sunday",
        "02:00 PM – 05:00 PM": day !== "Sunday",
        "06:00 PM – 08:00 PM": day !== "Sunday"
      };
      return acc;
    }, {})
  );

  const handleAvailabilityChange = (day, timeRange, checked) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeRange]: checked
      }
    }));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Schedule / Availability</h2>
        <button className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm md:text-base">
          Save Schedule
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4 md:mb-6">Set Available Time Slots</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {daysOfWeek.map((day) => (
            <div key={day} className="border rounded-lg p-3 md:p-4">
              <h4 className="font-bold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">{day}</h4>
              <div className="space-y-2">
                {timeRanges.map((timeRange) => (
                  <label key={timeRange} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={availability[day]?.[timeRange] || false}
                      onChange={(e) => handleAvailabilityChange(day, timeRange, e.target.checked)}
                      className="mr-2 h-4 w-4 text-[#2c6774] rounded focus:ring-[#2c6774]"
                    />
                    <span className="text-gray-700 text-xs md:text-sm">{timeRange}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-8">
          <h4 className="font-bold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">Weekly Schedule Summary</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 md:gap-4">
            {daysOfWeek.map((day) => {
              const availableSlots = Object.values(availability[day] || {}).filter(Boolean).length;
              return (
                <div key={day} className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-700 text-xs md:text-sm">{day.slice(0, 3)}</p>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    {availableSlots} {availableSlots === 1 ? 'slot' : 'slots'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;