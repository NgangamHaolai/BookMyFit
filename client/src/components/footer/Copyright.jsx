import { Link } from "react-router-dom";

function Copyright() {
  return (
    <div className="font-medium text-gray-300">
      <p className=" ">
        All Rights Reserved | &copy; <span>{new Date().getFullYear()}</span> BookMyFit
      </p>
      
    </div>
  );
}

export default Copyright;
