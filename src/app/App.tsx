import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from "@/pages/auth/AuthPage";
import ProfilePage from '@/pages/profile-page/ProfilePage';
import NewEventPage from '@/pages/new-event-page/NewEventPage';
import EventPage from '@/pages/event-page/EventPage';
import AdminEventPage from '@/pages/organizer-event-page/OrganizerEventPage';
import EventsListPage from '@/pages/events-list-page/EventsListPage';
import EventPhotosPage from "@/pages/event-photos-page/EventPhotosPage";

import Modal from '@/components/modal/Modal';

import { AppRoute } from '@/const';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={AppRoute.AUTH} element={<AuthPage />} />
                <Route path={AppRoute.PROFILE} element={<ProfilePage />} />
                <Route path={AppRoute.CREATE_EVENT} element={<NewEventPage />} />
                <Route path={AppRoute.EVENT} element={<EventPage />} />
                <Route path={AppRoute.ADMIN_EVENT} element={<AdminEventPage />} />
                <Route path={AppRoute.EVENT_LIST} element={<EventsListPage />} />
                <Route path={AppRoute.PHOTOS_EVENT} element={<EventPhotosPage/>} />

                <Route
                    path="/modal"
                    element={
                        <Modal
                            isOpen={true}
                            onClose={() => {}}
                            title="Выйти из аккаунта?"
                            description="Вы уверены, что хотите выйти?"
                            primaryText="Выйти"
                            secondaryText="Отмена"
                            primaryType="red"
                            secondaryType="border"
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
