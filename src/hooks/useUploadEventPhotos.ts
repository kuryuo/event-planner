import { useUploadEventPhotoMutation } from '@/services/api/event/eventApi';

export const useUploadEventPhotos = (eventId: string) => {
    const [uploadPhoto, { isLoading, isError, isSuccess }] = useUploadEventPhotoMutation();

    const handleUpload = async (files: FileList | null) => {
        if (!files || !eventId) return;

        const uploads = Array.from(files).map(file =>
            uploadPhoto({ eventId, file }).unwrap()
        );

        try {
            await Promise.all(uploads);
            console.log('Все фото успешно загружены');
        } catch (err) {
            console.error('Ошибка при загрузке фото:', err);
        }
    };

    return { handleUpload, isLoading, isError, isSuccess };
};
