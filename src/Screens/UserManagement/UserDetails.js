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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

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

  console.log(BASE_URL)

  useEffect(() => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    console.log(BASE_URL)
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
        console.log(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
  }, [id]);

  const handleSendEmail = () => {
    document.querySelector('.loaderBox').classList.remove('d-none')

    // Create a new FormData object
    const formDataMethod = new FormData()
    formDataMethod.append('user_id', id);
    //  formDataMethod.append('member_id', '');

    // Make the fetch request
    fetch(`${BASE_URL}send_card_atmu/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${LogoutData}`
      },
      body: formDataMethod // Use the FormData object as the request body
    })
      .then(response => {
        document.querySelector('.loaderBox').classList.add('d-none')
        return response.json()
      })
      .then(data => {
        document.querySelector('.loaderBox').classList.add('d-none')
        console.log(data);
        setShowModal(true);
        setTimeout(()=>{
          setShowModal(false);
        }, 1500)

      })
  }


  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }


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

                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Plan Type</h4>
                      <p className="secondaryText">{profileData?.plan_type}</p>
                    </div>

                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Created On</h4>
                      <p className="secondaryText">{formatDate(profileData?.date_joined)}</p>
                    </div>

                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Promo Code or Referred By</h4>
                      <p className="secondaryText">{profileData?.referred_by}</p>
                    </div>

                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Recurring</h4>
                      <p className="secondaryText">{profileData?.recurring}</p>
                    </div>

                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Subscription Status</h4>
                      <p className={profileData?.subscription_status == "active" ? "GreenText" : "RedText"}>{profileData?.subscription_status}</p>
                      </div>

                    {profileData?.card_pdf && (
                      <div className="col-xl-12 col-md-12 mb-3">
                        <h4 className="secondaryLabel">Membership Card</h4>
                        <p className="secondaryText"><a className="pdfCover" href={`https://member.sicknwell.com${profileData?.card_pdf}`} download target="_blank"><FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon></a></p>
                        <button type="button" className="customButton primaryButton mb-3" onClick={handleSendEmail}>Send Membership Card</button>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' /> */}
        <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='PDF sent successfully to User' />

        <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
        <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
      </DashboardLayout>
    </>
  );
};

export default UserManagementDetail;
