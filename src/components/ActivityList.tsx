import { useMemo } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useActivity } from "../hooks/useActivity";

export default function ActivityList() {
  const { state, dispatch, isEmptyActivities, categoryName } = useActivity();

  const handleDeleteActivity = (id: Activity["id"]) => {
    dispatch({
      type: "remove-activity",
      payload: { id: id },
    });
    toast.success("Activity deleted 🚫");
  };

  return (
    <>
      <h2 className=" text-4xl font-bold text-slate-600 text-center">
        Food and Activities
      </h2>
      {isEmptyActivities ? (
        <p className=" text-lg text-center my-5">No activities...</p>
      ) : (
        state.activities.map((activity) => (
          <div
            key={activity.id}
            className=" px-5 py-10 bg-white mt-5 flex justify-between shadow-xl relative"
          >
            <div className=" space-y-2">
              <p
                className={` absolute top-0 -left-4 px-10 py-2 text-white uppercase font-bold ${
                  activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className=" text-2xl font-bold pt-5">{activity.name}</p>
              <p className=" font-black text-4xl text-lime-500">
                {activity.calories} {""}
                <span>Calorias</span>
              </p>
            </div>
            <div className=" flex gap-2 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "set-activityId",
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className=" h-8 w-8 text-gray-800" />
              </button>
              <button onClick={() => handleDeleteActivity(activity.id)}>
                <TrashIcon className=" h-8 w-8 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
