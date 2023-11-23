import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck, faTimes, faFilter } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";


import "./style.css";

export const IssueAdministration = () => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [addUser, setUser] = useState(false);
  // const [limit, setLimit] = useState()
  const [selectedStatus, setSelectedStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    status: 1
  });

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





  useEffect(() => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    document.title = 'SicknWell | Issue Administartion';
    const LogoutData = localStorage.getItem('login');

    fetch('https://custom.mystagingserver.site/parcel_safe_app/public/api/admin/issue-listing',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }
    )

      .then(response =>
        response.json()
      )
      .then((responseData) => {
        console.log(responseData.inquiries)
        document.querySelector('.loaderBox').classList.add("d-none");
        setData(responseData.inquiries);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })


  }, []);

  const filterData = data.filter(item =>
    item.user.name.toLowerCase().includes(inputValue.toLowerCase()) &&
    (selectedStatus === '' || item.status == selectedStatus)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  // const filteredItems = data
  //   .filter(item =>
  //     (selectedStatus === '' || item.status == selectedStatus) &&
  //     (selectedLimit === '' || data.indexOf(item) < selectedLimit)
  //   );

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "reported",
      title: "Reported by",
    },
    {
      key: "issue",
      title: "Issue",
    },
    {
      key: "reportedOn",
      title: "Reported on",
    },
    {
      key: "resolution",
      title: "Resolution",
    },
    {
      key: "status",
      title: "Status",
    },
    {
      key: "actions",
      title: "Actions",
    },
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


  const handleSubmit = (event) => {
    event.preventDefault();
    document.querySelector('.loaderBox').classList.remove("d-none");

    console.log(formData)

    const LogoutData = localStorage.getItem('login');
    fetch(`https://custom.mystagingserver.site/parcel_safe_app/public/api/admin/issuetype-add`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
        body: JSON.stringify(formData)
      },
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        document.querySelector('.loaderBox').classList.add("d-none");
        setUser(false)
        setFormData({
          name: ''
        })

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
  }


  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-8 mb-2">
                    <h2 className="mainTitle">Issue Administartion</h2>
                  </div>
                  <div className="col-md-4 d-flex justify-content-end">
                    <CustomButton text="Add Issue Type" variant='primaryButton' onClick={() => {
                      setUser(true)
                    }} />
                  </div>
                </div>
                <div className="align-items-end justify-content-between row">
                  <div className="col-md-6 mb-2">
                    <div className="d-flex justify-content-between filterField">
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

                      <SelectBox
                        selectClass="mainInput"
                        name="filter"
                        label="Sort By filter:"
                        placeholder="filter"
                        value={selectedStatus}
                        option={statusOptions}
                        onChange={(e) => {
                          setSelectedStatus(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mb-2">
                    <div className="addUser">
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">

                    <CustomTable
                      headers={maleHeaders}


                    >
                      <tbody>
                        {currentItems.map((item, index) =>
                        (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="text-capitalize">
                              {item.user.name}
                            </td>
                            <td>{item.issue}</td>
                            <td>{item.updated_at}</td>
                            <td className={item.resolution != null ? 'greenColor' : "redColor"}>{item.resolution == null ? 'Pending' : 'Resolved'}</td>
                            <td className={item.status == 1 ? 'greenColor' : "redColor"}>{item.status == 1 ? 'Active' : "Inactive"}</td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  <Link to={`/issue-administration/issue-detail/${item.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                  <button onClick={() => {
                                    item.status ? setShowModal(true) : setShowModal3(true)
                                  }} className="tableAction">{item.status ? <FontAwesomeIcon icon={faTimes} className="tableActionIcon" /> : <FontAwesomeIcon icon={faCheck} className="tableActionIcon" />}{item.status ? 'Inactive' : "Active"}</button>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      {
                        console.log(currentPage)
                      }
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

          <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' >Hello World</CustomModal>
          <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={ActiveMale} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />

          <CustomModal show={addUser} close={() => { setUser(false) }} >
            <CustomInput
              label="Add Issue Type"
              type="text"
              placeholder="Add Issue Type"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
                console.log(formData);
              }}

            />
            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleSubmit} />
          </CustomModal>



        </div>
      </DashboardLayout>
    </>
  );
};
