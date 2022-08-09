import React, { ComponentType } from "react";
import styled from "styled-components";
import { MenuLinkElementProps } from "../../models";

const MenuLinkElement = ({
    className = "", href, title, icon, collapsed = false
}: MenuLinkElementProps) => {
    return <a className={className} href={href} title={title}>
        {
            typeof icon === "string" && <img src={icon} height={24} alt={`ICON:${title}`} />
        }
        {
            !collapsed && <span children={title} />
        }
    </a>
};
MenuLinkElement.displayName = "MenuLinkElement";
export default styled(MenuLinkElement)`
    display: flex;
    flex: 1;
    flex-direction: row; 
    padding: ${({ theme }) => theme.spacing}px;
    text-decoration: none;

    & > img {
        margin-right: ${({ theme: t }) => t.spacing}px;
    }
    & > span {
        margin: auto 0;
        color: ${({ theme: t, selected: s }) => (s ? t.menuItem.selected : t.menuItem.texts).textColor};
        font-size: ${({ theme: t }) => t.menuItem.texts.fontSize ?? t.font.size}px;
        font-weight: ${({ theme: t, selected: s }) => (s ? t.menuItem.selected : t.menuItem.texts).fontWeight};
    }
` as ComponentType<MenuLinkElementProps>;
