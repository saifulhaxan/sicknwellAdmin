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
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { BASE_URL } from "../../Api/apiConfig";
import './style.css'

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns';


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
  const [formData, setFormData] = useState({
    user_id: id
  });

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


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData)
  }

  const editMember = (firstName, middleName, lastName, dobData, relationMember, MemberID) => {

    const originalDate = new Date(dobData);
    const formattedDate = format(originalDate, 'yyyy-MM-dd');
    setFormData(
      {
        ...formData,
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        dob: formattedDate,
        relation_to_member1: relationMember,
        member_id: MemberID
      }
    )

    setShowModal(true)
  }
  const handleUpdateMember = () => {
    document.querySelector('.loaderBox').classList.remove('d-none')

    // Create a new FormData object
    const formDataMethod = new FormData()
    for (const key in formData) {
      formDataMethod.append(key, formData[key])
    }

    // Make the fetch request
    fetch(`${BASE_URL}api/v1/member/update_member_admin/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${LogoutData}`
      },
      body: formDataMethod // Use the FormData object as the request body
    })
      .then(response => {
        document.querySelector('.loaderBox').classList.add('d-none')
        return response.json();
      })
      .then(data => {
        document.querySelector('.loaderBox').classList.add('d-none')
        console.log(data);
        setShowModal(false)
        setShowModal4(true);
        setTimeout(() => {
          setShowModal4(false);
        }, 1500)

        MembersDetail();



      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add('d-none')
        console.log(error);
      })
  }


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
                      <h4 className="secondaryLabel">Last Name</h4>
                      <p className="secondaryText">{profileData?.last_name}</p>
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
                                    <div className="row position-relative">
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
                                      {item?.membership_card_pdf && (
                                        <div className="col-xl-4 col-md-4 mb-3">
                                          <h4 className="secondaryLabel">Membership Card</h4>
                                          <p className="secondaryText"><a className="pdfCover" href={`https://member.sicknwell.com${item?.membership_card_pdf}`} download target="_blank"><FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon></a></p>
                                          {/* <button type="button" className="customButton primaryButton mb-3" onClick={handleSendEmail}>Send Membership Card</button> */}
                                        </div>
                                      )}
                                      <div className="col-md-12">
                                        <div className="editMember">
                                          <button type="button" onClick={() => { editMember(item?.first_name, item?.middle_name, item?.last_name, item?.dob, item?.relation_to_member1, item?.id) }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                                        </div>
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

        {/* <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
        <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

        <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />*/}
        <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Member Updated Successfully!' />

        <CustomModal show={showModal} close={() => { setShowModal(false) }} >
          <CustomInput
            label="Edit First Name"
            type="text"
            placeholder="Edit First Name"
            required
            name="first_name"
            labelClass='mainLabel'
            inputClass='mainInput'
            value={formData?.first_name}
            onChange={handleChange}

          />

          <CustomInput
            label="Edit Middle Name"
            type="text"
            placeholder="Edit Middle Name"
            required
            name="middle_name"
            labelClass='mainLabel'
            inputClass='mainInput'
            value={formData?.middle_name}
            onChange={handleChange}

          />

          <CustomInput
            label="Edit Last Name"
            type="text"
            placeholder="Edit Last Name"
            required
            name="last_name"
            labelClass='mainLabel'
            inputClass='mainInput'
            value={formData?.last_name}
            onChange={handleChange}

          />

          <CustomInput
            label="Edit DOB"
            type="date"
            placeholder="Edit DOB Name"
            required
            name="dob"
            labelClass='mainLabel'
            inputClass='mainInput'
            value={formData?.dob}
            onChange={handleChange}

          />

          <CustomInput
            label="Edit Relation"
            type="text"
            placeholder="Edit Relation"
            // required
            name="relation_to_member1"
            labelClass='mainLabel'
            inputClass='mainInput'
            value={formData?.relation_to_member1}
            onChange={handleChange}

          />


          <CustomButton variant='primaryButton' text='Update' type='button' onClick={handleUpdateMember} />
        </CustomModal>
      </DashboardLayout>
    </>
  );
};

export default MemeberDetails;
