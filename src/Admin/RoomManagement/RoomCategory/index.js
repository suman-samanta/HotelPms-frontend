
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../../Context/Context';
import { ToastContainer, toast } from 'react-toastify';
import Header from "../../Commons/Header";
import Menubar from "../../Commons/Menubar";
import Footer from "../../Commons/Footer";
import { Modal } from 'react-responsive-modal';
const baseUrl=require('../../../Utils/config/default');



const UpdateRoomPrice=(props)=>{
  const {user}=useContext(Context);
  const [allRoomType,setAllRoomType]=useState([]);
  const [roomType,setRoomType]=useState();
  const [roomTypeId,setRoomTypeId]=useState();
  const hotelId=user.hotelId;

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onOpenModalUpdate = () => setOpenUpdate(true);
  const onCloseModalUpdate = () => setOpenUpdate(false);

  const onOpenModalDelete = () => setOpenDelete(true);
  const onCloseModalDelete = () => setOpenDelete(false);
  


    const [rooms,setRooms]=useState([]);

    useEffect(()=>{    
        FindRoomTypeOptions();
       },[setRoomType])

       const FindRoomTypeOptions=async()=>{
        const result=await axios.get(`${baseUrl}/hoteladmin/getRoomType/${hotelId}`);
        setAllRoomType(result.data);
      }  

      //  //table to get all rooms data
      //  useEffect(()=>{    
      //   TypeOptions();  
      //  },[])


      //  const TypeOptions=async()=>{
  
      //   const result=await axios.get(`${baseUrl}/hoteladmin/getAllRooms/${hotelId}`)
      //   setRooms(result.data);
      // }  

       const handleSubmit=async(e)=>{
        e.preventDefault();
        try{

            const newRoomType={
                roomType:roomType,
                createdBy:user.email,
                
            }


           const res= await axios.post(`${baseUrl}/hoteladmin/addNewRoomType/${hotelId}`,newRoomType)
           .then(res=>{
            toast.success("RoomType Adding Successful");
          //  TypeOptions();

          FindRoomTypeOptions();
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


  const Update = (type,roomTypeId) => {
    setRoomType(type);
    setRoomTypeId(roomTypeId);
    setOpenUpdate(true);

  }
  const Delete = (type,roomTypeId) => {
    setRoomType(type);
    setRoomTypeId(roomTypeId)
    setOpenDelete(true);
  }


  const handleDeleteRoomType=async(e)=>{
    e.preventDefault();
    try{
     
      const result=await axios.delete(`${baseUrl}/hoteladmin/deleteRoomType/${hotelId}/${roomType}`)
      .then(
        toast.success("Room Category Deleted")
      )

      setAllRoomType(result.data);
      setOpenDelete(false);
      onCloseModalDelete();
    }catch(err){
      console.log(err);
    }

  }

  const handleRoomTypeUpdate=async(e)=>{
    e.preventDefault();
    try{
      console.log(roomType);
      console.log(roomTypeId);
      const newRoomType={
        roomType:roomType
      }
      const result= await axios.put(`${baseUrl}/hoteladmin/updateRoomType/${hotelId}/${roomTypeId}`,newRoomType)
      .then(
        toast.success("Room Type updated")
      )

      setAllRoomType(result.data);
      setOpenUpdate(false);
      onCloseModalUpdate();

    }catch(err){
      console.log(err);
    }

  }


    return(
        <>
       <Header userName={props.user} role={props.role} />
            <Menubar />
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Add Room Category</h1>
                </div>
                <section class="section">
                <ToastContainer />
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Add a new room Category here</h5>
              {/* <p>View all the bookings here</p> */}

              <div className="formbold-form-wrapper">
    <form>
    <div className="col-md-4">
        <div className="mb-3">

              <label className="form-small-h">Room Type :</label>
             
                  <input type="text" id="roomNo" name="roomNo" className="form-control" onChange={e=>setRoomType(e.target.value)}
                    ></input>
              
        </div>
        </div>

       
      <div>
        <button className="btn btn-primary" type="submit"  onClick={(e)=>handleSubmit(e)}>Submit</button>
      </div>
      
    </form>
  </div>
              
              <p>View all the Room Category here</p>

              <table class="table datatable">
                <thead>
                  <tr>
                    
                    <th scope="col">Room Type</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allRoomType.map((room)=>{
                    return <tr>
                    <td>{room.roomType}</td>
                    <td><button className='btn btn-success' onClick={() => Update(room.roomType,room._id)}>Update</button></td>
                    <td><button className='btn btn-danger' onClick={() => Delete(room.roomType,room._id)}>Delete</button></td>
                  </tr>
                  })}
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>

      <Modal open={openUpdate} onClose={onCloseModalUpdate} center classNames={{width:110}}>
      <div className="card mb-6 ">
      <div className="card mb-4">
                    <h5 className="card-header">Update Room Category</h5>
                    <div className="card-body">
                      <div>
                      <label for="email"><b>Room Category</b></label>
                      <input type="email" className="form-control" placeholder="Guest Email" name="email" value={roomType}  onChange={e=>setRoomType(e.target.value)} required />
                      </div>
                      </div>
                      <button type="submit" className="btn btn-primary" onClick={(e)=>handleRoomTypeUpdate(e)}>Update</button>
                    </div>
                    </div>
    </Modal>

    
    <Modal open={openDelete} onClose={onCloseModalDelete} center classNames={{width:110}}>
      <div className="card mb-6 ">
      <div className="card mb-4">
                    <h5 className="card-header">Delete Room Category</h5>
                    <div className="card-body">
                      <div>
                      <label for="username"><b> Are you sure you want to delete room category - {roomType} ?? </b></label>
                 </div>
                      </div>
                      <button type="submit" className="btn btn-primary" onClick={(e)=>handleDeleteRoomType(e)}>Delete</button>
                    </div>
                    </div>
    </Modal>
    </section>

   </main>
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
            <Footer />


        </>
    )

}


export default UpdateRoomPrice;