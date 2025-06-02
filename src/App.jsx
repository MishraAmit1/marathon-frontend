import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./admin/Login";
import Signup from "./admin/Signup";
import ProtectedRoute from "./admin/ProtectedRoute";
import Sidebar from "./admin/Sidebar";
import UserLayout from "./user/components/UserLayout";

// Admin Components
import Dashboard from "./admin/components/Dashboard";
import DisplayUsers from "./admin/components/DisplayUsers";
import EditUser from "./admin/components/EditUser";
import ChangePassword from "./admin/components/ChangePassword";
import CreateEvent from "./admin/components/ManageEvents/CreateEvent";
import ViewEvents from "./admin/components/ManageEvents/ViewEvents";
import EditEvent from "./admin/components/ManageEvents/EditEvent";
import CreateCategory from "./admin/components/ManageEvents/CreateCategory";
import ViewCategories from "./admin/components/ManageEvents/ViewCategories";
import EditCategory from "./admin/components/ManageEvents/EditCategory";
import CreateRegistration from "./admin/components/ManageRegistrations/CreateRegistration";
import ViewRegistrations from "./admin/components/ManageRegistrations/ViewRegistrations";
import EditRegistration from "./admin/components/ManageRegistrations/EditRegistration";
import CreateParticipation from "./admin/components/ManageParticpateIn/CreateParticipation";
import ViewParticipate from "./admin/components/ManageParticpateIn/ViewParticipate";
import EditParticipate from "./admin/components/ManageParticpateIn/EditParticipate";
import CreateEligibilityCriteria from "./admin/components/ManageEligibilityCriteria/CreateEligibilityCriteria.jsx";
import ManageEligibilityCriteria from "./admin/components/ManageEligibilityCriteria/ManageEligibilityCriteria.jsx";
import EditEligibilityCriteria from "./admin/components/ManageEligibilityCriteria/EditEligibilityCriteria.jsx";
import InviteAdmin from "./admin/components/InviteAdmin.jsx";
import Profile from "./admin/Profile.jsx";

