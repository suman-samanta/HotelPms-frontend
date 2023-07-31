import { ToastContainer, toast } from 'react-toastify';
import Header from "../../../Commons/Header";
import Menubar from "../../../Commons/Menubar";
import Footer from "../../../Commons/Footer";
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../../../Context/Context';
import Modal from 'react-responsive-modal';
const baseUrl=require('../../../../Utils/config/default');


const CheckIn = (props) => {
  const {user}=useContext(Context)
  const hoteladminemail=user.email;
    const hotelId=user.hotelId;

    const [guestContact,setGuestContact]=useState();
    const [refNo,setRefNo]=useState();
    const [reservations,setReservations]=useState([]);
  
    const [checkInDate,setCheckInDate]=useState();
    const [checkOutDate,setCheckOutDate]=useState();
    const [customerName,setCustomerName]=useState();
    const[customerContact,setCustomerContact]=useState();
    const[guestEmail,setGuestEmail]=useState();
    const [totalBill,setTotalBill]=useState();
    const[remainingBill,setRemainingBill]=useState();
    const [advancePayment,setAdvancePayment]=useState();
    const [roomInfo,setRoomInfo]=useState([]);
    const [roomType,setRoomType]=useState();
    const [roomId,setRoomId]=useState();
    const [roomNo,setRoomNo]=useState();
    const [givenRoomNo,setGivenRoomNo]=useState([]);
    const [adult,setAdult]=useState();
    const [child,setChild]=useState();
    const [checkInError,setCheckInError]=useState(false);

    const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);


    const[taxInc,setTaxInc]=useState();

    // const [checkInRoom,setCheckInRoom]=useState();
    // const [roomPrice,setRoomPrice]=useState();

    // const items=[]
    // let roomno=0;
    // const [roomAvailable,setRoomAvailable]=useState(true);

    const handleresSearch=async(e)=>{
        e.preventDefault();
       
        
        const newData={
        guestContact:guestContact
        }
        try{
          
          const reservationRes=await axios.post(`${baseUrl}/hoteladmin/getReservation/ByContactNo/${hotelId}`,newData)
          
          setReservations(reservationRes.data);
    
          console.log(reservationRes);
    
        }catch(err){
         console.log(err);
        }
      }


      useEffect(()=>{


        const handleAvalaibleRooms=async()=>{
        
          const newData={
            roomType:roomType
          }
  
          const roomAvailable=await axios.post(`${baseUrl}/hoteladmin/getAvailableRoomsForCheckIn/${hotelId}`,newData);
          setGivenRoomNo(roomAvailable.data);
  
        }

        handleAvalaibleRooms();
      },[roomType]);




      const handleReservationCheckIn=async(refNo)=>{
        const reservationRes=await axios.get(`${baseUrl}/hoteladmin/getReservationByRefNo/${refNo}`);
        
        console.log(reservationRes.data)
        console.log(reservationRes.data.roomInfo);
        setTaxInc(reservationRes.data.taxInc);
        setRefNo(reservationRes.data.refNo);
        setCheckInDate(reservationRes.data.checkInDate);
        setCheckOutDate(reservationRes.data.checkOutDate);
        setCustomerName(reservationRes.data.billingGuestName);
        setCustomerContact(reservationRes.data.guestContact);
        setGuestEmail(reservationRes.data.guestEmail);
        setTotalBill(reservationRes.data.totalPrice);
        setRemainingBill(reservationRes.data.lastPayment);
        setAdvancePayment(reservationRes.data.advancePayment);
        setRoomInfo(reservationRes.data.roomInfo);
      }

      useEffect(()=>{

        // roomInfo.forEach((element)=>{
        //   if(roomAvalaibleForCheckIn(element.roomNo)==true){
        //     element.roomAvailable=true;
        //   }else{
        //     element.roomAvailable=false;
        //   }
        // })

        const roomAvailableset=async()=>{

        for(var i=0;i<roomInfo.length;i++){

          let roomNo=roomInfo[i].roomNo;

          const result=await axios.post(`${baseUrl}/hoteladmin/getHouseKeepingByRoomNo/${hotelId}/${roomNo}`);

          if(result.data==true){
            roomInfo[i].roomAvailable=true;

          }else if(result.data==false){
            roomInfo[i].roomAvailable=false;
          }
          
        }

        
      }

      roomAvailableset();
      },[roomInfo])

      const handleLastPayment=async()=>{
        setRemainingBill(totalBill-advancePayment)
      } 

      const editCheckIn=async(refNo,roomId)=>{

        const result=await axios.get(`${baseUrl}/hoteladmin/getaSingleRoomFromReservation/${refNo}/${roomId}`);
        setRoomId(roomId)
        

        await setRoomType(result.data.roomType);
        setAdult(result.data.adult);
        setChild(result.data.child);
        setRoomNo(result.data.roomNo);
        


        var modal = document.getElementById("myModal");
        var btn = document.getElementById("myBtn");
        var span = document.getElementsByClassName("closemdbtn")[0];
        modal.style.display = "block";
        span.onclick = function() {
          modal.style.display = "none";
        }
        window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
        }

   
      }


      const handleCheckOutDate=async()=>{
        console.log(taxInc);
        console.log(checkInDate);
        console.log(checkOutDate);
      }


      const saveCheckInRoom=()=>{
        // console.log(roomId);
        setRoomInfo(prevRoomInfo=>{

         let objectIndex=prevRoomInfo.findIndex((obj=>obj.roomId==roomId))
          roomInfo[objectIndex].roomNo=roomNo;
          roomInfo[objectIndex].adult=adult;
          roomInfo[objectIndex].child=child;
          roomInfo[objectIndex].roomAvailable=true;
          console.log(roomInfo);


          return roomInfo;
        })
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
      }

      const handleCheckInForm=()=>{
        setOpen(true);
      
      }

      const handlesureCheckIn=async(e)=>{
        e.preventDefault();
        try{
          try{

            for(var i=0;i<roomInfo.length;i++){
              const roomNo=roomInfo[i].roomNo;
              const updatedHouseKeeping={
                roomStatus:"CheckedIn",
                report:"Room Is Not Available for Check In",
                updatedBy:hoteladminemail
              }
              const result=await axios.put(`${baseUrl}/hoteladmin/update/houseKeepingMaster/${hotelId}/${roomNo}`,updatedHouseKeeping)
              .catch(err=>{
                setCheckInError(true);
                toast.error(err.response.data);
              })
            }
            
          }catch(err){
            setCheckInError(true);
            toast.error(err.response.data);
          }
          if(checkInError===false){
          const reservationUpdateRes=await axios.put(`${baseUrl}/hoteladmin/reservationUpdateonCheckIn/${hotelId}/${refNo}`);
          
          for(var i=0;i<roomInfo.length;i++){
          const newData={
            refNo:refNo,
            roomNo:roomInfo[i].roomNo,
            checkIndate:checkInDate,
            checkOutDate:checkOutDate,
            billingGuestName:customerName,
            guestName:roomInfo[i].guestName,
            guestEmail:guestEmail,
            guestContact:customerContact,
            advancePayment:advancePayment,
            fullPayment:totalBill,
            remainingPayment:remainingBill,
            checkInBy:hoteladminemail,
            adult:roomInfo[i].adult,
            child:roomInfo[i].child
          }
          const response=await axios.post(`${baseUrl}/hoteladmin/CheckInAndCheckOutManage/${hotelId}`,newData).catch(err=>{
            setCheckInError(true);
            toast.error(err.response.data);
            console.log(err);
          })
          }
        }
          if(checkInError===false){
            toast.success("Check In SuccessFull")
          }

          setOpen(false);
        }catch(err){
          console.log(err)
        }


      }

    


    return (
        <>
            <Header userName={props.user} role={props.role} />
            <Menubar />
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Check In</h1>
                   

                </div>


                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <ToastContainer />
                            <div className="card">
                                <div className="card-body">
                                    <p>View all the checkin here</p>

                                    <div id="header" className="header d-flex align-items-center">
                                    <div className="search-bar">
                                        <form className="search-form d-flex align-items-center">
                                            <input type="text" name="query" placeholder="Search" title="Enter search keyword" onChange={e=>setGuestContact(e.target.value)} />
                                            <button  title="Search" onClick={handleresSearch}><i className="bi bi-search"></i></button>
                                        </form>
                                    </div>
                                    </div>
        {
            reservations.length>0&& !refNo&&
        

        <table className="table datatable">
                <thead>
                  <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Dates</th>
                    <th scope="col">Guest Name</th>
                    <th scope="col">Ph Number</th>
                    <th scope="col">Select</th>
                  </tr>
                </thead>
                {reservations.map((reservation,index)=>{
                    return (
                    <tr>
                        <td>{reservation.refNo}</td>
                        <td>{reservation.checkInDate} <br/> {reservation.checkOutDate}</td>
                        <td>{reservation.billingGuestName}</td>
                        <td>{reservation.guestContact}</td>
                        <td title='selectBooking' type="button" onClick={()=>handleReservationCheckIn(reservation.refNo)}>&#x221A;</td>
                    </tr>
                )})}
              </table>
        }

                   {
                    refNo&&  <div className='row'>

                               <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h"><b>Reservation Id: </b></label>
                                    <span>{refNo}</span>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                  </div>

                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h"><b>Customer Name: </b></label>
                                    <span>{customerName}</span>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                  </div>

                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Customer Phone No:</label>
                                    <span>{customerContact}</span>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                  </div>

                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Customer Email Id:</label>
                                    <span>{guestEmail}</span>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                  </div>


                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Amount Paid(Advance Payment) :</label>
                                    <input type="number" className="form-control" placeholder="0"
                                    value={advancePayment}
                                      onChange={(e) => setAdvancePayment(e.target.value)} onKeyUp={handleLastPayment} />
                                    {/* <div className="valid-feedback">Looks Good</div> */}
                                  </div>
                                </div>

                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Remaining Bill:</label>
                                    <span>{remainingBill}</span>                                  
                                  </div>
                                  </div>

                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Total Bill:</label>
                                    <span>{totalBill}</span>                                 
                                  </div>
                                  </div>

                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Check In:</label>
                                    <input type="date" className="form-control" placeholder="Check In Date"
                                    value={checkInDate} disabled="true"/>
                                  </div>
                                  </div>


                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Check Out:</label>
                                    <input type="date" className="form-control" placeholder="Check Out Date"
                                    value={checkOutDate}
                                    onChange={e=>setCheckOutDate(e.target.value)}
                                    onBlur={handleCheckOutDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    />
                                  </div>
                                </div>

                                <table className="table datatable">
                                <thead>
                                  <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Room Type</th>
                                       
                                    <th scope="col">Adult</th>
                                    <th scope="col">Child</th>

                                    <th scope="col">Room Price</th>
                                    <th scope="col">Room No</th>  
                                  </tr>
                                </thead>

                                {roomInfo.map((element,id)=>{
                                  return(
                                      <tr>
                                      <td>{element.guestName}</td>
                                      <td>{element.roomType}</td>
                                      <td>{element.adult}</td>
                                      <td>{element.child}</td>
                                      <td>{element.roomPrice}</td>
                                      { (element.roomAvailable==true) ? <td>{element.roomNo}</td> :<td>
                                          <a type='button' onClick={() => editCheckIn(refNo, element.roomId)}>
                                            {element.roomNo}
                                            <div style={{ "color": "red" }} className='valid'>Please Select another Room</div>
                                          </a>
                                        </td>}
                                    </tr>
                                  )
                                })}

                                <br/>
                                <div className="text_center">
                                   <button  className="btn btn-primary w-30 add_another" onClick={handleCheckInForm}>Confirm Check In</button>
                                </div>


                                </table>


                                <div id="myModal" className="modal">
                            <div className="modal-content">
                                <span className="closemdbtn" >&times;</span>
                                <div className="row">
                                      <div className="col-md-3" >
                                      <div className="mb-3">
                                        <label className="form-small-h">Room Type</label>
                                        <input type="text" name="Room Type" className="form-control" disabled value={roomType} />
                                      </div>
                                       </div>

                                       <div className="col-md-3">
                                      <div className="mb-3">
                                        <label className="form-small-h">Room No</label>
                                        <select className="form-control"  onChange={e=>
                                          setRoomNo(e.target.value)} name="roomNo">
                                          <option>select Room</option>
                                          {givenRoomNo.map((element,index)=>{
                                          return <option key={index} type="Number" >
                                              {element.roomNo}
                                          </option>
                                          })}
                                </select>
                                      </div>
                                       </div>

                            <div className="col-md-3">
                            <div className="mb-3">
                                <label className="form-small-h">Adult</label>
                                <input type="number" id="quantityAdult" name="quantityAdult"
                                  required  min="0" max="2" onChange={e=>setAdult(e.target.value)}></input>
                           </div>
                            </div>
                            <div className="col-md-3">
                            <div className="mb-3">
                                <label className="form-small-h">Child</label>
                                <input type="number" id="quantityChild" name="quantityChild" 
                                  required min="0" max="2" onChange={e=>setChild(e.target.value)} ></input>
                            </div>
                            </div>

                            <div className="text_center">
                                   <button className="btn btn-primary w-30 add_another" type="button" onClick={saveCheckInRoom}  >Save Room</button>
                            </div>

                                  </div>
                                </div>    
                            </div>
                             </div>


                   }
            <Modal open={open} onClose={onCloseModal} center classNames={{width:110}}>
                      <h4>Are You Sure?</h4>
                      <button type="submit" className="btn" onClick={handlesureCheckIn}>Yes</button>
                  </Modal>
                                

                            </div>
                        </div>
                    </div>
                    </div>

                </section>

            </main>



            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
            <Footer />


        </>
    )

}


export default CheckIn;