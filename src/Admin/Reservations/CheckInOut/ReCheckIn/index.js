import { ToastContainer, toast } from 'react-toastify';
import Header from "../../../Commons/Header";
import Menubar from "../../../Commons/Menubar";
import Footer from "../../../Commons/Footer";
import { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../../../Context/Context';

const baseUrl=require('../../../../Utils/config/default');


const ReCheck = (props) => {
    const {user}=useContext(Context);
    const hoteladminemail=user.email;
    const hotelId=user.hotelId;

    const [searchInput,setSearchInput]=useState();
    const [checkOutDetails,setCheckOutDetails]=useState([]);
    const [checkInId,setCheckInId]=useState();
    const [refNo,setRefNo]=useState(null);
    const [roomNo,setRoomNo]=useState();
    const [roomType,setRoomType]=useState();
    const [roomAvailable,setRoomAvailable]=useState(true);
    const [givenRoomNo,setGivenRoomNo]=useState([]);
    const [checkInDate,setCheckInDate]=useState();
    const [checkOutDate,setCheckOutDate]=useState();
    const [customerName,setCustomerName]=useState();
    const[customerContact,setCustomerContact]=useState();
    const[guestEmail,setGuestEmail]=useState();
    const [totalBill,setTotalBill]=useState();
    const[remainingBill,setRemainingBill]=useState();
    const [advancePayment,setAdvancePayment]=useState();


    useEffect(()=>{


        const handleAvalaibleRooms=async()=>{
        
          const newData={
            roomType:roomType
          }
  
          const roomAvailable=await axios.post(`${baseUrl}/hoteladmin/getAvailableRoomsForCheckIn/${hotelId}`,newData);
          setGivenRoomNo(roomAvailable.data);
          console.log(roomAvailable.data);
        }

        handleAvalaibleRooms();
      },[roomType]);


    //   useEffect(()=>{
    //     const roomAvailableset=async()=>{
        
    //       const result=await axios.post(`${baseUrl}/hoteladmin/getHouseKeepingByRoomNo/${hotelId}/${roomNo}`);
    //       console.log(result.data);  
    //   }

    //   roomAvailableset();
    //   },[roomNo])


    const handleReCheckInres=async(e)=>{
        e.preventDefault();
        try{
            const data={
                searchInput:searchInput
            }
            const result=await axios.post(`${baseUrl}//hoteladmin/searchInCheckOut/${hotelId}`,data);
            console.log(result.data);
            setRefNo(null)
            setCheckOutDetails(result.data);
        }catch(err){
            console.log(err);
        }
    }

    const handleCheckOutSelect=async(e,id)=>{
        e.preventDefault();
        console.log(checkOutDetails);
       const res=checkOutDetails.filter(element=>{
        return element._id===id;
       });
        setCheckInId(id);
        setRefNo(res[0].refNo);
        setCheckInDate(res[0].checkIndate);
        setCheckOutDate(res[0].checkOutDate);
        setCustomerName(res[0].billingGuestName);
        setCustomerContact(res[0].guestContact);
        setGuestEmail(res[0].guestEmail);
        setTotalBill(res[0].fullPayment);
        setRemainingBill(res[0].remainingPayment);
        setAdvancePayment(res[0].advancePayment);
        setRoomNo(res[0].roomNo);

        let roomno=res[0].roomNo;
        const result=await axios.get(`${baseUrl}/hoteladmin/getAParticularRoomType/${hotelId}/${roomno}`);
        setRoomType(result.data.roomType);

        const roomavailableres=await axios.post(`${baseUrl}/hoteladmin/getHouseKeepingByRoomNo/${hotelId}/${roomno}`);

        if(roomavailableres.data===true){
            setRoomAvailable(true);
        }else{
            setRoomAvailable(false);
        }

    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            const updatedHouseKeeping={
                roomStatus:"CheckedIn",
                report:"Room Is Not Available for Check In",
                updatedBy:hoteladminemail
              }
              const result=await axios.put(`${baseUrl}/hoteladmin/update/houseKeepingMaster/${hotelId}/${roomNo}`,updatedHouseKeeping)
            
              .catch(err=>{
                // setCheckInError(true);
                toast.error(err.response.data);
              })


              try{
                const data={
                    roomNo:roomNo,
                    updatedBy:hoteladminemail,
                    checkOutDate:checkOutDate,
                    advancePayment:advancePayment,
                    remainingPayment:remainingBill
                }
                const res=await axios.put(`${baseUrl}/hoteladmin/recheckIn/${checkInId}`,data)
                console.log(res);

                toast.success("RE-Check In Successful")
              }catch(err){
                toast.error(err.response.data)
              }

        }catch(err){
            console.log(err);
        }


        
    }


    return (
        <>
            <Header userName={props.user} role={props.role} />
            <Menubar />
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Re-Check In</h1>
                </div>


                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <ToastContainer />
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Re-Check In</h5>
                                    

                                <div id="header" className="header d-flex align-items-center">
                                  <div className="search-bar">
                                        <form className="search-form d-flex align-items-center" onSubmit={(e)=>handleReCheckInres(e)} >
                                                <input type="text" name="query" placeholder="Enter Phone No or Guest Name" title="Enter Phone No or Guest Name" 
                                                onChange={(e)=>setSearchInput(e.target.value)}/>
                                                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                                        </form>
                                        </div>
                                  </div>
                                </div>

                                {checkOutDetails.length>0&& refNo==null&& 
                               

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
                                    <th scope='col'>Re-CheckIn</th>
                                  </tr>

                                  {checkOutDetails.map((element,idx)=>{

                                    return(
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
                                    <td> <a className="icon" href="#"><a title="Re-check In" onClick={(e)=>handleCheckOutSelect(e,element._id)} >&#9998;</a></a> </td>
                                    </tr>
                                    )
                                })}
                                </thead>

                                </table>
                                
                               
                                }
                                

                                {
                                refNo&& 
                                <div>
                                 <div className='row'>

                               <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Reservation Id:</label>
                                    <span>{refNo}</span>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                  </div>

                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Customer Name:</label>
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
                                      onChange={(e) => setAdvancePayment(e.target.value)} />
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                </div>

                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Remaining Bill:</label>
                                    <span>{remainingBill}</span>
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                  </div>

                                  <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Total Bill:</label>
                                    <span>{totalBill}</span>
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


                                {roomAvailable===true?
                                    <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-small-h">Room No:</label>
                                    <input type="number" className="form-control" placeholder="Room No"
                                    value={roomNo} disabled
                                    />
                                    <div className="valid-feedback">Looks Good</div>
                                  </div>
                                </div>:
                                
                                <div className="col-md-4">
                                      <div className="mb-3">
                                        <label className="form-small-h">Room No</label>
                                        <select className="form-control"  onChange={e=>
                                          setRoomNo(e.target.value)} name="roomNo">
                                          <option>SELECT ROOM</option>
                                          {givenRoomNo.map((element,index)=>{
                                          return <option key={index} type="Number" >
                                              {element.roomNo}
                                          </option>
                                          })}
                                </select>
                                      </div>
                                       </div>}

                               
                               
                                 </div>

                                 <button className="btn btn-primary" type="submit" onClick={(e)=>handleSubmit(e)}>Submit Re-checkIn</button>
                                 </div>
                                
                                }

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


export default ReCheck;