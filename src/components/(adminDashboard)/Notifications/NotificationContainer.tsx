"use client";
import moment from "moment";
import { Trash2 } from "lucide-react";
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useMarkedRedMutation,
} from "@/redux/api/notificationApi";
import { cn } from "@/lib/utils";
import { message, Popconfirm } from "antd";
import { useEffect, useRef, useState } from "react";

const NotificationContainer = () => {
  const { data: allNotificationsData, isLoading: loading } = useGetNotificationsQuery({});
  const [deleteNotification] = useDeleteNotificationMutation();
  const [markAllAsRead] = useMarkedRedMutation();
  const [limit, setLimit] = useState(10);
   const loaderRef = useRef<HTMLDivElement | null>(null);

  const confirmBlock = async (id: string) => {
    try {
      await deleteNotification(id).unwrap();
      message.success("Successfully deleted the notification.");
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  useEffect(() => {
    const markAllNotificationsAsRead = async () => {
      try {
        await markAllAsRead({}).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    markAllNotificationsAsRead();
  }, []);



  //   useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const target = entries[0];
  //       if (target.isIntersecting && !loading) {
  //         setLimit((prev) => prev + 10);
  //       }
  //     },
  //     { rootMargin: "200px" } // trigger before reaching exact bottom
  //   );

  //   if (loaderRef.current) {
  //     observer.observe(loaderRef.current);
  //   }

  //   return () => {
  //     if (loaderRef.current) observer.unobserve(loaderRef.current);
  //   };
  // }, [loading]);

  return (
    <div>
      <div className="min-h-[80vh] bg-section-bg p-7">
        <h1 className="text-2xl text-text-color  mb-2">Notification</h1>
        <hr />

        {/* yesterday notification  */}
        <div className="xl:mt-8 mt-6 xl:px-10 px-6 text-text-color">
          {/* showing today notification */}
          <div className="space-y-5">
            {allNotificationsData?.data?.map(
              (notification: any, index: number) => (
                <div className="flex items-center gap-x-4">
                  <div
                    key={index}
                    className="border border-gray-400 rounded-lg p-3 flex-1"
                  >
                    <div className="flex justify-between gap-x-2 items-center">
                      <h5
                        className={cn(
                          "text-xl",
                          !notification?.isRead && "font-medium"
                        )}
                      >
                        {notification?.title}
                      </h5>
                      <p>{moment(notification?.createdAt).fromNow()}</p>
                    </div>
                    <p className="text-gray-400">{notification?.message}</p>
                  </div>
                  {/* delete option */}

                  <Popconfirm
                    title="Are you sure?"
                    description="You want delete this?"
                    onConfirm={() => confirmBlock(notification?._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <div className="">
                      <div className="size-8 flex justify-center items-center bg-red-500 rounded-full cursor-pointer">
                        <Trash2 size={20} className="text-white" />
                      </div>
                    </div>
                  </Popconfirm>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationContainer;
