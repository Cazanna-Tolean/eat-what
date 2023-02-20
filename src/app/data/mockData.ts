import { IChatContent } from './chatProps';
import { IMeals } from './mealProp';

export let mockChatContent: IChatContent[] = [
    {side: "user", content: "您好，我第一次到此處旅遊，不知道可以吃什麼？ 有什麼推薦的？", timing:""},
    {side: "system", content: "好的，讓我為您提供一些意見參考~", timing:""}
];

export let mockMeals: IMeals[] = [
    {mealName: "豆花", mealDescription: "甜點"},
    {mealName: "臭豆腐", mealDescription: "小吃"},
    {mealName: "義大利麵", mealDescription: "麵食"},
    {mealName: "紅豆餅", mealDescription: "甜點"},
];