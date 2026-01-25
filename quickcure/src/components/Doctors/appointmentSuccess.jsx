import { useLocation, useNavigate } from "react-router-dom";

export default function AppointmentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return navigate("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div
        id="appointment-popup"
        className="w-full max-w-md p-6 rounded-2xl shadow-xl"
      >
        <h2
          className="text-xl font-bold mb-4 text-center"
          style={{ color: "var(--primary-color)" }}
        >
          Appointment Receipt
        </h2>

        <div className="text-sm space-y-2 mb-6">
          <p><b>Doctor:</b> {state.doctor}</p>
          <p><b>Patient:</b> {state.patientName}</p>
          <p><b>Phone:</b> {state.phoneNo}</p>
          <p><b>Date:</b> {state.date}</p>
          <p><b>Time:</b> {state.time}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2 rounded border"
            style={{
              borderColor: "var(--primary-color)",
              color: "var(--primary-color)",
            }}
          >
            Save
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 py-2 rounded text-white"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
