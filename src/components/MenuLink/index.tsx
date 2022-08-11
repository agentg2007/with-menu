import React, { ComponentType, forwardRef } from "react";
import styled from "styled-components";
import { MenuLinkElementProps } from "../../models";

const MenuLinkElement = forwardRef<HTMLAnchorElement, MenuLinkElementProps>(({
    className = "", href, title, icon, collapsed = false
}: MenuLinkElementProps, ref) => {
    return <a ref={ref} className={className} href={href} title={title}>
        {
            typeof icon === "string" && <img src={icon} height={24} alt={`ICON:${title}`} />
        }
        {
            !collapsed && <span children={title} />
        }
    </a>
});
MenuLinkElement.displayName = "MenuLinkElement";
export default styled(MenuLinkElement)`
    color: inherit;
    display: flex;
    flex: 1;
    flex-direction: row; 
    padding: ${({ theme }) => theme.spacing}px;
    text-decoration: none;

    & > img {
        margin-right: ${({ theme: t }) => t.spacing}px;
    }
    & > span {
        color: inherit;
        margin: auto 0;
        font-size: ${({ theme: t }) => t.menuItem.texts.fontSize ?? t.font.size}px;
        font-weight: ${({ theme: t, selected: s }) => (s ? t.menuItem.selected : t.menuItem.texts).fontWeight};
    }
` as ComponentType<MenuLinkElementProps>;
