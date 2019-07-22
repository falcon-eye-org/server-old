/**
 * IConfig
 * @description Config Template
 */
export interface IConfig {
    /** Server API key */
    API_KEY: string;
    /** JWT Signin key */
    JWT_KEY: string;
    /** Database URL */
    DB?: string;
}

export const defaultConfig: IConfig = {
    API_KEY: "",
    JWT_KEY: "secret"
};
