export interface LoginForm {
    email: string,
    password: string
}
export interface RegisterForm {
    email: string,
    password: string
    confirm_password: string
}
export interface User {
    id: number;
    name: string;
    class: string;
    email: string;
    password: string;
    subject: string;
    score: Score[];

}
interface Score{
    id: number;
    name: string;
    kttk: number;
    kt15: number;
    ktgk: number;
    ktck: number;
}