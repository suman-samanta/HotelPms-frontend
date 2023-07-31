
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../../Context/Context';
import { ToastContainer, toast } from 'react-toastify';
import Header from "../../Commons/Header";
import Menubar from "../../Commons/Menubar";
import Footer from "../../Commons/Footer";

const baseUrl=require('../../../Utils/config/default');



const TaskStatus=(props)=>{
  const {user}=useContext(Context);
  const [allRoomType,setAllRoomType]=useState([]);
  const [roomType,setRoomType]=useState();
  const [roomNo,setRoomNo]=useState();
  const [roomPrice,setRoomPrice]=useState();
  const [roomName,setRoomName]=useState();
  const [roomFloor,setRoomFloor]=useState();
  const hotelId=user.hotelId;

  const [task,setTask]=useState();
  const [assigned,setAssigned]=useState();
  const [taskDate,setTaskDate]=useState();
  const [report,setReport]=useState();
  const [cost,setCost]=useState();
  const [taskStatus,setTaskStatus]=useState();

    const [rooms,setRooms]=useState([]);
    const [allTasks,setAllTasks]=useState([]);
    const [newTaskAdded,setNewTaskAdded]=useState(1);
  
    
    useEffect(()=>{

      const getAllTask=async()=>{
        const result=await axios.get(`${baseUrl}/hoteladmin/getAllTasks/${hotelId}`)
        setAllTasks(result.data);
        console.log(result.data);
      }
      getAllTask();
    },[newTaskAdded])
 

       const handleSubmit=async(e)=>{
        e.preventDefault();
        try{


          const newdata={
            roomNo:roomNo,
            task:task,
            date:taskDate,
            assigned:assigned,
            taskStatus:true,
            remarks:report,
            cost:cost,
            createdBy:user.email
          }

          const result=await axios.post(`${baseUrl}/hoteladmin/create/NewTask/${hotelId}`,newdata)
          .then(
            toast.success("Task Added"),
           
          )
          setNewTaskAdded(newTaskAdded+1);

        }catch(err){
            
            toast.error(err.response.data)
            console.log(err)
        }
       }



    return(
        <>
       <Header userName={props.user} role={props.role} />
            <Menubar />
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Task Scheduler</h1>
                </div>
                
                <section class="section">
                <ToastContainer />
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Add a new task here</h5>

              <div className="formbold-form-wrapper">
   
      <div className='row'>

      <div className="col-md-3">
        <div className="mb-3">

        <label htmlFor="roomNo" className="form-small-h">Room No:</label>
                  <input type="number" id="roomNo" name="roomNo" className="form-control" onChange={e=>setRoomNo(e.target.value)}
                    ></input>
              
        </div>
        </div>
        <div className="col-md-3">
        <div className="mb-3">

        <label htmlFor="roomNo" className="form-small-h">Room Task</label>
                  <input type="text" id="task" name="task" className="form-control" onChange={e=>setTask(e.target.value)}
                    ></input>
              
        </div>
        </div>

        <div className="col-md-3">
        <div className="mb-3">

        <label htmlFor="roomNo" className="form-small-h">Task Assign</label>
                  <input type="text" id="assign" name="assign" className="form-control" onChange={e=>setAssigned(e.target.value)}
                    ></input>
              
        </div>
        </div>
        <div className="col-md-3">
        <div className="mb-3">

        <label htmlFor="roomprice" className="form-small-h">Task Date</label>
                  <input type="date" id="roomprice" name="roomprice" className="form-control" onChange={e=>setTaskDate(e.target.value)}
                    ></input>
              
        </div>
        </div>
        </div>

        <div className='row'>

<div className="col-md-3">
  <div className="mb-3">

  <label htmlFor="roomNo" className="form-small-h">Room Report:</label>
            <input type="text" id="report" name="roomNo" className="form-control" onChange={e=>setReport(e.target.value)}
              ></input>
        
  </div>
  </div>
  <div className="col-md-3">
  <div className="mb-3">

  <label htmlFor="roomNo" className="form-small-h">Room Charges</label>
            <input type="number" id="roomNo" name="roomNo" className="form-control" onChange={e=>setCost(e.target.value)}
              ></input>
        
  </div>
  </div>

  <div className="col-md-3">
  <div className="mb-3">

    {/* <label htmlFor="taskStatus" className="form-small-h">Task Status</label>
                  <select onChange={e=>setTaskStatus(e.target.value)} className="form-control">
                  <option>Status</option>
                   <option>false</option>
                   <option>true</option>
     </select>
         */}
  </div>
  </div>
 
  </div>

    
     

      <div>
        <button className="btn btn-primary" type="submit"  onClick={(e)=>handleSubmit(e)}>Submit</button>
      </div>
      
   
  </div>
              
  <h5 class="card-title">All tasks</h5>
              

              <table class="table datatable">
                <thead>
                  <tr>
                    <th scope="col">#Room No</th>
                    <th scope="col">Room Task</th>
                    <th scope="col">Room Report</th>
                    <th scope="col">Task Assigned To</th>
                    <th scope="col">Task Assigned By</th>
                    {/* <th scope="col">Task Status</th> */}
                    <th scope="col">Task Charges</th>
                    <th scope="col">Task Date</th>
                    <th scope="col">Update</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {allTasks.map((task)=>{
                    return <tr>
                    <th scope="row">{task.roomNo}</th>
                    <td>{task.task}</td>
                    
                    <td>{task.remarks}</td>
                    <td>{task.assigned}</td>

                    <td>{task.updatedBy}</td>
                    {/* <td>{task.taskStatus}</td> */}
                    <td>{task.cost}</td>
                    <td>{task.date}</td>

                    <td>&#9998;</td>


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


export default TaskStatus;