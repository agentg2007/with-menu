import React, { ComponentType, PropsWithChildren, useMemo } from "react";
import styled from "styled-components";
import { warn } from "../helpers";
import { useMenuComponents } from "../hooks";
import { MenuItemType, MenuTreeType, MenuViewProps, UIElement } from "../models";
import MenuPanel from "./MenuPanel";

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
    children,
    anchor,
    collapsable,
    collapsed,
    orientation
}: MenuViewProps) => {
    const { Container } = useMenuComponents();
    const menuTree = useMemo(() => {
        const duplicates = items.filter((item, index, source) => {
            return source.findIndex(i => i.id === item.id) != index;
        }).map(i => ({ id: i.id, title: i.title }));
        if (duplicates.length > 0) {
            warn("Duplicate MenuItem found.", duplicates);
        }
        return buildMenuTree(items, selectedMenuId);
    }, [items, selectedMenuId]);

    return <Container className={className}>
        <MenuPanel {...{
            anchor,
            collapsable,
            collapsed,
            orientation,
            items: menuTree
        }} />
        <ContentPanel children={children} />
    </Container>
})`
    background-color: ${p => p.theme.bgColor};
    display: flex;
    flex: 1;
    font-family: ${p => p.theme.font.family};
    font-size: ${p => p.theme.font.size}px;
    flex-direction: ${p => {
        // switch (p.anchor) {
        //     case "bottom": return "column-reverse";
        //     case "right": return "row-reverse";
        //     case "top": return "column";
        //     case "left":
        //     default: return "row";
        // }
        return "row";
    }};
` as ComponentType<MenuViewProps>;
MenuView.displayName = "MenuView";

const ContentPanel = styled(({ className: cn = "", children: ch }: UIElement<PropsWithChildren>) => {
    const { Container } = useMenuComponents();
    return <Container className={cn} children={ch} />
})`
    background-color: ${({ theme: t }) => t.contentPanel.bgColor ?? t.bgColor};
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
`;
ContentPanel.displayName = "ContentPanel";