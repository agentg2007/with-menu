import React, { ComponentType, useId } from "react";
import styled from "styled-components";
import { useMenuComponents } from "../../hooks";
import { MenuTreeType, ThemeType, UIElement } from "../../models";

type MenuItemElementProps = UIElement<{
    item: MenuTreeType;
    collapsed: boolean;
}>;
const MenuItemElement = styled(({
    className = "",
    item: i,
    collapsed
}: MenuItemElementProps) => {
    const componentId = useId();
    const { Container, Link } = useMenuComponents();
    return <>
        <Container className={className}>
            <Link ref={e => i.selected && e?.scrollIntoView()}
                href={i.item.url}
                title={i.item.title}
                icon={i.item.icon}
                selected={i.selected}
                collapsed={collapsed}
            />
        </Container>
        {
            i.children.map((c, index) => <MenuItemElement
                key={`MenuItemElement:${componentId}#${c.item.id}@${index}`}
                item={c}
                collapsed={collapsed}
            />)
        }
    </>
})`
    background-color: ${({ theme, item }) => menuItem(theme, item).bgColor ?? "inherit"}; 
    color: ${({ theme, item }) => menuItem(theme, item).textColor ?? "inherit"};
    display: flex;
    font-size: ${({ theme: t }) => t.menuItem.texts.fontSize ?? t.font.size}px;
    font-weight: ${({ theme, item }) => menuItem(theme, item).fontWeight};
    padding-left: ${({ theme: t, item: i, collapsed: c }) => c ? 0 : t.spacing * (i.path.length - 1) * 3}px;

    &:hover {
       background-color: ${({ theme: t }) => t.menuItem.hover.bgColor};
       color: ${({ theme: t }) => t.menuItem.hover.textColor};
    }
`;
MenuItemElement.displayName = "MenuItemElement";

const menuItem = (t: ThemeType, i: MenuTreeType) => i.selected ? t.menuItem.selected : t.menuItem.texts;
export default MenuItemElement as ComponentType<MenuItemElementProps>;