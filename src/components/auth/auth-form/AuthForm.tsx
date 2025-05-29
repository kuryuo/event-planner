import React from 'react';
import InputField from '@/components/ui/input-field/InputField';
import Button from '@/components/ui/button/Button';
import LinkButton from '@/components/ui/link-button/LinkButton';
import styles from './AuthForm.module.css';
import { useAuth } from '@/hooks';
import ErrorToast from "@/components/ui/notification/ErrorToast";

type Props = {
    mode: 'login' | 'register' | 'reset';
    setMode: (mode: 'login' | 'register' | 'reset') => void;
};

const AuthForm: React.FC<Props> = ({ mode, setMode }) => {
    const { email, password, setEmail, setPassword, handleSubmit, notification, setNotification } =
        useAuth(mode);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.title}>
                {mode === 'login' && 'Вход'}
                {mode === 'register' && 'Регистрация'}
                {mode === 'reset' && 'Восстановление пароля'}
            </h1>

            {(mode === 'login' || mode === 'register') && (
                <>
                    <InputField
                        type="email"
                        placeholder="Введите email"
                        value={email}
                        onChange={setEmail}
                        size="medium"
                    />
                    <InputField
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={setPassword}
                        size="medium"
                    />
                </>
            )}

            {mode === 'reset' && (
                <InputField
                    type="email"
                    placeholder="Введите email для восстановления"
                    value={email}
                    onChange={setEmail}
                    size="medium"
                />
            )}

            <Button
                label={
                    mode === 'login'
                        ? 'Войти'
                        : mode === 'register'
                          ? 'Зарегистрироваться'
                          : 'Отправить запрос'
                }
                variant="grey"
            />

            {notification && (
                <ErrorToast
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            {mode === 'login' && (
                <div className={styles.links}>
                    <LinkButton label="Забыли пароль?" onClick={() => setMode('reset')} />
                </div>
            )}

            {(mode === 'register' || mode === 'reset') && (
                <div className={styles.links}>
                    <LinkButton label="Вернуться ко входу" onClick={() => setMode('login')} />
                </div>
            )}
        </form>
    );
};

export default AuthForm;
