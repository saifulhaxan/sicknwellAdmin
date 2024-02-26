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
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const CompanyDetails = () => {

  const { id } = useParams();
  const LogoutData = localStorage.getItem('login');
  console.log(LogoutData)


  const [profileData, setProfileData] = useState({});
  const [memberData, setMemberData] = useState();
  const [formData, setFormData] = useState({
    product_name: 'COMPANY PLAN',
    product_price: '',
    product_status: 'Active',
    product_description: profileData?.company_name,
    interval: 'month',
    product_type: 'company',
    company_id: profileData?.id
  });

  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEditSubscription, setShowEditSubscription] = useState(false);




  // primay user detial 

  const PrimaryUserDetai = () => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${BASE_URL}api/v1/users/${id}/company_details/`,
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      product_price: parseInt(e.target.value),
      product_description: profileData?.company_name,
      company_id: profileData?.id
    });
    console.log(formData)
  }


  const handleSubmit = (e) => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${BASE_URL}company_product_admin/`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${LogoutData}`
        },
        body: JSON.stringify(formData)
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setProfileData(data)
        document.querySelector('.loaderBox').classList.add("d-none");
        // document.querySelector('body').classList.remove('loaderShow');
        setShowModal(false);
        console.log(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        // document.querySelector('body').classList.remove('loaderShow');
        console.log(error);
      })
  }

  const handleEditPrice = (e) => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${BASE_URL}company_price_update/${profileData?.id}/${formData?.product_price}/`,
      {
        method: 'POST',
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
        // document.querySelector('body').classList.remove('loaderShow');
        setShowEdit(false);
        console.log(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        // document.querySelector('body').classList.remove('loaderShow');
        console.log(error);
      })
  }

  const handleEditSubscription = (e) => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${BASE_URL}company_product_admin/`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${LogoutData}`
        },
        body: JSON.stringify(formData)
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setProfileData(data)
        document.querySelector('.loaderBox').classList.add("d-none");
        // document.querySelector('body').classList.remove('loaderShow');
        setShowModal(false);
        console.log(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        // document.querySelector('body').classList.remove('loaderShow');
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
            <div className="col-6 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Company Details
              </h2>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              {/* {
                profileData?.subscription_status && profileData?.allowed_employees ? (
                  <button type="button" onClick={() => { setShowEdit(true) }} className="btn border-0">
                    <FontAwesomeIcon icon={faEdit} />
                    Edit Package Price
                  </button>
                ) : (

                  <button type="button" onClick={() => { setShowModal(true) }} className="btn border-0">
                    <FontAwesomeIcon icon={faEdit} />
                    Add Package Price
                  </button>
                )
              } */}

              {
                profileData?.stripe_product_id == '' ? (
                  <button type="button" onClick={() => { setShowModal(true) }} className="btn border-0">
                    <FontAwesomeIcon icon={faEdit} />
                    Add Package Price
                  </button>
                ) : (
                  <button type="button" onClick={() => { setShowEdit(true) }} className="btn border-0">
                    <FontAwesomeIcon icon={faEdit} />
                    Edit Package Price
                  </button>
                )
              }





            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row mb-3 justify-content-between">
                <div className="col-md-4">
                  <h2 className="mainTitle">
                    Primary Info Company
                  </h2>
                </div>
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  {/* <button onClick={() => {
                    profileData.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {profileData.status ? 'Inactive' : 'Active'}</button> */}
                  {/* <span className={`statusBadge ${profileData?.is_active == true ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{profileData.is_active == true ? 'Active' : 'Inactive'}</span> */}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Company Name</h4>
                      <p className="secondaryText">{profileData?.company_name}</p>
                    </div>

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
                      <h4 className="secondaryLabel">Current Empoyees</h4>
                      <p className="secondaryText">{`${profileData?.number_of_employees} Employee`}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Address</h4>
                      <p className="secondaryText">{profileData?.address}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">City</h4>
                      <p className="secondaryText">{profileData?.city}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Zipcode</h4>
                      <p className="secondaryText">{profileData?.zip_code}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row align-items-center justify-content-between">
                <div className="col-md-7 my-4">
                  <h2 className="mainTitle">
                    Subscription Details
                  </h2>
                </div>
                <div className="col-md-5 text-right">
                   {/* <button type="button" onClick={() => { setShowEdit(true) }} className="btn border-0">
                    <FontAwesomeIcon icon={faEdit} />
                    Edit Subscription Price Per Employee
                  </button> */}
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Subscription Status</h4>
                      <p className="secondaryText text-capitalize">{profileData?.subscription_status}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Amount Per Employee</h4>
                      <p className="secondaryText">{`$ ${profileData?.amount_per_employee}`}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Total Subscription Amount</h4>
                      <p className="secondaryText">{`$ ${profileData?.subscription_amount}`}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Subscription Type</h4>
                      <p className="secondaryText">{'Monthly'}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Allowed Employee</h4>
                      <p className="secondaryText">{profileData?.allowed_employees}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* fiamily member  */}


              {
                profileData?.employees != "" ? (
                  <div className="row py-4">
                    <div className="col-md-12">
                      <h2 className="mainTitle mb-4">
                        Company Employees
                      </h2>
                    </div>
                    <div className="col-md-12 tabSection">
                      <Tab.Container id="left-tabs-example" defaultActiveKey="Member 1">
                        <Row>
                          <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                              {
                                profileData?.employees && profileData?.employees?.map((item, index) => (
                                  <Nav.Item>
                                    <Nav.Link eventKey={`Employee ${index + 1}`}>{`Employee ${index + 1}`}</Nav.Link>
                                  </Nav.Item>
                                ))
                              }

                            </Nav>
                          </Col>
                          <Col sm={10}>
                            <Tab.Content>
                              {
                                profileData?.employees && profileData?.employees?.map((item, index) => (
                                  <Tab.Pane eventKey={`Employee ${index + 1}`}>
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
                                        <h4 className="secondaryLabel">Email</h4>
                                        <p className="secondaryText">{item?.email} </p>
                                      </div>
                                      <div className="col-xl-4 col-md-4 mb-3">
                                        <h4 className="secondaryLabel">User Name</h4>
                                        <p className="secondaryText">{item?.username} </p>
                                      </div>
                                      <div className="col-xl-4 col-md-4 mb-3">
                                        <h4 className="secondaryLabel">Phone No</h4>
                                        <p className="secondaryText">{item?.phone_number} </p>
                                      </div>
                                      <div className="col-xl-4 col-md-4 mb-3">
                                        <h4 className="secondaryLabel">Address</h4>
                                        <p className="secondaryText">{item?.address} </p>
                                      </div>
                                      <div className="col-xl-4 col-md-4 mb-3">
                                        <h4 className="secondaryLabel">City</h4>
                                        <p className="secondaryText">{item?.city} </p>
                                      </div>
                                      <div className="col-xl-4 col-md-4 mb-3">
                                        <h4 className="secondaryLabel">Zipcode</h4>
                                        <p className="secondaryText">{item?.zip_code} </p>
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
                    <h5 className="text-danger">No Employee Added.</h5>
                  </div>
                )
              }
            </div>
          </div>
        </div>

        <CustomModal show={showModal} close={() => { setShowModal(false) }} >
          <CustomInput
            label="Enter Package Price"
            type="number"
            placeholder="Enter Package Price"
            required
            name="product_price"
            labelClass='mainLabel'
            inputClass='mainInput'
            onChange={handleChange}


          />

          <CustomButton variant='primaryButton' text='Add Price' type='button' onClick={handleSubmit} />
        </CustomModal>

        <CustomModal show={showEdit} close={() => { setShowEdit(false) }} >
          <CustomInput
            label="Update Subscription Price"
            type="number"
            placeholder="Update Subscription Price"
            required
            name="product_price"
            labelClass='mainLabel'
            inputClass='mainInput'
            onChange={handleChange}


          />

          <CustomButton variant='primaryButton' text='Update Price' type='button' onClick={handleEditPrice} />
        </CustomModal>

        <CustomModal show={showEditSubscription} close={() => { setShowEditSubscription(false) }} >
          <CustomInput
            label="Update Package Price"
            type="number"
            placeholder="Update Package Price"
            required
            name="new_price"
            labelClass='mainLabel'
            inputClass='mainInput'
            onChange={handleChange}


          />

          <CustomButton variant='primaryButton' text='Update Price' type='button' onClick={handleEditSubscription} />
        </CustomModal>


      </DashboardLayout>
    </>
  );
};

// export default CompanyDetails;
