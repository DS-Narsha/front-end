import React, {createContext} from "react";

export const TimeCheckContext = createContext({
    use: false,
    setUse: (b:boolean) => {}
});