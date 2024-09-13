import { Activity } from "../types";

export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activityId"; payload: { id: Activity["id"] } }
  | { type: "remove-activity"; payload: { id: Activity["id"] } };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

export const initislState: ActivityState = {
  activities: [],
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initislState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];
    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }
  if (action.type === "set-activityId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }
  if (action.type === "remove-activity") {
    const updatedActivities = state.activities.filter(
      (activity) => activity.id !== action.payload.id
    );
    return {
      ...state,
      activities: updatedActivities,
    };
  }

  return state;
};
