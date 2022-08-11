import React, { ComponentType } from "react";
import styled from "styled-components";
import { MenuBarProps, MenuTreeType, UIElement } from "../../models";
import { useMenuComponents } from "../../providers/MenuProvider";

type MenuPanelProps = UIElement<{
    items: MenuTreeType[];
} & MenuBarProps>;

type MenuPanelElement = ComponentType<MenuPanelProps>;

const MenuPanel: MenuPanelElement = ({
    items = [],
    className = "",
    collapsable = true,
    collapsed = false,
}) => {
    const { Container, MenuBar } = useMenuComponents();
    return <Container className={className}>
        <MenuBar
            items={items}
            collapsable={collapsable}
            collapsed={collapsed}
        />
    </Container>
};
MenuPanel.displayName = "MenuPanel";
export default styled(MenuPanel)`
    background-color: ${p => p.theme.menuPanel?.bgColor ?? "inherit"};
    display: flex;
    flex-direction: column;
    max-width: 300px;
 ` as MenuPanelElement;
