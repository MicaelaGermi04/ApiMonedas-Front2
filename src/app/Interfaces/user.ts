export interface User{
    id: number,
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    subscriptionId: number,
}

export interface RegisterData{
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
}

export interface LoginData{
    userName: string,
    password: string,
}

export interface UserSubscription {
   subscriptionId: number,
}

export interface UserForCreation {
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    subscriptionId: number,
}