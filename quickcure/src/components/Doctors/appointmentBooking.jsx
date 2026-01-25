import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookAppointment({ doctorId }) {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [loading, setLoading] = useState(false);

  const [appointmentSummary, setAppointmentSummary] = useState(null);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    message: "",
  });

  /* ------------------ Popup Helpers ------------------ */
  const showErrorPopup = (message) => {
    setPopup({ open: true, type: "error", message });
  };

  const showSuccessPopup = (message) => {
    setPopup({ open: true, type: "success", message });
  };

  /* ------------------ Fetch Doctor ------------------ */
  useEffect(() => {
    if (!doctorId) return;

    axios
      .get(`http://localhost:5000/api/doctors/${doctorId}`)
      .then((res) => setDoctor(res.data))
      .catch(() => showErrorPopup("Failed to load doctor information"));
  }, [doctorId]);

  /* ------------------ Fetch Slots ------------------ */
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

  /* ------------------ Date Change ------------------ */
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setSelectedSlot("");

    if (!selectedDate) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(selectedDate) < today) {
      showErrorPopup("Cannot book past dates");
      return;
    }

    fetchAvailableSlots(selectedDate);
  };

  /* ------------------ Phone Validation ------------------ */

  const validatePhoneNumber = (phone) => {
    return /^03\d{9}$/.test(phone); // exactly 11 digits starting with 03
  };

  /* ------------------ Submit ------------------ */
  const handleSubmit = async () => {
    if (!patientName.trim()) return showErrorPopup("Enter patient name");

    if (!validatePhoneNumber(phoneNo))
      return showErrorPopup("Enter valid Pakistani phone number");

    if (!date || !selectedSlot) return showErrorPopup("Complete all fields");

    const [startTime, endTime] = selectedSlot.split(" - ");

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          doctorId,
          patientName,
          phoneNo: phoneNo.replace(/[\s\-\(\)]/g, ""),
          date,
          startTime,
          endTime,
        },
      );

      if (res.data.success) {
        setAppointmentSummary({
          doctor: doctor?.name,
          speciality: doctor?.speciality,
          patientName,
          phoneNo,
          date,
          slot: selectedSlot,
        });

        showSuccessPopup("Appointment booked successfully!");
      } else {
        showErrorPopup("Booking failed");
      }
    } catch (err) {
      showErrorPopup(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ UI ------------------ */
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
              </div>
            )}

            <input
              className="w-full p-3 rounded border"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />

            <input
              className="w-full p-3 rounded border"
              placeholder="03XXXXXXXXX"
              value={phoneNo}
              maxLength={11}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // only digits
                if (value.length <= 11) {
                  setPhoneNo(value);
                }
              }}
            />

            <input
              type="date"
              className="w-full p-3 rounded border"
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
                    className="px-4 py-2 rounded-full border"
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
              className="w-full py-3 rounded text-white"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {popup.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="w-96 p-6 rounded-2xl shadow-2xl"
            style={{ backgroundColor: "var(--white)" }}
          >
            <h3
              className="text-xl font-bold mb-3 text-center"
              style={{
                color:
                  popup.type === "success" ? "var(--primary-color)" : "#c0392b",
              }}
            >
              {popup.type === "success" ? "Appointment Confirmed" : "Error"}
            </h3>

            <p className="text-sm text-center mb-4">{popup.message}</p>

            {popup.type === "success" && appointmentSummary && (
              <div
                className="text-sm space-y-1 p-4 rounded-lg mb-4"
                style={{ backgroundColor: "var(--bg-light)" }}
              >
                <p>
                  <b>Doctor:</b> {appointmentSummary.doctor}
                </p>
                <p>
                  <b>Speciality:</b> {appointmentSummary.speciality}
                </p>
                <p>
                  <b>Patient:</b> {appointmentSummary.patientName}
                </p>
                <p>
                  <b>Phone:</b> {appointmentSummary.phoneNo}
                </p>
                <p>
                  <b>Date:</b> {appointmentSummary.date}
                </p>
                <p>
                  <b>Time:</b> {appointmentSummary.slot}
                </p>
              </div>
            )}

            {popup.type === "success" ? (
              // <div className="flex gap-3">
              //   <button
              //     onClick={() => navigate("/")}
              //     className="flex-1 py-2 rounded text-white"
              //     style={{ backgroundColor: "var(--primary-color)" }}
              //   >
              //     Back to Home
              //   </button>

              //   <button
              //     onClick={() => window.print()}
              //     className="flex-1 py-2 rounded border"
              //     style={{
              //       borderColor: "var(--primary-color)",
              //       color: "var(--primary-color)",
              //     }}
              //   >
              //     Save
              //   </button>
              // </div>
              <button
                onClick={() => navigate("/")}
                className="w-full py-2 rounded text-white"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                Back to Home
              </button>
            ) : (
              <button
                onClick={() => setPopup({ open: false, type: "", message: "" })}
                className="w-full py-2 rounded text-white"
                style={{ backgroundColor: "#c0392b" }}
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
