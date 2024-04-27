import React from "react";

const GeometricBackground = () => {
    // return (
    //     <div className="absolute inset-0 overflow-hidden">
    //         <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-yellow-200 transform rotate-45 scale-150"></div>
    //         <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-gray-200 transform rotate-45 scale-150"></div>
    //     </div>
    // );
    return (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-yellow-100/50 transform rotate-45 scale-150"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50 transform rotate-45 scale-150"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 transform rotate-45 scale-150"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/50 transform rotate-45 scale-150"></div>
        </div>
      );
};

export default GeometricBackground;
