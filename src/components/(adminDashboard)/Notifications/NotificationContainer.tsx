"use client";
import { Divider, Pagination } from "antd";
import { useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import moment from "moment";
import { Trash2 } from "lucide-react";

const notificationData = {
  today: [
    {
      message: "Added One More Product",
      description: "It's time to update the product description and images",
      time: new Date().toISOString(),
    },
    {
      message: "Added One More Service Provider",
      description:
        "Please update your business information to continue using the dashboard seamlessly",
      time: new Date().toISOString(),
    },
  ],

  yesterday: [
    {
      message: "Added One More Product",
      description:
        "Please Update your business information to continue using the dashboard seamlessly",
      time: "Mon Apr 07 2025 22:00:00 GMT+0000",
    },
    {
      message: "Account Update Required",
      description:
        "Please Update your business information to continue using dashboard seamlessly",
      time: "Mon Apr 07 2025 22:00:00 GMT+0000",
    },
    {
      message: "Added One More Product",
      description:
        "Please update your information to continue using dashboard seamlessly",
      time: "Mon Apr 07 2025 22:00:00 GMT+0000",
    },
  ],
};

const NotificationContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Calculate start and end index for slicing the doctors data based on the current page and page size
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the data for the current page
  const currentNotifications = notificationData.today.slice(
    startIndex,
    endIndex
  );
  return (
    <div>
      <div className="min-h-[80vh] bg-section-bg p-7">
        <h1 className="text-2xl text-text-color  mb-2">Notification</h1>
        <hr />

        {/* today notification  */}
        <div className="xl:mt-8 mt-6 xl:px-10 px-6 text-text-color">
          <div className="flex gap-x-3 mb-3">
            <h5 className="font-medium text-2xl">Today</h5>
            <div className="size-9 bg-main-color  rounded-full flex justify-center items-center text-lg">
              {notificationData?.today?.length}
            </div>
          </div>
          {/* showing today notification */}
          <div className="space-y-5">
            {notificationData?.today?.map((notification, index) => (
              <div className="flex items-center gap-x-4">
                <div
                  key={index}
                  className="border border-gray-400 rounded-lg p-3 flex-1"
                >
                  <div className="flex justify-between gap-x-2 items-center">
                    <h5 className="font-medium text-xl">
                      {notification?.message}
                    </h5>
                    <p>{moment(notification?.time).fromNow()}</p>
                  </div>
                  <p className="text-gray-500">{notification?.description}</p>
                </div>
                {/* delete option */}
                <div className="bg-[#D30000]/30 size-10 flex justify-center items-center rounded-full cursor-pointer">
                  <Trash2 color="#D30000"></Trash2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* yesterday notification  */}
        <div className="xl:mt-8 mt-6 xl:px-10 px-6 text-text-color">
          <div className="flex gap-x-3 mb-3">
            <h5 className="font-medium text-2xl">Yesterday</h5>
            <div className="size-9 bg-main-color  rounded-full flex justify-center items-center text-lg">
              {notificationData?.yesterday?.length}
            </div>
          </div>
          {/* showing today notification */}
          <div className="space-y-5">
            {notificationData?.yesterday?.map((notification, index) => (
              <div className="flex items-center gap-x-4">
                <div
                  key={index}
                  className="border border-gray-400 rounded-lg p-3 flex-1"
                >
                  <div className="flex justify-between gap-x-2 items-center">
                    <h5 className="font-medium text-xl">
                      {notification?.message}
                    </h5>
                    <p>{moment(notification?.time).fromNow()}</p>
                  </div>
                  <p className="text-gray-400">{notification?.description}</p>
                </div>
                {/* delete option */}
                <div className="bg-[#D30000]/30 size-10 flex justify-center items-center rounded-full cursor-pointer">
                  <Trash2 color="#D30000"></Trash2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="mt-5 grid grid-cols-1 gap-8">
          {currentNotifications.map((notification, inx) => (
            <div key={inx} className="flex gap-4 items-center">
              <div className="bg-[#FFFFFF] p-2 rounded">
                <MdOutlineNotificationsNone
                  size={28}
                  color="var(--color-main)"
                />
              </div>
              <div className=" text-text-color">
                <h4 className="text-lg font-medium ">
                  {notification.message} from {notification?.name}
                </h4>
                <p>{notification.time}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
      {/* pagination */}
      {/* <div className="w-max mt-3 ml-auto">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={notificationData.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false} // Disable page size changer if unnecessary
        />
      </div> */}
    </div>
  );
};

export default NotificationContainer;
