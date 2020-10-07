export interface IUser {
    signUpAndGenerateToken(signUpRequest: SignUpRequest): Promise<string | Error>;
    logInAndGenerateToken(loginRequest: LoginRequest): Promise<string | Error>;
}

export type SignUpRequest = {
    username: string;
    name: string;
    email: string;
    password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};