import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import img from '@/assets/img/img.svg';
import AuthForm from '@/features/auth-form/ui/AuthForm';
import LinkButton from "@/shared/ui/link-button/LinkButton";

const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');

    return (
        <div className={styles.authPage}>
            <div className={styles.authPageImage}>
                <img src={img} alt="Фоновая картинка" />
            </div>

            <div className={styles.authTopLink}>
                {mode === 'login' && <LinkButton label="Регистрация" onClick={() => setMode('register')} />}
                {mode === 'register' && <LinkButton label="Вход в личный кабинет" onClick={() => setMode('login')} />}
            </div>

            <div className={styles.authPageContent}>
                <AuthForm mode={mode} setMode={setMode} />
            </div>
        </div>
    );
};

export default AuthPage;
