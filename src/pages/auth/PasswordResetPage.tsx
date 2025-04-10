import React from 'react';
import InputField from '@/components/input-field/InputField.tsx';
import Button from '@/components/button/Button.tsx';
import LinkButton from '@/components/link-button/LinkButton.tsx';
import img from '@/assets/img/img.svg';
import styles from './AuthPage.module.css';
import {AppRoute} from "@/const";

const ForgotPasswordPage: React.FC = () => {
    return (
        <div className={styles.authPage}>
            <div className={styles.authPageImage}>
                <img src={img} alt="Фоновая картинка" />
            </div>
            <div className={styles.authPageContent}>
                <form className={styles.authForm}>
                    <h1>Восстановление пароля</h1>
                    <InputField type="email" placeholder="Введите email для восстановления" />
                    <Button label="Отправить запрос" variant="default" />
                    <div className={styles.linkButtonContainer}>
                        <LinkButton label="Вернуться к входу" href={AppRoute.LOGIN} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
