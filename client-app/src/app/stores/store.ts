import { createContext, useContext } from "react";
import ActivityStore from "./actvityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
    activityStore: ActivityStore
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){ //hook ktorego potem uzywamy ado dostania sie do stora z mobexa , robimy interface z prop typu ActivityStore (mobX), 
    return useContext(StoreContext); // robiby context create context z parametrem store i zwracamu tutaj hooka
}