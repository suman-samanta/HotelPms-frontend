import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./RoomReducer";


const RoomContext=createContext();
const initialState={
    roomDetailsLocal:[]
}

const RoomProvider=({children})=>{

    const [state,dispatch]=useReducer(reducer,initialState)

    const roomSave=(roomDetails)=>{
        dispatch({type:"ROOM_SAVE",payload:{roomDetails}})
        // console.log(roomType,ratePlan,roomQuantity,roomPrice)
    }

    useEffect(()=>{
        localStorage.setItem("roominfoDetails",JSON.stringify(state.roomDetailsLocal))
    },[state.roomDetailsLocal])

    return <RoomContext.Provider value={{...state,roomSave}}>{children}</RoomContext.Provider>
}

const useRoomContext=()=>{
    return useContext(RoomContext)
}


export {RoomProvider,useRoomContext};
