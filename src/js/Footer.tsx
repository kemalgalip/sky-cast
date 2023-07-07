import React from "react";

type FooterProps = {
    darkMode: string;
};

export default function Footer(props: FooterProps) {
    /* || STYLE */

    const footerTextStyle = props.darkMode === "on" ? { color: "var(--DARK-MAIN-COLOR)" } : {};

    /* || JS */

    const date = new Date();

    const year = date.getFullYear();

    return (
        <footer>
            <p style={footerTextStyle}>SkyCast &copy; {year}</p>
        </footer>
    );
}
