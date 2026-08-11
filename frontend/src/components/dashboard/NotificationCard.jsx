import { useEffect, useState } from "react";
import { FaBell, FaClock } from "react-icons/fa";
import { getNotifications } from "../../services/notificationService";

function NotificationCard() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await getNotifications();

      if (response.success) {
        setNotifications(response.notifications || []);
      }
    } catch (error) {
      console.error("Notification Error:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <FaBell />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Recent Activity
            </h2>

            <p className="text-sm text-slate-500">
              Latest updates from EduPilot
            </p>
          </div>

        </div>

        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Notifications
        </span>

      </div>

      {/* ==========================================
          NOTIFICATIONS
      ========================================== */}

      {notifications.length === 0 ? (

        <div className="py-10 text-center">

          <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xl">
            <FaBell />
          </div>

          <p className="text-slate-500 mt-4">
            No notifications available.
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {notifications.map((item) => (

            <div
              key={item.id}
              className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-100"
            >

              {/* Notification Icon */}

              <div className="flex-shrink-0">

                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <FaBell className="text-sm" />
                </div>

              </div>

              {/* Notification Content */}

              <div className="flex-1 min-w-0">

                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="text-slate-600 mt-1">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">

                  <FaClock className="text-xs" />

                  <span>
                    {item.time}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default NotificationCard;
