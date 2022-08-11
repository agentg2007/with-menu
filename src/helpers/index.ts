import { MenuBarAnchorType } from "../models";

export const BlankMethod = () => { };

const header = "%cNthity-WithMenuBar"
const writeLog = (
    type: "default" | "warn" | "error" = "default",
    ...e: any[]
) => {
    const format = (color: string) => `color: ${color};background: #0390fc;font-weight: bold;font-size: 14px; padding: 4px 8px; border-radius: 4px;`;
    if (type === "error") {
        console.error(header, format("red"), ...e);
    } else if (type === "warn") {
        console.warn(header, format("#fcd303"), ...e);
    } else {
        console.log(header, format("white"), ...e);
    }
}
export const log = (...e: any) => writeLog("default", ...e);
export const error = (...e: any[]) => writeLog("error", ...e);
export const warn = (...e: any[]) => writeLog("warn", ...e);

export const Styles = {
    flexDirection: (anchor: MenuBarAnchorType): "column" | "column-reverse" | "row" | "row-reverse" => {
        switch (anchor) {
            //case "bottom": return "column-reverse";
            //case "top": return "column";
            case "right": return "row-reverse";
            case "left":
            default: return "row";
        }
    }
}