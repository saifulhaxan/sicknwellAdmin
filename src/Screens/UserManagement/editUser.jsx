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
export const EditUserDetails = () => {

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
    delete formData?.last_login
    delete formData?.groups
    delete formData?.user_permissions
    // Create a new FormData object
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    // Make the fetch request
    fetch(`${BASE_URL}/api/v1/users/${id}/`, {
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




  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit User Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  <span className={`statusBadge ${formData.is_active == true ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{formData.is_active == true ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='First Name'
                          required
                          id='firtname'
                          type='text'
                          placeholder='Enter First Name'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="first_name"
                          value={formData?.first_name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Middle Name'
                          required
                          id='mname'
                          type='text'
                          placeholder='Enter Middle Name'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="middle_name"
                          value={formData?.middle_name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Last Name'
                          required
                          id='mname'
                          type='text'
                          placeholder='Enter Last Name'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="last_name"
                          value={formData?.last_name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Email'
                          required
                          id='mname'
                          type='text'
                          placeholder='Enter Email'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="email"
                          disabled
                          value={formData?.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Phone'
                          required
                          id='mname'
                          type='text'
                          placeholder='Enter Phone'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="phone_number"
                          value={formData?.phone_number}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='DOB'
                          required
                          id='mname'
                          type='date'
                          placeholder='Enter DoB'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="dob"
                          value={formData?.dob}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Address'
                          required
                          id='address'
                          type='text'
                          placeholder='Enter Address'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='City'
                          required
                          id='city'
                          type='text'
                          placeholder='Enter City'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Zip Code'
                          required
                          id='postalCode'
                          type='number'
                          placeholder='Enter Zip Code'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="zip_code"
                          value={formData.zip_code}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="is_active"
                          label="Status"
                          required
                          placeholder="Select Status"
                          value={formData?.is_active}
                          option={statusOption}
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

