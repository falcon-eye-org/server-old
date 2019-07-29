/**
 * IError
 * @description Interface IError
 * @author Booster-cli
 */
export interface IError {
    /** Error code */
    code: string;
    /** Which function failed */
    from: string;
    /** Reason for Error */
    why: string;
    /** * System Error (Native error message) */
    systemError?: any;
}

export const errorList = {
    "00": "No Error",
    "01": "Invalid API Key",
    "02": "Authentification failed"
};
