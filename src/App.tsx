import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initislState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initislState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(
    () => state.activities.length,
    [state.activities]
  );
  return (
    <>
      <header className=" bg-lime-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between">
          <h1 className=" text-center text-lg font-bold text-white uppercase">
            Calorie Counter
          </h1>

          <button
            className=" text-sm font-bold text-white bg-gray-900 hover:bg-gray-700 py-2 px-4 rounded-lg uppercase cursor-pointer disabled:opacity-20 disabled:cursor-auto disabled:hover:bg-gray-900"
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Restart App
          </button>
        </div>
      </header>
      <section className=" bg-lime-500 py-20 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>
      <section className=" p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
