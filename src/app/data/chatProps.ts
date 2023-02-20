type TSide = "system"|"user"|"suspense";

export interface IChatContent {
    side: TSide;
    content: string;
    timing: string;
}