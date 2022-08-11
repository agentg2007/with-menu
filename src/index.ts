import { MenuView } from "./components";
import { ThemeType } from "./models";

export { useMenuComponents } from "./hooks";
export { MenuBarAnchorType, MenuItemType, ThemeType } from "./models";
export { MenuProvider } from "./providers";
export default MenuView;

export const DefaultTheme: ThemeType = {
    bgColor: "white",
    spacing: 8,
    font: {
        family: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        size: 14,
    },
    contentPanel: {
        bgColor: "#f3f3f3",
        fontSize: 14,
        fontWeight: "normal",
        textColor: "#101010"
    },
    menuPanel: {
        bgColor: "#232323f0",
        fontSize: 14,
        fontWeight: "normal",
        textColor: "#fff",
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
            bgColor: "#338aff78",
            textColor: "#fff",
        }
    }
};

declare module "styled-components" {
    interface DefaultTheme extends ThemeType {

    }
}