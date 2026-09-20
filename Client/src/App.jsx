import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Welcome from './pages/welcome.jsx'
import Login from './pages/login.jsx'
import CreateAccount from './pages/createaccount.jsx'
import OtpVerification from './pages/OtpVerification.jsx'
import CompleteAccount from './pages/CompleteAccount.jsx'
import AccountCreated from './pages/AccountCreated.jsx'
import YearSelection from './pages/YearSelection.jsx'
import MemoryDetails from './pages/MemoryDetails.jsx'
import StoryDetails from './pages/StoryDetails.jsx'
import AddMemory from './pages/AddMemory.jsx'
import MediaSelection from './pages/MediaSelection.jsx'
import MediaPreviewEdit from './pages/MediaPreviewEdit.jsx'
import MemoryInformation from './pages/MemoryInformation.jsx'
import UploadProgress from './pages/UploadProgress.jsx'
import MemorySaved from './pages/MemorySaved.jsx'
import Search from './pages/Search.jsx'
import Timeline from './pages/Timeline.jsx'
import Places from './pages/Places.jsx'
import OnThisDay from './pages/OnThisDay.jsx'
import Favorites from './pages/Favorites.jsx'
import MemoryReel from './pages/MemoryReel.jsx'
import ShareSheet from './pages/ShareSheet.jsx'
import SelectMemories from './pages/SelectMemories.jsx'
import SharePreview from './pages/SharePreview.jsx'
import PublicMemory from './pages/PublicMemory.jsx'
import Profile from './pages/Profile.jsx'
import EditProfile from './pages/EditProfile.jsx'
import SecuritySettings from './pages/SecuritySetting.jsx'
import DeleteAccount from './pages/DeleteAccount.jsx'
import LockRewind from './pages/LockRewind.jsx'
import Storage from './pages/Storage.jsx'
import YearDetails from './pages/YearDetails.jsx'
import DayEventDetails from './pages/DayEventDetails.jsx'
import AddYear from './pages/AddYear.jsx'
import EditMemory from "./pages/EditMemory";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordOtp from "./pages/ForgotPasswordOtp";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route
  path="/ForgotPasswordOtp"
  element={<ForgotPasswordOtp />}
/>

        <Route path="/login" element={<Login />} />

        <Route path="/createaccount" element={<CreateAccount />} />

        <Route path="/OtpVerification" element={<OtpVerification />} />

        <Route path = "/AddYear" element = {<AddYear/>}/>

        <Route path="/CompleteAccount" element ={ <CompleteAccount/>} />

        <Route path="/AccountCreated" element={ <AccountCreated />} />

        <Route path="/YearSelection" element={ <YearSelection />} />

        <Route path="/MemoryDetails" element ={ <MemoryDetails />} />

        <Route path="/EditMemory" element={<EditMemory />} />

        <Route path="/StoryDetails" element ={ <StoryDetails />} />

        <Route path="/AddMemory" element ={ <AddMemory />} />

        <Route path="/MediaSelection" element ={ <MediaSelection />} />

        <Route path="/MediaPreviewEdit" element ={ <MediaPreviewEdit/>} />

        <Route path = "/MemoryInformation" element = {<MemoryInformation/>} />

        <Route path="/UploadProgress" element ={<UploadProgress/>} />

        <Route path= "/MemorySaved" element ={ <MemorySaved/>} />

        <Route path ="/Search" element ={ <Search/>} />

        <Route path="/Timeline" element ={ <Timeline />} />

        <Route path = "/Places" element ={<Places/>} />

        <Route path = "/OnThisDay" element = {<OnThisDay/>}/>

        <Route path="/Favorites" element = {<Favorites/>} />

        <Route path="/MemoryReel" element= {<MemoryReel/>} />

        <Route path = "/ShareSheet" element ={<ShareSheet/>}/>

        <Route path="/SelectMemories" element={<SelectMemories />} />

        <Route path="/SharePreview" element={<SharePreview />} />

        <Route path="/PublicMemory" element={<PublicMemory />} />

        <Route path="/Profile" element={<Profile />} />

        <Route path="/EditProfile" element={<EditProfile />} />

        <Route path="/SecuritySettings" element={<SecuritySettings />} />

        <Route path="/Storage" element={<Storage />} />

        <Route path="/LockRewind" element={<LockRewind />} />

        <Route path="/DelectAccount" element = { <DeleteAccount/>}/>

        <Route path="/YearDetails" element ={<YearDetails/>} />

        <Route path="/DayEventDetails" element ={<DayEventDetails/>} />

        <Route path="/ForgotPassword" element={<ForgotPassword />} />

        <Route
  path="/ResetPassword"
  element={<ResetPassword />}
/>

      </Routes>

    </BrowserRouter>
  )
}

export default App