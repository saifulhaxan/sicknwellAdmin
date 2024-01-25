/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 05/12/2023 - 00:20:56
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 05/12/2023
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import { BASE_URL } from "../../Api/apiConfig";
import './style.css'

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

const MemeberDetails = () => {

  const { id } = useParams();
  const LogoutData = localStorage.getItem('login');
  console.log(LogoutData)


  const [profileData, setProfileData] = useState({});
  const [memberData, setMemberData] = useState();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const Active = () => {
    setShowModal3(false)
    setShowModal4(true)
  }

  // primay user detial 

  const PrimaryUserDetai = () => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    document.querySelector('body').classList.add('loaderShow');
    fetch(`${BASE_URL}api/v1/users/${id}/`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${LogoutData}`
        },
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setProfileData(data)
        document.querySelector('.loaderBox').classList.add("d-none");
        document.querySelector('body').classList.remove('loaderShow');
        console.log(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        document.querySelector('body').classList.remove('loaderShow');
        console.log(error);
      })
  }


  const MembersDetail = () => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    document.querySelector('body').classList.add('loaderShow');
    fetch(`${BASE_URL}api/v1/member/get_members/?user_id=${id}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${LogoutData}`
        },
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setMemberData(data)
        document.querySelector('.loaderBox').classList.add("d-none");
        document.querySelector('body').classList.remove('loaderShow');
        // console.log(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        document.querySelector('body').classList.remove('loaderShow');
        console.log(error);
      })
  }

  console.log(memberData)

  useEffect(() => {
    PrimaryUserDetai()
    MembersDetail()
  }, []);


  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Members Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row mb-3 justify-content-between">
                <div className="col-md-4">
                  <h2 className="mainTitle">
                    Primary User
                  </h2>
                </div>
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  {/* <button onClick={() => {
                    profileData.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {profileData.status ? 'Inactive' : 'Active'}</button> */}
                  <span className={`statusBadge ${profileData?.is_active == true ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{profileData.is_active == true ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">

                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">First Name</h4>
                      <p className="secondaryText">{profileData?.first_name}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Email Address</h4>
                      <p className="secondaryText">{profileData?.email}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">User Name</h4>
                      <p className="secondaryText">{profileData?.username}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Additional Members</h4>
                      <p className="secondaryText">{`${profileData?.additional_member} Members`}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Plan</h4>
                      <p className="secondaryText">{profileData?.additional_member == '0' ? 'Individual Plan' : profileData?.additional_member == '1' ? "Couple Plan" : "Family Plan"} </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* fiamily member  */}


              {
                memberData != "" ? (
                  <div className="row py-4">
                    <div className="col-md-12">
                      <h2 className="mainTitle mb-4">
                        Family Members
                      </h2>
                    </div>
                    <div className="col-md-12 tabSection">
                      <Tab.Container id="left-tabs-example" defaultActiveKey="Member 1">
                        <Row>
                          <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                              {
                                memberData && memberData?.map((item, index) => (
                                  <Nav.Item>
                                    <Nav.Link eventKey={`Member ${index + 1}`}>{`Member ${index + 1}`}</Nav.Link>
                                  </Nav.Item>
                                ))
                              }

                            </Nav>
                          </Col>
                          <Col sm={9}>
                            <Tab.Content>
                              {
                                memberData && memberData?.map((item, index) => (
                                  <Tab.Pane eventKey={`Member ${index + 1}`}>
                                    <div className="row">
                                      <div className="col-xl-4 col-md-4 mb-3">
                                        <h4 className="secondaryLabel">First Name</h4>
                                        <p className="secondaryText">{item?.first_name}</p>
                                      </div>
                                      <div className="col-xl-4 col-md-4 mb-3">
                                        <h4 className="secondaryLabel">Middle Name</h4>
                                        <p className="secondaryText">{item?.middle_name}</p>
                                      </div>
                                      <div className="col-xl-4 col-md-4 mb-3">
                                        <h4 className="secondaryLabel">Last Name</h4>
                                        <p className="secondaryText">{item?.last_name}</p>
                                      </div>
                                      <div className="col-xl-4 col-md-4 mb-3">
                                        <h4 className="secondaryLabel">DOB</h4>
                                        <p className="secondaryText">{item?.dob}</p>
                                      </div>
                                      <div className="col-xl-4 col-md-4 mb-3">
                                        <h4 className="secondaryLabel">Relation to Primary Member</h4>
                                        <p className="secondaryText">{item?.relation_to_member1} </p>
                                      </div>
                                    </div>
                                  </Tab.Pane>
                                ))
                              }

                            </Tab.Content>
                          </Col>
                        </Row>
                      </Tab.Container>
                    </div>
                  </div>
                ) : (
                  <div className="text-left">
                    <h5 className="text-danger">No Members in Indvidual Plan.</h5>
                  </div>
                )
              }
            </div>
          </div>
        </div>

        <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
        <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

        <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
        <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
      </DashboardLayout>
    </>
  );
};

export default MemeberDetails;
