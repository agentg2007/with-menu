import React, { CSSProperties } from "react";
import { useMenuComponents, useMenuStyles } from "../MenuProvider";
import { MenuViewProps } from "../models";
import MenuBar from "./MenuBar";

export { default as MenuBar } from "./MenuBar";

const MenuView = ({
    children,
    anchor = "left",
    ...props
}: MenuViewProps) => {
    const { Container } = useMenuComponents();
    const { contentPanel, root } = useMenuStyles(props.classes);
    const flexDirection = (): CSSProperties => {
        switch (anchor) {
            case "bottom": return ({
                flexDirection: "column-reverse",
            })
            case "right": return ({
                flexDirection: "row-reverse",
            })
            case "top": return ({
                flexDirection: "column",
            })
            case "left":
            default: return ({
                flexDirection: "row",
            })
        }
    }
    return <Container className={root} style={{
        ...flexDirection(),
        display: "flex",
    }}>
        <MenuBar {...props} />
        <Container
            children={children}
            className={contentPanel}
        />
    </Container>
};
MenuView.displayName = "MenuView";
export default MenuView;