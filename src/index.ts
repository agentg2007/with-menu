import { MenuView } from "./components";
import { ThemeType } from "./models";

export { useMenuComponents, useMenuStyles } from "./hooks";
export { MenuItemType, ThemeType } from "./models";
export { MenuProvider } from "./providers";
export default MenuView;

export const Theme: ThemeType = {
    bgColor: "white",
    spacing: 8,
    font: {
        family: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        size: 14,
    },
    contentPanel: {
        bgColor: "#f3f3f3",
    },
    menuPanel: {
        bgColor: "#232323f0",
    },
    menuItem: {
        selected: {
            bgColor: "#dedede",
            fontSize: undefined,
            fontWeight: "bold",
            textColor: "#333",
        },
        texts: {
            bgColor: undefined,
            fontSize: 14,
            fontWeight: "normal",
            textColor: "#fff",
        },
        hover: {
            bgColor: "#338affa8",
            textColor: "#fff",
        }
    }
};

declare module "styled-components" {
    interface DefaultTheme extends ThemeType {

    }
}