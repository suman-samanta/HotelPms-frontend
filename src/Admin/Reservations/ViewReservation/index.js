
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../../Context/Context';
import { ToastContainer, toast } from 'react-toastify';
import Header from "../../Commons/Header";
import Menubar from "../../Commons/Menubar";
import Footer from "../../Commons/Footer";
import { Modal } from 'react-responsive-modal';
// import "../ViewReservation/styles.css";
// import "../ViewReservation/viewres.css"
//import "../ViewReservation/modal.css";
const baseUrl=require('../../../Utils/config/default');



const ViewReservations = (props) => {
  const { user } = useContext(Context)
  const hoteladminemail = user.email;
  const hotelAdminId = user._id;
  const hotelId = user.hotelId;
  const [reservations, setReservations] = useState([]);
  const [resId, setResId] = useState();
  const [roomId, setRoomId] = useState();
  const [guestName, setGuestName] = useState();
  const [guestEmail, setGuestEmail] = useState();
  const [guestContact, setGuestContact] = useState();
  const [currentPayment, setCurrentPayment] = useState(0);
  const [advancePayment, setAdvancePayment] = useState();
  const [paymentMode, setPaymentMode] = useState();
  const [roomNo, setRoomNo] = useState();

  const [modalStatus, setModalStatus] = useState(false);
  const [guestSearchInput,setGuestSearchInput]=useState();

  let resrev = [];

  useEffect(() => {
    const getreservations = async () => {
      const res = await axios.get(`http://localhost:5000/server/hoteladmin/getReservationDetails/${hotelId}`);
      // let j = 0;
      // for (var i = res.data.length - 1; i >= 0; i--) {
      //   resrev[j] = res.data[i];
      //   j++;
      // }

      resrev=res.data
      resrev.reverse();
      setReservations(resrev);

    }

    getreservations();

  }, [])



  const [openRes, setOpenRes] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

  const onOpenModal = () => setOpenRes(true);
  const onCloseModal = () => setOpenRes(false);


  const handleCancelReservation = async () => {
    try {
      const res = await axios.put(`${baseUrl}/hoteladmin/deleteRooms/${resId}/${roomId}`).then(
        toast.success(`Reservation cancelled`)
      )
      setReservations(res.data);
    } catch (err) {
      console.log(err);
    }
  }



  const UpdatePayment = async (resId, roomNo) => {
    const res = await axios.get(`${baseUrl}/hoteladmin/getAdvancePayment/${resId}`)

    setAdvancePayment(res.data.advancePayment)
    setResId(resId)
    setOpenPay(true);


  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData()
    formData.append('advancePayment', advancePayment)

    try {
      const res = await axios.put(`${baseUrl}/hoteladmin/addpayment/${resId}`, formData)
        .then(toast.success(`Payment Added`))
      setReservations(res.data)
      setOpenPay(false);
    } catch (err) {
      toast.error(err.data);
      setOpenPay(false);
    }


  }

  const PrintPdf = async (refNo, guestContact) => {

    // var modal = document.getElementById("myModal");
    // var span = document.getElementsByClassName("close")[0];
    //   modal.style.display = "block"
    //   span.onclick = function() {
    //   modal.style.display = "none"
    // }
    // window.onclick = function(event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none"
    //   }
    // }
    const newData = {
      refNo: refNo,
      guestContact: guestContact
    }

    try {

      const res = await axios.post(`${baseUrl}/hoteladmin/invoiceGenerate/${hotelId}`, newData)

        .then(toast.success("pdf Has been Downloaded to your deskTop"));

    } catch (err) {
      toast.error("pdf Downloading failed")
    }

  }


  const handleReEmailGenerate = async (resId, hotelAdminId, roomNO) => {
    const res = await axios.post(`${baseUrl}/hoteladmin/ReEmailGenerate/${resId}/${hotelAdminId}`)
      .then(
        toast.success("Mail Sent!!")

      ).catch(err => {
        toast.error(err)

      })
  }

  const handleAddPayment = () => {
    console.log(typeof (currentPayment))
    setAdvancePayment(advancePayment + Number(currentPayment))
  }

  const UpdateReservation = (resId, roomId, guestName, guestEmail, guestContact, roomNo) => {
    setResId(resId);
    setRoomId(roomId);
    setGuestName(guestName);
    setGuestEmail(guestEmail);
    setGuestContact(guestContact);
    onOpenModal();
  }

  const handleUpdateSubmit = async (e) => {

    e.preventDefault();

    try {

      let formData = new FormData()
      formData.append('guestName', guestName)
      formData.append('guestEmail', guestEmail)
      formData.append('guestContact', guestContact)

      const result = await axios.put(`${baseUrl}/hoteladmin/updateGuestInfo/${resId}/${roomId}`, formData)
        .then(
          toast.success(`Reservation Updated`)
        )
      onCloseModal();
      setReservations(result.data);
    }
    catch (err) {
      console.log(err)
      onCloseModal();
    }
  }

  const DeleteReservation = (resId, roomId, roomNo) => {
    setResId(resId);
    setRoomId(roomId);
    setRoomNo(roomNo);
    setOpenCancel(true);
  }


  const handleresSearch = async (e) => {
    e.preventDefault();
    const guestContact = e.target.value;

    setGuestSearchInput(e.target.value);

    const newData = {
      guestContact: guestContact
    }
    try {
      const reservationRes = await axios.post(`${baseUrl}/hoteladmin/getReservationsByContactNo/${hotelId}`, newData);
      let j = 0;
      for (var i = reservationRes.data.length - 1; i >= 0; i--) {
        resrev[j] = reservationRes.data[i];
        j++;
      }
      setReservations(resrev);
    } catch (err) {
      console.log(err);
    }
  }


  const handleresSearchClick = async (e) => {
    e.preventDefault();

    const newData = {
      guestContact: guestSearchInput
    }
    try {
      const reservationRes = await axios.post(`${baseUrl}/hoteladmin/getReservationsByContactNo/${hotelId}`, newData);

      let j = 0;

      for (var i = reservationRes.data.length - 1; i >= 0; i--) {
        resrev[j] = reservationRes.data[i];
        j++;
      }
      setReservations(resrev);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header userName={props.user} role={props.role} />
      <Menubar />
      <main id="main" className="main">

        <div className="pagetitle">
          <h1>View Reservation</h1>
        </div>


        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <ToastContainer />
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Reservations/Bookings</h5>
                  <p>View all the bookings here</p>

                  <div id="header" className="header d-flex align-items-center">

                    <div className="search-bar">
                      <form className="search-form d-flex align-items-center">
                        <input type="text" name="query" placeholder="Search" title="Enter search keyword" onChange={e => handleresSearch(e)} />
                        <button type="submit" title="Search"><i className="bi bi-search" onClick={(e)=>handleresSearchClick(e)}></i></button>
                      </form>
                    </div>

                  </div>

                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Dates</th>
                        <th scope="col">Room</th>
                        <th scope="col">PAX</th>
                        <th scope="col">Total</th>
                        <th scope="col">Deposit</th>
                        <th scope="col">Source</th>
                        <th scope="col">Ph Number</th>
                        <th scope="col">Agent</th>
                        <th scope="col">Modify</th>
                      </tr>
                    </thead>
                    {reservations.map((reservation, index) => {
                      return (
                        <tbody>

                          {reservation.roomInfo.map((room, id) => {
                            return (
                              <tr
                              //  onMouseLeave={()=>hideList(room.roomNo)}
                              >

                                <td>{reservation.refNo}</td>
                                <td >
                                  <a>{room.guestName}<span className="expand"></span></a>
                                </td>
                                <td>{reservation.checkInDate} <br /> {reservation.checkOutDate}</td>
                                <td>{room.roomType}</td>
                                <td>{room.adult}/{room.child}</td>
                                <td>{reservation.totalPrice}</td>
                                <td>{reservation.advancePayment}</td>
                                <td>{reservation.agent}</td>
                                <td>{reservation.guestContact}</td>
                                <td>{reservation.hotelEmail}</td>
                                <td> <a className="icon" href="#" data-bs-toggle="dropdown"><a href="" title="Edit Booking">&#9998;</a></a>
                                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li><a onClick={() => UpdateReservation(reservation._id, room.roomId, room.guestName, reservation.guestEmail, reservation.guestContact, room.roomNo)} className="dropdown-item">Update Booking</a></li>
                                    <li><a onClick={() => UpdatePayment(reservation._id, room.roomNo)} className="dropdown-item" href="#">Update Payment</a></li>
                                    <li><a onClick={() => DeleteReservation(reservation._id, room.roomId, room.roomNo)} className="dropdown-item" href="#">Cancel Booking</a></li>
                                    <li><a onClick={() => handleReEmailGenerate(reservation._id, hotelAdminId, room.roomNo)} className="dropdown-item" href="#">Email Booking</a></li>
                                    <li><a onClick={() => PrintPdf(reservation.refNo, reservation.guestContact)} className="dropdown-item" href="#">Download Booking</a></li>
                                  </ul></td>
                              </tr>
                            );

                          })}
                        </tbody>
                      )
                    })}
                  </table>

                </div>
              </div>
            </div>
          </div>



          <Modal open={openRes} onClose={onCloseModal} center classNames={{ width: 110 }}>
            <div className="card mb-6 ">
              <div className="card mb-4">
                <h5 className="card-header">Update Reservation</h5>
                <div className="card-body">
                  <div>
                    <label for="username"><b>Guest Name</b></label>
                    <input type="text" className="form-control" placeholder="Guest Name" name="guestname" value={guestName} onChange={e => setGuestName(e.target.value)} required />
                  </div>
                  <div>
                    <label for="email"><b>Guest Email</b></label>
                    <input type="email" className="form-control" placeholder="Guest Email" name="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} required />
                  </div>
                  <div>
                    <label for="Number"><b>Guest Contact No.</b></label>
                    <input type="Number" className="form-control" placeholder="Guest Contact No." name="Number" value={guestContact} onChange={e => setGuestContact(e.target.value)} required />
                  </div>

                </div>
                <button type="submit" className="btn btn-primary" onClick={()=>handleUpdateSubmit()}>Update Reservation</button>
              </div>
            </div>
          </Modal>
          <Modal open={openPay} onClose={() => setOpenPay(false)} center classNames={{ width: 110 }}>

            <div className="form-popup" id="myForm2">
              <form className="form-container" >
                <h5>Add Payment</h5>

                <label for="Payment"><b>Advance Payment</b></label>
                <input type="Number" placeholder="Paid Now" name="payment" onChange={e => setCurrentPayment(e.target.value)} onBlur={handleAddPayment} />

                <div>
                  <label for="cars">Payment mode</label>
                  <select id="cars" name="cars" className='form-control' onChange={e => setPaymentMode(e.target.value)}>
                    <option value="volvo">Select</option>
                    <option value="volvo">cash</option>
                    <option value="saab">CC</option>
                    <option value="fiat">Card</option>
                  </select>
                </div>
                <div>
                <label for="fullPayment"><b>Total Advance Payment</b></label>
                <input type="Number" placeholder="Total Payment" name="fullPayment" required value={advancePayment} />
                </div>
                <div>
                <button type="submit" className="btn btn-primary" onClick={e => handlePaymentSubmit(e)}>Submit</button>
                </div>
              </form>
            </div>
          </Modal>

          <Modal open={openCancel} onClose={() => setOpenCancel(false)} center classNames={{ width: 110 }}>

            <div className="form-popup" id="myForm2">
              <form className="form-container" >
                <h2>Cancel Booking</h2>

                <label for="Payment">Are you sure you want to cancel this booking?</label>

                <button type="submit" className="btn btn-primary" onClick={e => handleCancelReservation(e)}>Submit Form</button>
                {/* <button type="button" className="btn cancel" onClick={closeForm2}>Close</button> */}
              </form>
            </div>
          </Modal>

          {/* <div id="myModal" className="modal">

      <div className="modal-content">
        <div className="close">&times;</div>
        <iframe width="100%" height="500px" src='https://www.clickdimensions.com/links/TestPDFfile.pdf'></iframe>

        <button className='btn btn-success'>Download</button>
        &nbsp;&nbsp;
        <button className='btn btn-primary'>Share</button>
      </div>

    </div> */}
        </section>

      </main>
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
      <Footer />


    </>
  )

}


export default ViewReservations;