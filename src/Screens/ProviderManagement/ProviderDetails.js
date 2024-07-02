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
import { faEllipsisV, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";

const ProviderDetails = () => {

  const { id } = useParams();
  const LogoutData = localStorage.getItem('login');
  console.log(LogoutData)


  const [profileData, setProfileData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showSequence, setShowSequence] = useState(false);
  const [formData, setFormData] = useState({
    provider_directory: id,
    description: 'Dental'
  });
  const [swapFormData, setSwapFormData] = useState({
    provider_directory_id: id,
  });


  const getProviderDetail = () => {
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
  }

  useEffect(() => {
    getProviderDetail();
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
        getProviderDetail();

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add('d-none')
        console.log(error);
      })
  }

  const editProduct = (proID, proName, proPrice) => {
    setFormData({
      ...formData,
      name: proName,
      price: proPrice,
      id: proID
    })
  }

  const updateSwaping = (event) => {
    event.preventDefault();
    document.querySelector('.loaderBox').classList.remove('d-none')

    // Create a new FormData object
    const formDataMethod = new FormData()
    for (const key in swapFormData) {
        formDataMethod.append(key, swapFormData[key])
    }

    // Make the fetch request
    fetch(`${BASE_URL}api/v1/provider_service/switch_sequence/`, {
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
            setShowSequence(false);
            setEditModal(true);
            setTimeout(() => {
                setEditModal(false);
            }, 1500);

            getProviderDetail();
        })
        .catch((error) => {
            document.querySelector('.loaderBox').classList.add('d-none')
            console.log(error);
        })
}

  const editSequence = (sequenceID) => {
    setShowSequence(true)
    setSwapFormData({
        ...swapFormData,
        seq1_id: sequenceID
    })
}

  const editSubmit = (productID) => {
    // event.preventDefault()
    document.querySelector('.loaderBox').classList.remove('d-none')

    // Create a new FormData object
    const formDataMethod = new FormData()
    for (const key in formData) {
      formDataMethod.append(key, formData[key])
    }

    // Make the fetch request
    fetch(`${BASE_URL}api/v1/provider_service/${productID}/`, {
      method: 'PUT',
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
        setEditForm(false);
        setEditModal(true);
        setTimeout(() => {
          setEditModal(false);
        }, 1500);

        getProviderDetail();


      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add('d-none')
        console.log(error);
      })
  }

  const deleteProduct = (productID) => {
    // event.preventDefault()
    document.querySelector('.loaderBox').classList.remove('d-none')

    // Create a new FormData object
    const formDataMethod = new FormData()
    for (const key in formData) {
      formDataMethod.append(key, formData[key])
    }

    // Make the fetch request
    fetch(`${BASE_URL}api/v1/provider_service/${productID}/`, {
      method: 'DELETE',
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
        // setEditForm(false);
        // setEditModal(true);
        setTimeout(() => {
          // setEditModal(false);
          getProviderDetail()
        }, 1500);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add('d-none')
        console.log(error);
      })
  }

  

  const productHeader = [
    {
      key: 'sno',
      title: 'S.No',
    },
    {
      key: 'name',
      title: 'Product Name',
    },
    {
      key: 'price',
      title: 'Price',
    },
    {
      key: 'action',
      title: 'Actions',
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
              {profileData?.provider_services_directory && profileData?.provider_services_directory.length > 0 ? (
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
                        {profileData?.provider_services_directory?.map((item, index) => (
                          <tr key={index}>
                          <td><span className="btnSequence" onClick={() => { editSequence(item?.sequence) }}>{item?.sequence}</span></td>
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
                                    editProduct(item.id, item.name, item.price)
                                    setEditForm(true)
                                  }} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</button>
                                   <button onClick={() => {
                                    deleteProduct(item.id)
                                  }} className="tableAction"><FontAwesomeIcon icon={faTrash} className="tableActionIcon" />Delete</button>
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


        <CustomModal show={editForm} close={() => { setEditForm(false) }} >
          <CustomInput
            label="Edit Product Name"
            type="text"
            placeholder="Edit Product Name"
            required
            name="name"
            labelClass='mainLabel'
            value={formData?.name}
            inputClass='mainInput'
            onChange={(event) => {
              setFormData({ ...formData, name: event.target.value });
              console.log(formData);
            }}

          />

          <CustomInput
            label="Edit Product Price"
            type="text"
            placeholder="Edit Product Price"
            required
            name="price"
            labelClass='mainLabel'
            value={formData?.price}
            inputClass='mainInput'
            onChange={(event) => {
              setFormData({ ...formData, price: event.target.value });
              console.log(formData);
            }}

          />
          <CustomButton variant='primaryButton' text='Update' type='button' onClick={() => { editSubmit(formData?.id) }} />
        </CustomModal>

        <CustomModal show={showSequence} close={() => { setShowSequence(false) }} >
                    <h5 className="text-center mb-3">Your Current Sequence is <span className="text-success">{formData?.seq1_id}</span></h5>
                    <form>
                        <CustomInput
                            label="Swap Sequence"
                            type="number"
                            placeholder="Enter New Sequence Number"
                            required
                            name="seq2_id"
                            labelClass='mainLabel'
                            inputClass='mainInput'
                            onChange={(event) => {
                              setSwapFormData({ ...swapFormData, seq2_id: event.target.value });
                                console.log(swapFormData);
                            }}

                        />

                        <CustomButton variant='primaryButton' text='Update' type='button' onClick={updateSwaping} />
                    </form>


                </CustomModal>

        <CustomModal show={addProduct} close={() => { setAddProduct(false) }} success heading='Product Added Successfully!' />
        <CustomModal show={editModal} close={() => { setEditModal(false) }} success heading='Product Update Successfully!' />
        {/* <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
        

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' /> */}
      </DashboardLayout>
    </>
  );
};

export default ProviderDetails;
