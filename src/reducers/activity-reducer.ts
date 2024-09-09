import { Activity } from "../types";

export type ActivityActions = {
  type: "save-activity";
  payload: { newActivity: Activity };
};

type ActivityState = {
  activities: Activity[];
};

export const initislState: ActivityState = {
  activities: [],
};

export const activityReducer = (
  state: ActivityState = initislState,
  action: ActivityActions
) => {
  switch (action.type) {
    case "save-activity":
      return {
        ...state,
        activities: [...state.activities, action.payload.newActivity],
      };
    default:
      return state;
  }
};
