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
import XLSX from 'xlsx';
import { utils as XLSXUtils, writeFile as writeExcelFile } from 'xlsx';

import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faEdit, faTimes, faFilter, faTrash, faFileExcel } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "./../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";


import "./style.css";
import { BASE_URL } from "../../Api/apiConfig";

export const UserManagement = () => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [inputValue, setInputValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [count, setCount] = useState();
  const [isFilter, setIsFiltered] = useState();
  const [searchData, setSearchData] = useState();
  const [csv, setCsv] = useState();
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



  // const filterData = data?.filter(item => {
  //   const inputLower = inputValue.toLowerCase();
  //   const firstNameMatch = item?.first_name && item.first_name.toLowerCase().includes(inputLower);
  //   const emailMatch = item?.email && item.email.toLowerCase().includes(inputLower);
  //   const referredByMatch = item?.referred_by && item.referred_by.toLowerCase().includes(inputLower);
  
  //   // Date range filtering
  //   const minDate = new Date(minDate); 
  //   const maxDate = new Date(maxDate); 
  //   const itemDate = new Date(item?.dob); 
  
  //   const dateMatch = itemDate >= minDate && itemDate <= maxDate;
  
  //   return (firstNameMatch || emailMatch || referredByMatch) && dateMatch;
  // });



  
// const filterData = data?.filter(item =>
//     (
//       (item?.first_name && item.first_name.toLowerCase().includes(inputValue.toLowerCase())) ||
//       (item?.email && item.email.toLowerCase().includes(inputValue.toLowerCase())) ||
//       (item?.referred_by && item.referred_by.toLowerCase().includes(inputValue.toLowerCase()))
//     )
//   );
  
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const UserListing = () => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${BASE_URL}api/v1/users/list_all_users/`,
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


  // const FilterListing = (pageCount) => {
  //   document.querySelector('.loaderBox').classList.remove("d-none");
  //   fetch(`${BASE_URL}api/v1/users/list_all_users/?page=${pageCount}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': `Token ${LogoutData}`
  //       },
  //     }
  //   )

  //     .then(response =>
  //       response.json()
  //     )
  //     .then((data) => {
  //       document.querySelector('.loaderBox').classList.add("d-none");
  //       // console.log(data)
  //       setData(data?.results);
  //       setCount(data?.count)
  //     })
  //     .catch((error) => {
  //       document.querySelector('.loaderBox').classList.add("d-none");
  //       console.log(error)
  //     })
  // }

  const searchFilter = (isReffered, isSearch, isCsv) => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${BASE_URL}api/v1/users/list_all_users/?filter_referred_by=${isReffered}${isSearch ? `&search=${isSearch}` : ''}${isCsv ? `&export_csv=${isCsv}` : ''}${minDate ? `&start_date=${minDate}` : ''}${maxDate ? `&end_date=${maxDate}` : ''}`,
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
        setCurrentPage(1);

        setData(data);
        // setCount(data?.count)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })
  }

  const UserDelete = (userID) => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${BASE_URL}api/v1/users/${userID}/`,
      {
        method: 'DELETE',
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
        UserListing();
        console.log(data)
        // setData(data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })
  }

  const dateFormat = (dateFor) => {
    const datetimeString = dateFor;
    const date = new Date(datetimeString);

    // Extracting date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Creating the date string in the format "YYYY-MM-DD"
    const dateString = `${year}-${month}-${day}`;

    return dateString; // Output: "2024-01-30"
  }



  // currentItems = currentItems.filter((item) => {
  //   console.log(item.status)
  //   // Replace 'status' with the actual property in your data that represents the status
  //   return selectedStatus === '' || item.status == 0;
  // });


  useEffect(() => {
    // document.querySelector('.loaderBox').classList.remove("d-none");
    document.title = 'SicknWell | User Management';
    UserListing()
  }, []);

  console.log(data)

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
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
      key: 'refferedBy',
      title: 'Reffered By'
    },
    {
      key: "email",
      title: "Email Address",
    },
    {
      key: "cname",
      title: "Plan Type",
    },
    {
      key: "number",
      title: "Phone",
    },
    {
      key: "role",
      title: "Role",
    },
    {
      key: "dob",
      title: "DOB",
    },
    {
      key: "co",
      title: "Created On",
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

  const handleChangeFilter = (e) => {
    const { checked } = e.target;
    console.log(checked);
    setIsFiltered(checked)
    if (checked === true) {
      // searchFilter(checked)
      setIsExcel(true);
    } else {
      setIsExcel(false);
      UserListing()
    }
  }

  const searchAction = () => {
    searchFilter(isFilter, inputValue)
  }

  const downloadFile = () => {
    searchFilter(isFilter, inputValue, true)
  }

  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  const [csvData, setCsvData] = useState('');
  const [isExcel, setIsExcel] = useState(false);

  // Event handler for the button click
  const handleDownload = async () => {
    try {
      // Fetch data from the API
      // const data = await fetchData();
      // Convert data to Excel format
      const workbook = XLSXUtils.book_new();
      const sheet = XLSXUtils.json_to_sheet(data);
      // Add bold style to header row
      sheet["!cols"] = [{ wch: 20 }, { wch: 20 }]; // Set column widths
      sheet["A1"].s = { font: { bold: true } }; // Set bold style for cell A1
      sheet["B1"].s = { font: { bold: true } }; // Set bold style for cell B1
      // Add sheet to workbook

      var today = new Date();
      var year = today.getFullYear();
      var mes = today.getMonth()+1;
      var dia = today.getDate();
      var currentDate =dia+"-"+mes+"-"+year;
 

      XLSXUtils.book_append_sheet(workbook, sheet, "Sheet1");
      // Export workbook to Excel file
      writeExcelFile(workbook, 'SNW Referred By-'+currentDate+'(Report Generated).xlsx');
    } catch (error) {
      console.error('Error downloading Excel:', error);
    }
  };


  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-4 mb-2">
                    <h2 className="mainTitle">User Management</h2>
                  </div>
                  <div className="col-md-12 mb-2">
                    <div className="addUser align-items-end">
                      {/* <SelectBox
                        selectClass="mainInput"
                        name="sort"
                        label="Item Per Page:"
                        placeholder="Sort"
                        value={itemsPerPage}
                        option={sortingData}
                        onChange={(e) => {
                          setItemsPerPage(e.target.value);
                        }}
                      /> */}
                      <div className="inputWrapper rel">
                        <input type="checkbox" name="filter_referred_by" id="filter" onChange={handleChangeFilter} />
                        <label for="filter" className="ps-1">Reffered By:</label>
                      </div>
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
                      <CustomInput type="date" inputClass="mainInput" label="Start Date" value={minDate} onChange={(e)=>{setMinDate(e.target.value)}}/>
                      <CustomInput type="date" inputClass="mainInput" label="End Date" value={maxDate} onChange={(e)=>{setMaxDate(e.target.value)}} />

                      <CustomInput type="text" placeholder="Search by First Name OR Email" label="Search" value={inputValue} inputClass="mainInput" onChange={handleChange} />
                      <div className="inputWrapper">
                        <CustomButton variant='primaryButton' text='Search' type='button' onClick={searchAction} />
                        {
                          isExcel && (
                            <button type="button" className="exportCsv border-0 bg-success btn text-light mx-2" onClick={handleDownload}><FontAwesomeIcon icon={faFileExcel}></FontAwesomeIcon></button>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      <tbody>
                        {currentItems?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="text-capitalize">
                              {item?.first_name}
                            </td>
                            <td className="text-capitalize">
                              {item?.last_name}
                            </td>
                            <td>{item?.referred_by === "" ? 'Null' : item?.referred_by}</td>
                            <td>{item?.email}</td>
                            <td className="text-capitalize">{item?.plan_type}</td>
                            <td>{item?.phone_number}</td>
                            <td>{item?.role == 1 ? 'Individual' : item?.role == 2 ? 'Couple' : item?.role == 3 ? 'Family' : item?.role == 5 ? 'Family' : item?.role == 6 ? 'Employee' : 'Admin'}</td>
                            {/* <td>{item?.created_at}</td> */}
                            <td>{item?.dob}</td>
                            {/* <td>{dateFormat(item?.date_joined)}</td> */}
                            <td>{item?.date_joined}</td>
                            {/* <td className={item?.status == 1 ? 'greenColor' : "redColor"}>{item?.status == 1 ? 'Active' : "Inactive"}</td> */}
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  <Link to={`/user-management/user-detail/${item.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                  <Link to={`/user-management/edit-detail/${item.id}`} className="tableAction"><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</Link>
                                  <button type="button" className="border-0 tableAction" onClick={() => { UserDelete(item?.id) }}> <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Remove</button>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>

                    <CustomPagination
                      itemsPerPage={data?.length <= 15 ? data?.length : itemsPerPage}
                      totalItems={data?.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' >Hello World</CustomModal>
          <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={ActiveMale} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />



        </div>
      </DashboardLayout>
    </>
  );
};
