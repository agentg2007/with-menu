import _ from "lodash";
import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { DefaultTheme } from "../..";
import MenuBar from "../../components/MenuBar";
import MenuLink from "../../components/MenuLink";
import {
    MenuComponents,
    ThemeType,
    UIContainerElement
} from "../../models";

type MenuProviderProps = {
    components?: Partial<MenuComponents>;
    theme?: ThemeType;
};

const MenuContext = createContext<{
    state: MenuProviderProps;
}>({
    state: {
        components: {},
        theme: DefaultTheme
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

const theme = (t: ThemeType) => _.merge(DefaultTheme, t);

const ContainerElement: UIContainerElement = styled.div``;

export const useMenuComponents = () => {
    const { state: { components = {} } } = useContext(MenuContext);
    const {
        container = ContainerElement,
        link = MenuLink,
    } = components;
    return {
        Container: container,
        Link: link,
        MenuBar: MenuBar
    }
};