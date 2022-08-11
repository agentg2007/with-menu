import React, { ComponentType, PropsWithChildren, useEffect, useId, useState } from "react";
import styled from "styled-components";
import { MenuBarProps, MenuTreeType, UIElement } from "../../models";
import { useMenuComponents } from "../../providers/MenuProvider";
import MenuItemElement from "../MenuItem";

type MenuBarElementProps = UIElement<MenuBarProps & {
	items: MenuTreeType[];
}>;
const MenuBarElement = ({
	className = "",
	items = [],
	collapsable,
	collapsed: c
}: MenuBarElementProps) => {
	const componentId = useId();
	const { Container } = useMenuComponents();
	const [collapsed, setCollapsed] = useState(c);
	useEffect(() => setCollapsed(c), [c]);
	return <Collapsable
		className={className}
		collapsed={collapsed}
		collapsable={collapsable}
		onChange={c => setCollapsed(c)}
	>
		<Container>
			{
				items.map((i, index) => <MenuItemElement
					key={`MenuBarElement:${componentId}#${i.item.id}@${index}`}
					item={i}
					collapsed={collapsed}
				/>)
			}
		</Container>
	</Collapsable>
};
MenuBarElement.displayName = "MenuBarElement";
export default styled(MenuBarElement)`
    display: flex;
    flex: 1;
    flex-direction: ${p => p.orientation === "vertical" ? "row" : "column"};
	& > div {
		flex: 1;
	}
` as ComponentType<MenuBarElementProps>;

const Collapsable = styled(({
	className = "",
	collapsable,
	collapsed,
	children,
	onChange
}: PropsWithChildren<UIElement<{
	collapsable: boolean;
	collapsed: boolean;
	onChange(collapsed: boolean): void;
}>>) => {
	const { Container } = useMenuComponents();
	return <Container className={className}>
		{children}
		{
			collapsable && <button
				onClick={() => onChange(!collapsed)}
				children={!collapsed ? <>&lt;</> : <>&gt;</>}
			/>
		}
	</Container>
})`
    display: flex;
    flex-direction: row;
    overflow: hidden auto;
    position: relative;
    flex: 1;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #a4a4a433; 
        border-radius: 8px;
        background-clip: padding-box;
    }
    scrollbar-color: #a4a4a433; 
    scrollbar-width: thin;

    & > button {
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 0;
        right: 0;
        padding: 2px;
        font-weight: bold;
        background: transparent;
        color: ${p => p.theme.menuPanel.textColor};
        border: none;
        &:hover {
            background-color: #a4a4a411; 
            cursor: pointer;
        }
    }
`;