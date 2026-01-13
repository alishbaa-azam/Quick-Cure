// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function BookAppointment({ doctorId }) {
//   const [date, setDate] = useState("");
//   const [slots, setSlots] = useState([]);
//   const [time, setTime] = useState("");
//   const [patientName, setPatientName] = useState("");
//   const [phoneNo, setPhoneNo] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Next 15 days
//   const next15Days = [...Array(15)].map((_, i) => {
//     const d = new Date();
//     d.setDate(d.getDate() + i);
//     return d.toISOString().split("T")[0];
//   });

//  useEffect(() => {
//   if (!date) return;
//   console.log("Fetching slots for date:", date, "doctorId:", doctorId);
//     setLoading(true);

//   //   axios
//   //     .get(`/api/appointments/slots?doctorId=${doctorId}&date=${date}`)
//   //     .then((res) => {
//   //       setSlots(Array.isArray(res.data) ? res.data : []);
//   //       setTime("");
//   //     })
//   //     .catch(() => setSlots([]))
//   //     .finally(() => setLoading(false));
//   // }, [date, doctorId]);

//   // Update your axios call to catch errors better:
// axios
//   .get(`/api/appointments/slots?doctorId=${doctorId}&date=${date}`)
//   .then((res) => {
//     console.log("Received slots:", res.data); // Debug log
//     setSlots(Array.isArray(res.data) ? res.data : []);
//     setTime("");
//   })
//   .catch((err) => {
//     console.error("Error fetching slots:", err);
//     setSlots([]);
//   })
//   .finally(() => setLoading(false));
// }, [date, doctorId]);
//   // Book appointment
//   const bookAppointment = async () => {
//     if (!patientName || !phoneNo || !date || !time) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       await axios.post("/api/appointments/book", {
//         doctorId,
//         patientName,
//         phoneNo,
//         date,
//         time,
//       });

//       alert("Appointment booked successfully");

//       // reset
//       setPatientName("");
//       setPhoneNo("");
//       setDate("");
//       setTime("");
//       setSlots([]);
//     } catch (err) {
//       alert(err.response?.data?.message || "Booking failed");
//     }
//   };

//   return (
//     <div
//       className="max-w-md mx-auto mt-12 p-6 rounded-2xl shadow-xl"
//       style={{ backgroundColor: "var(--bg-light)" }}
//     >
//       <h2
//         className="text-2xl font-bold text-center mb-6"
//         style={{ color: "var(--secondary-color)" }}
//       >
//         Book Appointment
//       </h2>

//       {/* Patient Name */}
//       <input
//         type="text"
//         placeholder="Patient Name"
//         value={patientName}
//         onChange={(e) => setPatientName(e.target.value)}
//         className="w-full p-3 mb-4 rounded-lg border focus:outline-none"
//         style={{
//           borderColor: "var(--accent-color)",
//           backgroundColor: "var(--white)",
//         }}
//       />

//       {/* Phone Number */}
//       <input
//         type="tel"
//         placeholder="Phone Number"
//         value={phoneNo}
//         onChange={(e) => setPhoneNo(e.target.value)}
//         className="w-full p-3 mb-4 rounded-lg border focus:outline-none"
//         style={{
//           borderColor: "var(--accent-color)",
//           backgroundColor: "var(--white)",
//         }}
//       />

//       {/* Date */}
//       <select
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="w-full p-3 mb-4 rounded-lg border focus:outline-none"
//         style={{
//           borderColor: "var(--accent-color)",
//           backgroundColor: "var(--white)",
//         }}
//       >
//         <option value="">Select Date</option>
//         {next15Days.map((d) => (
//           <option key={d} value={d}>
//             {d}
//           </option>
//         ))}
//       </select>
//       <select
//         value={time}
//         onChange={(e) => setTime(e.target.value)}
//         disabled={loading}
//         className="w-full p-3 mb-6 rounded-lg border focus:outline-none"
//       >
//         <option value="">
//           {loading
//             ? "Loading slots..."
//             : slots.length
//             ? "Select Time"
//             : "No slots available"}
//         </option>

//         {slots.map((slot) => (
//           <option key={slot} value={slot}>
//             {slot}
//           </option>
//         ))}
//       </select>

//       {/* Button */}
//       <button
//         onClick={bookAppointment}
//         className="w-full py-3 rounded-lg font-semibold transition-all"
//         style={{
//           backgroundColor: "var(--primary-color)",
//           color: "var(--white)",
//         }}
//         onMouseEnter={(e) =>
//           (e.currentTarget.style.backgroundColor = "var(--hover-color)")
//         }
//         onMouseLeave={(e) =>
//           (e.currentTarget.style.backgroundColor = "var(--primary-color)")
//         }
//       >
//         Book Appointment
//       </button>
//     </div>
//   );
// }

