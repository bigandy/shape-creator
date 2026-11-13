import { useStackContext } from "@hooks/useStackContext";
import type { CSSProperties, PropsWithChildren } from "react";

interface ViewingBarBoxProps extends PropsWithChildren {
    type: "clip-path" | "offset-path" | "border-shape";
    headerAfter?: React.ReactNode;
    backgroundImage?: string;
}

export const ViewingBarBox = ({
    backgroundImage,
    type,
    headerAfter,
    children,
}: ViewingBarBoxProps) => {
    const { clipPath } = useStackContext();

    const boxStyle = {
        "--clip-path": clipPath,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
    } as CSSProperties;

    return (
        <div className="viewing-bar-box">
            <header>
                <h2>{type}</h2>
                {clipPath !== "" && headerAfter}
            </header>
            <div className="box-outer">
                <div className={`box box--${type}`} style={boxStyle}>
                    {clipPath !== "" && children}
                </div>
            </div>
        </div>
    );
};
