import { createContext, useContext } from "react";
import ActivityStore from "./actvityStore";
import CommonStore from "./commonStore";

interface Store {
    activityStore: ActivityStore
    commonStore: CommonStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){ //hook ktorego potem uzywamy ado dostania sie do stora z mobexa , robimy interface z prop typu ActivityStore (mobX), 
    return useContext(StoreContext); // robiby context create context z parametrem store i zwracamu tutaj hooka
}