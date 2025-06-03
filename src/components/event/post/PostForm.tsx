import React, { useState, useEffect } from 'react';
import styles from './PostForm.module.css';
import Button from '@/components/ui/button/Button';

interface PostFormProps {
    onPublish: (message: string) => void;
    initialMessage?: string;
    isEditMode?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ onPublish, initialMessage = '', isEditMode = false }) => {
    const [message, setMessage] = useState(initialMessage);

    useEffect(() => {
        setMessage(initialMessage);
    }, [initialMessage]);

    const handleSubmit = () => {
        if (message.trim()) {
            onPublish(message);
            setMessage('');
        }
    };

    return (
        <div className={styles.form}>
            <textarea
                className={styles.textarea}
                placeholder="Напишите что-нибудь"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className={styles.buttonWrapper}>
                <Button
                    label={isEditMode ? 'Изменить' : 'Опубликовать'}
                    onClick={handleSubmit}
                    variant="grey"
                    size="small"
                />
            </div>
        </div>
    );
};

export default PostForm;
