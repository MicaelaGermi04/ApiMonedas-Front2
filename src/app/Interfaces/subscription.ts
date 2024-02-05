export interface Subscription {
    id: number,
    name: string,
    amountOfConversions: number,
    price: string,
}

export interface SubscriptionConversion {
    amountOfConversion: number,
}