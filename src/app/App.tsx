import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "@/pages/auth/LoginPage";
import ForgotPasswordPage from "@/pages/auth/PasswordResetPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import CreateEventPage from "@/pages/create-event-page/CreateEventPage";

import Modal from "@/components/modal/Modal";

import {AppRoute} from "@/const";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={AppRoute.LOGIN} element={<LoginPage />} />
                <Route path={AppRoute.REGISTER} element={<RegisterPage />} />
                <Route path={AppRoute.RESET_PASSWORD} element={<ForgotPasswordPage />} />
                <Route path={AppRoute.PROFILE} element={<ProfilePage />} />
                <Route path={AppRoute.CREATE_EVENT} element={<CreateEventPage />} />

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
