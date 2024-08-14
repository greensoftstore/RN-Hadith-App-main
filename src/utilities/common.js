export const generateRandomString = () => {
    let a = "1";
    while (!isNaN(/** @type {*} */(a[0]))) {
        a = Math.random().toString(36).slice(2);
    }
    return a;
};

export const generateRandomNumber = (min, max) => Math.round(Math.random() * (max || 10 - min || 0) + min || 0);

export const formatDecimalNumbersToComma = (content) => {
    let contentNew = content.toString();

    let contentFormated = contentNew.replace(".", ",");

    return contentFormated

}

export const convertNumberToFloat = (number) => {
    let numberNew = parseFloat(number).toFixed(2)

    return numberNew

}

export const firstLetterCapitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);

}

export const replaceCharactersWithStar = (text) => {
    let textNew = text.replace(/./g, '*');

    return textNew
}

export const joinWithoutDupes = (initialData, newData, variableForComparison) => {
    var newAry = new Set(initialData.map(d => d[variableForComparison]));
    var merged = [...initialData, ...newData.filter(d => !newAry.has(d[variableForComparison]))];

    [...new Set([...initialData, newData])]
    return merged
}

export const createNewObjectFromExistingOne = (obj) => {
    let objStringify = JSON.stringify(obj);
    let objParse = JSON.parse(objStringify)

    return objParse;
}

export const returnSingleDuplicate = (arry, uniqueVal) => {
    const lookup = arry.reduce((a, e) => {
        a[e[uniqueVal]] = ++a[e[uniqueVal]] || 0;
        return a;
    }, {});

    let newArr = [];

    Object.keys(lookup).map((e) => { if (lookup[e] > 0) newArr.push(arry[arry.findIndex(val => val[uniqueVal] == e)]) })
    return newArr
}
