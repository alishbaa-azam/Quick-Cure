import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  // Removed popup state
  // const [appointmentSummary, setAppointmentSummary] = useState(null);
  // const [popup, setPopup] = useState({
  //   open: false,
  //   type: "",
  //   message: "",
  // });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
        if (user.name) setPatientName(user.name);
        if (user.phone || user.mobile) setPhoneNo(user.phone || user.mobile);
        if (user.email) setEmail(user.email);
        if (user.age) setAge(user.age);
        if (user.gender) setGender(user.gender);
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, []);

  // Removed popup functions
  // const showErrorPopup = (message) => {
  //   setPopup({ open: true, type: "error", message });
  // };

  // const showSuccessPopup = (message) => {
  //   setPopup({ open: true, type: "success", message });
  // };

  useEffect(() => {
    if (!doctorId) return;
    axios
      .get(`http://localhost:5000/api/doctors/${doctorId}`)
      .then((res) => setDoctor(res.data))
      .catch(() => console.error("Failed to load doctor information"));
  }, [doctorId]);

  const fetchAvailableSlots = async (selectedDate) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments/slots",
        { params: { doctorId, date: selectedDate } },
      );
      if (res.data.success) {
        setSlots(
          res.data.availableSlots.map(
            (s) => `${s.startTime12} - ${s.endTime12}`,
          ),
        );
      } else {
        setSlots([]);
      }
    } catch {
      setSlots([]);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setSelectedSlot("");
    if (!selectedDate) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(selectedDate) < today) {
      console.error("Cannot book past dates");
      return;
    }
    fetchAvailableSlots(selectedDate);
  };

  const validatePhoneNumber = (phone) => {
    return /^03\d{9}$/.test(phone);
  };

  const validateEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ========== SAVE TO LOCALSTORAGE FOR USER DASHBOARD ==========
  const saveAppointmentToLocal = (appointmentData) => {
    try {
      // For logged-in user
      if (currentUser) {
        const userKey = currentUser.id || currentUser._id || currentUser.email;
        const storageKey = `appointments_${userKey}`;
        
        const existingAppointments = JSON.parse(localStorage.getItem(storageKey) || '[]');
        
        const dashboardAppointment = {
          _id: appointmentData._id || appointmentData.id,
          id: appointmentData._id || appointmentData.id,
          confirmationCode: appointmentData.confirmationCode,
          doctor: {
            id: doctorId,
            name: doctor?.name,
            speciality: doctor?.speciality,
            image: doctor?.image
          },
          patientName: patientName,
          phoneNo: phoneNo,
          email: email,
          date: date,
          time: selectedSlot,
          status: 'pending',
          fee: doctor?.fee,
          meetLink: appointmentData.meetLink || '',
          bookedAt: new Date().toISOString()
        };
        
        existingAppointments.unshift(dashboardAppointment);
        localStorage.setItem(storageKey, JSON.stringify(existingAppointments));
        console.log('Appointment saved for user:', userKey);
      }
      
      // Also save by phone number for non-logged-in users
      const phoneKey = `appointments_phone_${phoneNo}`;
      const phoneAppointments = JSON.parse(localStorage.getItem(phoneKey) || '[]');
      phoneAppointments.unshift({
        _id: appointmentData._id || appointmentData.id,
        doctorName: doctor?.name,
        doctorSpeciality: doctor?.speciality,
        date: date,
        time: selectedSlot,
        status: 'pending'
      });
      localStorage.setItem(phoneKey, JSON.stringify(phoneAppointments));
      
      // Save to global appointments list
      const allAppointments = JSON.parse(localStorage.getItem('all_appointments') || '[]');
      allAppointments.unshift({
        _id: appointmentData._id || appointmentData.id,
        doctorId: doctorId,
        doctorName: doctor?.name,
        patientName: patientName,
        phoneNo: phoneNo,
        date: date,
        time: selectedSlot,
        status: 'pending'
      });
      localStorage.setItem('all_appointments', JSON.stringify(allAppointments));
      
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const handleSubmit = async () => {
    if (!patientName.trim()) { console.error("Enter patient name"); return; }
    if (!validatePhoneNumber(phoneNo)) { console.error("Enter valid Pakistani phone number (03XXXXXXXXX)"); return; }
    if (email && !validateEmail(email)) { console.error("Enter valid email address"); return; }
    if (!date || !selectedSlot) { console.error("Complete all fields"); return; }

    const [startTime, endTime] = selectedSlot.split(" - ");
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          doctorId,
          patientName,
          phoneNo: phoneNo.replace(/[\s\-\(\)]/g, ""),
          email: email || undefined,
          date,
          startTime,
          endTime,
          age: age || undefined,
          gender: gender || undefined,
        },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      if (response.data.success) {
        const appointmentData = response.data.appointment;
        
        // Save to localStorage for UserDashboard
        saveAppointmentToLocal(appointmentData);
        
        // Appointment booked successfully - redirect to payment
        setTimeout(() => {
          navigate("/payment", {
            state: {
              bookingType: 'appointment',
              bookingId: appointmentData._id || appointmentData.id,
              amount: doctor?.fee || 0,
              customerName: patientName,
              customerEmail: email,
              customerPhone: phoneNo
            }
          });
        }, 2500);
      } else {
        console.error("Booking failed");
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: "var(--bg-light)" }}
      >
        <div
          className="w-full max-w-xl rounded-2xl shadow-xl overflow-hidden"
          style={{ backgroundColor: "var(--white)" }}
        >
          <div
            className="p-6 text-white"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <h2 className="text-2xl font-bold">Book Appointment</h2>
            <p className="text-sm opacity-90">Schedule your visit</p>
          </div>

          <div className="p-6 space-y-4">
            {doctor && (
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: "var(--bg-light)" }}
              >
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-sm">{doctor.speciality}</p>
                <p className="text-xs text-gray-500 mt-1">Fee: Rs. {doctor.fee}</p>
              </div>
            )}

            <input
              className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
              placeholder="Patient Name *"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />

            <input
              className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
              placeholder="03XXXXXXXXX *"
              value={phoneNo}
              maxLength={11}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 11) {
                  setPhoneNo(value);
                }
              }}
            />

            <input
              className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
                type="number"
                placeholder="Age"
                value={age}
                max="120"
                onChange={(e) => setAge(e.target.value)}
              />
              <select
                className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <input
              type="date"
              className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
              value={date}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
            />

            {slots.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {slots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSlot(slot)}
                    className="px-4 py-2 rounded-full border transition-all"
                    style={{
                      backgroundColor:
                        selectedSlot === slot
                          ? "var(--primary-color)"
                          : "var(--white)",
                      color:
                        selectedSlot === slot
                          ? "var(--white)"
                          : "var(--secondary-color)",
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded text-white font-medium"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>

            {!currentUser && (
              <p className="text-xs text-center text-gray-500 mt-2">
                New here? <a href="/register" className="text-blue-600">Register</a> to save your appointments
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Removed popup */}
    </>
  );
}