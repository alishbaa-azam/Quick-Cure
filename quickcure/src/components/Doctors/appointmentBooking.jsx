// // // import { useEffect, useState } from "react";
// // // import axios from "axios";

// // // export default function BookAppointment({ doctorId }) {
// // //   const [date, setDate] = useState("");
// // //   const [slots, setSlots] = useState([]);
// // //   const [time, setTime] = useState("");
// // //   const [patientName, setPatientName] = useState("");
// // //   const [phoneNo, setPhoneNo] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   // Next 15 days
// // //   const next15Days = [...Array(15)].map((_, i) => {
// // //     const d = new Date();
// // //     d.setDate(d.getDate() + i);
// // //     return d.toISOString().split("T")[0];
// // //   });

// // //  useEffect(() => {
// // //   if (!date) return;
// // //   console.log("Fetching slots for date:", date, "doctorId:", doctorId);
// // //     setLoading(true);

// // //   //   axios
// // //   //     .get(`/api/appointments/slots?doctorId=${doctorId}&date=${date}`)
// // //   //     .then((res) => {
// // //   //       setSlots(Array.isArray(res.data) ? res.data : []);
// // //   //       setTime("");
// // //   //     })
// // //   //     .catch(() => setSlots([]))
// // //   //     .finally(() => setLoading(false));
// // //   // }, [date, doctorId]);

// // //   // Update your axios call to catch errors better:
// // // axios
// // //   .get(`/api/appointments/slots?doctorId=${doctorId}&date=${date}`)
// // //   .then((res) => {
// // //     console.log("Received slots:", res.data); // Debug log
// // //     setSlots(Array.isArray(res.data) ? res.data : []);
// // //     setTime("");
// // //   })
// // //   .catch((err) => {
// // //     console.error("Error fetching slots:", err);
// // //     setSlots([]);
// // //   })
// // //   .finally(() => setLoading(false));
// // // }, [date, doctorId]);
// // //   // Book appointment
// // //   const bookAppointment = async () => {
// // //     if (!patientName || !phoneNo || !date || !time) {
// // //       alert("Please fill all fields");
// // //       return;
// // //     }

// // //     try {
// // //       await axios.post("/api/appointments/book", {
// // //         doctorId,
// // //         patientName,
// // //         phoneNo,
// // //         date,
// // //         time,
// // //       });

// // //       alert("Appointment booked successfully");

// // //       // reset
// // //       setPatientName("");
// // //       setPhoneNo("");
// // //       setDate("");
// // //       setTime("");
// // //       setSlots([]);
// // //     } catch (err) {
// // //       alert(err.response?.data?.message || "Booking failed");
// // //     }
// // //   };

// // //   return (
// // //     <div
// // //       className="max-w-md mx-auto mt-12 p-6 rounded-2xl shadow-xl"
// // //       style={{ backgroundColor: "var(--bg-light)" }}
// // //     >
// // //       <h2
// // //         className="text-2xl font-bold text-center mb-6"
// // //         style={{ color: "var(--secondary-color)" }}
// // //       >
// // //         Book Appointment
// // //       </h2>

// // //       {/* Patient Name */}
// // //       <input
// // //         type="text"
// // //         placeholder="Patient Name"
// // //         value={patientName}
// // //         onChange={(e) => setPatientName(e.target.value)}
// // //         className="w-full p-3 mb-4 rounded-lg border focus:outline-none"
// // //         style={{
// // //           borderColor: "var(--accent-color)",
// // //           backgroundColor: "var(--white)",
// // //         }}
// // //       />

// // //       {/* Phone Number */}
// // //       <input
// // //         type="tel"
// // //         placeholder="Phone Number"
// // //         value={phoneNo}
// // //         onChange={(e) => setPhoneNo(e.target.value)}
// // //         className="w-full p-3 mb-4 rounded-lg border focus:outline-none"
// // //         style={{
// // //           borderColor: "var(--accent-color)",
// // //           backgroundColor: "var(--white)",
// // //         }}
// // //       />

// // //       {/* Date */}
// // //       <select
// // //         value={date}
// // //         onChange={(e) => setDate(e.target.value)}
// // //         className="w-full p-3 mb-4 rounded-lg border focus:outline-none"
// // //         style={{
// // //           borderColor: "var(--accent-color)",
// // //           backgroundColor: "var(--white)",
// // //         }}
// // //       >
// // //         <option value="">Select Date</option>
// // //         {next15Days.map((d) => (
// // //           <option key={d} value={d}>
// // //             {d}
// // //           </option>
// // //         ))}
// // //       </select>
// // //       <select
// // //         value={time}
// // //         onChange={(e) => setTime(e.target.value)}
// // //         disabled={loading}
// // //         className="w-full p-3 mb-6 rounded-lg border focus:outline-none"
// // //       >
// // //         <option value="">
// // //           {loading
// // //             ? "Loading slots..."
// // //             : slots.length
// // //             ? "Select Time"
// // //             : "No slots available"}
// // //         </option>

