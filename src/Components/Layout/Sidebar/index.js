/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 14/12/2023 - 23:44:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/12/2023
    * - Author          : Saif
    * - Modification    : 
**/
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUser,
  faEye,
  faMoneyBill,
  faTasks,
  faHistory
} from "@fortawesome/free-solid-svg-icons";
import {
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import "./style.css";

export const Sidebar = (props) => {

  const location = useLocation()
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/dashboard') ? 'active' : ''}`} to="/dashboard">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/user-management') ? 'active' : ''}`} to="/user-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMessage} />
            </span>
            <span className="sideLinkText">User Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/member-management') ? 'active' : ''}`} to="/member-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Members Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/company-management') ? 'active' : ''}`} to="/company-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Company Management</span>
          </Link>
        </li>

        {/* <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/#') ? 'active' : ''}`} to="/#">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span className="sideLinkText">Subscription Management</span>
          </Link>
        </li> */}

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/provider-management') ? 'active' : ''}`} to="/provider-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faHistory} />
            </span>
            <span className="sideLinkText">Provider Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/faqs') ? 'active' : ''}`} to="/faqs">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faHistory} />
            </span>
            <span className="sideLinkText">Faqs Management</span>
          </Link>
        </li>

      </ul>
    </div>
  );
};
