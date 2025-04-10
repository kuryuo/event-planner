import React from 'react';
import InputField from '@/components/input-field/InputField';
import Button from '@/components/button/Button.tsx';
import LinkButton from '@/components/link-button/LinkButton.tsx';
import img from '@/assets/img/img.svg';
import styles from './AuthPage.module.css';
import {AppRoute} from "@/const.ts";

const LoginPage: React.FC = () => {
    return (
        <div className={styles.authPage}>
            <div className={styles.authPageImage}>
                <img src={img} alt="Фоновая картинка" />
            </div>

            <div className={styles.authLinkContainer}>
                <LinkButton label="Регистрация" href={AppRoute.REGISTER} />
            </div>

            <div className={styles.authPageContent}>
                <form className={styles.authForm}>
                    <h1>Вход</h1>
                    <InputField type="text" placeholder="Введите логин" />
                    <InputField type="password" placeholder="Введите пароль" />
                    <Button label="Войти" variant="default" />
                    <div className={styles.linkButtonContainer}>
                        <LinkButton label="Забыли пароль?" href={AppRoute.RESET_PASSWORD} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
