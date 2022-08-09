import _ from "lodash";
import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Theme } from "../..";
import MenuBar from "../../components/MenuBar";
import MenuLink from "../../components/MenuLink";
import {
    MenuClasses,
    MenuComponents,
    ThemeType,
    UIContainerElement,
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

const ContainerElement: UIContainerElement = styled.div``;
const MenuElement: UIContainerElement = styled.div``;
const MenuItemElement: UIContainerElement = styled.div``;

export const useMenuComponents = () => {
    const { state: { components = {} } } = useContext(MenuContext);
    const {
        container = ContainerElement,
        link = MenuLink,
        menu = MenuElement,
        menuitem = MenuItemElement,
    } = components;
    return {
        Container: container,
        Link: link,
        Menu: menu,
        MenuItem: menuitem,
        MenuBar: MenuBar
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