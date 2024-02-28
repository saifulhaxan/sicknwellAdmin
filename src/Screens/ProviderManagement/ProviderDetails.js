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
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput"
import CustomTable from "../../Components/CustomTable"
import { BASE_URL } from "../../Api/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";

const ProviderDetails = () => {

  const { id } = useParams();
  const LogoutData = localStorage.getItem('login');
  console.log(LogoutData)


  const [profileData, setProfileData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [productData, setProductData] = useState();
  const [formData, setFormData] = useState({
    provider: id,
    description: 'Dental'
  });


  useEffect(() => {
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
        setProfileData(data)
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
  }, [id]);

  const handleSubmit = event => {
    event.preventDefault()
    document.querySelector('.loaderBox').classList.remove('d-none')

    // Create a new FormData object
    const formDataMethod = new FormData()
    for (const key in formData) {
      formDataMethod.append(key, formData[key])
    }

    // Make the fetch request
    fetch(`${BASE_URL}api/v1/provider_service/`, {
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
        setShowModal(false);
        setAddProduct(true);
        setTimeout(() => {
          setAddProduct(false);
        }, 1000);
        
        getProductList()

      })
  }

  const getProductList = event => {
    document.querySelector('.loaderBox').classList.remove('d-none')

    // Create a new FormData object
    const formDataMethod = new FormData()
    for (const key in formData) {
      formDataMethod.append(key, formData[key])
    }

    // Make the fetch request
    fetch(`${BASE_URL}api/v1/provider_service/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${LogoutData}`
      },
    })
      .then(response => {
        document.querySelector('.loaderBox').classList.add('d-none')
        return response.json()
      })
      .then(data => {
        document.querySelector('.loaderBox').classList.add('d-none')
        console.log(data);
        setProductData(data)


      })
  }

  useEffect(() => {
    getProductList()
  }, [])


  const productHeader = [
    {
      key: 'name',
      title: 'Product Name',
    },
    {
      key: 'price',
      title: 'Price Name',
    },
    {
      key: 'action',
      title: 'Action',
    }
  ]

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Provider Detail
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
                  {/* <span className={`statusBadge ${profileData?.is_active == true ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{profileData.is_active == true ? 'Active' : 'Inactive'}</span> */}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row align-items-center">
                    <div className="col-xl-3 col-md-3 mb-3">
                      <div className="businessLogo">
                        <img src={`https://member.sicknwell.com${profileData?.business_image}`} className="mw-100" />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-xl-4 col-md-4 mb-3">
                          <h4 className="secondaryLabel">Business Name</h4>
                          <p className="secondaryText">{profileData?.business_name}</p>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-3">
                          <h4 className="secondaryLabel">Address</h4>
                          <p className="secondaryText">{profileData?.address}</p>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-3">
                          <h4 className="secondaryLabel">Website</h4>
                          <p className="secondaryText"><a href={profileData?.website}>View Link</a></p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="row justify-content-end">
                <div className="col-md-3">
                  <CustomButton variant='primaryButton' text='Add Product' type='button' onClick={() => { setShowModal(true) }} />
                </div>
              </div>
              {productData && productData.length > 0 ? (
                <div className="row mb-3 textLeft">
                  <div className="col=md-12">
                    <h2 className="mainTitle">
                      Price List
                    </h2>
                  </div>
                  <div className="col-12">
                    <CustomTable
                      headers={productHeader}

                    >
                      <tbody>
                        {productData?.map((item, index) => (
                          <tr key={index}>
                            <td className="text-capitalize">
                              {item.name}
                            </td>
                            <td className="text-capitalize">
                              {`$ ${item.price}`}
                            </td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  <button onClick={() => {
                                    // brandID(item.id)
                                    // setUserFrom(true)
                                  }} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</button>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                  </div>
                </div>
              ) : ''}

            </div>
          </div>
        </div>

        <CustomModal show={showModal} close={() => { setShowModal(false) }} >
          <CustomInput
            label="Add Product Name"
            type="text"
            placeholder="Add Product Name"
            required
            name="name"
            labelClass='mainLabel'
            inputClass='mainInput'
            onChange={(event) => {
              setFormData({ ...formData, name: event.target.value });
              console.log(formData);
            }}

          />

          <CustomInput
            label="Add Product Price"
            type="text"
            placeholder="Add Product Price"
            required
            name="price"
            labelClass='mainLabel'
            inputClass='mainInput'
            onChange={(event) => {
              setFormData({ ...formData, price: event.target.value });
              console.log(formData);
            }}

          />
          <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleSubmit} />
        </CustomModal>

        <CustomModal show={addProduct} close={() => { setAddProduct(false) }} success heading='Product Added Successfully!' />
        {/* <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
        

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' /> */}
      </DashboardLayout>
    </>
  );
};

export default ProviderDetails;
