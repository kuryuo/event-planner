import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from "@/pages/auth/AuthPage";
import ProfilePage from '@/pages/profile/ProfilePage';
import EventManagementPage from '@/pages/event-management/EventManagementPage';
import EventPage from '@/pages/event/EventPage';
import EventsListPage from '@/pages/event-list/EventsListPage';
import EventPhotosPage from "@/pages/photos/EventPhotosPage";
import EventSubscribersPage from "@/pages/subscribers/EventSubscribersPage";
import InviteUserPage from "@/pages/invite-user/InviteUserPage";
import CalendarPage from "@/pages/calendar/CalendarPage";

import { AppRoute } from '@/utils/const';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={AppRoute.AUTH} element={<AuthPage />} />
                <Route path={AppRoute.PROFILE} element={<ProfilePage />} />
                <Route path={AppRoute.CREATE_EVENT} element={<EventManagementPage />} />
                <Route path={AppRoute.EDIT_EVENT} element={<EventManagementPage isEditMode />} />
                <Route path={AppRoute.EVENT} element={<EventPage />} />
                <Route path={AppRoute.EVENT_LIST} element={<EventsListPage />} />
                <Route path={AppRoute.PHOTOS_EVENT} element={<EventPhotosPage/>} />
                <Route path={AppRoute.SUBSCRIBERS} element={<EventSubscribersPage/>} />
                <Route path={AppRoute.INVITE} element={<InviteUserPage/>} />
                <Route path={AppRoute.CALENDAR} element={<CalendarPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
