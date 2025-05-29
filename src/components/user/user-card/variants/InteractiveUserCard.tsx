import React, { useState, useRef } from 'react';
import styles from '@/components/user/user-card/UserCard.module.css';
import moreIcon from '@/assets/img/more.svg';
import Modal from '@/components/ui/modal/Modal';
import { useClickOutside } from '@/hooks';
import UserAvatar from '@/components/user/user-avatar/UserAvatar';

interface Props {
    name: string;
    role?: string;
    avatarUrl?: string;
}

const InteractiveUserCard: React.FC<Props> = ({ name, role, avatarUrl }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const menuRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(menuRef, () => {
        if (menuOpen) setMenuOpen(false);
    });

    const handleConfirmExclude = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.card}>
            <UserAvatar avatarUrl={avatarUrl} alt={name} className={styles.avatar} />
            <div className={styles.infoBlock}>
                <div className={styles.headerWithMenu}>
                    <p className={styles.name}>{name}</p>
                    <img
                        src={moreIcon}
                        alt="Меню"
                        className={styles.menu}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    />

                    {menuOpen && (
                        <div className={styles.menuDropdown} ref={menuRef}>
                            <button
                                className={styles.excludeButton}
                                onClick={() => {
                                    setShowModal(true);
                                    setMenuOpen(false);
                                }}
                            >
                                Исключить
                            </button>
                        </div>
                    )}
                </div>

                {role && <p className={styles.role}>{role}</p>}

                <label className={styles.checkboxRow}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span className={styles.label}>Добавить в блок "Контакты"</span>
                </label>
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmExclude}
                title="Подтверждение исключения"
                description={`Вы уверены, что хотите исключить ${name} с мероприятия “Масленница 2025”?`}
                primaryText="Исключить"
                secondaryText="Отмена"
                primaryType="red"
                secondaryType="border"
                buttonSize="small"
            />
        </div>
    );
};

export default InteractiveUserCard;
