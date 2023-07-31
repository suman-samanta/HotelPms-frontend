
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../../Context/Context';
import { ToastContainer, toast } from 'react-toastify';
import Header from "../../Commons/Header";
import Menubar from "../../Commons/Menubar";
import Footer from "../../Commons/Footer";
const baseUrl=require('../../../Utils/config/default');


const TaskAssign=(props)=>{
  const {user}=useContext(Context);
  //const [allRoomType,setAllRoomType]=useState([]);
  //const [roomType,setRoomType]=useState();
  const [roomNo,setRoomNo]=useState();
  const [roomReport,setRoomReport]=useState();
  const [roomAssigned,setRoomAssigned]=useState();
  const [roomStatus,setRoomStatus]=useState();
  const hotelId=user.hotelId;
  


    const [rooms,setRooms]=useState([]);

    // useEffect(()=>{
    //     const FindRoomNoOptions=async()=>{
    //       const result=await axios.get(`${baseUrl}/hoteladmin/getRoomType/${hotelId}`);
    //       setRoomNo(result.data);
    //     }      
    //     FindRoomNoOptions();
    //    },[])

    //    //table to get all rooms data
    //    useEffect(()=>{    
    //     TypeOptions();  
    //    },[])


    //    const TypeOptions=async()=>{
   
    //     const result=await axios.get(`${baseUrl}/hoteladmin/getAllRooms/${hotelId}`)
    //     setRooms(result.data);
    //   }  

       const handleSubmit=async(e)=>{
        e.preventDefault();
        try{

            const newRoom={
              roomStatus:roomStatus,
              cleaningDate:"",
              assigned:roomAssigned,
              report:roomReport,
              updatedBy:user.email,
            }

           const res= await axios.post(`${baseUrl}/hoteladmin/update/houseKeepingMaster/${hotelId}/${roomNo}`,newRoom)
           .then(res=>{
            toast.success("Room Status Updated Successful");
           // TypeOptions();
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
                    <h1>Create Task Status</h1>
                </div>      
                <section class="section">
                <ToastContainer />
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Create a new task here</h5>
              

              <div className="formbold-form-wrapper">
    <form>
    <div className="col-md-4">
        <div className="mb-3">

              <label className="form-small-h">Room no :</label>
              <input type="number" id="roomNo" name="roomNo" className="form-control" onChange={e=>setRoomNo(e.target.value)}
                    ></input>
              {/* <select 
              onChange={e=>setRoomNo(e.target.value)}
              className="form-control"
              name="roomType" >
              <option>Room Type</option>
              {allRoomType.map((element,index)=>{
                return <option key={index}>
                  {element.roomType}
                </option>
              })}
              </select> */}
        </div>
        </div>
        <div className="col-md-4">
        <div className="mb-3">

        <label htmlFor="roomprice" className="form-small-h">Assigne:</label>
                  <input type="text" id="roomprice" name="roomprice" className="form-control" onChange={e=>setRoomAssigned(e.target.value)}
                    ></input>
              
        </div>
        </div>

        <div className="col-md-4">
        <div className="mb-3">

        <label htmlFor="roomName" className="form-small-h">Room Report:</label>
                  <input type="text " id="roomName" name="roomprice" className="form-control" onChange={e=>setRoomReport(e.target.value)}
                    ></input>
              
        </div>
        </div>

        <div className="col-md-4">
            <div className="mb-3">
                  <label className="form-small-h">Set status</label>
                  <select onChange={e=>setRoomStatus(e.target.value)} className="form-control">
                  <option>Status</option>
                   <option>Cleaned</option>
                   <option>Dirty</option>
                   <option>Cleaning In Process</option>
                   <option>Broken</option>
                   <option>NA</option>
                  </select>
            </div>
            </div> 
      <div>
        <button className="btn btn-primary" type="submit"  onClick={(e)=>handleSubmit(e)}>Submit</button>
      </div>     
    </form>
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
    )

}


export default TaskAssign;