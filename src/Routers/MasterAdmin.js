import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from "../Context/Context";

// import CreateAHotelAdmin from "./pages/createAHotelAdmin/CreateAHotelAdmin";
// import CreateASubscription from "./pages/createASubscription/CreateASubscription";
// import HotelLists from "./pages/hotelLists/HotelLists";
import Login from "../SuperAdmin/Login";
import Dashboard from '../SuperAdmin/Dashboard';




export default function MasterAdminRouter() {
    const { superuser } = useContext(Context);
    return (
        <>
            <Routes>
            <Route path="/login"  element={<Login />} />
                {/* <Route path="/login" element={superuser ? <Dashboard /> : <Login />} />
                <Route path="/superadmin/login" element={user ? <CreateAHotelAdmin /> : <Login />} />
                <Route path="/superadmin/addSubscription" element={(user && user.role === 'superadmin') ? <CreateASubscription /> : <Login />} />
                <Route path="/superadmin/hotellist" element={(user && user.role === 'superadmin') ? <HotelLists /> : <Login />} /> */}
                <Route path="/"  element={<Login />} />
            </Routes>

        </>
    );
}

