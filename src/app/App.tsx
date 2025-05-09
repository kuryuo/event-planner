import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from "@/pages/auth/AuthPage";
import ProfilePage from '@/pages/profile/ProfilePage';
import NewEventPage from '@/pages/create-event/CreateEventPage';
import EventPage from '@/pages/event/EventPage';
import EventsListPage from '@/pages/event-list/EventsListPage';
import EventPhotosPage from "@/pages/photos/EventPhotosPage";
import EventSubscribersPage from "@/pages/subscribers/EventSubscribersPage";
import InviteUserPage from "@/pages/invite-user/InviteUserPage";

import Modal from '@/shared/ui/modal/Modal';

import { AppRoute } from '@/const';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={AppRoute.AUTH} element={<AuthPage />} />
                <Route path={AppRoute.PROFILE} element={<ProfilePage />} />
                <Route path={AppRoute.CREATE_EVENT} element={<NewEventPage />} />
                <Route path={AppRoute.EVENT} element={<EventPage mode = "participant"/>} />
                <Route path={AppRoute.ADMIN_EVENT} element={<EventPage mode = "organizer" />} />
                <Route path={AppRoute.EVENT_LIST} element={<EventsListPage />} />
                <Route path={AppRoute.PHOTOS_EVENT} element={<EventPhotosPage/>} />
                <Route path={AppRoute.SUBSCRIBERS} element={<EventSubscribersPage/>} />
                <Route path={AppRoute.INVITE} element={<InviteUserPage/>} />

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
