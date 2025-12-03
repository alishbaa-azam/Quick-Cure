// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { labs } from "./LabData";

// export default function LabsPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-6 text-[var(--primary-color)]">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-[var(--primary-color)] mb-2">
//           Best Radiology & Pathology Labs in Pakistan
//         </h1>
//         {/* <p className="text-sm text-[var(--primary-color)]">Home ▸ Labs in Pakistan</p> */}
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
//         {labs.map((lab) => (
//           <div
//             key={lab.id}
//             onClick={() => navigate(`/labs/${lab.id}`)}
//             className="
//               bg-[var(--white)] shadow-md border border-[var(--bg-light)] 
//               rounded-xl p-6 cursor-pointer 
//               hover:shadow-lg hover:-translate-y-1 
//               transition-all duration-300 flex flex-col items-center
//               hover:border-[var(--accent-color)]
//               group 
          
//             "
//           >
//             {/* Logo Container */}
//             <div className="mb-4 p-3  rounded-lg  transition-colors ">
//               <img
//                 src={lab.logo}
//                 alt={lab.name}
//                 className="w-16 h-16 object-contain"
//               />
//             </div>

//             {/* Lab Info */}
//             <div className="text-center mb-4">
//               <h2 className="text-lg font-semibold text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] transition-colors">
//                 {lab.name}
//               </h2>
//               <p className="text-sm text-[var(--accent-color)] mt-1">{lab.branches}</p>
//             </div>

//             {/* Button */}
//             <div className="mt-auto mx-auto">
//               <button
//                 className="
//                   w-40  py-2.5 text-sm font-medium border-2 
//                   border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg 
//                   hover:bg-[var(--primary-color)] hover:text-[var(--white)] 
//                   transition-all duration-300
//                   hover:border-[var(--hover-color)]
//                   hover:shadow-md
//                 "
//               >
//                 View Test Prices
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LabsPage() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/labs")
      .then((res) => setLabs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-[var(--primary-color)]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--primary-color)] mb-2">
          Best Radiology & Pathology Labs in Pakistan
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {labs.map((lab) => (
          <div
            key={lab._id}
            onClick={() => navigate(`/labs/${lab._id}`)}
            className="
              bg-[var(--white)] shadow-md border rounded-xl p-6 cursor-pointer
              hover:shadow-lg hover:-translate-y-1 transition-all duration-300
            "
          >
            <img
              src={`http://localhost:5000/uploads/${lab.logo}`}
              className="w-16 h-16 object-contain mb-4"
              alt={lab.name}
            />

            <h2 className="text-lg font-semibold">{lab.name}</h2>
            <p className="text-sm text-[var(--accent-color)]">{lab.branches}</p>

            <button className="mt-4 w-40 py-2 border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-[var(--primary-color)] hover:text-white transition">
              View Test Prices
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
