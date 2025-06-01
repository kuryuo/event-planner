import React, { useState, useRef } from 'react';
import styles from '@/components/user/user-card/UserCard.module.css';
import moreIcon from '@/assets/img/more.svg';
import Modal from '@/components/ui/modal/Modal';
import { useClickOutside } from '@/hooks';
import UserAvatar from '@/components/user/user-avatar/UserAvatar';
import { useContactActions } from '@/hooks/event/useAddContactToEvent';

interface Props {
    name: string;
    role?: string;
    avatarUrl?: string;
    eventId: string;
    userId: string;
    isOrganizer?: boolean;
    onClick?: () => void;
}

const InteractiveUserCard: React.FC<Props> = ({
    name,
    role,
    avatarUrl,
    eventId,
    userId,
    onClick,
    isOrganizer,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showExcludeModal, setShowExcludeModal] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(menuRef, () => menuOpen && setMenuOpen(false));

    const { addContact, isLoading } = useContactActions();

    const handleAddContact = async () => {
        await addContact({ eventId, userId });
        setMenuOpen(false);
    };

    return (
        <div className={styles.card}>
            <UserAvatar avatarUrl={avatarUrl} alt={name} className={styles.avatar} />
            <div className={styles.infoBlock}>
                <div className={styles.headerWithMenu}>
                    <p className={styles.name}>{name}</p>
                    {isOrganizer && (
                        <>
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
                                        onClick={handleAddContact}
                                        disabled={isLoading}
                                    >
                                        Добавить в контакты
                                    </button>

                                    <button
                                        className={styles.excludeButton}
                                        onClick={() => {
                                            onClick?.();
                                            setMenuOpen(false);
                                        }}
                                    >
                                        Изменить роль
                                    </button>

                                    <button
                                        className={styles.excludeButton}
                                        onClick={() => {
                                            setShowExcludeModal(true);
                                            setMenuOpen(false);
                                        }}
                                    >
                                        Исключить
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {role && <p className={styles.role}>{role}</p>}
            </div>

            <Modal
                isOpen={showExcludeModal}
                onClose={() => setShowExcludeModal(false)}
                onConfirm={() => {
                    setShowExcludeModal(false);
                }}
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
