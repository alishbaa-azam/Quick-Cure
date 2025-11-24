// // import React from "react";
// // import chughtai from "../../images/chughtai.png"
// // import citilab from "../../images/citilab.png"
// // import excel from "../../images/excel.png"
// // import essaLab from "../../images/EssaLab.png"
// // import oneHealth from "../../images/oneHealth.png"
// import { useNavigate } from "react-router-dom";
// import { labs } from "./LabData";

// // const labs = [
// //    {
// //     id: 1,
// //     name: "Chughtai Lab",
// //     branches: "284 Branches Available in 135 Cities",
// //     discount: "20%",
// //     logo: chughtai,
// //   },
// //   {
// //     id: 2,
// //     name: "Excel Labs",
// //     branches: "129 Branches Available in 65 Cities",
// //     discount: "20%",
// //     logo: excel,
// //   },
// //   {
// //     id: 3,
// //     name: "Citilab and Research Centre",
// //     branches: "72 Branches Available in 55 Cities",
// //     discount: "25%",
// //     logo: citilab,
// //   },
// //   {
// //     id: 4,
// //     name: "Dr Essa Laboratory",
// //     branches: "60 Branches Available in 40 Cities",
// //     discount: "15%",
// //     logo: essaLab,
// //   },
// //   {
// //     id: 5,
// //     name: "Citilab",
// //     branches: "90 Branches Available in 50 Cities",
// //     discount: "30%",
// //     logo:citilab ,
// //   },
// //   {
// //     id: 6,
// //     name: "One Health Labs ",
// //     branches: "210 Branches Available in 100 Cities",
// //     discount: "18%",
// //     logo: oneHealth,
// //   },
// // ];

// export default function LabsPage() {
//   // const navigate = useNavigate();
//   return (
//     <div
//       className="min-h-screen py-8 px-6"
//     >
//       <div className="max-w-5xl mx-auto">
//         <h1
//           className="text-2xl font-bold mb-2"
//           style={{ color: "var(--secondary-color)" }}
//         >
//           Best Radiology & Pathology Labs in Pakistan
//         </h1>
//         <div className="space-y-6">
//           {labs.map((lab) => (
//             <div
//               key={lab.id}
//               className="flex flex-col md:flex-row items-center justify-between rounded-xl shadow-md p- border transition-transform duration-200 hover:scale-[1.01]"
//               style={{
//                 backgroundColor: "var(--white)",
//                 borderColor: "var(--accent-color)",
//                 // margin: "5",
//                 alignItems:"center",
//                 padding: "20px"
//               }}
//               onClick={() => navigate(`/labs/${lab.id}`)}
//             >
//               {/* Left section */}
//               <div className="flex items-center space-x-5 w-full md:w-auto">
//                 <img
//                   src={lab.logo}
//                   alt={lab.name}
//                   className="w-24 h-24 object-contain rounded-md"
//                 />
//                 <div>
//                   <h2
//                     className="text-lg font-semibold hover:underline cursor-pointer"
//                     style={{ color: "var(--primary-color)" }}
//                   >
//                     {lab.name}
//                   </h2>
//                   <p
//                     className="text-sm"
//                     style={{ color: "var(--secondary-color)" }}
//                   >
//                     {lab.branches}
//                   </p>
//                 </div>
//               </div>

//               {/* Right section */}
//               <div className="flex flex-col items-center mt-4 md:mt-0 space-y-2">
//                 <span
//                   className="text-xs border border-dashed rounded-full px-3 py-1"
//                   style={{
//                     color: "var(--secondary-color)",
//                     borderColor: "var(--accent-color)",
//                   }}
//                 >
//                   Avail Discount:{" "}
//                   <span style={{ color: "var(--primary-color)" }}>
//                     {lab.discount} OFF
//                   </span>
//                 </span>
//                 <button
//                   className="px-6 py-2 rounded-md font-medium  w-40 transition"
//                   style={{
//                     backgroundColor: "var(--primary-color)",
//                     color: "var(--white)",
//                   }}
//                   onMouseOver={(e) =>
//                     (e.target.style.backgroundColor = "var(--hover-color)")
//                   }
//                   onMouseOut={(e) =>
//                     (e.target.style.backgroundColor = "var(--primary-color)")
//                   }
//                 >
//                   Get Discount
//                 </button>
//                 <button
//                   className="px-6 py-2 rounded-md font-medium border transition"
//                   style={{
//                     borderColor: "var(--primary-color)",
//                     color: "var(--primary-color)",
//                   }}
//                   onMouseOver={(e) => {
//                     e.target.style.backgroundColor = "var(--primary-color)";
//                     e.target.style.color = "var(--white)";
//                   }}
//                   onMouseOut={(e) => {
//                     e.target.style.backgroundColor = "transparent";
//                     e.target.style.color = "var(--primary-color)";
//                   }}
//                 >
//                   View Test Prices
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { labs } from "./LabData";

// export default function LabsPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {labs.map((lab) => (
//         <div
//           key={lab.id}
//           className="border rounded-2xl shadow-md p-4 cursor-pointer hover:shadow-xl"
//           onClick={() => navigate(`/labs/${lab.id}`)}
//         >
//           <img src={lab.logo} alt={lab.name} className="w-24 h-24 mx-auto" />
//           <h2 className="text-xl font-semibold text-center mt-3">{lab.name}</h2>
//           <p className="text-sm text-gray-600 text-center">{lab.branches}</p>
//           <p className="text-green-600 text-center mt-1">{lab.discount} Discount</p>
//         </div>
//       ))}
//     </div>
//   );
// }



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { labs } from "./LabData";
// import "./lab.css";

// export default function LabsPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="labs-container">
//       {labs.map((lab) => (
//         <div
//           key={lab.id}
//           className="lab-card"
//           onClick={() => navigate(`/labs/${lab.id}`)}
//         >
//           <img src={lab.logo} alt={lab.name} className="lab-logo" />
//           <h2 className="lab-name">{lab.name}</h2>
//           <p className="lab-branches">{lab.branches}</p>
//           <p className="lab-discount">{lab.discount} Discount</p>
//         </div>
//       ))}
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";
import { labs } from "./LabData";
import "./lab.css";

export default function LabsPage() {
  const navigate = useNavigate();

  return (
    <div className="labs-wrapper">
      <h1 className="labs-title">Best Radiology & Pathology Labs in Pakistan</h1>
      <p className="labs-subtitle">Home ▸ Labs in Pakistan</p>

      <div className="labs-list">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className="lab-card"
            onClick={() => navigate(`/labs/${lab.id}`)}
          >
            {/* Left: Logo + Info */}
            <div className="lab-info-section">
              <img src={lab.logo} alt={lab.name} className="lab-logo" />
              <div className="lab-details">
                <h2 className="lab-name">{lab.name}</h2>
                <p className="lab-branches">{lab.branches}</p>
              </div>
            </div>

            {/* Right: Discount + Buttons */}
            <div className="lab-actions">
              {/* <span className="lab-discount-tag">
                Avail Discount: <strong>{lab.discount}</strong>
              </span> */}
              {/* <button className="btn btn-green">Get Discount</button> */}
              <button className="btn btn-outline">View Test Prices</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
