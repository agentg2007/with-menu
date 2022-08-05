import { ComponentType, CSSProperties, MouseEventHandler, PropsWithChildren } from "react";

export type MenuViewProps = PropsWithChildren<
    UIElement<{
        items: MenuItemType[];
        selectedMenuId?: string;
        anchor?: "left" | "right" | "top" | "bottom";
        classes?: Partial<MenuClasses>;
        disabled?: boolean;
        theme: ThemeType;
        MenuBarProps?: MenuBarProps;
    }>
>;

export type MenuBarProps = {
    items: MenuTreeType[];
    classes?: Partial<MenuClasses>;
    collapsable?: boolean;
    collapsed?: boolean;
};

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

export type MenuComponents = {
    button: UIClickableElement;
    container: UIContainerElement;
    link: UILinkElement;
    menu: UIContainerElement;
    menuitem: UIContainerElement;
};

export type MenuItemType = {
    id: string;
    title: string;
    icon?: string | ComponentType<any>;
    parentId?: string;
    type?: "link" | "button";
    url?: string;
    onClick?(item: MenuItemType): void;
};

export type MenuTreeType = {
    item: MenuItemType;
    path: string[];
    selected: boolean;
    children: MenuTreeType[];
};

export type UIElement<P = {}> = {
    className?: string;
    style?: CSSProperties;
} & P;
export type UIClickableElement = ComponentType<PropsWithChildren<UIElement<{
    onClick: MouseEventHandler<HTMLElement>
}>>>;
export type UIContainerElement = ComponentType<PropsWithChildren<UIElement>>;
export type UILinkElement = ComponentType<PropsWithChildren<UIElement<{
    href: string;
    title: string;
}>>>;

export type ThemedTextStyle = {
    bgColor: string;
    fontSize: string;
    fontWeight: "bold" | "normal" | "bolder" | "lighter";
    textColor: string;
}
export type ThemeType = Partial<{
    bgColor: string;
    spacing: number;
    selected: Partial<ThemedTextStyle>;
    texts: Partial<ThemedTextStyle>;
    menuPanel: Partial<{
        bgColor: string;
    }>
}>;