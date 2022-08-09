import React, { ComponentType, useId } from "react";
import styled from "styled-components";
import { MenuBarProps, MenuTreeType, UIElement } from "../../models";
import { useMenuComponents } from "../../providers/MenuProvider";

type MenuBarElementProps = UIElement<MenuBarProps & {
	items: MenuTreeType[];
}>;
const MenuBarElement = ({
	className = "",
	items = [],
}: MenuBarElementProps) => {
	const componentId = useId();
	const { Container } = useMenuComponents();
	return <Container className={className}>
		{
			items.map((i, index) => <MenuItemElement
				key={`MenuBarElement:${componentId}#${i.item.id}@${index}`}
				item={i}
			/>)
		}
	</Container>
};
MenuBarElement.displayName = "MenuBarElement";
export default styled(MenuBarElement)`
    display: flex;
    flex-direction: ${p => p.orientation === "vertical" ? "row" : "column"};
    flex: 1;
    overflow: auto;
 ` as ComponentType<MenuBarElementProps>;

type MenuItemElementProps = UIElement<{
	item: MenuTreeType;
}>;
const MenuItemElement = styled(({
	className = "",
	item: i,
}: MenuItemElementProps) => {
	const componentId = useId();
	const { Container, Link } = useMenuComponents();
	return <Container>
		<Container className={className}>
			<Link
				href={i.item.url}
				title={i.item.title}
				icon={i.item.icon}
				selected={i.selected}
			/>
		</Container>
		{
			i.children.map((c, index) => <MenuItemElement
				key={`MenuItemElement:${componentId}#${c.item.id}@${index}`}
				item={c}
			/>)
		}
	</Container>
})`
 	background-color: ${({ theme: t, item: { selected: s } }) => (s ? t.menuItem.selected : t.menuItem.texts).bgColor}; 
	padding-left: ${({ theme: t, item: i }) => t.spacing * (i.path.length - 1) * 3}px;
	font-size: ${({ theme: t }) => t.menuItem.texts.fontSize ?? t.font.size}px;
	font-weight: ${({ theme: t, item: { selected: s } }) => (s ? t.menuItem.selected : t.menuItem.texts).fontWeight};
	display: flex;
	
	&:hover {
		background-color: ${({ theme: t }) => t.menuItem.hover.bgColor};
		color: ${({ theme: t }) => t.menuItem.hover.textColor};
	}
` as ComponentType<MenuItemElementProps>;
MenuItemElement.displayName = "MenuItemElement";

