import React, { useId } from "react";
import styled from "styled-components";
import { MenuBarProps, MenuClasses, MenuTreeType, UIElement } from "../../models";
import { useMenuComponents, useMenuStyles } from "../../providers/MenuProvider";

const MenuBar = styled(({
    className = "",
    items = [],
    classes,
}: UIElement<MenuBarProps>) => {
    const componentId = useId();
    const { Container, Menu } = useMenuComponents();

    const css = useMenuStyles(classes);
    return <Container className={`${className} ${css.menuPanel}`}>
        <Menu className={css.menuBar}>
            {
                items.map((m, index) => <MenuItemComponent
                    key={`MenuBarItem${componentId}@${m.item.id}#${index}`}
                    item={m} classes={css}
                />)
            }
        </Menu>
    </Container>
})`
    background-color: ${p => p.theme.menuPanel.bgColor};
`;
MenuBar.displayName = "MenuBar";
export default MenuBar;

type MenuItemComponentProps = UIElement<{
    item: MenuTreeType;
    classes: MenuClasses;
}>
const MenuItemComponent = styled(({
    className = "",
    item: { item, children },
    classes: css
}: MenuItemComponentProps) => {
    const componentId = useId();
    const { Button, Container, Link, Menu, MenuItem } = useMenuComponents();
    return <MenuItem className={css.menuItem}>
        <Container className={className}>
            {
                item.type === "button"
                    ? <Button className={css.menuLink}
                        children={item.title}
                        onClick={e => item.onClick?.(item)}
                    />
                    : <Link className={css.menuLink}
                        href={item.url}
                        title={item.title}
                        children={item.title}
                    />
            }
        </Container>

        {
            children.length > 0 ? <Menu className={css.menuBar}>
                {
                    children.map((m, index) => <MenuItemComponent
                        key={`MenuBarItem${componentId}@${m.item.id}#${index}`}
                        item={m} classes={css}
                    />)
                }
            </Menu> : null
        }
    </MenuItem>
})`
    padding: ${p => {
        const { spacing } = p.theme;
        return `${spacing}px ${spacing / 2}px ${spacing}px ${p.item.path.length * spacing}px `;
    }}; 
    background-color: ${p => {
        const { selected, texts } = p.theme;
        return p.item.selected ? selected.bgColor : texts.bgColor;
    }};
    color: ${p => {
        const { selected, texts } = p.theme;
        return p.item.selected ? selected.textColor : texts.textColor;
    }};
`;
MenuItemComponent.displayName = "MenuItemComponent";
