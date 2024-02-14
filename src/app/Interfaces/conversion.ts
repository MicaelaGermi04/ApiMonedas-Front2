export interface Conversion{
    userId: number,
    firstCurrencyAmount: number,
    convertedAmount: number,
    firstCurrencyName: string,
    secondCurrencyName: string,
    date: Date
}

export interface ConversionResult{
    convertedAmount: number,
}