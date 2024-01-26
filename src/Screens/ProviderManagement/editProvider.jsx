/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 06/12/2023 - 01:07:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/12/2023
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { BASE_URL } from "../../Api/apiConfig";
export const EditProvider = () => {

  const { id } = useParams();

  const [formData, setFormData] = useState({});

  const statusOption = [
    {
      code: false,
      name: 'Inactive'
    },
    {
      code: true,
      name: 'Active'
    }
  ]


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData)
  };

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const LogoutData = localStorage.getItem('login');
  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const Active = () => {
    setShowModal3(false)
    setShowModal4(true)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    document.querySelector('.loaderBox').classList.remove("d-none");

    // Create a new FormData object
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    // Make the fetch request
    fetch(`${BASE_URL}api/v1/provider-directories/${id}/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${LogoutData}`
      },
      body: formDataMethod // Use the FormData object as the request body
    })
      .then((response) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        return response.json();
      })
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data);
      });
  };


  const GetUserDetail = () => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    
    fetch(`${BASE_URL}api/v1/provider-directories/${id}/`,
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
        setFormData(data)
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
  }

  useEffect(() => {
    GetUserDetail()
  }, []);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    // Check if a file is selected before updating the state
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        business_image: file
      }));
    }
    console.log(formData)
  };


  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit Provider Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              {/* <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  <span className={`statusBadge ${formData.is_active == true ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{formData.is_active == true ? 'Active' : 'Inactive'}</span>
                </div>
              </div> */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                    <div className="col-md-6 col-xl-3 mb-4">
                        <CustomInput
                          label='Edit Business Logo'
                          required
                          id='firtname'
                          type='file'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="logo"
                          onChange={handleChangeFile}
                        />
                      </div>
                      <div className="col-md-6 col-xl-3 mb-4">
                        <CustomInput
                          label='Business Name'
                          required
                          id='firtname'
                          type='text'
                          placeholder='Enter Business Name'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="business_name"
                          value={formData?.business_name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-xl-3 mb-4">
                        <CustomInput
                          label='Address'
                          required
                          id='mname'
                          type='text'
                          placeholder='Enter Address'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="address"
                          value={formData?.address}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-xl-3 mb-4">
                        <CustomInput
                          label='Webiste Url'
                          required
                          id='mname'
                          type='url'
                          placeholder='Enter Webiste Url'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="website"
                          value={formData?.website}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <CustomButton variant='primaryButton' text='Update' type='submit' />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
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

