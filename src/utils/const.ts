export enum AppRoute {
    AUTH = "/",
    PROFILE = "/profile",
    CREATE_EVENT = "/create-event",
    EVENT = "/event/:eventId",
    EVENT_LIST = "/event-list",
    PHOTOS_EVENT = "/photos-event",
    SUBSCRIBERS = "/subscribers",
    INVITE = "/invite",
    CALENDAR = "/calendar",
    EDIT_EVENT = "/edit-event/:eventId",
}

export const API_BASE_URL = 'https://smarteventmanager.ru';

export const API_BASE_PATH = `${API_BASE_URL}/api`;
