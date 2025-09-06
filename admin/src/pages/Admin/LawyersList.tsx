import { useEffect } from "react";

import {
  MapPin,
  ChevronRight
} from 'lucide-react'

import { useAdminStore } from "../../store/adminStore";


const LawyersList = () => {


  const { lawyers, adminToken, getAllLawyers } = useAdminStore();

  useEffect(() => {
    if (adminToken) {
      getAllLawyers();
    }

  }, [adminToken])
  return (
    <div>

      <h1>HEHE</h1>
      <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6 px-4">
        {lawyers.slice(0, 10).map((item, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/20 rounded-2xl overflow-hidden cursor-pointer hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
          >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                src={item.image}
                alt={item.name}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Status Badge */}
              <div className={`absolute top-3 right-3 flex items-center gap-1.5 backdrop-blur-sm border rounded-full px-2.5 py-1
                  ${item.available 
                  ? "bg-green-500/20 border-green-500/30" 
                  : "bg-red-500/20 border-red-500/30"}`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${item.available ? "bg-green-400" : "bg-red-400"}`}></span>
                <span className={`text-xs font-medium ${item.available ? "text-green-400" : "text-red-400"}`}>{item.available ? "Available" : "Not Available"}</span>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-5 space-y-3">
              <div>
                <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-blue-400 text-sm font-medium">
                  {item.speciality}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.address.line1}</span>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="flex items-center justify-between">
                <div className="bg-zinc-700/50 rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-gray-300">
                    {item.experience}yrs+ exp
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>






















  );
};

export default LawyersList;