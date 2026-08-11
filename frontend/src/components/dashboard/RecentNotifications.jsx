import {
  FaBell,
  FaUserPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";


function RecentNotifications({ notifications }) {


  const getIcon = (title) => {

    if (title?.includes("Added")) {
      return <FaUserPlus className="text-green-600" />;
    }

    if (title?.includes("Updated")) {
      return <FaEdit className="text-yellow-600" />;
    }

    if (title?.includes("Deleted")) {
      return <FaTrash className="text-red-600" />;
    }

    return <FaBell className="text-emerald-600" />;

  };


  return (

    <div className="bg-white rounded-xl shadow-lg p-6">


      <h2 className="text-xl font-bold mb-5 flex items-center gap-2">

        <FaBell className="text-emerald-600" />

        Recent Notifications

      </h2>



      {
        !notifications || notifications.length === 0 ? (

          <p className="text-gray-500">
            No new notifications
          </p>

        ) : (


          <div className="space-y-4">


            {notifications.slice(0,5).map((notification)=>(


              <div

                key={notification.id}

                className="flex items-start gap-4 border-b pb-4"

              >


                <div className="text-2xl">

                  {getIcon(notification.title)}

                </div>



                <div>

                  <h3 className="font-semibold">

                    {notification.title}

                  </h3>


                  <p className="text-gray-600 text-sm">

                    {notification.description}

                  </p>


                  <p className="text-gray-400 text-xs mt-1">

                    {notification.created_at}

                  </p>


                </div>


              </div>


            ))}


          </div>


        )
      }


    </div>

  );

}


export default RecentNotifications;
