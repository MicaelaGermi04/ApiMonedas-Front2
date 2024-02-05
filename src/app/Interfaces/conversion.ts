export interface Conversion{
    userId: number,
    firstCurrencyId: number,
    secondCurrencyId: number,
    fristCurrencyAmount: number,
    convertedAmount: number,
    firstCurrencyName: string,
    secondCurrencyName: string,
    date: Date
}

export interface ConversionResult{
    convertedAmount: number,
}