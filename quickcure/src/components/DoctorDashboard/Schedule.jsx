import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { resolveDoctorId } from '../../api/doctorApi';

const API_URL = 'http://localhost:5000/api';

const Schedule = ({ doctorId }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Each availability entry: { day, startTime (HH:MM 24h), endTime (HH:MM 24h), isAvailable }
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetchCurrentSchedule();
  }, [doctorId]);

  const fetchCurrentSchedule = async () => {
    setLoading(true);
    try {
      const resolvedId = await resolveDoctorId(doctorId);
      const response = await axios.get(`${API_URL}/doctors/${resolvedId}/availability`);
      if (response.data && response.data.availability) {
        const avail = response.data.availability.map(slot => ({
          day: slot.day,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isAvailable: slot.isAvailable !== false
        }));
        setAvailability(avail);
      }
    } catch (error) {
      console.log('No existing schedule found, using defaults');
      // Initialize with default empty slots
      setAvailability([]);
    }
    setLoading(false);
  };

  const getDayAvailability = (day) => {
    return availability.filter(s => s.day === day);
  };

  const [errors, setErrors] = useState({});

  const validateTimeSlot = (slot, index) => {
    const errs = {};
    if (!slot.startTime) errs[`${index}-start`] = 'Start time required';
    if (!slot.endTime) errs[`${index}-end`] = 'End time required';
    
    if (slot.startTime && slot.endTime) {
      if (slot.startTime >= slot.endTime) {
        errs[`${index}-range`] = 'End time must be after start time';
      }
    }
    
    // Check for overlapping slots on the same day
    const sameDaySlots = availability.filter((s, i) => s.day === slot.day && i !== index);
    sameDaySlots.forEach((s, si) => {
      if (s.startTime && s.endTime && slot.startTime && slot.endTime) {
        if (slot.startTime < s.endTime && slot.endTime > s.startTime) {
          errs[`${index}-overlap`] = 'Slots overlap with another time slot on this day';
        }
      }
    });
    
    return errs;
  };

  const addTimeSlot = (day) => {
    setErrors({});
    setAvailability(prev => [
      ...prev,
      { day, startTime: '09:00', endTime: '17:00', isAvailable: true }
    ]);
  };

  const removeTimeSlot = (index) => {
    setErrors({});
    setAvailability(prev => prev.filter((_, i) => i !== index));
  };

  const updateSlot = (index, field, value) => {
    setAvailability(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    // Clear errors for this slot
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`${index}-start`];
      delete newErrors[`${index}-end`];
      delete newErrors[`${index}-range`];
      delete newErrors[`${index}-overlap`];
      return newErrors;
    });
  };

  const handleSave = async () => {
    // Validate all slots before saving
    const allErrors = {};
    let hasError = false;

    availability.forEach((slot, index) => {
      const slotErrors = validateTimeSlot(slot, index);
      if (Object.keys(slotErrors).length > 0) {
        hasError = true;
        Object.assign(allErrors, slotErrors);
      }
    });

    // Check for duplicate time ranges on same day
    const daySlots = {};
    availability.forEach((slot, index) => {
      if (!daySlots[slot.day]) daySlots[slot.day] = [];
      daySlots[slot.day].push({ ...slot, index });
    });

    Object.entries(daySlots).forEach(([day, slots]) => {
      for (let i = 0; i < slots.length; i++) {
        for (let j = i + 1; j < slots.length; j++) {
          const a = slots[i];
          const b = slots[j];
          if (a.startTime && a.endTime && b.startTime && b.endTime) {
            if (a.startTime === b.startTime && a.endTime === b.endTime) {
              allErrors[`${a.index}-dup`] = 'Duplicate slot';
              allErrors[`${b.index}-dup`] = 'Duplicate slot';
              hasError = true;
            }
          }
        }
      }
    });

    if (hasError) {
      setErrors(allErrors);
      setSaveMessage('Please fix validation errors before saving');
      setTimeout(() => setSaveMessage(''), 4000);
      return;
    }

    setSaving(true);
    setSaveMessage('');
    
    try {
      const resolvedId = await resolveDoctorId(doctorId);
      const token = localStorage.getItem('token');
      
      await axios.put(
        `${API_URL}/doctors/${resolvedId}/availability`,
        { availability },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setErrors({});
      setSaveMessage('Schedule saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Failed to save schedule';
      setSaveMessage(errMsg);
      setTimeout(() => setSaveMessage(''), 5000);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c6774]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Schedule / Availability</h2>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm md:text-base disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Schedule'}
        </button>
      </div>

      {saveMessage && (
        <div className={`p-3 rounded-lg text-sm ${
          saveMessage.includes('successfully') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {saveMessage}
        </div>
      )}

      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4 md:mb-6">Set Available Time Slots</h3>
        
        <div className="space-y-4">
          {daysOfWeek.map((day) => {
            const daySlots = getDayAvailability(day);
            return (
              <div key={day} className="border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-800 text-sm md:text-base">{day}</h4>
                  <button
                    type="button"
                    onClick={() => addTimeSlot(day)}
                    className="text-xs px-3 py-1 bg-[#2c6774] text-white rounded hover:bg-[#1e4e56] mt-1 sm:mt-0 self-start"
                  >
                    + Add Time Slot
                  </button>
                </div>
                
                {daySlots.length === 0 ? (
                  <p className="text-gray-400 text-xs italic">No time slots added. Click "Add Time Slot" to set availability.</p>
                ) : (
                  <div className="space-y-2">
                    {daySlots.map((slot, localIndex) => {
                      // Find global index
                      const globalIndex = availability.indexOf(slot);
                      return (
                        <div key={localIndex} className="flex flex-wrap items-center gap-2 bg-gray-50 p-2 rounded">
                          <input
                            type="time"
                            value={slot.startTime}
                            onChange={(e) => updateSlot(globalIndex, 'startTime', e.target.value)}
                            className="px-2 py-1 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#2c6774]"
                          />
                          <span className="text-gray-500 text-xs">to</span>
                          <input
                            type="time"
                            value={slot.endTime}
                            onChange={(e) => updateSlot(globalIndex, 'endTime', e.target.value)}
                            className="px-2 py-1 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#2c6774]"
                          />
                          <label className="flex items-center gap-1 text-xs ml-2">
                            <input
                              type="checkbox"
                              checked={slot.isAvailable}
                              onChange={(e) => updateSlot(globalIndex, 'isAvailable', e.target.checked)}
                              className="h-3 w-3"
                            />
                            Available
                          </label>
                          <button
                            type="button"
                            onClick={() => removeTimeSlot(globalIndex)}
                            className="ml-auto text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h4 className="font-bold text-gray-800 mb-4 text-sm md:text-base">Weekly Schedule Summary</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 md:gap-4">
          {daysOfWeek.map((day, i) => {
            const count = getDayAvailability(day).filter(s => s.isAvailable).length;
            return (
              <div key={day} className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-700 text-xs md:text-sm">{dayLabels[i]}</p>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  {count} {count === 1 ? 'slot' : 'slots'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
