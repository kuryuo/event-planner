import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/AuthPages/LoginPage.tsx";
import ForgotPasswordPage from "./pages/AuthPages/PasswordResetPage.tsx";
import RegisterPage from "./pages/AuthPages/RegisterPage.tsx";
import {ROUTES} from "./const.ts";
function App() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                <Route path={ROUTES.RESET_PASSWORD} element={<ForgotPasswordPage />} />
            </Routes>
        </Router>
    );
}

export default App;