// // //         {slots.map((slot) => (
// // //           <option key={slot} value={slot}>
// // //             {slot}
// // //           </option>
// // //         ))}
// // //       </select>

// // //       {/* Button */}
// // //       <button
// // //         onClick={bookAppointment}
// // //         className="w-full py-3 rounded-lg font-semibold transition-all"
// // //         style={{
// // //           backgroundColor: "var(--primary-color)",
// // //           color: "var(--white)",
// // //         }}
// // //         onMouseEnter={(e) =>
// // //           (e.currentTarget.style.backgroundColor = "var(--hover-color)")
// // //         }
// // //         onMouseLeave={(e) =>
// // //           (e.currentTarget.style.backgroundColor = "var(--primary-color)")
// // //         }
// // //       >
// // //         Book Appointment
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function BookAppointment({ doctorId }) {
// //   const [doctor, setDoctor] = useState(null);
// //   const [date, setDate] = useState("");
// //   const [slots, setSlots] = useState([]);
// //   const [selectedSlot, setSelectedSlot] = useState("");

// //   /* ------------------ Helpers ------------------ */

// //   // Get weekday name from date
// //   const getDayName = (dateStr) => {
// //     return new Date(dateStr).toLocaleDateString("en-US", {
// //       weekday: "long",
// //     });
// //   };

// //   // Convert "09:00 AM" → minutes
// //   const timeToMinutes = (time) => {
// //     const [timePart, modifier] = time.split(" ");
// //     let [hours, minutes] = timePart.split(":").map(Number);

// //     if (modifier === "PM" && hours !== 12) hours += 12;
// //     if (modifier === "AM" && hours === 12) hours = 0;

// //     return hours * 60 + minutes;
// //   };

// //   // Convert minutes → "09:00 AM"
// //   const minutesToTime = (minutes) => {
// //     let h = Math.floor(minutes / 60);
// //     const m = minutes % 60;
// //     const ampm = h >= 12 ? "PM" : "AM";

// //     h = h % 12;
// //     h = h === 0 ? 12 : h;

// //     return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
// //   };

// //   // Generate slots (30 minutes)
// //   const generateSlots = (start, end, gap = 30) => {
// //     let result = [];
// //     let startMin = timeToMinutes(start);
// //     let endMin = timeToMinutes(end);

// //     while (startMin + gap <= endMin) {
// //       result.push(
// //         `${minutesToTime(startMin)} - ${minutesToTime(startMin + gap)}`
// //       );
// //       startMin += gap;
// //     }
// //     return result;
// //   };

// //   /* ------------------ Fetch Doctor ------------------ */

// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost:5000/api/doctors/${doctorId}`)
// //       .then((res) => setDoctor(res.data))
// //       .catch((err) => console.error(err));
// //   }, [doctorId]);

// //   /* ------------------ Date Change ------------------ */

// //   const handleDateChange = (e) => {
// //     const selectedDate = e.target.value;
// //     setDate(selectedDate);
// //     setSelectedSlot("");

// //     if (!doctor || !selectedDate) return;

// //     const selectedDay = getDayName(selectedDate);

// //     const availableSlots = doctor.availability.filter(
// //       (a) => a.day === selectedDay && a.isAvailable
// //     );

// //     if (availableSlots.length === 0) {
// //       setSlots([]);
// //       return;
// //     }

// //     let allSlots = [];
// //     availableSlots.forEach((a) => {
// //       allSlots = [
// //         ...allSlots,
// //         ...generateSlots(a.startTime, a.endTime),
// //       ];
// //     });

// //     setSlots(allSlots);
// //   };

// //   /* ------------------ UI ------------------ */

// //   return (
// //     <div className="max-w-lg mx-auto p-4 border rounded">
// //       <h2 className="text-xl font-bold mb-3">Book Appointment</h2>

// //       {doctor && (
// //         <p className="mb-3">
// //           Doctor: <strong>{doctor.name}</strong>
// //         </p>
// //       )}

// //       <label className="block mb-2 font-medium">Select Date</label>
// //       <input
// //         type="date"
// //         className="border p-2 w-full mb-4"
// //         value={date}
// //         onChange={handleDateChange}
// //       />

// //       <label className="block mb-2 font-medium">Available Slots</label>

// //       {slots.length === 0 && date && (
// //         <p className="text-red-500">No slots available</p>
// //       )}

// //       <div className="grid grid-cols-2 gap-2">
// //         {slots.map((slot, index) => (
// //           <button
// //             key={index}
// //             onClick={() => setSelectedSlot(slot)}
// //             className={`border p-2 rounded ${
// //               selectedSlot === slot
// //                 ? "bg-blue-600 text-white"
// //                 : "hover:bg-gray-100"
// //             }`}
// //           >
// //             {slot}
// //           </button>
// //         ))}
// //       </div>

// //       {selectedSlot && (
// //         <p className="mt-4 text-green-600 font-medium">
// //           Selected Slot: {selectedSlot}
// //         </p>
// //       )}
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function BookAppointment({ doctorId }) {
//   const [doctor, setDoctor] = useState(null);
//   const [date, setDate] = useState("");
//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState("");

//   // 👉 NEW STATES
//   const [patientName, setPatientName] = useState("");
//   const [phoneNo, setPhoneNo] = useState("");

//   /* ------------------ Helpers ------------------ */

//   const getDayName = (dateStr) =>
//     new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });

//   const timeToMinutes = (time) => {
//     const [timePart, modifier] = time.split(" ");
//     let [hours, minutes] = timePart.split(":").map(Number);

//     if (modifier === "PM" && hours !== 12) hours += 12;
//     if (modifier === "AM" && hours === 12) hours = 0;

//     return hours * 60 + minutes;
//   };

//   const minutesToTime = (minutes) => {
//     let h = Math.floor(minutes / 60);
//     const m = minutes % 60;
//     const ampm = h >= 12 ? "PM" : "AM";

//     h = h % 12;
//     h = h === 0 ? 12 : h;

//     return `${String(h).padStart(2, "0")}:${String(m).padStart(
//       2,
//       "0"
//     )} ${ampm}`;
//   };

//   const generateSlots = (start, end, gap = 15) => {
//     let result = [];
//     let startMin = timeToMinutes(start);
//     let endMin = timeToMinutes(end);

//     while (startMin + gap <= endMin) {
//       result.push(
//         `${minutesToTime(startMin)} - ${minutesToTime(startMin + gap)}`
//       );
//       startMin += gap;
//     }
//     return result;
//   };

//   /* ------------------ Fetch Doctor ------------------ */

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/doctors/${doctorId}`)
//       .then((res) => setDoctor(res.data))
//       .catch((err) => console.error(err));
//   }, [doctorId]);

//   /* ------------------ Date Change ------------------ */

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setDate(selectedDate);
//     setSelectedSlot("");

//     if (!doctor || !selectedDate) return;

//     const selectedDay = getDayName(selectedDate);

//     const availableSlots = doctor.availability.filter(
//       (a) => a.day === selectedDay && a.isAvailable
//     );

//     let allSlots = [];
//     availableSlots.forEach((a) => {
//       allSlots = [...allSlots, ...generateSlots(a.startTime, a.endTime)];
//     });

//     setSlots(allSlots);
//   };

//   /* ------------------ Submit ------------------ */

// //   const handleSubmit = async () => {
// //     if (!patientName || !phoneNo || !date || !selectedSlot) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     try {
// //       await axios.post("http://localhost:5000/api/appointments", {
// //         doctorId,
// //         patientName,
// //         phoneNo,
// //         date,
// //         slot: selectedSlot,
// //       });

// //       alert("Appointment booked successfully!");
// //     } catch (error) {
// //       console.error(error);
// //       alert("Failed to book appointment");
// //     }
// //   };
// const handleSubmit = async () => {
//   if (!patientName || !phoneNo || !date || !selectedSlot) {
//     alert("Please fill all fields");
//     return;
//   }

//   // "09:00 AM - 09:15 AM"
//   const [startTime, endTime] = selectedSlot.split(" - ");

//   try {
//     await axios.post("http://localhost:5000/api/appointments/book", {
//       doctorId,
//       patientName,
//       phoneNo,
//       date,
//       startTime,
//       endTime
//     });

//     alert("Appointment booked successfully");
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     alert(error.response?.data?.message || "Booking failed");
//   }
// };

//   /* ------------------ UI ------------------ */

//   return (
//     <div className="max-w-lg mx-auto p-4 border rounded">
//       <h2 className="text-xl font-bold mb-3">Book Appointment</h2>

//       {doctor && (
//         <p className="mb-3">
//           Doctor: <strong>{doctor.name}</strong>
//         </p>
//       )}

//       {/* Patient Name */}
//       <label className="block mb-1 font-medium">Patient Name</label>
//       <input
//         type="text"
//         className="border p-2 w-full mb-3"
//         value={patientName}
//         onChange={(e) => setPatientName(e.target.value)}
//         placeholder="Enter patient name"
//       />

//       {/* Phone Number */}
//       <label className="block mb-1 font-medium">Phone Number</label>
//       <input
//         type="text"
//         className="border p-2 w-full mb-4"
//         value={phoneNo}
//         onChange={(e) => setPhoneNo(e.target.value)}
//         placeholder="03XXXXXXXXX"
//       />

//       <label className="block mb-2 font-medium">Select Date</label>
//       <input
//         type="date"
//         className="border p-2 w-full mb-4"
//         value={date}
//         onChange={handleDateChange}
//       />

//       <label className="block mb-2 font-medium">Available Slots</label>

//       {slots.length === 0 && date && (
//         <p className="text-red-500">No slots available</p>
//       )}

//       <div className="grid grid-cols-2 gap-2">
//         {slots.map((slot, index) => (
//           <button
//             key={index}
//             onClick={() => setSelectedSlot(slot)}
//             className={`border p-2 rounded ${
//               selectedSlot === slot
//                 ? "bg-blue-600 text-white"
//                 : "hover:bg-gray-100"
//             }`}
//           >
//             {slot}
//           </button>
//         ))}
//       </div>

//       {selectedSlot && (
//         <p className="mt-4 text-green-600 font-medium">
//           Selected Slot: {selectedSlot}
//         </p>
//       )}

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         className="mt-4 w-full bg-green-600 text-white p-2 rounded"
//       >
//         Book Appointment
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

export default function BookAppointment({ doctorId }) {
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [patientName, setPatientName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  /* ------------------ Helpers ------------------ */

  const getDayName = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });

  const timeToMinutes = (time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes) => {
    let h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    h = h === 0 ? 12 : h;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )} ${ampm}`;
  };

  // ✅ 15-minute slot generator
  const generateSlots = (start, end, gap = 15) => {
    let result = [];
    let startMin = timeToMinutes(start);
    let endMin = timeToMinutes(end);

    while (startMin + gap <= endMin) {
      result.push(
        `${minutesToTime(startMin)} - ${minutesToTime(startMin + gap)}`
      );
      startMin += gap;
    }
    return result;
  };

  /* ------------------ Fetch Doctor ------------------ */

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/doctors/${doctorId}`)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.error(err));
  }, [doctorId]);

  /* ------------------ Date Change ------------------ */

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setSelectedSlot("");

    if (!doctor || !selectedDate) return;

    const selectedDay = getDayName(selectedDate);

    const availableSlots = doctor.availability.filter(
      (a) => a.day === selectedDay && a.isAvailable
    );

    let allSlots = [];
    availableSlots.forEach((a) => {
      allSlots = [
        ...allSlots,
        ...generateSlots(a.startTime, a.endTime)
      ];
    });

    setSlots(allSlots);
  };

  /* ------------------ Submit ------------------ */

  const handleSubmit = async () => {
    if (!patientName || !phoneNo || !date || !selectedSlot) {
      alert("Please fill all fields");
      return;
    }

    const [startTime, endTime] = selectedSlot.split(" - ");

    try {
      await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          doctorId,
          patientName,
          phoneNo,
          date,
          startTime,
          endTime
        }
      );

      alert("Appointment booked successfully");
      setSelectedSlot("");
      setPatientName("");
      setPhoneNo("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  /* ------------------ UI ------------------ */

  return (
    <div className="max-w-lg mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-3">Book Appointment</h2>

      {doctor && (
        <p className="mb-3">
          Doctor: <strong>{doctor.name}</strong>
        </p>
      )}

      <label className="block mb-1 font-medium">Patient Name</label>
      <input
        type="text"
        className="border p-2 w-full mb-3"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />

      <label className="block mb-1 font-medium">Phone Number</label>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
        placeholder="03XXXXXXXXX"
      />

      <label className="block mb-2 font-medium">Select Date</label>
      <input
        type="date"
        className="border p-2 w-full mb-4"
        value={date}
        onChange={handleDateChange}
      />

      <label className="block mb-2 font-medium">Available Slots</label>

      {slots.length === 0 && date && (
        <p className="text-red-500">No slots available</p>
      )}

      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot, index) => (
          <button
            key={index}
            onClick={() => setSelectedSlot(slot)}
            className={`border p-2 rounded ${
              selectedSlot === slot
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      {selectedSlot && (
        <p className="mt-4 text-green-600 font-medium">
          Selected Slot: {selectedSlot}
        </p>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-green-600 text-white p-2 rounded"
      >
        Book Appointment
      </button>
    </div>
  );
}
