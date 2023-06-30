import React, {createContext} from "react";

export const EndTimeContext = createContext({
    endTime: new Date(),
    setEndTime: (time:any) => {}
});