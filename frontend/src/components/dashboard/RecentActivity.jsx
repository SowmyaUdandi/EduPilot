import {
  FaUserPlus,
  FaBrain,
  FaEdit,
  FaTrash,
  FaClock,
} from "react-icons/fa";


function RecentActivity({ history }) {

  const getIcon = (activity) => {

    if (activity.action === "Student Added") {
      return <FaUserPlus className="text-green-600" />;
    }

    if (activity.action === "Prediction Completed") {
      return <FaBrain className="text-emerald-600" />;
    }

    if (activity.action === "Student Updated") {
      return <FaEdit className="text-yellow-600" />;
    }

    if (activity.action === "Student Deleted") {
      return <FaTrash className="text-red-600" />;
    }

    return <FaClock className="text-gray-600" />;
  };


  return (

    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-6">
        📅 Recent Activity
      </h2>


      {history && history.length > 0 ? (

        <div className="space-y-5">


          {history.slice(0,5).map((item,index)=>(

            <div
              key={index}
              className="flex items-center gap-4 border-b pb-4"
            >

              {/* Icon */}

              <div className="bg-gray-100 p-3 rounded-full text-xl">

                {getIcon(item)}

              </div>


              {/* Details */}

              <div className="flex-1">

                <h3 className="font-semibold">
                  {item.action || "Prediction Completed"}
                </h3>


                <p className="text-gray-600 text-sm">
                  {item.student_name || "Student"}
                </p>


                <p className="text-gray-400 text-xs mt-1">
                  {item.created_at || "Recently"}
                </p>


              </div>


            </div>

          ))}


        </div>


      ) : (


        <p className="text-gray-500">
          No recent activity available.
        </p>


      )}


    </div>

  );
}


export default RecentActivity;

