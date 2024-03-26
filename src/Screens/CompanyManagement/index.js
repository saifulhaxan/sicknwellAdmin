/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 30/11/2023 - 00:48:58
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/11/2023
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faEdit, faTimes, faFilter, faTachometer } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "./../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";


import "./style.css";
import { BASE_URL } from "../../Api/apiConfig";

export const CompanyManagement = () => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('')
  const LogoutData = localStorage.getItem('login');
  const [initShow, setInitShow] = useState(false);
  const [successMessage, setSuccssMessage] = useState('Subscription Cancelled Successfuly!');
  const [userID, setUserID] = useState();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };




  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const filterData = data.filter(item =>
    (
      item?.first_name.toLowerCase().includes(inputValue.toLowerCase()) || 
      item?.email.toLowerCase().includes(inputValue.toLowerCase())
    )
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  const UserListing = () => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${BASE_URL}api/v1/users/list_companies_and_employees/`,
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
        console.log(data)
        setData(data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })
  }

  // currentItems = currentItems.filter((item) => {
  //   console.log(item.status)
  //   // Replace 'status' with the actual property in your data that represents the status
  //   return selectedStatus === '' || item.status == 0;
  // });


  useEffect(() => {
    // document.querySelector('.loaderBox').classList.remove("d-none");
    document.title = 'SicknWell | Company Management';
    UserListing()
  }, []);


  const cancelSubscription = () => {
    document.querySelector('.loaderBox').classList.remove('d-none')
    fetch(`${BASE_URL}cancel_user_subscription/${userID}/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${LogoutData}`
        }
      }
    )
      .then(response => {
        return response.json()
      })

      .then(data => {
        console.log('ssasas', data)
        document.querySelector('.loaderBox').classList.add('d-none')
        setInitShow(false)
        setSuccssMessage(data?.message)
        setShowModal(true)
        setTimeout(() => {
          setShowModal(false)
        }, 1500)
       
      })
      .catch(error => {
        console.log(error)
        document.querySelector('.loaderBox').classList.add('d-none')
      })
  }

  console.log(data)

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "cname",
      title: "Company Name",
    },
    {
      key: "fname",
      title: "First Name",
    },
    {
      key: "lname",
      title: "Last Name",
    },
    {
      key: "email",
      title: "Email Address",
    },

    {
      key: "number",
      title: "Phone",
    },
    {
      key: "mebershop",
      title: "Membership Purchased",
    },
    {
      key: "member",
      title: "Employee",
    },
    {
      key: "uname",
      title: "User Name",
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

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-4 mb-2">
                    <h2 className="mainTitle">Company Management</h2>
                  </div>
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
                      <CustomInput type="text" placeholder="Search by First Name OR Email" value={inputValue} inputClass="mainInput" onChange={handleChange} />
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
                            <td>{index + 1}</td>
                            <td className="text-capitalize">
                              {item?.company_name}
                            </td>
                            <td className="text-capitalize">
                              {item?.first_name}
                            </td>
                            <td className="text-capitalize">
                              {item?.last_name}
                            </td>
                            <td>{item?.email}</td>
                            <td>{item?.phone_number}</td>
                            <td>{ `${item?.allowed_members} Membership`}</td>
                            <td>{`${item?.number_of_employees} Employee`}</td>

                            {/* <td>{item?.created_at}</td> */}
                            <td>{item?.username}</td>
                            {/* <td className={item?.status == 1 ? 'greenColor' : "redColor"}>{item?.status == 1 ? 'Active' : "Inactive"}</td> */}
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  <Link to={`/company-management/company-details/${item.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                  {
                                    item?.subscription_status === true ? (
                                      <button onClick={() => {
                                        setInitShow(true);
                                        setUserID(item?.id);
                                      }} type="button" className="tableAction"><FontAwesomeIcon icon={faTachometer}></FontAwesomeIcon>  Cancel Subscription</button>
                                    ) : ''
                                  }
                                 
                                  {/* <Link to={`/user-management/edit-detail/${item.id}`} className="tableAction"><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</Link> */}
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

          <CustomModal
        show={initShow}
        close={() => {
          setInitShow(false)
        }}
        action={cancelSubscription}
        heading='Are you sure you want to cancel your subscription?'
      />
      <CustomModal
        show={showModal}
        close={() => {
          setShowModal(false)
        }}
        success
        heading={successMessage}
      />



        </div>
      </DashboardLayout>
    </>
  );
};
