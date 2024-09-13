import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";

export default function CalorieTracker() {
  const { caloriesConsumed, caloriesBurned, netCalories } = useActivity();

  return (
    <>
      <h2 className=" font-black text-white text-4xl text-center">
        Calories Summary
      </h2>
      <div className=" flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay text="Consumed" calories={caloriesConsumed} />
        <CalorieDisplay text="Exercise" calories={caloriesBurned} />
        <CalorieDisplay text="Difference" calories={netCalories} />
      </div>
    </>
  );
}
