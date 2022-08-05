import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import styled from "styled-components";
import {
    MenuClasses,
    MenuComponents,
    UIClickableElement,
    UIContainerElement,
    UILinkElement
} from "../models";

type MenuProviderProps = {
    components?: Partial<MenuComponents>;
    classes?: Partial<MenuClasses>;
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
    return <MenuContext.Provider value={{ state }} children={children} />
};
MenuProvider.displayName = "MenuProvider";
export default MenuProvider;

const ContainerElement: UIContainerElement = styled.div``;
const MenuElement: UIContainerElement = styled.ul``;
const MenuItemElement: UIContainerElement = styled.li``;
const MenuLinkElement: UILinkElement = styled.a`
    background: orange; 
    padding: 4px;
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