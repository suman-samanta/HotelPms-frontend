const RoomReducer=(state,action)=>{

    if(action.type==="ROOM_SAVE"){
        let{roomDetails}=action.payload;
        // console.log(
        //     roomDetails[0].roomType
        // )

        let roomInformation;

        roomInformation={
            // id:id+roomDetails[0].roomType+roomDetails[0].ratePlan,
            roomId:roomDetails[0].roomId,
            roomType:roomDetails[0].roomType,
            ratePlan:roomDetails[0].ratePlan,
            roomPrice:roomDetails[0].roomPrice,
            adult:roomDetails[0].adult,
            child:roomDetails[0].child,
            guestName:roomDetails[0].guestName   
        }

        console.log(roomInformation)
        return {
            ...state,
            roomDetailsLocal:[...state.roomDetailsLocal,roomInformation],
        }
    }

    return state;
}

export default RoomReducer;