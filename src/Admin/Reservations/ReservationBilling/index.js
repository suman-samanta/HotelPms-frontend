import { useState,useEffect, useContext } from "react";
import Header from "../../Commons/Header";
import Menubar from "../../Commons/Menubar";
import Footer from "../../Commons/Footer";
import Modal from "../../Commons/Modal";

import moment from 'moment';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Context } from "../../../Context/Context";

const baseUrl=require('../../../Utils/config/default');


 const  ReservationBilling=(props)=>{
    const {user}=useContext(Context);
    const hotelId=user.hotelId;

    const [modalShow, setModalShow] = useState(false);
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

    



       const downloadRoomStatus=async()=>{
        try{
          const roomStatusDownload=await axios.post(`${baseUrl}/hoteladmin/roomStatusPdf/${hotelId}`)
          .then(toast.success("Room Status Downloaded to Your DeskTop"));

          console.log(roomStatusDownload);

        }catch(err){
          toast.error(err.data);
        }
      }

      const handleGuestSearchRes=async(e)=>{
        e.preventDefault();
        try{
          const newData={
            guestContact:searchguestContact
          }
          const result=await axios.post(`${baseUrl}/hoteladmin/GetActiveCheckInByMobileNo/${hotelId}`,newData);
          console.log(result.data.rooms.length);
          if(result.data.refNo){
            setCheckedInres(result.data);
            setTotalRooms(result.data.rooms);
            setBillingGuestName(result.data.billingGuestName);
            setGuestContact(result.data.guestContact);
            setGuestEmail(result.data.guestEmail);
            setCheckInDate(result.data.checkIndate);
            setCheckOutDate(result.data.checkOutDate);
            setAdvancePayment(result.data.advancePayment);
            setRemainingPayment(result.data.remainingPayment);
            setFullPayment(result.data.fullPayment);
          }
        }catch(err){
          console.log(err);
        }
      }

      const arr = []; 

      
        if(checkedInres){
      {(()=>{
       
        for(let i=0;i<totalRooms.length;i++){
          arr.push(
            <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Room No {i+1} : </label>
                                    <span>{totalRooms[i]}</span>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
              </div>
          )
        }

        return arr;

        })()}

      }
    
      

    return(
        <>
        
        <Header userName={props.user} role={props.role} />
             <Menubar />
 
             <main id="main" className="main">
             <ToastContainer/>
                 <div className="pagetitle">
                     <h1>View Reservation</h1>
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
               <h5 className="card-title">Reservations Billing</h5>
               <p>Search for a customer here</p>



    <div id="header" className="header d-flex align-items-center">
                                    <div className="search-bar">
                                        <form className="search-form d-flex align-items-center">
                                            <input type="text" name="query" placeholder="Search Guest Contact" title="Enter Guest Contact No." onChange={e=>setSearchGuestContact(e.target.value)} />
                                            <button  title="Search" ><i className="bi bi-search" onClick={(e)=>handleGuestSearchRes(e)}></i></button>
                                        </form>
                                    </div>
                                    </div> 


              {
                checkedInres&&
                <div className='row'>

                             

                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Customer Name:</label>
                                    <span>{billingGuestName}</span>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                  </div>

                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Customer Phone No:</label>
                                    <span>{guestContact}</span>
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
                                      onChange={(e) => setAdvancePayment(e.target.value)}  />
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                </div>

                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Remaining Bill:</label>
                                    <span>{remainingPayment}</span>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                  </div>

                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Total Bill:</label>
                                    <span>{fullPayment}</span>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                  </div>

                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Check In:</label>
                                    <input type="date" className="form-control" placeholder="Check In Date"
                                    value={checkInDate} disabled="true"/>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                  </div>


                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Check Out:</label>
                                    <input type="date" className="form-control" placeholder="Check Out Date"
                                    value={checkOutDate}
                                    onChange={e=>setCheckOutDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    />
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                </div>

                                {arr}
                                </div>
              }                      
          

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

export default ReservationBilling;