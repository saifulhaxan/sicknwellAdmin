/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 30/11/2023 - 00:09:57
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/11/2023
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faEdit, faTimes, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "./../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";


import "./style.css";
import { BASE_URL } from "../../Api/apiConfig";

export const ProviderManagement = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [userID, setUserID] = useState();
  const [selectedStatus, setSelectedStatus] = useState('')
  const LogoutData = localStorage.getItem('login');

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const ActiveMale = () => {
    setShowModal3(false)
    setShowModal4(true)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const filterData = data.filter(item =>
  (
    (item?.business_name?.toLowerCase().includes(inputValue.toLowerCase()))
  )
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  const UserListing = () => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${BASE_URL}api/v1/provider-directories/`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${LogoutData}`
        },
      }
    )

      .then(response =>
        response.json()
      )
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        // console.log(data)
        setData(data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })
  }

  const UserDelete = () => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    setShowModal(false);
  
    fetch(`${BASE_URL}api/v1/provider-directories/${userID}/`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${LogoutData}`
      },
    })
    .then((response) => {
      document.querySelector('.loaderBox').classList.add("d-none");
  
      if (!response.ok) {
        // Check if the response contains JSON data
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          // Parse the JSON error response
          return response.json().then((errorData) => {
            throw new Error(`Error: ${errorData.detail || errorData.message}`);
          });
        } else {
          // If not JSON, throw a generic error
          throw new Error('Non-JSON error response');
        }
      }
  
      // Check if the response status is 204 No Content
      if (response.status === 204) {
        return {}; // Return an empty object for 204 No Content
      }
  
      // If successful and has content, parse the response as JSON
      return response.json();
    })
    .then((data) => {
      setShowModal1(true)
      setTimeout(() => {
        setShowModal1(false);
      }, 1000);
      UserListing();
      console.log(data);
    })
    .catch((error) => {
      document.querySelector('.loaderBox').classList.add("d-none");
      console.log(error.message || 'Unexpected error occurred');
    });
  }
  
  
  

  // currentItems = currentItems.filter((item) => {
  //   console.log(item.status)
  //   // Replace 'status' with the actual property in your data that represents the status
  //   return selectedStatus === '' || item.status == 0;
  // });


  useEffect(() => {
    // document.querySelector('.loaderBox').classList.remove("d-none");
    document.title = 'SicknWell | Provider Management';
    UserListing()
  }, []);

  console.log(data)

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "image",
      title: "Business Image",
    },
    {
      key: "fname",
      title: "Business Name",
    },
    {
      key: "address",
      title: "Address",
    },

    {
      key: "link",
      title: "Company Website",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];

  const statusOptions = [
    {
      code: '',
      name: 'All'
    },
    {
      code: 0,
      name: 'Inactive'
    },
    {
      code: 1,
      name: 'Active'
    }
  ];

  const sortingData = [
    {
      code: data.length,
      name: 'All'
    },
    {
      code: 5,
      name: '5'
    },
    {
      code: 10,
      name: '10'
    },
    {
      code: 50,
      name: '50'
    }
  ]

  const addProvider = () => {
    navigate('/add-provider')
  }

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-4 mb-2">
                    <h2 className="mainTitle">Provider Management</h2>
                  </div>
                  {/* <div className="col-md-4 d-flex justify-content-end mb-2">
                    <div className="addUser">
                     
                    </div>
                  </div> */}
                  <div className="col-md-8 mb-2">
                    <div className="addUser align-items-end">
                     
                      <SelectBox
                        selectClass="mainInput"
                        name="sort"
                        label="Item Per Page:"
                        placeholder="Sort"
                        value={itemsPerPage}
                        option={sortingData}
                        onChange={(e) => {
                          setItemsPerPage(e.target.value);
                        }}
                      />
                      {/* <SelectBox
                        selectClass="mainInput"
                        name="filter"
                        label="Sort By Status:"
                        placeholder="filter"
                        value={selectedStatus}
                        option={statusOptions}
                        onChange={(e) => {
                          setSelectedStatus(e.target.value);
                        }}
                      /> */}
                      <CustomInput type="text" placeholder="Search by Business Name..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                      <CustomButton text="Add New Provider" variant='primaryButton' className="mb-3" onClick={addProvider} />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      <tbody>
                        {currentItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item?.serial_number}</td>
                            <td className="text-capitalize">
                              <div className="tableImage">
                                <img src={`https://member.sicknwell.com${item?.business_image}`} className="mw-100" />
                              </div>
                            </td>
                            <td className="text-capitalize">
                              {item?.business_name}
                            </td>
                            <td>{item?.address}</td>
                            <td><a href={item?.website} target="_blank">View Website</a></td>
                            {/* <td className={item?.status == 1 ? 'greenColor' : "redColor"}>{item?.status == 1 ? 'Active' : "Inactive"}</td> */}
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  <Link to={`/provider-management/provider-detail/${item.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                  <Link to={`/provider-management/edit-detail/${item.id}`} className="tableAction"><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</Link>
                                  <button type="button" className="border-0 tableAction" onClick={()=>{
                                    setShowModal(true)
                                    setUserID(item?.id)
                                    }}> <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Remove</button>
                                
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>

                    <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={filterData.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' >Hello World</CustomModal>
          <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={ActiveMale} heading='Are you sure you want to mark this user as Active?' /> */}

          <CustomModal show={showModal} close={() => { setShowModal(false) }} action={UserDelete} heading='Are you sure you want to remove this provider?' />
          <CustomModal show={showModal1} close={() => { setShowModal1(false) }} success heading='Provider Removed Successfully!' />



        </div>
      </DashboardLayout>
    </>
  );
};
