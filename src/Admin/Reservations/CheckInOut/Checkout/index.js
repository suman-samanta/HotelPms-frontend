import { ToastContainer, toast } from 'react-toastify';
import Header from "../../../Commons/Header";
import Menubar from "../../../Commons/Menubar";
import Footer from "../../../Commons/Footer";
import { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../../../Context/Context';
import {Modal} from 'react-responsive-modal';

const baseUrl=require('../../../../Utils/config/default');


const CheckOut = (props) => {
    
    const {user}=useContext(Context);
    const hoteladminemail=user.email;
    const hotelId=user.hotelId;

    const [searchInput,setSearchInput]=useState();
    const [roomNo,setRoomNo]=useState();
    const [roomToCheckout,setRoomToCheckout]=useState();

    const [checkInData,setCheckInData]=useState([]);
    const [checkInId,setCheckInId]=useState();
    let checkOutErr=false;
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleCheckInres=async(e)=>{
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

    const handleCheckInresWithRoomNo=async(e)=>{
        
        e.preventDefault();
        try{
            const newData={
                roomNo:roomNo
            }
            const result=await axios.post(`${baseUrl}/hoteladmin/getCheckInBySearchingRoomNo/${hotelId}`,newData)
            .catch(err=>{
                toast.error(err.response.data);
            })

            console.log(result);

            setCheckInData(result.data)
        }catch(err){
            console.log(err);
        }
    }


    const handleCheckOutPopUp=(e,checkInid,roomNo)=>{
        e.preventDefault();
        setCheckInId(checkInid);
        setRoomToCheckout(roomNo);
        onOpenModal();
    }

    const handleSureCheckOut=async(e)=>{
        e.preventDefault();
        const newData={
            updatedBy:hoteladminemail
        }

        const res=await axios.put(`${baseUrl}//hoteladmin/updateRoomsonCheckOut/${hotelId}/${roomToCheckout}`,newData)
        .catch(
            checkOutErr=true       
         )
            const result=await axios.put(`${baseUrl}/hoteladmin/CheckOutARoom/${checkInId}`,newData)
            .then(
                toast.success("CheckOut Successful")
            )     
    }



    return (
        <>
            <Header userName={props.user} role={props.role} />
            <Menubar />
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Check Out</h1>
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
                            <ToastContainer />
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Check Out</h5>
                                    <p>View all the checkout here</p>
                            <div className='row'>

            
                                <div id="header" className="col-md-4  header d-flex align-items-center">
                                <div className="search-bar">
                                        <form className="search-form d-flex align-items-center" onSubmit={handleCheckInres} >
                                                <input type="text" name="query" placeholder="Enter Phone No or Guest Name" title="Enter Phone No or Guest Name" onChange={(e)=>setSearchInput(e.target.value)}/>
                                                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                                        </form>
                                        </div>
                                 </div>


                                <div id="header" className="col-md-4 header d-flex align-items-center">
                                    <div className="search-bar">
                                            <form className="search-form d-flex align-items-center" onSubmit={handleCheckInresWithRoomNo}>
                                                <input type="text" name="query" placeholder="Enter Room No" title="Enter Room No" onChange={(e)=>setRoomNo(e.target.value)}/>
                                                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                                            </form>
                                        </div>
                                </div>
                                </div>

                                {checkInData.length>0&& 
                                <div className='row'>

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
                                    <th scope='col'>CheckOut</th>

                                  </tr>

                                  {/* <td> <a className="icon" href="#" data-bs-toggle="dropdown"><a href="" title="Edit Booking">&#9998;</a></a> */}
                                </thead>

                                {checkInData.map((element,idx)=>{

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
                                        <td> <a className="icon" href="#"><a href="" title="Check Out" onClick={(e)=>handleCheckOutPopUp(e,element._id,element.roomNo)}>&#9998;</a></a> </td>
                                    </tr>
                                    )
                                })}

                                </table>


                                            <Modal open={open} onClose={onCloseModal} center classNames={{ width: 110 }}>
                                                <h4>Are You Sure?</h4>
                                                <button type="submit" className="btn" onClick={handleSureCheckOut}>Yes</button>
                                            </Modal>
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


export default CheckOut;