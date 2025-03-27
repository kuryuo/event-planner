import React from 'react';
import InputField from '../../components/InputField/InputField.tsx';
import Button from '../../components/Button/Button.tsx';
import LinkButton from '../../components/LinkButton/LinkButton.tsx';
import img from '../../assets/img/img.svg';
import styles from './AuthPage.module.css';
import {ROUTES} from "../../const.ts";

const LoginPage: React.FC = () => {
    return (
        <div className={styles.authPage}>
            <div className={styles.authPageImage}>
                <img src={img} alt="Фоновая картинка" />
            </div>

            <div className={styles.authLinkContainer}>
                <LinkButton label="Регистрация" href={ROUTES.REGISTER} />
            </div>

            <div className={styles.authPageContent}>
                <form className={styles.authForm}>
                    <h1>Вход</h1>
                    <InputField label="Логин" type="text" placeholder="Введите логин" />
                    <InputField label="Пароль" type="password" placeholder="Введите пароль" />
                    <Button label="Войти" variant="default" />
                    <div className={styles.linkButtonContainer}>
                        <LinkButton label="Забыли пароль?" href={ROUTES.RESET_PASSWORD} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
