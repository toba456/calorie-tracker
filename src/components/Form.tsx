import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";
import { toast, ToastContainer } from "react-toastify";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

export default function Form({ dispatch, state }: FormProps) {
  const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  };
  const [activity, setactivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (a) => a.id === state.activeId
      )[0];
      setactivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;

    const isNumberField = ["category", "calories"].includes(e.target.id);
    setactivity({
      ...activity,
      [id]: isNumberField ? +value : value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    toast.success(`Activity ${!state.activeId ? "created" : "updated"}🔥 `);
    setactivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      action=""
      className=" space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className=" font-bold">
          Category:
        </label>
        <select
          id="category"
          value={activity.category}
          onChange={handleChange}
          className=" border border-slate-300 p-2 rounded-lg w-full bg-white"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className=" font-bold">
          Activity:
        </label>
        <input
          id="name"
          type="text"
          value={activity.name}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ex. Meal, Orange Juice, Salad, Exercise, Weights, Bicycle"
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className=" font-bold">
          Calories:
        </label>
        <input
          id="calories"
          type="number"
          value={activity.calories}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calories. ex. 300 or 500"
        />
      </div>
      <input
        type="submit"
        disabled={!isValidActivity()}
        className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Save Food" : "Save Exercise"}
      />
      <ToastContainer />
    </form>
  );
}
