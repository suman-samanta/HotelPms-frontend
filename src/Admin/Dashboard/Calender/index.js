import { useState,useEffect, useContext } from "react";
import Header from "../../Commons/Header";
import Menubar from "../../Commons/Menubar";
import Footer from "../../Commons/Footer";
import Modal from "../../Commons/Modal";

import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
 import './calender.css'
import { Context } from "../../../Context/Context";

 const baseUrl=require('../../../Utils/config/default')


 const  ReservationsCalender=(props)=>{
    const [modalShow, setModalShow] = useState(false);

    const {user}=useContext(Context);

   

      const hotelId=user.hotelId;

      let today = new Date();
      let date1=today.getDay();
      let month = today.getMonth();
      let year = today.getFullYear();
    
      const day = new Date(year, month, date1) 
      let activeDay=day.toISOString();
      const dayName = day.toString().split(" ")[0];
     
      const IsoDate= moment(activeDay).toISOString(true);
    
      // const [data,setData]=useState({availableRooms:[],unavailableRooms:[]})
      const [availableRooms,setAvailableRooms]=useState([]);
      const [unavailableRooms,setUnavailableRooms]=useState([]);
      const [selectedDate,setSelectedDate]=useState(IsoDate);
     
      const calenderSaved=(date)=>{
        
        console.log(date,'calender saved');
        console.log(selectedDate);
        const res=axios.get(`${baseUrl}/hoteladmin/view/available/${date}/${hotelId}`)
        .then(res=>{
          setAvailableRooms(res.data.availableRooms);
          setUnavailableRooms(res.data.unavailableRooms);
          console.log(res.data.availableRooms);
        console.log(res.data.unavailableRooms);
        })
        
       .catch(err=>{
         console.log(err);
        });

        
       }
    
    
       const GetCalender=()=>{
      
      const calendar = document.querySelector(".calendar"),
      date = document.querySelector(".date"),
      daysContainer = document.querySelector(".days"),
      prev = document.querySelector(".prev"),
      next = document.querySelector(".next"),
      todayBtn = document.querySelector(".today-btn"),
      gotoBtn = document.querySelector(".goto-btn"),
      dateInput = document.querySelector(".date-input");
      const eventDay = document.querySelector(".event-day");
      const eventDate = document.querySelector(".event-date");
    
    
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    
      
      function initCalendar() {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const day = firstDay.getDay();
        const nextDays = 7 - lastDay.getDay() - 1;
        date.innerHTML = months[month] + " " + year;
        let days = "";
        for (let x = day; x > 0; x--) {
          days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
        }
      
        for (let i = 1; i <= lastDate; i++) {   
          if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
          ) {
            activeDay = i;
            getActiveDay(i);
              days += `<div class="day today active">${i}</div>`;      
          } else {     
              days += `<div class="day" id="thisDay">${i}</div>`;    
          }
        }
    
      
        for (let j = 1; j <= nextDays; j++) {
          days += `<div class="day next-date">${j}</div>`;
        }
        daysContainer.innerHTML = days;
        addListner();
      }
      
      
      function prevMonth() {
        month--;
        if (month < 0) {
          month = 11;
          year--;
        }
        initCalendar();
      }
      
      function nextMonth() {
        month++;
        if (month > 11) {
          month = 0;
          year++;
        }
        initCalendar();
      }
      
      prev.addEventListener("click", prevMonth);
      next.addEventListener("click", nextMonth);
      
      initCalendar();
    
      function addListner() {
        const days = document.querySelectorAll(".day");
        days.forEach((day) => {
          day.addEventListener("click", (e) => {
            getActiveDay(e.target.innerHTML);
            
            activeDay = Number(e.target.innerHTML);
            days.forEach((day) => {
              day.classList.remove("active");
            });
            if (e.target.classList.contains("prev-date")) {
              prevMonth();
              setTimeout(() => {
                const days = document.querySelectorAll(".day");
                days.forEach((day) => {
                  if (
                    !day.classList.contains("prev-date") &&
                    day.innerHTML === e.target.innerHTML
                    
                  ) {
                    day.classList.add("active");
                    
                  }
                });
              }, 100);
            } else if (e.target.classList.contains("next-date")) {
              nextMonth();
              setTimeout(() => {
                const days = document.querySelectorAll(".day");
                days.forEach((day) => {
                  if (
                    !day.classList.contains("next-date") &&
                    day.innerHTML === e.target.innerHTML
                  ) {
                    day.classList.add("active");
                  }
                });
              }, 100);
            } else {
              e.target.classList.add("active");
            }
          });
        });
      }
      
      todayBtn.addEventListener("click", () => {
        today = new Date();
        month = today.getMonth();
        year = today.getFullYear();
        initCalendar();
      });
      
      dateInput.addEventListener("input", (e) => {
        dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
        if (dateInput.value.length === 2) {
          dateInput.value += "/";
        }
        if (dateInput.value.length > 7) {
          dateInput.value = dateInput.value.slice(0, 7);
        }
        if (e.inputType === "deleteContentBackward") {
          if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
          }
        }
      });
      
      gotoBtn.addEventListener("click", gotoDate);
      
      function gotoDate() {
        console.log("here");
        const dateArr = dateInput.value.split("/");
        if (dateArr.length === 2) {
          if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
          }
        }
        alert("Invalid Date");
      }
      
      
    
      function GetIsoStringDate(date,month,year){
        const day = new Date(year, month, date) 
      let activeDay=day.toISOString();
      const dayName = day.toString().split(" ")[0];
     
      const IsoDate= moment(activeDay).toISOString(true);
      eventDay.innerHTML = dayName;
      eventDate.innerHTML = date + " " + months[month] + " " + year;
    
      return IsoDate;
      };
      
      function getActiveDay(date) {
      
        console.log(date,'get active day');
    
        let IsoDateClicked=GetIsoStringDate(date,month,year)
    
        // setSelectedDate(date);
        calenderSaved(IsoDateClicked);
      }
          }
    
      useEffect(()=>{
        GetCalender() ;
      },[selectedDate])
    

      const showModal=(e)=>{
        setModalShow(!modalShow);
        console.log(modalShow);
      }


    return(

     

 <div className="container-calender">
      <div className="left">
        <div className="calendar" id='calender'>
          <div className="month">
            <i className="fas fa-angle-left prev"></i>
            <div className="date">december 2015</div>
            <i className="fas fa-angle-right next"></i>
          </div>
          <div className="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="days"></div>
          <div className="goto-today">
            <div className="goto">
              <input type="text" placeholder="mm/yyyy" className="date-input" />
              <button className="goto-btn">Go</button>
            </div>
            <button className="today-btn">Today</button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="today-date">
          <div className="event-day">wed</div>
          <div className="event-date">12th december 2022</div>
        </div>
        <div className="events">

        <label>Available Rooms</label>

        <table id="example" className="table table-striped table-bordered dt-responsive nowrap" >
                                            <thead>
                                                <tr className="table-success" role="row" >
                                                    <th>Available Room NO</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                  availableRooms.map((element)=>(
                                                    // <tr>
                                                    //  <td>{element.roomNo}</td>
                                                    // </tr>
                                                    <span>{element.roomNo},</span>
                                                  ))
                                                }

                                                </tbody>
                                        </table>

                <label>Resevered Rooms</label>

                <table id="example" className="table table-striped table-bordered dt-responsive nowrap" >
                                    <thead>
                                        <tr className="table-danger" role="row" >
                                            <th>Resevered Room NO</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                          unavailableRooms.map((element)=>(
                                            // <tr>
                                            //  <td>{element.roomNo}</td>
                                            // </tr>
                                            <span>{element.roomNo},</span>
                                          ))
                                        }

                                        </tbody>
                                </table>                         
        </div>
       
      </div>
    
    </div>
    )
}

export default ReservationsCalender;