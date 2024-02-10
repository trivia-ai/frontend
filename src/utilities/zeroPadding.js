const padNumberWithZero = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
}

export default padNumberWithZero