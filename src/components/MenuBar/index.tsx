import React, { ComponentType, PropsWithChildren, useEffect, useId, useState } from "react";
import styled from "styled-components";
import { Styles } from "../../helpers";
import { MenuBarAnchorType, MenuBarProps, MenuTreeType, UIElement } from "../../models";
import { useMenuComponents } from "../../providers/MenuProvider";
import MenuItemElement from "../MenuItem";

type MenuBarElementProps = UIElement<MenuBarProps & {
	items: MenuTreeType[];
}>;
const MenuBarElement = ({
	items = [],
	anchor,
	className = "",
	collapsable,
	collapsed: c
}: MenuBarElementProps) => {
	const componentId = useId();
	const [collapsed, setCollapsed] = useState(c);
	useEffect(() => setCollapsed(c), [c]);
	return <Collapsable
		anchor={anchor}
		className={className}
		collapsed={collapsed}
		collapsable={collapsable}
		onChange={c => setCollapsed(c)}
	>
		{
			items.map((i, index) => <MenuItemElement
				key={`MenuBarElement:${componentId}#${i.item.id}@${index}`}
				item={i}
				collapsed={collapsed}
			/>)
		}
	</Collapsable>
};
MenuBarElement.displayName = "MenuBarElement";
export default styled(MenuBarElement)`
    display: flex;
    flex: 1;
	min-height: 0;
` as ComponentType<MenuBarElementProps>;

const Collapsable = styled(({
	anchor,
	className = "",
	collapsable,
	collapsed,
	children,
	onChange
}: PropsWithChildren<UIElement<{
	anchor: MenuBarAnchorType;
	collapsable: boolean;
	collapsed: boolean;
	onChange(collapsed: boolean): void;
}>>) => {
	const { Container } = useMenuComponents();
	return <Container className={className}>
		<Scrollable anchor={anchor}>
			<Container>{children}</Container>
		</Scrollable>
		{
			collapsable && <button
				onClick={() => onChange(!collapsed)}
				children={<div data-anchor={anchor} />}
			/>
		}
	</Container>
})`
	display: flex;
	flex-direction: ${p => Styles.flexDirection(p.anchor)};
    flex: 1;
    & > button {
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 0;
        right: 0;
		padding: 0;
        background: transparent;
        color: ${p => p.theme.menuPanel.textColor};
        border: none;
		opacity: 0.35;
        &:hover {
            background-color: #a4a4a411; 
            cursor: pointer;
			opacity: 1;
		}	

		& > div {
			border-style: solid;
			border-width: 0.25em 0.25em 0 0;
			content: '';
			display: inline-block;
			height: 0.45em;
 			position: relative;
			vertical-align: top;
			width: 0.45em;

			&[data-anchor=left] {
 				transform: rotate(${p => p.collapsed ? 45 : -135}deg);
				margin-right: ${p => !p.collapsed ? 0 : 4}px;
				margin-left: ${p => p.collapsed ? 0 : 4}px;	
			}
			&[data-anchor=right] {
 				transform: rotate(${p => !p.collapsed ? 45 : -135}deg);
				margin-right: ${p => p.collapsed ? 0 : 4}px;
				margin-left: ${p => !p.collapsed ? 0 : 4}px;	
 			}
		}
    }
`;
Collapsable.displayName = "Collapsable";

const Scrollable = styled(({ className = "", children }: PropsWithChildren<UIElement<{
	anchor: MenuBarAnchorType;
}>>) => {
	const { Container } = useMenuComponents();
	return <Container className={className}>{children}</Container>
})`
	display: flex;
	flex-direction: column;
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
`;
Scrollable.displayName = "Scrollable";