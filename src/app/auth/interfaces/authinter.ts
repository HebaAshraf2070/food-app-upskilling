export interface Authinter {




}


export interface Ilogin {
    email: string;
    password: string
}


export interface Iregister {
    userName: string;
    email: string;
    country: string;
    phoneNumber: number;
    password: string;
    confirmPassword: string
}


export interface Iverify {
    email: string;
    code: string
}


export interface IforgetPass {
    email: string
}

export interface Ireset {
    email: string,
    password: string,
    confirmPassword: string,
    seed: string
}