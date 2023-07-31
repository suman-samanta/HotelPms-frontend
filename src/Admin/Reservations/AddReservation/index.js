import Header from "../../Commons/Header";
import Menubar from "../../Commons/Menubar";
import Footer from "../../Commons/Footer";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Context } from "../../../Context/Context";
import { useRoomContext } from "../../../Context/RoomContext";
import Modal from "../../Commons/Modal";
import "../AddReservation/styles.css";
// import './styles.css';

const baseUrl=require('../../../Utils/config/default')


export default function AddReservation(props) {

  const {user}=useContext(Context)
  const[bookingSource,setBookingSource]=useState();
  const [bookingAgent,setBookingAgent]=useState([]);
  const [bookingAgentName,setBookingAgentName]=useState();
  const [bookingType,setBookingType]=useState();
  const [checkInDate,setCheckInDate]=useState();
  const checkOutDateref=useRef();
  const [checkOutDate,setCheckOutDate]=useState();
  const [nights,setNights]=useState();
  const [isBookingSourceSelected,setIsBookingSourceSelected]=useState(false);
  const hotelId=user.hotelId;

  const[allRoomType,setAllRoomType]=useState([]);
  const roomTyperef=useRef();
  // const[givenRatePlan,setGivenRatePlan]=useState([]);
  const [givenRoomNo,setGivenRoomNo]=useState([])

  const ratePlanref=useRef();
  const[roomNo,setRoomNo]=useState();
  // const [roomQuantity,setRoomQuantity]=useState();
  const[roomPrice,setRoomPrice]=useState(0);
  const [roomId,setRoomId]=useState(1);
  const [roomResErr,setRoomResErr]=useState(false);
  

    const [formValues, setFormValues] = useState([]);
    const [toggle, setToggle] = useState(false);
   
    const[roomCharges,setRoomCharges]=useState(0);
    const[tax,setTax]=useState(0);
    const [taxInc,setTaxInc]=useState(false);
  const [maxRoomAvailable,setMaxRoomAvailable]=useState();
  const [adult,setAdult]=useState(0);
  const[child,setChild]=useState(0);
  const [roomValueAddCount,setRoomValueAddCount]=useState(0);


  

  const [guest,setGuest]=useState();
  const [previousGuest,setPreviousGuest]=useState('');
  const [prevGuestSearchRes,setPrevGuestSearchRes]=useState([])

  const[guestContact,setGuestContact]=useState();
  const[guestEmail,setGuestEmail]=useState();
  const[guestName,setGuestName]=useState();
  const [billingGuestName,setBillingGuestName]=useState();
  const[billingUser,setBillingUser]=useState();
  const[paymentMode,setPaymentMode]=useState();
  const[advancePayment,setAdvancePayment]=useState();
  const [totalPayment,setTotalPayment]=useState();
  const [lastPayment,setLastPayment]=useState();
  const [tableToggle,setTableToggle]=useState(false);
  const [addAnotherToggle,setAddAnotherToggle]=useState(false);
  
 
 const [guestError,setGuestError]=useState(false);

  let totalprice=0;
  let totalRateCharges=0;
 


  const [submitType,setSubmitType]=useState("")

  useEffect(()=>{
    const FindRoomTypeOptions=async()=>{
      const result= await axios.get(`${baseUrl}/hoteladmin/getRoomType/${hotelId}`);
      setAllRoomType(result.data);
      
    }  
    FindRoomTypeOptions()
   },[])


   useEffect(()=>{
    const fetchPreviousGuest=async()=>{
      try{

        if(previousGuest.length>1){
        const res=await axios.get(`${baseUrl}/hoteladmin/getPreviousGuest/${previousGuest}/${hotelId}`)

        setPrevGuestSearchRes(res.data);
      }
      }catch(err){
        toast.error(err.response.data);
      }

    }

    fetchPreviousGuest();

   },[previousGuest])


   useEffect(()=>{
    const fetchPreviousGuestByContact=async()=>{

      let guestContactValue=String(guestContact);
      try{
        if(guest!=="returnGuest"){

        if(guestContactValue.length>9){
        const res=await axios.get(`${baseUrl}/hoteladmin/getPreviousGuestByContact/${guestContact}`);
        toast.error(res.data);
      }
    }    
      }catch(err){
        toast.error(err.response.data);
      }
    }
    fetchPreviousGuestByContact();
   },[guestContact])


   useEffect(()=>{

    const roomValueCountManage=async()=>{
      // if(roomValueAddCount>0 &&roomValueAddCount==roomQuantity){
      //   var modal = document.getElementById("myModal");
      //   modal.style.display = "none";
      //   setToggle(false)
        // setRoomQuantity(0);
        setRoomValueAddCount(0);

        if(taxInc){
          for(var i=0;i<formValues.length;i++){
            totalprice+=Number(formValues[i].roomPrice*nights )
          }
          
          if(totalprice>1&&totalprice<7500){
            totalRateCharges=totalprice*100/112
          }else if(totalprice>7500){
            totalRateCharges=totalprice*100/118
          }
  
        }else{
          for(var i=0;i<formValues.length;i++){
            totalRateCharges+=Number(formValues[i].roomPrice *nights)
          }
          
          if(totalRateCharges>1&&totalRateCharges<7500){
            totalprice=totalRateCharges*112/100
          }else if(totalRateCharges>7500){
            totalprice=totalRateCharges*118/100
          }
        }
        totalRateCharges=Math.round((totalRateCharges + Number.EPSILON) * 100) / 100;
        let tax=Math.round(((totalprice-totalRateCharges) + Number.EPSILON) * 100) / 100
        setRoomCharges(totalRateCharges);
        setTotalPayment(totalprice);
        setTax(tax);
        if(formValues.length>0){
          await setTableToggle(true)
         }
      
    }

    roomValueCountManage();
   },[roomValueAddCount])

  const handleSubmit=async(e)=>{
      e.preventDefault();

      try{

        if(guest==="newGuest"){

        const newGuest={
          hotelId:hotelId,
          guestName:billingGuestName,
          guestEmail:guestEmail,
          guestContact:guestContact
        }

    
       await axios.post(`${baseUrl}/hoteladmin/createNewGuest`,newGuest)
        .then(
          console.log("user added"),
       
        )
        .catch(err=>{

          setGuestError(true);
          toast.error(err.response.data);
          
        })

      }

    
      if(guestError===false){

      let formData = new FormData()
      formData.append('hotelId',hotelId)
     
      formData.append('hotelAdminEmail',user.email)
      formData.append('billingGuestName',billingGuestName)
      formData.append('guestEmail',guestEmail)
      formData.append('guestContact',guestContact)
      console.log(JSON.stringify(formValues))
      formData.append('roomInfo',JSON.stringify(formValues))
      formData.append('advancePayment',advancePayment)
      formData.append('lastPayment',lastPayment)
      formData.append('totalPrice',totalPayment)
      formData.append('roomCharges',roomCharges)
      formData.append('tax',tax)
      formData.append('paymentMode',paymentMode)
      formData.append('bookingInfo',bookingSource)
      formData.append('agent',bookingAgentName)
      formData.append('bookingType',bookingType)
      formData.append('checkInDate',checkInDate)
      formData.append('checkOutDate',checkOutDateref.current.value)
      formData.append('nights',nights)
      formData.append('taxInc',taxInc)
      formData.append('billingUser',billingUser)



      for(var i=0;i<formValues.length;i++){
        let cRoomNo=formValues[i].roomNo

        const newReservationInfo={
         checkInDate:checkInDate,
         checkOutDate:checkOutDateref.current.value,
         guestName:formValues[i].guestName,
       }

        await axios.put(`${baseUrl}/hoteladmin/updateRoomsOnReservation/${cRoomNo}/${hotelId}`,newReservationInfo)
        .then(
          console.log("Room Details added")
        )
        .catch(err=>{
         toast.error(err.response.data);
         setRoomResErr(true);
        }) 
       }



      if(roomResErr===false && guestError==false){

      await axios.post(`${baseUrl}/hoteladmin/addreservation`,formData)
      .then(res=>{
        toast.success("New Reservation Added")
        console.log("Success")
      }
      ).catch(err=>{
        toast.error(err.response.data);
        console.log(err)
      })
    }
      }

      }catch(err){
        toast.error(err);
        console.log(err);
      }
  
  }



    const agenthandler=async()=>{
      const res=await axios.get(`${baseUrl}/hoteladmin/getServiceProvider`);
      if(bookingSource==="OTA"){
        setBookingAgent(res.data[0].OTA)
      }else if(bookingSource==="Travel Agent"){
        setBookingAgent(res.data[0].TravelAgent)
      }else if(bookingSource==="Booking Engine"){
        setBookingAgent(res.data[0].BookingEngine)
      }

    }

    const onOptionChangeHandler = (event) => {
      setBookingAgentName(event.target.value)
    }

    const handleCheckOut=async(e)=>{
      let firstDate = new Date(checkInDate);
      let secondDate = new Date(checkOutDateref.current.value)
      let timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
      let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      if(differentDays===0){
        differentDays=1;
      }

      setNights(differentDays);
      setCheckOutDate(e.target.value)
    }
    
    const rateHandler=async()=>{
     
      const newdata={
        roomType:roomTyperef.current.value,
        checkInDate:checkInDate,
        checkOutDate:checkOutDateref.current.value,
        hotelId:hotelId
      }

      const givenrateRes=await axios.post(`${baseUrl}/hoteladmin/getroomsdetailsByroomType`,newdata)
      setGivenRoomNo(givenrateRes.data);
      setMaxRoomAvailable(givenrateRes.data.length);
    }

    const roomPriceHandler=async()=>{

      const newdata={
        roomNo:roomNo,
        hotelId:hotelId
      }

      const givenRoomNores=await axios.post(`${baseUrl}/hoteladmin/getroomdetailsbyroomNo`,newdata);
       setRoomPrice(givenRoomNores.data[0].rateCharges)

      
    }
    const addAnotherRoomModal=()=>{
     var modal = document.getElementById("myModal");
      var btn = document.getElementById("myBtn");
      var span = document.getElementsByClassName("closemdbtn")[0];
      modal.style.display = "block";
      span.onclick = function() {
        modal.style.display = "none";
        setToggle(false)
        // setRoomQuantity(0);
        
      }
      window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        // setRoomQuantity(0);
      }
      }
    }


    const handleReturnGuest=async(e)=>{
      await setGuest("returnGuest")
      setBillingGuestName("");
        setGuestEmail("")
        setGuestContact("")

      var modal = document.getElementById("myModalradio");
      var btn = document.getElementById("myBtn");  
      var span = document.getElementsByClassName("close")[0];
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

    const handleNewGuest=()=>{
      setGuest("newGuest");
      setBillingGuestName("");
      setGuestEmail("");
      setGuestContact("");
      console.log("newGuest")
    }


    

    const handleRoomSave=async(e)=>{
      e.preventDefault();

      // const form =  e.target
      // const formFields = form.elements;
      // const roomprice  = formFields.roomPrice.value;
      // const guestname = formFields.guestName.value;
      // const roomno=formFields.roomNo.value;
      // const adultform=formFields.quantityAdult.value;
      // const childform=formFields.quantityChild.value;

      const values=[...formValues]
      setRoomId(roomId+1);
      setRoomValueAddCount(roomValueAddCount+1);

      values.push({
        roomId:roomId,
        roomNo:roomNo,
        roomType:roomTyperef.current.value,
        ratePlan:ratePlanref.current.value,
        roomPrice:roomPrice,
        adult:adult,
        child:child,
        guestName:guestName
      })

      const newArr = givenRoomNo.filter(object => {
        return object.roomNo !==Number(roomNo);
      });
    

     setGivenRoomNo(newArr);

     
      try{
      setFormValues(values);
      toast.success("Room saved!!");

      setRoomNo(null);
      setAdult(null);
      setChild(null);
      setRoomPrice(null)
      // setRoomNo();
      
      }catch(err){
        toast.error(`Room saving Error occurred!!`);
      }     

    }

    const saveAllRooms=async(e)=>{
      e.preventDefault();
      // setToggle(false);
      var modal = document.getElementById("myModal");
      modal.style.display = "none";

      const values=[...formValues]
      setRoomId(roomId+1);
      setRoomValueAddCount(roomValueAddCount+1);

      values.push({
        roomId:roomId,
        roomNo:roomNo,
        roomType:roomTyperef.current.value,
        ratePlan:ratePlanref.current.value,
        roomPrice:roomPrice,
        adult:adult,
        child:child,
        guestName:guestName
      })

      const newArr = givenRoomNo.filter(object => {
        return object.roomNo !==Number(roomNo);
      });
    

     setGivenRoomNo(newArr);

     
      try{
      setFormValues(values);
      toast.success("Room saved!!");
      // setRoomNo();
      
      }catch(err){
        toast.error(`Room saving Error occurred!!`);
      } 
    }

    const bookingSourceChangeHandler=(e)=>{

      setBookingSource(e.target.value);
     
      setIsBookingSourceSelected(true);
      agenthandler();  
    }

    const roomQuantityHandleChange = (event) => {
      // setRoomQuantity(event.target.value) 
      // roomPriceref.current.value=roomPrice
    };

    const addAnotherRoom=async(e)=>{
      await e.preventDefault();
      await setToggle(true);
      await addAnotherRoomModal();
      
    }
  
    const handleNumChange = event => {
      const limit = 10;
      setGuestContact(event.target.value.slice(0, limit));
    };

    const handleBookingType=()=>{
      if(bookingType==="Enquiry"){
        setSubmitType("Enquiry")
      }else if(bookingType==="Confirmed Booking"){
        setSubmitType("Booking")
      }
    }

    const handleLastPayment=(e)=>{

      setLastPayment(totalPayment-advancePayment);
      //console.log(totalPayment-advancePayment)
    }

    const handleTaxInc=(e)=>{
    setTaxInc(true)
    }

    const handleOldGuest=(e,guest)=>{
      e.preventDefault();
      setBillingGuestName(guest.guestName)
      setGuestEmail(guest.guestEmail)
      setGuestContact(guest.guestContact)

      var modal = document.getElementById("myModalradio");

      modal.style.display = "none";
    
    }

    const handleCheckinDate=(e)=>{
      setCheckInDate(e.target.value);
    }


    return (
        <>
        <Header userName={props.user} role={props.role} />
        <Menubar />
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Add Reservation</h1>
           
          </div>
          <section className="section dashboard">
            <div className="row">
              <div className="wrap">
                <div className="form-group">
                  <ToastContainer />
                </div>
                <div className="container-fluid">
                  <div className="hotel-form">
                    <div className="container">
                      <div className="card">
                        <div className="card-body">
                          <div className="form-section">
                           
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Check In: <span className="color-red">*</span></label>
                                    <input type="date" className="form-control" placeholder="Check In Date"
                                      onChange={e => handleCheckinDate(e)}
                                    min={new Date().toISOString().split('T')[0]}
                                    />
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Check out:<span className="color-red">*</span></label>
                                    <input type="date" className="form-control" placeholder="Check In Date"
                                    onChange={handleCheckOut}
                                    ref={checkOutDateref}
                                    min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                   //value={checkoutDateVal}
                                   />
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Nights</label>
                                    <input type="number" className="form-control" placeholder="0"
                                      value={nights} disabled="true"
                                      />
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Booking Source<span className="color-red">*</span></label>
                                    <select onChange={e =>
                                      bookingSourceChangeHandler(e)} className="form-control">
                                      <option>Select a Booking source</option>
                                      <option>OTA</option>
                                      <option>Travel Agent</option>
                                      <option>Booking Engine</option>
                                    </select>
                                  </div>
                                </div>
                                {isBookingSourceSelected &&
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">{bookingSource}<span className="color-red">*</span></label>
                                    <select
                                      onClick={agenthandler}
                                      onChange={onOptionChangeHandler}
                                      className="form-control"
                                      >
                                      {bookingAgent.map((bookingagent, index) => {
                                      return <option key={index} >
                                        {bookingagent}
                                      </option>
                                      })}
                                    </select>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                </div>
                                }
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Booking Type<span className="color-red">*</span></label>
                                    <select onChange={(e) =>
                                      setBookingType(e.target.value)} onBlur={() => handleBookingType()} className="form-control">
                                      <option>Select a Booking type</option>
                                      <option>Enquiry</option>
                                      <option>Confirmed Booking</option>
                                    </select>
                                  </div>  
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="reservation-form-smallheading">
                                  <h5><b>Room Details</b></h5>
                                  </div>
                                </div>
                              </div>
                              {checkInDate&&checkOutDate&&
                              <div className="text_center">
                                <button className="btn btn-primary w-30 add_another" type="button" onClick={(e) => addAnotherRoom(e)} >Add Room</button>
                              </div>
                              }
                              {!toggle ?null : 
                            (
                          <div id="myModal" className="modal">
                            <div className="modal-content">
                                <span className="closemdbtn" >&times;</span>
                                <div className="row">
                                  
                                  {/* <div className="col-md-3">
                                      <div className="mb-3">
                                        <label htmlFor="quantity" className="form-small-h">Rooms</label>
                                        <input type="number" id="quantity" name="quantity" className="form-control" onChange={e=>roomQuantityHandleChange(e)}
                                        required  min="0" 
                                        max={maxRoomAvailable}
                                        ></input>
                                      </div>
                                  </div> */}

                               
                                
                                    <div className="col-md-12">
                                    <form onSubmit={handleRoomSave}><span className="form-small-h"></span>
                                    <div className="row">
                                    <div className="col-md-2">
                                      <div className="mb-3">
                                        <label className="form-small-h">Room Type</label>
                                        <select 
                                            ref={roomTyperef}
                                            className="form-control"
                                            name="roomType" >
                                            <option>Select Room Type</option>
                                            {allRoomType.map((element,index)=>{
                                            return  <option key={index}>
                                              {element.roomType}
                                            </option>
                                            })}
                                        </select>
                                      </div>
                                  </div>
                                  <div className="col-md-2">
                                      <div className="mb-3">
                                        <label className="form-small-h">Rate Plan</label>
                                        <select 
                                            onClick={rateHandler}
                                            ref={ratePlanref} 
                                            className="form-control"
                                            name="ratePlan"
                                            >
                                            <option>Select a room plan</option>
                                            <option>EP</option>
                                            <option>CP</option>
                                            <option>MAP</option>
                                            <option>AP</option>
                                        </select>
                                        <div className="valid-feedback">Looks Good</div>
                                      </div>
                                  </div>                                
                                <div className="col-md-2">
                                <label className="form-small-h">Room No {roomId}</label> 
                                <select className="form-control" onBlur={roomPriceHandler} onChange={e=>
                                  setRoomNo(e.target.value)} name="roomNo">
                                  <option>select Room</option>
                                  {givenRoomNo.map((element,index)=>{
                                  return <option key={index} type="Number" >
                                      {element.roomNo}
                                  </option>
                                  })}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label className="form-small-h">Room Price</label>
                                <input type="number" name="roomPrice"
                                  onChange={e=>setRoomPrice(e.target.value)}
                                id={roomNo}
                                value={roomPrice}
                                />
                            </div>
                            <div className="col-md-2">
                                <label className="form-small-h">Guest Name</label>
                                <input type="text" name="guestName"  
                                  onChange={e=>setGuestName(e.target.value)}
                                defaultValue={guestName}
                                />
                            </div>
                            
                            <div className="col-md-1">
                                <label className="form-small-h">Adult</label>
                                <input type="number" id="quantityAdult" name="quantityAdult"
                                  required  min="1" max="2" onChange={e=>setAdult(e.target.value)}></input>
                            </div>
                            <div className="col-md-1">
                                <label className="form-small-h">Child</label>
                                <input type="number" id="quantityChild" name="quantityChild" 
                                  required min="0" max="2" onChange={e=>setChild(e.target.value)} ></input>
                            </div>
                            </div>
                            
                            {
                              (formValues.length>0||child) &&roomNo&&roomPrice&&adult&&child?
                              <div className=".col-md-1 width-25 margin-15sp">
                            <button className="btn btn-primary room_Save" type="submit">+ Add Another</button>
                            </div>:null

                            }
                           
                          </form>
                          </div>
                          
                                
                                  
                                  <div className="room_details_btn col-md-12">
                                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={handleTaxInc}/>&nbsp;
                                      <label className="form-check-label" for="flexCheckDefault">
                                      Tax Inc.
                                      </label>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      {/* <button className="btn btn-primary add_another" type="button" onClick={saveAllRooms} >SAVE ALL ROOMS</button> */}
                                  </div>


                                  { roomNo&&roomPrice&&adult&&child&&
                                    <div className="text_center">
                                   <button className="btn btn-primary w-30 add_another" type="button" onClick={(e) => saveAllRooms(e)} >Save All Rooms</button>
                                   </div>
                                  }

                                  
                                </div>
                            </div>
                          </div>
                              
                              )
                              }
                              {formValues && formValues.length>0 ?   <div className="col-md-12">
                                <div className="table-box">
                                  {/* <p><a href="" title="Edit Booking">&#9998;</a></p> */}
                                  <table className="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>#</th>
                                        <th>Room No</th>
                                        <th>Room Price</th>
                                        <th>Guest Name</th>
                                        <th>Adult</th>
                                        <th>Child</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {formValues.map((room, index) => (
                                      <tr>
                                        <td>{room.roomId}</td>
                                        <td>{room.roomNo}</td>
                                        <td>{room.roomPrice}</td>
                                        <td>{room.guestName}</td>
                                        <td>{room.adult}</td>
                                        <td>{room.child}</td>
                                      </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>:null}
                            
                              <div className="row">
                                <div className="col-12">
                                  <div className="reservation-form-smallheading">
                                  <h5><b>Guest Information</b></h5>
                                  </div>
                                </div>
                              </div>
                              <input type="radio" name="optradio" id="myBtn" onClick={() => handleReturnGuest()} />
                              <label className="radio-inline"> Returning Guest </label>
                              &nbsp;&nbsp;&nbsp;
                              <input type="radio" name="optradio" onClick={() => handleNewGuest()} />
                              <label className="radio-inline"> New Guest </label>
                             
                             
                              {
                              <div className="modal " id="myModalradio" tabindex="-1">
                              <div className="modal-dialog">
                                <div className="modal-content width-600p">
                                  <div className="modal-header">
                                    <h5 className="modal-title">Search Returning Guest</h5>
                                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                    <span className="close">&times;</span>
                                  </div>
                                  <div className="modal-body">
                                  <div className="search-container">
                                    <input type="text" placeholder="Search.." name="search" onChange={e => setPreviousGuest(e.target.value)} />
                                    {/* <button className="custom-btn custom-btn-primary">Submit</button> */}
                                  </div>
                                  <div className="table-box2">
                                    <table className="table table-bordered">
                                      <thead>
                                        <tr>
                                          <th>Guest Name</th>
                                          <th>Guest Email</th>
                                          <th>Guest Contact No</th>
                                          <th>Select</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {prevGuestSearchRes.map((guest) => (
                                        <tr>
                                          <td>{guest.guestName}</td>
                                          <td>{guest.guestEmail}</td>
                                          <td>{guest.guestContact}</td>
                                          <td align="center" onClick={(e) => handleOldGuest(e, guest)}><button className="custom-btn custom-btn-primary">Select</button></td>
                                        </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary close" data-bs-dismiss="modal">Close</button>
                                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                  </div>
                                </div>
                              </div>
                            </div>

                            
                            }

                           {guest &&
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Guest Name:</label>
                                    <input type="textarea" className="form-control" placeholder="Guest Name"
                                      onChange={e => setBillingGuestName(e.target.value)} value={billingGuestName} />
                                    <div className="valid-feedback">Please provide a Guest Name</div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Guest Email:</label>
                                    <input type="textarea" className="form-control" placeholder="Guest Email id"
                                      onChange={e => setGuestEmail(e.target.value)} value={guestEmail} />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Guest Contact No:</label>
                                    <input type="number" className="form-control" placeholder="Guest Contact No."
                                      onChange={handleNumChange} value={guestContact} />
                                    <div className="valid-feedback">Please provide a 10 digit number</div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Billing Preferences:</label>
                                    <div className="mb-3 reservation-form-smallheading">
                                      <select onChange={(e) =>
                                        setBillingUser(e.target.value)} className="form-control">
                                        <option>Select</option>
                                        <option>Guest</option>
                                        <option>Hotel Employee</option>
                                        <option>Owner</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                           }
                              
                              <div className="row">
                                <div className="col-12">
                                  <div className="reservation-form-smallheading">
                                  <h5><b>Payments</b></h5>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-3">
                                  <div className="mb-3">
                                    <label className="form-small-h">Amount Paid(Advance Payment) :</label>
                                    <input type="number" className="form-control" placeholder="0"
                                      onChange={(e) => setAdvancePayment(e.target.value)} onBlur={handleLastPayment} />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="mb-3">
                                    <label className="form-small-h">Total Payment</label>
                                    <input type="number" className="form-control" placeholder=""
                                      onChange={(e) => setTotalPayment(e.target.value)} onBlur={handleLastPayment} value={totalPayment} />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="mb-3">
                                    <label className="form-small-h">Final Payment (Remaining) :</label>
                                    <input type="number" className="form-control" placeholder="Final Payment"
                                      disabled="true"
                                      value={lastPayment} />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="mb-3">
                                    <label className="form-small-h">Payment Mode</label>
                                    <select onChange={(e) =>
                                      setPaymentMode(e.target.value)} className="form-control">
                                      <option>Select a Payment Mode</option>
                                      <option>Cash</option>
                                      <option>CC</option>
                                      <option>Card</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              {tableToggle&& 
                              <div>
                                <h5><b>Summary</b></h5>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <label>CheckinDate :<b>{checkInDate}</b></label> to <label>CheckoutDate :<b>{checkOutDate}</b></label>
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="mb-3">
                                      <label>RoomCharges:<b>{roomCharges}</b></label>
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="mb-3">
                                      <label>Tax:<b>{tax}</b></label>
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="mb-3">
                                      <label>Total Price:<b>{totalPayment}</b></label>
                                    </div>
                                  </div>
                                </div>

                              </div>
                              }
                            
                              <br />
                              <button className="btn btn-primary" disabled={(checkInDate&&checkOutDate&&formValues.length>0&&billingGuestName&&guestContact&&guestEmail)?false:true} type="submit" onClick={(e)=>handleSubmit(e)}>Submit {submitType} </button>
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        <Footer />
        </>
    );
}