import { ComponentType, LegacyRef, PropsWithChildren } from "react";

export type MenuBarAnchorType = "left" | "right"; // | "top" | "bottom";

export type MenuBarExpandBehaviour = "all" | "selected-path";

export type MenuViewProps = PropsWithChildren<UIElement<{
    items: MenuItemType[];
    selectedMenuId?: string;
    disabled?: boolean;
    theme?: ThemeType;
} & MenuBarProps>>;

export type MenuBarProps = {
    anchor?: MenuBarAnchorType;
    behaviour?: MenuBarExpandBehaviour;
    collapsable?: boolean;
    collapsed?: boolean;
    orientation?: "vertical" | "horizontal";
};

export type MenuBarElement = ComponentType<UIElement<{
    items: MenuTreeType[];
} & MenuBarProps>>;

export type MenuLinkElementProps = UIElement<{
    href: string;
    title: string;
    collapsed?: boolean;
    icon?: string;
    selected?: boolean;
}>;

export type MenuItemType = {
    id: string;
    title: string;
    icon?: string;
    parentId?: string;
    url?: string;
    onClick?(item: MenuItemType): void;
};

export type MenuTreeType = {
    item: MenuItemType;
    path: string[];
    selected: boolean;
    children: MenuTreeType[];
};

export type MenuComponents = {
    container: ContainerElement;
    link: ComponentType<MenuLinkElementProps>;
    menu: ContainerElement;
    menuitem: ContainerElement;
};

export type UIElement<P = {}, R = HTMLElement> = {
    ref?: LegacyRef<R>;
    className?: string;
} & P;

export type ContainerElement = ComponentType<PropsWithChildren<UIElement>>;

export type ThemedTextStyle = {
    bgColor: string;
    fontSize: number;
    fontWeight: "bold" | "normal" | "bolder" | "lighter";
    textColor: string;
};
export type ThemedPanelStyle = ThemedTextStyle & {
};
export type ThemeType = Partial<{
    bgColor: string;
    spacing: number;
    font: Partial<{
        family: string;
        size: number;
    }>;
    contentPanel: Partial<ThemedPanelStyle>;
    menuPanel: Partial<ThemedPanelStyle>;
    menuItem: Partial<{
        selected: Partial<ThemedTextStyle>;
        texts: Partial<ThemedTextStyle>;
        hover: Partial<ThemedTextStyle>
    }>;
}>;