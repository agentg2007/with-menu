import React, { useId, useMemo } from "react";
import { warn } from "../../helpers";
import { useMenuComponents, useMenuStyles } from "../../MenuProvider";
import { MenuBarProps, MenuClasses, MenuItemType } from "../../models";

const MenuBar = ({
    items = [],
    classes,
    disabled,
}: MenuBarProps) => {
    const componentId = useId();
    const { Container, Menu } = useMenuComponents();

    const css = useMenuStyles(classes);
    const menuTree = useMemo(() => {
        const duplicates = items.filter((item, index, source) => source.findIndex(i => i.id === item.id) != index);
        if (duplicates.length > 0) {
            warn("Duplicate menu found.", duplicates);
        }
        return buildTree(items);
    }, [items]);

    return <Container className={css.menuPanel}>
        <Menu className={css.menuBar}>
            {
                menuTree.map((m, index) => <MenuItemComponent
                    key={`MenuBarItem${componentId}@${m.item.id}#${index}`}
                    item={m} classes={css}
                />)
            }
        </Menu>
    </Container>
};
MenuBar.displayName = "MenuBar";
export default MenuBar;

type MenuTreeType = {
    item: MenuItemType;
    path: string[];
    children: MenuTreeType[];
};
const buildTree = (
    items: MenuItemType[], parentId?: string, path: string[] = []
): MenuTreeType[] => items
    .filter(i => i.parentId === parentId)
    .map<MenuTreeType>(i => ({
        item: i,
        path: path.concat(i.id),
        children: buildTree(items, i.id, path.concat(i.id)),
    }));

type MenuItemComponentProps = {
    item: MenuTreeType;
    classes: MenuClasses;
}
const MenuItemComponent = ({
    item: { item, children },
    classes: css
}: MenuItemComponentProps) => {
    const componentId = useId();
    const { Button, Link, Menu, MenuItem } = useMenuComponents();
    return <MenuItem className={css.menuItem}>
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
};
MenuItemComponent.displayName = "MenuItemComponent";
