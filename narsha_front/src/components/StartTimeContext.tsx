import React, {createContext} from "react";

export const StartTimeContext = createContext({
    startTime: new Date(),
    setStartTime: (time:any) => {}
});