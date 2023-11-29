import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const EditUserDetails = () => {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    postal_code: '',
    address_1: '',
    address_2: '',
    country: '',
    city: '',
    number: '',
    status: ''

  });

  const statusOption = [
    {
      code: 0,
      name: 'Inactive'
    },
    {
      code: 1,
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
    fetch(`https://custom.mystagingserver.site/parcel_safe_app/public/api/admin/usereditspecific/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${LogoutData}`
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


  useEffect(() => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`https://custom.mystagingserver.site/parcel_safe_app/public/api/admin/get-user/${id}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        setFormData(data.users)
        console.log(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
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
                  <span className={`statusBadge ${formData.status == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{formData.status == 1 ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Name'
                          required
                          id='name'
                          type='text'
                          placeholder='Enter Safe'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="name"
                          value={formData.name}
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
                          name="address_1"
                          value={formData.address_1}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Address 2'
                          required
                          id='address'
                          type='text'
                          placeholder='Enter Address'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="address_2"
                          value={formData.address_2}
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
                          label='Postal Code'
                          required
                          id='postalCode'
                          type='number'
                          placeholder='Enter Postal Code'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="postal_code"
                          value={formData.postal_code}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <CustomInput
                          label='Country'
                          required
                          id='country'
                          type='text'
                          placeholder='Enter Country'
                          labelClass='mainLabel'
                          inputClass='mainInput'
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="status"
                          label="Status"
                          required
                          placeholder="Select Status"
                          value={formData.status}
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

