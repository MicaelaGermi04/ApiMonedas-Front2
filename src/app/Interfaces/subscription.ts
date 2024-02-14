export interface Subscription {
    id: number,
    name: string,
    amountOfConvertions: number,
    price: string,
}

export interface SubscriptionConversion {
    amountOfConversion: number,
}