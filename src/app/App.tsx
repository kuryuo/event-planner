import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "@/pages/auth/LoginPage";
import ForgotPasswordPage from "@/pages/auth/PasswordResetPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import {AppRoute} from "@/const";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={AppRoute.LOGIN} element={<LoginPage />} />
                <Route path={AppRoute.REGISTER} element={<RegisterPage />} />
                <Route path={AppRoute.RESET_PASSWORD} element={<ForgotPasswordPage />} />
                <Route path={AppRoute.PROFILE} element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;
