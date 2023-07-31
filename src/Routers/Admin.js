
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from "../Context/Context";

import Login from "../Admin/Login";
import Dashboard from "../Admin/Dashboard";
// import UpdateHotelDetails from "./pages/updateHotelDetails/UpdateHotelDetail";
import AddReservation from "../Admin/Reservations/AddReservation";
import ViewReservations from "../Admin/Reservations/ViewReservation";
import AddUpdateRoom from '../Admin/RoomManagement/AddUpdateRoom';
import CancelReservations from '../Admin/Reservations/CancelReservation';
import CheckIn from '../Admin/Reservations/CheckInOut/CheckIn';
import CheckOut from '../Admin/Reservations/CheckInOut/Checkout';
import ReCheck from '../Admin/Reservations/CheckInOut/ReCheckIn';

import UpdateRoom from '../Admin/RoomManagement/UpdateRoom';
import UpdateRoomPrice from '../Admin/RoomManagement/RoomPrice';
import RoomCategory from '../Admin/RoomManagement/RoomCategory';

import TaskAssign from '../Admin/HouseKeeping/TaskAssign';
import TaskManager from '../Admin/HouseKeeping/TaskManager';
import TaskStatus from '../Admin/HouseKeeping/TaskStatus';
import RoomStatus from '../Admin/HouseKeeping/RoomStatus';
import RoomShifting from '../Admin/Reservations/RoomShifting';
import PAXCheckout from '../Admin/Reservations/PAXCheckout';
import ReservationBilling from '../Admin/Reservations/ReservationBilling';




export default function AdminRouter() {
  const { user } = useContext(Context);
  return (
    <>
   
      <Routes>
        
        <Route path="/dashboard" element={(user && user.role === 'hoteladmin') ? <Dashboard user={user.ownername} role={user.role}/> : <Login />} />
        {/* <Route path="/updatehotel/:hotelId" element={(user && user.role === 'superadmin') ? <UpdateHotelDetails /> : <Login />} /> */}
        
        <Route path="/addroom" element={(user && user.role === 'hoteladmin') ? <AddUpdateRoom user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/updateroomprice" element={(user && user.role === 'hoteladmin') ? <UpdateRoomPrice user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/roomcategory" element={(user && user.role === 'hoteladmin') ? <RoomCategory user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/updateroom" element={(user && user.role === 'hoteladmin') ? <UpdateRoom user={user.ownername} role={user.role} /> : <Login />} />
   
        <Route path="/viewReservation" element={(user && user.role === 'hoteladmin') ? <ViewReservations user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/cancelReservation" element={(user && user.role === 'hoteladmin') ? <CancelReservations user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/addreservation" element={(user && user.role === 'hoteladmin') ? <AddReservation user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/checkin" element={(user && user.role === 'hoteladmin') ? <CheckIn user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/checkout" element={(user && user.role === 'hoteladmin') ? <CheckOut user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/recheckin" element={(user && user.role === 'hoteladmin') ? <ReCheck user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/roomshifting" element={(user && user.role === 'hoteladmin') ? <RoomShifting user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/reservationbilling" element={(user && user.role === 'hoteladmin') ? <ReservationBilling user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/paxcheckout" element={(user && user.role === 'hoteladmin') ? <PAXCheckout user={user.ownername} role={user.role} /> : <Login />} />

        <Route path="/roomstatus" element={(user && user.role === 'hoteladmin') ? <RoomStatus user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/taskassign" element={(user && user.role === 'hoteladmin') ? <TaskAssign user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/scheduletask" element={(user && user.role === 'hoteladmin') ? <TaskManager user={user.ownername} role={user.role} /> : <Login />} />
        <Route path="/scheduletaskstatus" element={(user && user.role === 'hoteladmin') ? <TaskStatus user={user.ownername} role={user.role} /> : <Login />} />

        <Route path="/login" element={(user && user.role === 'hoteladmin') ? <Dashboard user={user.ownername} role={user.role}/> : <Login />} />
        <Route path="/" element={(user && user.role === 'hoteladmin') ? <Dashboard user={user.ownername} role={user.role}/> : <Login />} />
      </Routes>
    </>
  );
}

