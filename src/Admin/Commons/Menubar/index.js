import { Link } from "react-router-dom"

export default function Menubar() {
    return (
        <>

            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                <Link to="/dashboard"><li className="nav-item">
                        <a className="nav-link " >
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li></Link>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-menu-button-wide"></i><span>Reservation</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                         <li>
                         <Link to="/addReservation">
                                    <i className="bi bi-circle active"></i><span>Add Reservation</span>
                                    </Link>
                            </li>
                             <li>
                             <Link to="/viewReservation">
                                    <i className="bi bi-circle"></i><span>View Reservation</span>
                                    </Link>
                            </li>
                             {/* <li>
                             <Link to="/cancelReservation">
                                    <i className="bi bi-circle"></i><span>Cancel Reservation</span>
                                    </Link>
                            </li> */}
                            <li>
                             <Link to="/checkin">
                                    <i className="bi bi-circle"></i><span>CheckIn</span>
                                    </Link>
                            </li>
                            <li>
                             <Link to="/checkout">
                                    <i className="bi bi-circle"></i><span>Checkout</span>
                                    </Link>
                            </li>
                            <li>
                             <Link to="/recheckin">
                                    <i className="bi bi-circle"></i><span>Re-Checkin</span>
                                    </Link>
                            </li>
                            <li>
                             <Link to="/roomshifting">
                                    <i className="bi bi-circle"></i><span>Room Shifting</span>
                                    </Link>
                            </li>
                            <li>
                             <Link to="/reservationbilling">
                                    <i className="bi bi-circle"></i><span>Reservation Billing</span>
                                    </Link>
                            </li>
                            <li>
                             <Link to="/paxcheckout">
                                    <i className="bi bi-circle"></i><span>Pax Checkout</span>
                                    </Link>
                            </li>
                            
                            
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-journal-text"></i><span>Room Management</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                            <Link to="/addroom">
                                    <i className="bi bi-circle"></i><span>Add Room</span>
                                    </Link>
                            </li>
                            {/*<li>
                             <Link to="/updateroomprice">
                                    <i className="bi bi-circle"></i><span>Update Room Price</span>
                                    </Link>
                            </li> */}
                            <li>
                            <Link to="/roomcategory">
                                    <i className="bi bi-circle"></i><span>Room Category</span>
                                    </Link>
                            </li>
                            <li>
                            <Link to="/updateroom">
                                    <i className="bi bi-circle"></i><span>Update Room</span>
                                    </Link>
                            </li>
                        </ul>
                    </li>

                     <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-layout-text-window-reverse"></i><span>House Keeping</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                            <Link to="/roomstatus">
                                    <i className="bi bi-circle"></i><span>Room Status</span>
                                    </Link>
                            </li>
                            <li>
                            <Link to="/taskassign">
                                    <i className="bi bi-circle"></i><span>Task Assign</span>
                                    </Link>
                            </li>
                            {/* <li>
                            <Link to="/scheduletask">
                                    <i className="bi bi-circle"></i><span>Schedule Task</span>
                                    </Link>
                            </li> */}
                            <li>
                            <Link to="/scheduletaskstatus">
                                    <i className="bi bi-circle"></i><span>Schedule Task Status</span>
                                    </Link>
                            </li>
                        </ul>
                    </li>

                   {/* <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-bar-chart"></i><span>Charts</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="charts-chartjs.html">
                                    <i className="bi bi-circle"></i><span>Chart.js</span>
                                </a>
                            </li>
                            <li>
                                <a href="charts-apexcharts.html">
                                    <i className="bi bi-circle"></i><span>ApexCharts</span>
                                </a>
                            </li>
                            <li>
                                <a href="charts-echarts.html">
                                    <i className="bi bi-circle"></i><span>ECharts</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-gem"></i><span>Icons</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="icons-bootstrap.html">
                                    <i className="bi bi-circle"></i><span>Bootstrap Icons</span>
                                </a>
                            </li>
                            <li>
                                <a href="icons-remix.html">
                                    <i className="bi bi-circle"></i><span>Remix Icons</span>
                                </a>
                            </li>
                            <li>
                                <a href="icons-boxicons.html">
                                    <i className="bi bi-circle"></i><span>Boxicons</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-heading">Pages</li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="users-profile.html">
                            <i className="bi bi-person"></i>
                            <span>Profile</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-faq.html">
                            <i className="bi bi-question-circle"></i>
                            <span>F.A.Q</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-contact.html">
                            <i className="bi bi-envelope"></i>
                            <span>Contact</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-register.html">
                            <i className="bi bi-card-list"></i>
                            <span>Register</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-login.html">
                            <i className="bi bi-box-arrow-in-right"></i>
                            <span>Login</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-error-404.html">
                            <i className="bi bi-dash-circle"></i>
                            <span>Error 404</span>
                        </a>
                    </li>*/}

                    <li className="nav-item">
                    <Link to="/nightClosure">
                        <a className="nav-link collapsed">
                            <i className="bi bi-file-earmark"></i>
                            <span>Night Closure *</span>
                            </a>
                            </Link>
                    </li> 

                </ul>

            </aside>
        </>
    )
}