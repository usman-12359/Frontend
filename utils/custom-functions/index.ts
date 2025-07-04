"use client"

import { Routes } from "@/routes";
import moment from "moment";

export const findLayoutComp = (pathname: string) => {
    if (pathname === "/" || pathname === Routes.PRIVACY || pathname === Routes.TERMS_AND_CONDITIONS) {
        return true;
    }
    return false;
};

export const AuthComp = (pathname: string) => {
    if (pathname === Routes.LOGIN || pathname === Routes.SIGNUP || pathname === Routes.FORGOT_PASSWORD) {
        return true;
    }
    return false;
};


export const truncateText = (text: string, wordLimit: number) => {
    if (!text) return ""; // Handle empty or undefined text
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};


export const FirstLetterCapital = (word: string) => {
    if (!word) return
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatBRLCurrency(amount: number) {
    if (!amount) return;
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(amount);
}


export function calculatePrice(basePrice, units, retailPrice = 0) {
    if (!basePrice || !units) return;
    const calcAmount = Number(units) <= 40 ? basePrice : ((Number(basePrice) + (Math.ceil((units - 40) / 10)) * Number(retailPrice)))
    const finalAmount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(calcAmount);
    return finalAmount
}

export function checkPlanExpiration(date: any) {
    if (!date || date === undefined) return true
    const planDate = moment(date).format("ll")
    const currentDate = moment(new Date()).format("ll")
    if (currentDate < planDate) {
        return true
    }
    return false
}