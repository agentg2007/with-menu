import { ComponentType, CSSProperties, MouseEventHandler, PropsWithChildren } from "react";

export type MenuViewProps = PropsWithChildren<MenuBarProps & {
    anchor?: "left" | "right" | "top" | "bottom";
}>;

export type MenuBarProps = {
    items: MenuItemType[];
    classes?: Partial<MenuClasses>;
    collapsable?: boolean;
    collapsed?: boolean;
    disabled?: boolean;
    selectedMenuId?: string;
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