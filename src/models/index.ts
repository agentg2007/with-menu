import { ComponentType, PropsWithChildren } from "react";

export type IconType = string | ComponentType<any>;

export type MenuViewProps = PropsWithChildren<
    UIElement<{
        items: MenuItemType[];
        selectedMenuId?: string;
        anchor?: "left" | "right" | "top" | "bottom";
        classes?: Partial<MenuClasses>;
        disabled?: boolean;
        theme?: ThemeType;
        MenuBarProps?: MenuBarProps;
    }>
>;

export type MenuBarProps = {
    collapsable?: boolean;
    collapsed?: boolean;
    orientation?: "vertical" | "horizontal";
};

export type MenuBarElement = ComponentType<UIElement<{
    items: MenuTreeType[];
    classes?: MenuClasses;
} & MenuBarProps>>;

export type MenuLinkElementProps = UIElement<{
    href: string;
    title: string;
    collapsed?: boolean;
    icon?: IconType;
    selected?: boolean;
}>;

export type MenuClasses = {
    active: string;
    contentPanel: string;
    disabled: string;
    menuBar: string;
    menuItem: string;
    menuLink: string;
    menuPanel: string;
    root: string;
};

export type MenuItemType = {
    id: string;
    title: string;
    icon?: IconType;
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
    container: UIContainerElement;
    link: ComponentType<MenuLinkElementProps>;
    menu: UIContainerElement;
    menuitem: UIContainerElement;
};

export type UIElement<P = {}> = {
    className?: string;
} & P;

export type UIContainerElement = ComponentType<PropsWithChildren<UIElement>>;

export type UILinkElement = ComponentType<PropsWithChildren<UIElement<{
    href: string;
    title: string;
}>>>;

export type ThemedTextStyle = {
    bgColor: string;
    fontSize: number;
    fontWeight: "bold" | "normal" | "bolder" | "lighter";
    textColor: string;
};
export type ThemedPanelStyle = {
    bgColor: string;
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