import React, { useState, useRef } from 'react';
import styles from '@/components/user/user-card/UserCard.module.css';
import More from '@/assets/img/more.svg?react';
import Modal from '@/components/ui/modal/Modal';
import { useClickOutside } from '@/hooks';
import UserAvatar from '@/components/user/user-avatar/UserAvatar';
import { useContactActions } from '@/hooks/event/useAddContactToEvent';
import ErrorToast from '@/components/ui/notification/ErrorToast';

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
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    useClickOutside(menuRef, () => menuOpen && setMenuOpen(false));

    const { addContact, isLoading } = useContactActions();

    const handleAddContact = async () => {
        try {
            await addContact({ eventId, userId });
            setToast({ message: 'Пользователь успешно добавлен в контакты', type: 'success' });
        } catch (error) {
            setToast({ message: 'Не удалось добавить пользователя в контакты', type: 'error' });
        } finally {
            setMenuOpen(false);
        }
    };

    return (
        <div className={styles.card}>
            {isOrganizer && (
                <>
                    <More
                        className={styles.moreIcon}
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

            <UserAvatar avatarUrl={avatarUrl} alt={name} className={styles.avatar} />
            <div className={styles.infoBlock}>
                <p className={styles.name}>{name}</p>
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
            {toast && (
                <ErrorToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

        </div>
    );
};

export default InteractiveUserCard;
