import Header from "../Commons/Header";
import Menubar from "../Commons/Menubar"; 
import Footer from "../Commons/Footer";
import ReservationsCalender from "./Calender";

export default function Dashboard(props) {
    return (
      <>
      <Header userName={props.user} role={props.role}/>
      <Menubar/>
  
<main id="main" className="main">

<div className="pagetitle">
  <h1>Dashboard</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="index.html">Home</a></li>
      <li className="breadcrumb-item active">Dashboard</li>
    </ol>
  </nav>
</div>

<section className="section dashboard">
 <ReservationsCalender/>
</section>

</main>



<a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
<Footer/>
      </>
    );
  }