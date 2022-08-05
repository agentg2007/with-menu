import { MenuView } from "./components";
import { ThemeType } from "./models";

export { useMenuComponents, useMenuStyles } from "./hooks";
export { MenuItemType, ThemeType } from "./models";
export { MenuProvider } from "./providers";
export default MenuView;

export const Theme: ThemeType = {
    bgColor: "white",
    spacing: 8,
    selected: {
        bgColor: "#6ea9fe",
        fontSize: undefined,
        fontWeight: "bold",
        textColor: "white",
    },
    texts: {
        bgColor: "inherit",
        fontSize: "14px",
        fontWeight: "normal",
        textColor: "inherit",
    },
    menuPanel: {
        bgColor: undefined,
    }
};

declare module "styled-components" {
    interface DefaultTheme extends ThemeType {

    }
}