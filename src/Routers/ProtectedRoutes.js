/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 23/02/2024 - 02:24:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/02/2024
    * - Author          : Saif
    * - Modification    : 
**/
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
export const ProtectedRoutes = (props) => {
    const { Components } = props;
    const navigate = useNavigate();
    useEffect(() => {
        let login = localStorage.getItem('login');
        if (!login) {
            navigate('/login');
        }
    })
    return (
        <>
            <Components />
        </>
    )
}
