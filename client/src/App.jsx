import { Route, Routes } from "react-router-dom"
import ParentLayout from "./Components/Layout/ParentLayout"
import Home from "./Pages/Home"
import { useState, useEffect } from "react";
import Adoption from "./Pages/Adoption";
import PetList from "./Components/Adoption/PetList";
import AdoptionReqeustForm from "./Components/Adoption/AdoptionReqeustForm";
import PetAdoptionDetails from "./Pages/PetAdoptionDetails";
import Transport from "./Pages/Transport";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import Auth from "./Pages/Auth";
import SingleService from "./Components/Transport/SingleService";
import TransportProcedure from "./Components/Transport/TransportProcedure";
import AgencyDetailed from "./Components/Transport/AgencyDetailed";
import BlogLayout from "./Components/Layout/BlogLayout";
import Blog from "./Pages/Blog";
import CreateBlog from "./Components/Blog/CreateBlog";
import AdminAdoptionView from "./Pages/AdminAdoptionView";
import Profile from "./Pages/Profile";
import ProfileUserInfo from "./Components/Profile/user/ProfileUserInfo";
import ProfileTransportList from "./Components/Profile/Transport/ProfileTransportList";
import ProfileBlogList from "./Components/Profile/Blog/ProfileBlogList";
import ProfileAdoptionLayout from "./Components/Layout/ProfileAdoptionLayout";
import Pending from "./Components/Profile/adoption/Pending";
import Adopted from "./Components/Profile/adoption/Adopted";
import UserAdopted from "./Components/Profile/adoption/UserAdopted";
import About from "./Pages/About";
import ProfileTransportLayout from "./Components/Layout/ProfileTransportLayout";
import ProfileTransportPending from "./Components/Profile/Transport/ProfileTransportPending";
import ProfileTransportAccepted from "./Components/Profile/Transport/ProfileTransportAccepted";
import ProfileTransportCompleted from "./Components/Profile/Transport/ProfileTransportCompleted";
import ShowTransportDetails from "./Components/Transport/ShowTransportDetails";
import TransportDetailsReveal from "./Components/Transport/TransportDetailsReveal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ParentLayout />}>
        <Route path="auth" element={<Auth />}>
          <Route index element={<SignIn />} />
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
        </Route>
        <Route index element={<Home />} />
        <Route path="adoption" element={<Adoption />}>
          <Route index element={<PetList />} />
          <Route path="request" element={<AdoptionReqeustForm />} />
        </Route>
        <Route path="adoption/:postId" element={<PetAdoptionDetails/>}/>
        <Route path="transport" element={<Transport/>}/>
        <Route path="transport/service/:serviceId" element={<SingleService/>}/>
        <Route path="transport/agency/:agencyId" element={<AgencyDetailed/>}/>
        <Route path="transport/booking" element={<TransportProcedure/>}/>
        <Route path="transport/:postId" element={<TransportDetailsReveal/>}/>
        <Route path="blog" element={<BlogLayout/>}>
          <Route index element={<Blog/>}/>
          <Route path="create" element={<CreateBlog/>}/>
        </Route>
        <Route path="admin/adoption" element={<AdminAdoptionView />} />
        <Route path="profile/:userId?" element={<Profile />}>
          <Route index element={<ProfileUserInfo />} />
          <Route path="adoption" element={<ProfileAdoptionLayout />}>
            <Route index element={<Pending />} />
            <Route path="adopted" element={<Adopted />} />
            <Route path="userAdoptions" element={<UserAdopted />} />
          </Route>
          <Route path="transport" element={<ProfileTransportLayout/>}>
            <Route index element={<ProfileTransportPending/>}/>
            <Route path="approved" element={<ProfileTransportAccepted/>}/>
            <Route path="completed" element={<ProfileTransportCompleted/>}/>
          </Route>
          <Route path="blog" element={<ProfileBlogList/>}/>
        </Route>
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
