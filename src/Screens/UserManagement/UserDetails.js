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

const UserManagementDetail = () => {

  const { id } = useParams();
  const LogoutData = localStorage.getItem('login');
  console.log(LogoutData)


  const [profileData, setProfileData] = useState({});

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

  useEffect(() => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    
    fetch(`${BASE_URL}api/v1/users/${id}`,
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
        console.log(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
  }, [id]);


  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                User Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row mb-3 justify-content-end">
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
                      <h4 className="secondaryLabel">Middle Name</h4>
                      <p className="secondaryText">{profileData?.middle_name}</p>
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
                      <h4 className="secondaryLabel">Phone No </h4>
                      <p className="secondaryText">{profileData?.phone_number}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">DOB </h4>
                      <p className="secondaryText">{profileData?.dob}</p>
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
                      <h4 className="secondaryLabel">Zip Code</h4>
                      <p className="secondaryText">{profileData?.zip_code}</p>
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

export default UserManagementDetail;
