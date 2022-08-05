import _ from "lodash";
import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Theme } from "../..";
import {
    MenuClasses,
    MenuComponents,
    ThemeType,
    UIClickableElement,
    UIContainerElement,
    UILinkElement
} from "../../models";

type MenuProviderProps = {
    components?: Partial<MenuComponents>;
    classes?: Partial<MenuClasses>;
    theme?: ThemeType;
};

const MenuContext = createContext<{
    state: MenuProviderProps;
}>({
    state: {
        classes: {},
        components: {},
    }
});

const MenuProvider = ({ children, ...props }: PropsWithChildren<MenuProviderProps>) => {
    const state = useMemo(() => props, []);
    return <MenuContext.Provider value={{ state }}>
        <ThemeProvider theme={theme(state.theme)} children={children} />
    </MenuContext.Provider>
};
MenuProvider.displayName = "MenuProvider";
export default MenuProvider;

const theme = (t: ThemeType) => _.merge(Theme, t);

const ContainerElement: UIContainerElement = styled.div`
 `;
const MenuElement: UIContainerElement = styled.div`
 `;
const MenuItemElement: UIContainerElement = styled.div` 
 `;
const MenuLinkElement: UILinkElement = styled.a`
    padding: 4px;
    text-decoration: none;
`;
const MenuButtonElement: UIClickableElement = styled.button`
    padding: 4px;
`;

export const useMenuComponents = () => {
    const { state: { components = {} } } = useContext(MenuContext);
    const {
        button = MenuButtonElement,
        container = ContainerElement,
        link = MenuLinkElement,
        menu = MenuElement,
        menuitem = MenuItemElement,
    } = components;
    return {
        Button: button,
        Container: container,
        Link: link,
        Menu: menu,
        MenuItem: menuitem,
    }
};

export const useMenuStyles = (componentClasses: Partial<MenuClasses>) => {
    const { state: { classes = {} } } = useContext(MenuContext);
    return useMemo((): MenuClasses => ({
        active: "",
        contentPanel: "",
        disabled: "",
        menuBar: "",
        menuItem: "",
        menuLink: "",
        menuPanel: "",
        root: "",

        ...classes,

        ...componentClasses,
    }), [componentClasses])
};