// User Components
import UserDashboard from "./user/components/UserDashboard.jsx";
import BrowseEvents from "./user/components/BrowseEvents.jsx";
import RegisterEvent from "./user/components/RegisterEvent.jsx";
import MyRegistrations from "./user/components/MyRegistrations.jsx";
import UserProfile from "./user/components/UserProfile.jsx";
import UserChangePassword from "./user/components/ChangePassword.jsx"; // New import
import EventImages from "./user/components/EventImages.jsx";
import CreateSponsor from "./admin/components/ManageSponsors/CreateSponsor.jsx";
import ViewSponsors from "./admin/components/ManageSponsors/ViewSponsors.jsx";
import EditSponsor from "./admin/components/ManageSponsors/EditSponsor.jsx";
import Sponsors from "./user/components/Sponsors.jsx";
import ContactUs from "./user/components/ContactUs.jsx";
import ManageContactSubmissions from "./admin/components/ManageContactSubmissions/ManageContactSubmissions.jsx";
import EditContactInfo from "./admin/components/ManageContactInfo/EditContactInfo.jsx";
import EditFAQ from "./admin/components/ManageFAQs/EditFAQ.jsx";
import CreateFAQ from "./admin/components/ManageFAQs/CreateFAQ.jsx";
import ManageFAQs from "./admin/components/ManageFAQs/ManageFAQs.jsx";
import FAQs from "./user/components/FAQs.jsx";
import Abouts from "./user/components/AboutUs.jsx";
import AboutOrganiser from "./user/components/AboutOrganiser.jsx";
import ManageAboutUs from "./admin/components/ManageAboutUs/ManageAboutUs.jsx";
import CreateAboutUs from "./admin/components/ManageAboutUs/CreateAboutUs.jsx";
import EditAboutUs from "./admin/components/ManageAboutUs/EditAboutUs.jsx";
import ManageAboutOrganiser from "./admin/components/ManageAboutUs/ManageAboutOrganiser.jsx";
import CreateAboutOrganiser from "./admin/components/ManageAboutUs/CreateAboutOrganiser.jsx";
import EditAboutOrganiser from "./admin/components/ManageAboutUs/EditAboutOrganiser.jsx";
import HowToReach from "./user/components/HowToReach.jsx";
import EditHowToReach from "./admin/components/ManageHowToReach/EditHowToReach.jsx";
import CreateHowToReach from "./admin/components/ManageHowToReach/CreateHowToReach.jsx";
import ManageHowToReach from "./admin/components/ManageHowToReach/ManageHowToReach.jsx";
import MarathonHub from "./user/components/MarathonHub.jsx";
import ManageMarathonHub from "./admin/components/ManageMarathonHub/ManageMarathonHub.jsx";
import CreateMarathonHub from "./admin/components/ManageMarathonHub/CreateMarathonHub.jsx";
import EditMarathonHub from "./admin/components/ManageMarathonHub/EditMarathonHub.jsx";
import BibCollection from "./user/components/BibCollection.jsx";
import ManageBibCollection from "./admin/components/ManageBibCollection/ManageBibCollection.jsx";
import CreateBibCollection from "./admin/components/ManageBibCollection/CreateBibCollection.jsx";
import EditBibCollection from "./admin/components/ManageBibCollection/EditBibCollection.jsx";
import PartnerAndSponsor from "./user/components/PartnerAndSponsor.jsx";
import ManagePartnerAndSponsor from "./admin/components/ManagePartnerAndSponsor/ManagePartnerAndSponsor.jsx";
import CreatePartnerAndSponsor from "./admin/components/ManagePartnerAndSponsor/CreatePartnerAndSponsor.jsx";
import EditPartnerAndSponsor from "./admin/components/ManagePartnerAndSponsor/EditPartnerAndSponsor.jsx";
import GallerySection from "./user/components/GallerySection.jsx";
import ManageGallery from "./admin/components/ManageGallery/ManageGallery.jsx";
import CreateGallery from "./admin/components/ManageGallery/CreateGallery.jsx";
import EditGallery from "./admin/components/ManageGallery/EditGallery.jsx";
import EligibilityCriteria from "./user/components/EligibilityCriteria.jsx";
import TermsAndCondition from "./user/components/TermsAndCondition.jsx";
import ClothingGuide from "./user/components/ClothingGuide.jsx";
import EditResult from "./admin/components/ManageResults/EditResult.jsx";
import AddResults from "./admin/components/ManageResults/AddResults.jsx";
import ViewResults from "./admin/components/ManageResults/ViewResults.jsx";
import Results from "./user/components/Results.jsx";

const SignupRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const inviteToken = new URLSearchParams(location.search).get("invite");
  if (inviteToken) {
    return <Signup />;
  }
  return token ? <Navigate to="/user/dashboard" replace /> : <Signup />;
};
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} /> {/* No token check here */}
        <Route path="/login" element={<Login />} /> {/* No token check here */}
        <Route path="/signup" element={<SignupRoute />} />
        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Dashboard />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/invite-admin"
          element={
            <ProtectedRoute>
              <Sidebar>
                <InviteAdmin />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Profile />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/displayuser"
          element={
            <ProtectedRoute>
              <Sidebar>
                <DisplayUsers />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/edituser/:id"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditUser />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/change-password"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ChangePassword />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/create"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateEvent />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ViewEvents />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-event/:eventId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditEvent />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-category"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateCategory />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/category-views"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ViewCategories />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-category/:categoryId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditCategory />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-event-registrations"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateRegistration />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/views-event-registrations"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ViewRegistrations />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-event-registrations/:registrationId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditRegistration />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-participatein"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateParticipation />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-participatein"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ViewParticipate />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-participatein/:id"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditParticipate />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsors/create"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateSponsor />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsors"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ViewSponsors />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsors/edit/:id"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditSponsor />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-contact-submissions"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ManageContactSubmissions />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-contact-info"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditContactInfo />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-faqs"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ManageFAQs />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-faq"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateFAQ />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-faq/:faqId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditFAQ />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-about-us"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ManageAboutUs />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-about-us"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateAboutUs />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-about-us/:aboutId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditAboutUs />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-about-organiser"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ManageAboutOrganiser />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-about-organiser"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateAboutOrganiser />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-about-organiser/:organiserId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditAboutOrganiser />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-how-to-reach"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ManageHowToReach />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-how-to-reach"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateHowToReach />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-how-to-reach/:reachId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditHowToReach />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-marathon-hub"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ManageMarathonHub />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-marathon-hub"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateMarathonHub />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-marathon-hub/:hubId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditMarathonHub />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-bib-collection"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ManageBibCollection />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-bib-collection"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateBibCollection />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-bib-collection/:bibId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditBibCollection />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-partner-and-sponsor"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ManagePartnerAndSponsor />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-partner-and-sponsor"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreatePartnerAndSponsor />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-partner-and-sponsor/:partnerId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditPartnerAndSponsor />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-gallery"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ManageGallery />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-gallery"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateGallery />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-gallery/:galleryId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditGallery />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-eligibility-criteria"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ManageEligibilityCriteria />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-eligibility-criteria"
          element={
            <ProtectedRoute>
              <Sidebar>
                <CreateEligibilityCriteria />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-eligibility-criteria/:criteriaId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditEligibilityCriteria />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-results"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ViewResults />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-results"
          element={
            <ProtectedRoute>
              <Sidebar>
                <AddResults />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:resultId"
          element={
            <ProtectedRoute>
              <Sidebar>
                <EditResult />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        {/* User Routes with UserLayout */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserLayout>
                <UserDashboard />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/events"
          element={
            <ProtectedRoute>
              <UserLayout>
                <BrowseEvents />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/register/:eventId"
          element={
            <ProtectedRoute>
              <UserLayout>
                <RegisterEvent />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/my-registrations"
          element={
            <ProtectedRoute>
              <UserLayout>
                <MyRegistrations />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserLayout>
                <UserProfile />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/change-password"
          element={
            <ProtectedRoute>
              <UserLayout>
                <UserChangePassword />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/event-images"
          element={
            <ProtectedRoute>
              <UserLayout>
                <EventImages />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/sponsors"
          element={
            <ProtectedRoute>
              <UserLayout>
                <Sponsors />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/contact-us"
          element={
            <ProtectedRoute>
              <UserLayout>
                <ContactUs />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/faqs"
          element={
            <ProtectedRoute>
              <UserLayout>
                <FAQs />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/general-info/about/history"
          element={
            <ProtectedRoute>
              <UserLayout>
                <Abouts />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/general-info/about/organiser"
          element={
            <ProtectedRoute>
              <UserLayout>
                <AboutOrganiser />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/general-info/event-details/how-to-reach"
          element={
            <ProtectedRoute>
              <UserLayout>
                <HowToReach />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/general-info/event-details/hub"
          element={
            <ProtectedRoute>
              <UserLayout>
                <MarathonHub />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/general-info/event-details/bib"
          element={
            <ProtectedRoute>
              <UserLayout>
                <BibCollection />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/general-info/get-involved/partners-sponsorship"
          element={
            <ProtectedRoute>
              <UserLayout>
                <PartnerAndSponsor />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/general-info/media/gallery"
          element={
            <ProtectedRoute>
              <UserLayout>
                <GallerySection />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/registration/eligibility"
          element={
            <ProtectedRoute>
              <UserLayout>
                <EligibilityCriteria />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/registration/terms"
          element={
            <ProtectedRoute>
              <UserLayout>
                <TermsAndCondition />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/registration/clothing-guide"
          element={
            <ProtectedRoute>
              <UserLayout>
                <ClothingGuide />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/results"
          element={
            <ProtectedRoute>
              <UserLayout>
                <Results />
              </UserLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
