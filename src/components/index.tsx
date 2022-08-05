import React, { useMemo } from "react";
import styled from "styled-components";
import { useMenuComponents, useMenuStyles } from "../hooks";
import { MenuItemType, MenuTreeType, MenuViewProps } from "../models";
import MenuBar from "./MenuBar";

export { default as MenuBar } from "./MenuBar";

const buildMenuTree = (
    items: MenuItemType[], selectedMenuId: string, parentId?: string, path: string[] = []
): MenuTreeType[] => items
    .filter(i => i.parentId === parentId)
    .map<MenuTreeType>(i => ({
        item: i,
        path: path.concat(i.id),
        selected: selectedMenuId === i.id,
        children: buildMenuTree(items, selectedMenuId, i.id, path.concat(i.id)),
    }));

export const MenuView = styled(({
    items = [],
    selectedMenuId,
    className = "",
    classes,
    children,
    MenuBarProps,
}: MenuViewProps) => {
    const { Container } = useMenuComponents();
    const { contentPanel, root } = useMenuStyles(classes);
    const menuTree = useMemo(() => buildMenuTree(items, selectedMenuId), [items, selectedMenuId]);

    return <Container className={`${className} ${root}`}>
        <MenuBar {...MenuBarProps} items={menuTree} />
        <Container
            children={children}
            className={contentPanel}
        />
    </Container>
})`
    display: flex;
    flex-direction: ${p => {
        switch (p.anchor) {
            case "bottom": return "column-reverse";
            case "right": return "row-reverse";
            case "top": return "column";
            case "left":
            default: return "row";
        }
    }};
    background-color: ${p => p.theme.bgColor};
`;
MenuView.displayName = "MenuView";