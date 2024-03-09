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

export const FaqsListing = () => {

    //   const { id } = useParams();
    const LogoutData = localStorage.getItem('login');
    console.log(LogoutData)


    const [profileData, setProfileData] = useState();

    const [showModal, setShowModal] = useState(false);
    const [addProduct, setAddProduct] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [formData, setFormData] = useState({
    });


    const getListing = () => {
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch(`${BASE_URL}api/v1/faq/`,
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
                setProfileData(data);
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }

    console.log('00', profileData)
    useEffect(() => {
        getListing();
    }, []);

    const handleSubmit = event => {
        event.preventDefault()
        document.querySelector('.loaderBox').classList.remove('d-none')

        // Create a new FormData object
        const formDataMethod = new FormData()
        for (const key in formData) {
            formDataMethod.append(key, formData[key])
        }

        // Make the fetch request
        fetch(`${BASE_URL}api/v1/faq/`, {
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
                getListing();

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add('d-none')
                console.log(error);
            })
    }

    const editProduct = (proID, proName, proPrice) => {
        setFormData({
            ...formData,
            question: proName,
            answer: proPrice,
            id: proID
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
        fetch(`${BASE_URL}api/v1/faq/${productID}/`, {
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

                getListing();


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
        fetch(`${BASE_URL}api/v1/faq/${productID}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${LogoutData}`
            },
            body: formDataMethod // Use the FormData object as the request body
        })
            .then((response) => {
                document.querySelector('.loaderBox').classList.add('d-none')
                return response.json()
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add('d-none')
                console.log(data);
                getListing();


            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add('d-none')
                console.log(error);
            })
    }





    const productHeader = [
        {
            key: 'name',
            title: 'Question',
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
                    <div className="row mb-3 justify-content-between">
                        <div className="col-md-6 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                FAQS
                            </h2>
                        </div>
                        <div className="col-md-3 d-flex justify-content-end">
                                    <CustomButton variant='primaryButton' text='Add Faq' type='button' onClick={() => { setShowModal(true) }} />
                                </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="row mb-3 textLeft">
                                <div className="col-12">
                                    <CustomTable
                                        headers={productHeader}

                                    >
                                        <tbody>
                                            {profileData && profileData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="text-capitalize">
                                                        {item?.question}
                                                    </td>
                                                    <td>
                                                        <Dropdown className="tableDropdown">
                                                            <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                                                <FontAwesomeIcon icon={faEllipsisV} />
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu align="end" className="tableDropdownMenu">
                                                                <button onClick={() => {
                                                                    editProduct(item?.id, item?.question, item?.answer)
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

                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} >
                    <CustomInput
                        label="Write Question"
                        type="text"
                        placeholder="Write Question"
                        required
                        name="question"
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, question: event.target.value });
                            console.log(formData);
                        }}

                    />

                    <div class="inputWrapper">
                        <label class="mainLabel">Write Answer<span>*</span></label>
                        <textarea
                            class="mainInput"
                            name="answer"
                            onChange={(event) => {
                                setFormData({ ...formData, answer: event.target.value });
                                console.log(formData);
                            }}
                        >

                        </textarea>
                    </div>

                    <CustomButton variant='primaryButton' text='Submit' type='button' onClick={handleSubmit} />
                </CustomModal>


                <CustomModal show={editForm} close={() => { setEditForm(false) }} >
                <CustomInput
                        label="Edit Question"
                        type="text"
                        placeholder="Edit Question"
                        required
                        name="question"
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        value={formData?.question}
                        onChange={(event) => {
                            setFormData({ ...formData, question: event.target.value });
                            console.log(formData);
                        }}

                    />

                    <div class="inputWrapper">
                        <label class="mainLabel">Edit Answer<span>*</span></label>
                        <textarea
                            class="mainInput"
                            name="answer"
                            value={formData?.answer}
                            onChange={(event) => {
                                setFormData({ ...formData, answer: event.target.value });
                                console.log(formData);
                            }}
                        >

                        </textarea>
                    </div>
                    <CustomButton variant='primaryButton' text='Update' type='button' onClick={() => { editSubmit(formData?.id) }} />
                </CustomModal>

                <CustomModal show={addProduct} close={() => { setAddProduct(false) }} success heading='Faqs Added Successfully!' />
                <CustomModal show={editModal} close={() => { setEditModal(false) }} success heading='Faqs Update Successfully!' />
                {/* <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
        

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' /> */}
            </DashboardLayout>
        </>
    );
};

// export default faqsListing;
