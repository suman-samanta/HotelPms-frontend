
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

const UpdateRoom=(props)=>{
  const {user}=useContext(Context);
  const [allRoomType,setAllRoomType]=useState([]);
  const [roomType,setRoomType]=useState();
  const [roomNo,setRoomNo]=useState();
  const [roomPrice,setRoomPrice]=useState();
  const [roomName,setRoomName]=useState();
  const [roomFloor,setRoomFloor]=useState();
  const hotelId=user.hotelId;
  const [openPrice, setOpenPrice] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onOpenModalPrice = () => setOpenPrice(true);
  const onCloseModalPrice = () => setOpenPrice(false);

  const onOpenModalCategory = () => setOpenCategory(true);
  const onCloseModalCategory = () => setOpenCategory(false);

  const onOpenModalDelete = () => setOpenDelete(true);
  const onCloseModalDelete = () => setOpenDelete(false);
  


    const [rooms,setRooms]=useState([]);

    useEffect(()=>{
        const FindRoomTypeOptions=async()=>{
          const result=await axios.get(`${baseUrl}/hoteladmin/getRoomType/${hotelId}`);
          setAllRoomType(result.data);
          console.log(result.data);
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


       const priceUpdate=(roomNo,price)=> {
        setRoomNo(roomNo);
        setRoomPrice(price);
        onOpenModalPrice();
       }

       const categoryUpdate=(roomNo,category)=> {
        setRoomNo(roomNo);
        setRoomType(category);
        onOpenModalCategory();
        
       }

       const deleteRoom=(roomNo)=> {
        setRoomNo(roomNo);
        onOpenModalDelete();
        
       }


       const handleRoomUpdate=async(e)=>{
        e.preventDefault();
        try{
          const newData={
            rateCharges:roomPrice
          }
          const result=await axios.put(`${baseUrl}/hoteladmin/updateARoomPrice/${roomNo}/${hotelId}`,newData)
          .then(
            toast.success("Room Updated")
            
            )

          setRooms(result.data);
          onCloseModalPrice();
        }catch(err){
          console.log(err);
        }
       }

       const handleRoomTypeUpdate=async(e)=>{
        try{
          const newData={
            roomType:roomType
          }

          const result=await axios.put(`${baseUrl}/hoteladmin/updateARoom/${roomNo}/${hotelId}`,newData)
          .then(
            toast.success('RoomType Updated')
          )

          setRooms(result.data);
          onCloseModalCategory();
        }catch(err){
          console.log(err);

        }
       }


       const handleDeleteRoom=async(e)=>{
        try{
         
          const result=await axios.delete(`${baseUrl}/hoteladmin/deleteRoom/${roomNo}/${hotelId}`)
          .then(
            toast.success('Room Has been Deleted')
          )

          await axios.delete(`${baseUrl}/hoteladmin/deleteHousekeepingMaster/${hotelId}/${roomNo}`);
          onCloseModalDelete();
          setRooms(result.data);
           
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
                    <h1>Update Room</h1>
                </div>
                <section class="section">
                <ToastContainer />
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Update rooms here</h5>
              {/* <p>View all the bookings here</p> */}


              <table class="table datatable">
                <thead>
                  <tr>
                    <th scope="col">#Room No</th>
                    <th scope="col">Room Type</th>
                    <th scope="col">Room Charges</th>
                    <th scope="col">Update Room</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room)=>{
                    return <tr>
                    <th scope="row">{room.roomNo}</th>
                    <td>{room.roomType}</td>
                    <td>{room.rateCharges}</td>
                      <td><a className="icon" href="#" data-bs-toggle="dropdown"><a href="" title="Edit Booking">&#9998;</a></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li><a onClick={() => priceUpdate(room.roomNo,room.rateCharges)} className="dropdown-item">Update Price</a></li>
                          <li><a onClick={() => categoryUpdate(room.roomNo,room.roomType)} className="dropdown-item" href="#">Update Room Category</a></li>
                          <li><a onClick={() => deleteRoom(room.roomNo)} className="dropdown-item" href="#">Delete Room</a></li>
                        </ul></td>
                    </tr>
                  })}
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
    </section>
    <Modal open={openPrice} onClose={onCloseModalPrice} center classNames={{width:110}}>
      <div className="card mb-6 ">
      <div className="card mb-4">
                    <h5 className="card-header">Update Price</h5>
                    <div className="card-body">
                      <div>
                      <label for="username"><b>Room No</b></label>
                      <input type="text" className="form-control" placeholder="Guest Name" name="guestname" value={roomNo} disabled />                        
                      </div>
                      <div>
                      <label for="email"><b>Room Price</b></label>
                      <input type="email" className="form-control" placeholder="Guest Email" name="email" value={roomPrice}  onChange={e=>setRoomPrice(e.target.value)} required />
                      </div>
                      </div>
                      <button type="submit" className="btn btn-primary" onClick={(e)=>handleRoomUpdate(e)}>Update</button>
                    </div>
                    </div>
    </Modal>
    <Modal open={openCategory} onClose={onCloseModalCategory} center classNames={{width:110}}>
      <div className="card mb-6 ">
      <div className="card mb-4">
                    <h5 className="card-header">Update Category</h5>
                    <div className="card-body">
                      <div>
                      <label for="username"><b>Room No</b></label>
                      <input type="text" className="form-control" placeholder="Guest Name" name="guestname" value={roomNo} disabled />                        
                      </div>
                      <div>
                      <label for="email"><b>Room Category</b></label>
                      {/* <input type="email" className="form-control" placeholder="Guest Email" name="email" value={roomType}  onChange={e=>setRoomType(e.target.value)} required /> */}
                      <select className="form-control" onChange={e=>setRoomType(e.target.value)} required>

                      <option>{roomType}</option>
                      {allRoomType.filter(element=>element.roomType!=roomType).map((roomType)=>{
                        return (
                          <option>{roomType.roomType}</option>
                        )
                      })}
                        
                      </select>
                      </div>
                      </div>
                      <button type="submit" className="btn btn-primary" onClick={handleRoomTypeUpdate}>Update</button>
                    </div>
                    </div>
    </Modal>
    <Modal open={openDelete} onClose={onCloseModalDelete} center classNames={{width:110}}>
      <div className="card mb-6 ">
      <div className="card mb-4">
                    <h5 className="card-header">Delete Room</h5>
                    <div className="card-body">
                      <div>
                      <label for="username"><b> Are you sure you want to delete Room No: {roomNo} ?? </b></label>
                 </div>
                      </div>
                      <button type="submit" className="btn btn-primary" onClick={(e)=>handleDeleteRoom(e)}>Delete</button>
                    </div>
                    </div>
    </Modal>
   </main>
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
            <Footer />


        </>
    )

}


export default UpdateRoom;