import { useState } from 'react';
import {
    useCreateEventPostMutation,
    useDeleteEventPostMutation,
    useUpdateEventPostMutation,
    useGetEventPostsQuery,
} from '@/services/api/event-post/eventPostApi';

export const useEventPostForm = (eventId: string) => {
    const {
        data: posts = [],
        isLoading: isPostsLoading,
    } = useGetEventPostsQuery({ eventId });

    const [createEventPost, { isLoading: isCreating }] = useCreateEventPostMutation();
    const [updateEventPost, { isLoading: isUpdating }] = useUpdateEventPostMutation();
    const [deleteEventPost, { isLoading: isDeleting }] = useDeleteEventPostMutation();

    const [actionError, setActionError] = useState<string | null>(null);

    const handleCreatePost = async (message: string) => {
        try {
            await createEventPost({ eventId, text: message }).unwrap();
            setActionError(null);
        } catch {
            setActionError('Ошибка при создании поста');
        }
    };

    const handleUpdatePost = async (postId: string, message: string) => {
        try {
            await updateEventPost({ postId, eventId, text: message }).unwrap();
            setActionError(null);
        } catch {
            setActionError('Ошибка при редактировании поста');
        }
    };

    const handleDeletePost = async (postId: string) => {
        try {
            await deleteEventPost({ postId, eventId }).unwrap();
            setActionError(null);
        } catch {
            setActionError('Ошибка при удалении поста');
        }
    };

    return {
        posts,
        isPostsLoading,
        handleCreatePost,
        handleUpdatePost,
        handleDeletePost,
        isCreating,
        isUpdating,
        isDeleting,
        actionError,
    };
};
