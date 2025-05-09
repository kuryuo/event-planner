import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '@/shared/ui/input-field/InputField';
import Button from '@/shared/ui/button/Button';
import LinkButton from '@/shared/ui/link-button/LinkButton';
import img from '@/assets/img/img.svg';
import styles from './AuthPage.module.css';
import { AppRoute } from '@/const';

const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(AppRoute.EVENT_LIST);
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authPageImage}>
                <img src={img} alt="Фоновая картинка" />
            </div>

            <div className={styles.authLinkContainer}>
                {mode === 'login' && (
                    <LinkButton label="Регистрация" onClick={() => setMode('register')} />
                )}
                {mode === 'register' && (
                    <LinkButton label="Вход в личный кабинет" onClick={() => setMode('login')} />
                )}
            </div>

            <div className={styles.authPageContent}>
                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <h1>
                        {mode === 'login' && 'Вход'}
                        {mode === 'register' && 'Регистрация'}
                        {mode === 'reset' && 'Восстановление пароля'}
                    </h1>

                    {mode === 'login' && (
                        <>
                            <InputField type="text" placeholder="Введите логин" size = "medium" />
                            <InputField type="password" placeholder="Введите пароль" size = "medium" />
                        </>
                    )}

                    {mode === 'register' && (
                        <>
                            <InputField type="email" placeholder="Введите email" size = "medium" />
                            <InputField type="password" placeholder="Введите пароль" size = "medium" />
                            <InputField type="password" placeholder="Повторите пароль" size = "medium" />
                        </>
                    )}

                    {mode === 'reset' && (
                        <InputField type="email" placeholder="Введите email для восстановления" size = "medium" />
                    )}

                    <Button
                        label={
                            mode === 'login'
                                ? 'Войти'
                                : mode === 'register'
                                    ? 'Зарегистрироваться'
                                    : 'Отправить запрос'
                        }
                        variant="default"
                    />

                    {mode === 'login' && (
                        <div className={styles.linkButtonContainer}>
                            <LinkButton label="Забыли пароль?" onClick={() => setMode('reset')} />
                        </div>
                    )}

                    {(mode === 'register' || mode === 'reset') && (
                        <div className={styles.linkButtonContainer}>
                            <LinkButton label="Вернуться ко входу" onClick={() => setMode('login')} />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AuthPage;