
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../../Context/Context';
import { ToastContainer, toast } from 'react-toastify';
import Header from "../../Commons/Header";
import Menubar from "../../Commons/Menubar";
import Footer from "../../Commons/Footer";
const baseUrl=require('../../../Utils/config/default');


const RoomStatus=(props)=>{
  const {user}=useContext(Context);
  const hotelId=user.hotelId;
  const [rooms,setRooms]=useState([]);



       //table to get all rooms data
       useEffect(()=>{    
        TypeOptions();  
       },[])

      
       const TypeOptions=async()=>{
        
        const result=await axios.get(`${baseUrl}/hoteladmin/getAllHouseKeepingMasters/${hotelId}`)
        setRooms(result.data);
      }  

      const downloadRoomStatus=async()=>{
        try{
          const roomStatusDownload=await axios.post(`${baseUrl}/hoteladmin/roomStatusPdf/${hotelId}`)
          .then(toast.success("Room Status Downloaded to Your DeskTop"));

          console.log(roomStatusDownload);

        }catch(err){
          toast.error(err.data);
        }
      }


    return(
        <>
       <Header userName={props.user} role={props.role} />
            <Menubar />
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>House Keeping Room Status</h1>
                </div>

                
                <section className="section">
                <ToastContainer />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
                 
  {/* <h5 className="card-title">All rooms available</h5>*/}
              <p>View all the Rooms here with status</p> <div className="text_center">
                  {/* <button className="btn btn-primary w-30 add_another" type="button" onClick={downloadRoomStatus} >Download Room Status</button> */}
                </div>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#Room No</th>
                    <th scope="col">Room Type</th>
                    {/* <th scope="col">Room Floor</th> */}
                    <th scope="col">Room Cleaned</th>
                    <th scope="col">Room Report</th>
                    <th scope="col">Room Status</th>
                    <th scope="col">Room Cleaned By</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room)=>{
                    return <tr>
                    <th scope="row">{room.roomNo}</th>
                    <td>{room.roomType}</td>
                    {/* <td>{room.roomFloor}</td> */}
                    <td>{room.cleaningDate}</td>
                    <td>{room.report}</td>
                    <td>{room.roomStatus}</td>
                    <td>{room.assigned}</td>
                  </tr>
                  })}
                </tbody>
              </table>

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


export default RoomStatus;