import React from 'react';
import InputField from '@/components/input-field/InputField.tsx';
import Button from '@/components/button/Button.tsx';
import img from '@/assets/img/img.svg';
import styles from './AuthPage.module.css';
import LinkButton from "@/components/link-button/LinkButton.tsx";
import {AppRoute} from "@/const.ts";

const RegisterPage: React.FC = () => {
    return (
        <div className={styles.authPage}>
            <div className={styles.authPageImage}>
                <img src={img} alt="Фоновая картинка" />
            </div>

            <div className={styles.authLinkContainer}>
                <LinkButton label="Вход в личный кабинет" href={AppRoute.LOGIN} />
            </div>

            <div className={styles.authPageContent}>
                <form className={styles.authForm}>
                    <h1>Регистрация</h1>
                    <InputField type="email" placeholder="Введите email" />
                    <InputField type="password" placeholder="Введите пароль" />
                    <InputField type="password" placeholder="Повторите пароль" />
                    <Button label="Зарегистрироваться" variant="default" />
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
