import { getCookie, hasCookie, setCookie } from "cookies-next";

export const addCartCookie = (idProduct: string) => {

    const cookieCart = getCookieCart();


    if (cookieCart[idProduct]) {
        cookieCart[idProduct] += 1

    } else {
        cookieCart[idProduct] = 1;
    }

    setCookie('cart', JSON.stringify(cookieCart))
};


export const getCookieCart = () => {
    if (hasCookie('cart')) {
        return JSON.parse(getCookie('cart') ?? '{}')
    }
    return {}

};

export const deleteCartCookie = (idProduct: string) => {
    const cookieCart = getCookieCart();

    if (cookieCart[idProduct]) {
        delete cookieCart[idProduct];
    }

    setCookie('cart', JSON.stringify(cookieCart))

};

export const deleteSingleCartCookie = (idProduct: string) => {
    const cookieCart = getCookieCart();

    if (cookieCart[idProduct]) {
        if (cookieCart[idProduct] === 1) {
            delete cookieCart[idProduct];
        } else {

            cookieCart[idProduct] -= 1;
        }
    }

    setCookie('cart', JSON.stringify(cookieCart))

};
