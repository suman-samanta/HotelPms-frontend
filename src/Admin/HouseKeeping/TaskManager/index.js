
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../../Context/Context';
import { ToastContainer, toast } from 'react-toastify';
import Header from "../../Commons/Header";
import Menubar from "../../Commons/Menubar";
import Footer from "../../Commons/Footer";

const baseUrl=require('../../../Utils/config/default');


const TaskManager=(props)=>{
  const {user}=useContext(Context);
  const [allRoomType,setAllRoomType]=useState([]);
  const [roomType,setRoomType]=useState();
  const [roomNo,setRoomNo]=useState();
  const [roomPrice,setRoomPrice]=useState();
  const [roomName,setRoomName]=useState();
  const [roomFloor,setRoomFloor]=useState();
  const hotelId=user.hotelId;
  


    const [rooms,setRooms]=useState([]);

    useEffect(()=>{
        const FindRoomTypeOptions=async()=>{
          const result=await axios.get(`${baseUrl}/hoteladmin/getRoomType/${hotelId}`);
          setAllRoomType(result.data);
        }      
        FindRoomTypeOptions();
       },[])

       //table to get all rooms data
       useEffect(()=>{    
        TypeOptions();  
       },[])


       const TypeOptions=async()=>{
        
        const result=await axios.get(`${baseUrl}/hoteladmin/getAllRooms/${hotelId}`)
        setRooms(result.data);
      }  

       const handleSubmit=async(e)=>{
        e.preventDefault();
        try{

            const newRoom={
                roomType:roomType,
                roomNo:roomNo,
                rateCharges:roomPrice,
                roomFloor:" ",
                roomName:" ",
                createdBy:user.email,
                hotelId:hotelId
            }

           const res= await axios.post(`${baseUrl}/hoteladmin/addNewRoom`,newRoom)
           .then(res=>{
            toast.success("Room Adding Successful");
            TypeOptions();
           })
           .catch(err=>{
                toast.error(err.response.data)
                console.log(err)
        })

        }catch(err){
            
            toast.error(err.data)
            console.log(err)
        }
       }



    return(
        <>
       <Header userName={props.user} role={props.role} />
            <Menubar />
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Add Room</h1>
                </div>
{console.log(rooms)}
                
                <section class="section">
                <ToastContainer />
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Add a new room here</h5>
              {/* <p>View all the bookings here</p> */}

              <div className="formbold-form-wrapper">
    <form>
    <div className="col-md-4">
        <div className="mb-3">

              <label className="form-small-h">Room Type :</label>
              <select 
              onChange={e=>setRoomType(e.target.value)}
              className="form-control"
              name="roomType" >
              <option>Room Type</option>
              {allRoomType.map((element,index)=>{
                return <option key={index}>
                  {element.roomType}
                </option>
              })}
              </select>
        </div>
        </div>

    <div className="col-md-4">
        <div className="mb-3">

        <label htmlFor="roomNo" className="form-small-h">Room No:</label>
                  <input type="number" id="roomNo" name="roomNo" className="form-control" onChange={e=>setRoomNo(e.target.value)}
                    ></input>
              
        </div>
        </div>

        <div className="col-md-4">
        <div className="mb-3">

        <label htmlFor="roomprice" className="form-small-h">Room Price:</label>
                  <input type="number" id="roomprice" name="roomprice" className="form-control" onChange={e=>setRoomPrice(e.target.value)}
                    ></input>
              
        </div>
        </div>

        {/* <div className="col-md-4">
        <div className="mb-3">

        <label htmlFor="roomName" className="form-small-h">Room Name:</label>
                  <input type="text " id="roomName" name="roomprice" className="form-control" onChange={e=>setRoomName(e.target.value)}
                    ></input>
              
        </div>
        </div>

        <div className="col-md-4">
            <div className="mb-3">
                  <label className="form-small-h">Booking Source</label>
                  <select onChange={e=>setRoomFloor(e.target.value)} className="form-control">
                  <option>Select a Room Floor</option>
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                   <option>6</option>
                   <option>7</option>
                   <option>8</option>
                   <option>9</option>
                   <option>10</option>
                  </select>
            </div>
            </div> */}


     

      <div>
        <button className="btn btn-primary" type="submit"  onClick={(e)=>handleSubmit(e)}>Submit</button>
      </div>
      
    </form>
  </div>
              
  <h5 class="card-title">All rooms available</h5>
              <p>View all the Rooms here</p>

              <table class="table datatable">
                <thead>
                  <tr>
                    <th scope="col">#Room No</th>
                    <th scope="col">Room Type</th>
                    {/* <th scope="col">Room Floor</th>
                    <th scope="col">Room Name</th> */}
                    <th scope="col">Room Charges</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room)=>{
                    return <tr>
                    <th scope="row">{room.roomNo}</th>
                    <td>{room.roomType}</td>
                    {/* <td>{room.roomFloor}</td>
                    <td>{room.roomName}</td> */}
                    <td>{room.rateCharges}</td>
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


export default TaskManager;