/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 09/03/2024 - 17:14:41
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 09/03/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import './style.css'

const BackButton = () => {
  const navigate = useNavigate();
console.log()
  const goBack = () => {
    navigate(-1)
  };

  return (
    <button className="backButton" onClick={goBack}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
};

export default BackButton;
