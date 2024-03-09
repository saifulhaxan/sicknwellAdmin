/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 05/12/2023 - 01:07:25
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 05/12/2023
    * - Author          : Saif
    * - Modification    : 
**/
import { Route, Routes, BrowserRouter } from "react-router-dom";

import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import { Dashboard } from "../Screens/Dashboard";

import { UserManagement } from "../Screens/UserManagement";
import UserManagementDetail from "../Screens/UserManagement/UserDetails"
import { EditUserDetails } from "../Screens/UserManagement/editUser";

import { MembersManagement } from "../Screens/MembersManagement";
import MemeberDetails from "../Screens/MembersManagement/MemberDetails";
import { ProviderManagement } from "../Screens/ProviderManagement";
import ProviderDetails from "../Screens/ProviderManagement/ProviderDetails";
import { EditProvider } from "../Screens/ProviderManagement/editProvider";
import { AddProvider } from "../Screens/ProviderManagement/AddProvider";
// import CompanyManagement from '../Screens/CompanyManagement'
import { CompanyManagement } from "../Screens/CompanyManagement";
import {CompanyDetails} from "../Screens/CompanyManagement/CompanyDetails"
import { FaqsListing } from "../Screens/Faqs";

import Profile from "../Screens/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import ChangePassword from "../Screens/Profile/ChangePassword";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Error from "../Screens/Error";


export default function AdminRouter() {
  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />

        <Route path="/dashboard" element={ <ProtectedRoutes Components={Dashboard}  />} />

        <Route path="/user-management" element={<ProtectedRoutes Components={UserManagement} />} />
        <Route path="/user-management/user-detail/:id" element={<ProtectedRoutes Components={UserManagementDetail} />} />
        <Route path="/user-management/edit-detail/:id" element={<ProtectedRoutes Components={EditUserDetails} />} />

        <Route path="/member-management" element={<ProtectedRoutes Components={MembersManagement} />} />
        <Route path="/member-management/members-detail/:id" element={<ProtectedRoutes Components={MemeberDetails} />} />
        <Route path="/provider-management" element={<ProtectedRoutes Components={ProviderManagement} />} />
        <Route path="/provider-management/provider-detail/:id" element={<ProtectedRoutes Components={ProviderDetails} />} />
        <Route path="/provider-management/edit-detail/:id" element={<ProtectedRoutes Components={EditProvider} />} />
        <Route path="/add-provider" element={<ProtectedRoutes Components={AddProvider} />} />
        <Route path="/faqs" element={<ProtectedRoutes Components={FaqsListing} />} />

        <Route path="/company-management" element={<ProtectedRoutes Components={CompanyManagement} />} />
        <Route path="/company-management/company-details/:id" element={<ProtectedRoutes Components={CompanyDetails} />} />
        {/* <Route path="/issue-administration" element={<ProtectedRoutes Components={IssueAdministration} />} />
        <Route path="/issue-administration/issue-detail/:id" element={<ProtectedRoutes Components={IssueDetail} />} />

        <Route path="/safe-administration" element={<ProtectedRoutes Components={SafeManagement} />} />
        <Route path="/safe-administration/safe-detail/:id" element={<ProtectedRoutes Components={SafeDetails} />} />
        <Route path="/safe-administration/edit-detail/:id" element={<ProtectedRoutes Components={EditSafeDetails} />} />
        <Route path="/add-safe/" element={<ProtectedRoutes Components={AddSafe} />} /> */}

        <Route path="/profile" element={<ProtectedRoutes Components={Profile} />} />
        <Route path="/profile/edit-profile" element={<ProtectedRoutes Components={EditProfile} />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
