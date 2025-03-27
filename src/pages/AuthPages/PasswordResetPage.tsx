import React from 'react';
import InputField from '../../components/InputField/InputField.tsx';
import Button from '../../components/Button/Button.tsx';
import LinkButton from '../../components/LinkButton/LinkButton.tsx';
import img from '../../assets/img/img.svg';
import styles from './AuthPage.module.css';

const ForgotPasswordPage: React.FC = () => {
    return (
        <div className={styles.authPage}>
            <div className={styles.authPageImage}>
                <img src={img} alt="Фоновая картинка" />
            </div>
            <div className={styles.authPageContent}>
                <form className={styles.authForm}>
                    <h1>Восстановление пароля</h1>
                    <InputField label="Email" type="email" placeholder="Введите email для восстановления" />
                    <Button label="Отправить запрос" variant="default" />
                    <div className={styles.linkButtonContainer}>
                        <LinkButton label="Вернуться к входу" href="/login" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
