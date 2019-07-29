import { IUsers } from "./Users";

/**
 * ISession
 * @description Session Content
 */
export interface ISession {
    /** User info */
    user: IUsers;
    /** Session Token */
    token: string;
}
