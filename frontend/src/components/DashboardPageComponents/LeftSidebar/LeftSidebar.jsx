import React from 'react';
import './LeftSidebar.css';

// images 
import logo from "../../../assets/images/logo.png"
import TopNavbar from '../../common/TopNavbar/TopNavbar';
import SideBarNumbers from '../../DashboardPageComponents/SideBarNumbers/SideBarNumbers.jsx';
import IdentityCard from '../IdentityCard/IdentityCard.jsx';

const LeftSidebar = () => {
  return (
    <div className="left-sidebar--deshboard" >
      <div className='top-logo-name'>
        <span><img className='top-logo' src={logo} alt="" /></span>
        <h3>EduBridge</h3>
      </div>
      <TopNavbar/>
      <SideBarNumbers/>
      <IdentityCard/>
    </div>
  );
};

export default LeftSidebar;

