import { useState,useEffect, useContext } from "react";
import Header from "../../Commons/Header";
import Menubar from "../../Commons/Menubar";
import Footer from "../../Commons/Footer";
// import Modal from "../../Commons/Modal";

import {Modal} from 'react-responsive-modal';

import moment from 'moment';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Context } from "../../../Context/Context";

const baseUrl=require('../../../Utils/config/default')


 const  RoomShifting=(props)=>{

    const {user}=useContext(Context);
    const hotelId=user.hotelId;
    
    const [modalShow, setModalShow] = useState(false);
    const [searchInput,setSearchInput]=useState();
    const [searchguestContact,setSearchGuestContact]=useState();
    const [checkedInres,setCheckedInres]=useState();
    const [totalRooms,setTotalRooms]=useState();
    const [billingGuestName,setBillingGuestName]=useState();
    const [guestContact,setGuestContact]=useState();
    const [guestEmail,setGuestEmail]=useState();
    const [checkInDate,setCheckInDate]=useState();
    const [checkOutDate,setCheckOutDate]=useState();
    const [advancePayment,setAdvancePayment]=useState();
    const [remainingPayment,setRemainingPayment]=useState();
    const [fullPayment,setFullPayment]=useState();
    const [checkInData,setCheckInData]=useState([]);
    const [checkInId,setCheckInId]=useState();
    const [roomToShift,setRoomToShift]=useState();
    const [availableRooms,setAvailableRooms]=useState([]);
    const [updatedRoom,setUpdatedRoom]=useState();

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    useEffect(()=>{

      const getAllRoomAvailable=async()=>{
        const result=await axios.get(`http://localhost:5000/server/hoteladmin/getAllAvaiableRooms/${hotelId}`)
        setAvailableRooms(result.data);
        console.log(availableRooms);
      }

      getAllRoomAvailable();
    },[checkInId])
     

      const handleGuestSearchRes=async(e)=>{
        e.preventDefault();
        try{
            const newData={
                searchInput:searchInput
            }
            const result=await axios.post(`${baseUrl}/hoteladmin/getCheckInBySearching/${hotelId}`,newData)
            .catch(err=>{
                toast.error(err.response.data);
            })

            console.log(result);

            setCheckInData(result.data)
        }catch(err){
            console.log(err);
            
        }
        
      }    


      const handleRoomShiftPopUp=(e,checkInId,roomNo)=>{
        e.preventDefault();
        setCheckInId(checkInId);
        setRoomToShift(roomNo);
        
        setOpen(true);
        onOpenModal();
        console.log(roomNo)
      }

      const handleSureRoomShift=async(e)=>{
        e.preventDefault();
        try{

          const newData={
            roomNo:updatedRoom,
            updatedBy:user.email
          }
          const res=await axios.put(`http://localhost:5000/server/hoteladmin/roomShiftingafterCheckIn/${hotelId}/${checkInId}`,newData)
          .then(
            toast.success("Room Has Been shifted")
          )
        }catch(err){

        }
      }
      

    return (
      <>
        <Header userName={props.user} role={props.role} />
        <Menubar />

        <main id="main" className="main">
          <ToastContainer />
          <div className="pagetitle">
            <h1>Shift Rooms</h1>
            {/* <nav>
                         <ol className="breadcrumb">
                             <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                             <li className="breadcrumb-item active"></li>
                         </ol>
                     </nav> */}
          </div>

          <section className="section">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Reservations/Bookings</h5>
                    <p>View all the bookings here</p>
                    <div className="text_center"></div>
                    <br />

                    <div
                      id="header"
                      className="header d-flex align-items-center"
                    >
                      <div className="search-bar">
                        <form className="search-form d-flex align-items-center">
                          <input
                            type="text"
                            name="query"
                            placeholder="Search Guest Contact"
                            title="Enter Guest Name or Contact No."
                            onChange={(e) => setSearchInput(e.target.value)}
                          />
                          <button title="Search">
                            <i
                              className="bi bi-search"
                              onClick={(e) => handleGuestSearchRes(e)}
                            ></i>
                          </button>
                        </form>
                      </div>
                    </div>

                    {checkInData.length > 0 && (
                      <div className="row">
                        <table className="table datatable">
                          <thead>
                            <tr>
                              <th scope="col">#ID</th>
                              <th scope="col">Guest Name</th>
                              <th scope="col">Room No</th>

                              <th scope="col">Guest Contact</th>
                              <th scope="col">Room Guest Name</th>
                              <th scope="col">Adult</th>
                              <th scope="col">Child</th>
                              <th scope="col">Check In Date</th>
                              <th scope="col">Check Out Date</th>
                              <th scope="col">Shift Room</th>
                            </tr>

                            {/* <td> <a className="icon" href="#" data-bs-toggle="dropdown"><a href="" title="Edit Booking">&#9998;</a></a> */}
                          </thead>

                          {checkInData.map((element, idx) => {
                            return (
                              <tr>
                                <td>{element.refNo}</td>
                                <td>{element.billingGuestName}</td>
                                <td>{element.roomNo}</td>
                                <td>{element.guestContact}</td>
                                <td>{element.guestName}</td>
                                <td>{element.adult}</td>
                                <td>{element.child}</td>
                                <td>{element.checkIndate}</td>
                                <td>{element.checkOutDate}</td>
                                <td>
                                
                                  <a className="icon" href="#">
                                    <a
                                      href=""
                                      title="Room Shift"
                                     onClick={(e)=>handleRoomShiftPopUp(e,element._id,element.roomNo)}
                                    >
                                      &#9998;
                                    </a>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </table>

                        <Modal open={open} onClose={onCloseModal} center classNames={{ width:110}}>
                        <div className="card mb-6 ">
      <div className="card mb-4">
                    <h5 className="card-header">Shift Room</h5>
                    <div className="card-body">
                      <div>
                      <label for="username"><b>Current Room No</b></label>
                      <input type="text" className="form-control" placeholder="Guest Name" value={roomToShift} name="guestname"  disabled />                        
                      </div>
                      <div>
                      <label for="email"><b>Room Category</b></label>
                      {/* <input type="email" className="form-control" placeholder="Guest Email" name="email" value={roomType}  onChange={e=>setRoomType(e.target.value)} required /> */}
                      <select className="form-control" required onChange={e=>setUpdatedRoom(e.target.value)}>

                      <option>Select</option>
                      {availableRooms.filter(element=>element.roomNo!=roomToShift).map((elm)=>{
                        return (
                          <option>{elm.roomNo}</option>
                        )
                      })}
                        
                      </select>
                      </div>
                      </div>
                      <button type="submit" className="btn btn-primary" onClick={handleSureRoomShift} >Update</button>
                    </div>
                    </div>
                                            </Modal>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <a
          href="#"
          className="back-to-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>
        <Footer />
      </>
    );
}

export default RoomShifting;