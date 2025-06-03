import React, { useState, useRef, useEffect } from 'react';
import styles from './EventPost.module.css';
import cat from '@/assets/img/cat.png';
import More from '@/assets/img/more.svg?react';
import Edit from '@/assets/img/edit.svg?react';
import PostForm from '@/components/event/post/PostForm';
import { useParams } from 'react-router-dom';
import { useEventPostForm } from '@/hooks/post/useEventPostForm';

interface EventPostProps {
    isOrganizer: boolean;
    eventTitle: string;
}

const EventPost: React.FC<EventPostProps> = ({ isOrganizer, eventTitle }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
    const [editPostId, setEditPostId] = useState<string | null>(null);
    const [editText, setEditText] = useState<string>('');
    const menuRef = useRef<HTMLDivElement>(null);

    const { eventId } = useParams<{ eventId: string }>();
    const {
        posts,
        handleCreatePost,
        handleUpdatePost,
        handleDeletePost,
    } = useEventPostForm(eventId!);

    const handlePublish = (message: string) => {
        if (editPostId) {
            handleUpdatePost(editPostId, message);
            setEditPostId(null);
            setEditText('');
        } else {
            handleCreatePost(message);
        }
        setIsFormOpen(false);
    };

    const handleEdit = (postId: string, currentText: string) => {
        setEditPostId(postId);
        setEditText(currentText);
        setIsFormOpen(true);
        setMenuOpenIndex(null);
    };

    const handleDelete = (postId: string) => {
        handleDeletePost(postId);
        setMenuOpenIndex(null);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpenIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.notifications}>
            <div className={styles.titleRow}>
                <h4 className={styles.title}>Посты</h4>
                {isOrganizer && (
                    <Edit
                        className={styles.editIcon}
                        onClick={() => setIsFormOpen((prev) => !prev)}
                    />
                )}
            </div>

            {isOrganizer && isFormOpen && (
                <PostForm
                    onPublish={handlePublish}
                    initialMessage={editText}
                    isEditMode={!!editPostId}
                />
            )}
            <ul className={styles.list}>
                {posts.map((post, index) => (
                    <li key={post.id} className={styles.item}>
                        {isOrganizer && (
                            <>
                                <More
                                    className={styles.moreIcon}
                                    onClick={() =>
                                        setMenuOpenIndex(menuOpenIndex === index ? null : index)
                                    }
                                />
                                {menuOpenIndex === index && (
                                    <div className={styles.menuDropdown} ref={menuRef}>
                                        <button
                                            className={styles.menuButton}
                                            onClick={() => handleEdit(post.id, post.text)}
                                        >
                                            Редактировать пост
                                        </button>
                                        <button
                                            className={styles.menuButton}
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            Удалить пост
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                        <img src={cat} alt="Иконка" className={styles.icon} />
                        <div className={styles.content}>
                            <div className={styles.nameRow}>
                                <span className={styles.name}>{eventTitle}</span>
                            </div>
                            <p className={styles.text}>{post.text}</p>
                        </div>
                        <span className={styles.date}>
            {new Date(post.createdAt).toLocaleString()}
        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventPost;
