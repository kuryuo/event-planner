import React from 'react';
import InputField from '../../components/InputField/InputField.tsx';
import Button from '../../components/Button/Button.tsx';
import img from '../../assets/img/img.svg';
import styles from './AuthPage.module.css';
import LinkButton from "../../components/LinkButton/LinkButton.tsx";
import {ROUTES} from "../../const.ts";

const RegisterPage: React.FC = () => {
    return (
        <div className={styles.authPage}>
            <div className={styles.authPageImage}>
                <img src={img} alt="Фоновая картинка" />
            </div>

            <div className={styles.authLinkContainer}>
                <LinkButton label="Вход в личный кабинет" href={ROUTES.LOGIN} />
            </div>

            <div className={styles.authPageContent}>
                <form className={styles.authForm}>
                    <h1>Регистрация</h1>
                    <InputField label="Email" type="email" placeholder="Введите email" />
                    <InputField label="Пароль" type="password" placeholder="Введите пароль" />
                    <InputField label="Повторите пароль" type="password" placeholder="Повторите пароль" />
                    <Button label="Зарегистрироваться" variant="default" />
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
