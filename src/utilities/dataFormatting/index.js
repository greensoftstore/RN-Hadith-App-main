export const formatFloatNumberWithSeparator = (value, decimalPaces = 2) => {
    let val = value
    try {
        val = value.toLocaleString(undefined, {
            minimumFractionDigits: decimalPaces,
            maximumFractionDigits: decimalPaces
        })
    } catch (error) {
    }

    return val;
}

export const formatNumberSeperatorCurrencyPercent = (value, currency = null, percent = false, sufix = null, useSeparator = true, decimalPaces = 2) => {
    return val = `${currency || ''}${useSeparator ? formatFloatNumberWithSeparator(value, decimalPaces) : parseFloat(value).toFixed(decimalPaces)}${percent ? '%' : ''}${sufix ? sufix : ''}`
}
