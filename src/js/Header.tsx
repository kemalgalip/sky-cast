import React from "react";

type HeaderProps = {
    preferredUnit: string;
    changeUnits: () => void;
    darkMode: string;
    changeDarkMode: () => void;
};

export default function Header(props: HeaderProps) {
    /* || STYLE */

    const headerLogoStyle = props.darkMode === "on" ? { color: "var(--DARK-LOGO-COLOR)" } : {};

    const menuStripeStyle = props.darkMode === "on" ? { backgroundColor: "var(--DARK-LOGO-COLOR)" } : {};

    const optionsSectionStyle = props.darkMode === "on" ? { color: "var(--DARK-MAIN-COLOR)", backgroundImage: "var(--DARK-BODY-BG-IMAGE)" } : {};

    /* || JS */

    const menuSectionRef = React.useRef<HTMLElement>(null);

    const [menuClicked, setMenuClicked] = React.useState(false);

    function changeMenuClicked() {
        setMenuClicked((prevState) => !prevState);
    }

    function handleMenuKeyDown(e: React.KeyboardEvent<HTMLElement>) {
        if (e.key === "Enter") {
            changeMenuClicked();
        }
    }

    function handleUnitsKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Enter") {
            props.changeUnits();
        }
    }

    function handleDarkModeKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Enter") {
            props.changeDarkMode();
        }
    }

    React.useEffect(() => {
        function handleClick(e: MouseEvent | KeyboardEvent) {
            if (menuSectionRef.current && !menuSectionRef.current.contains(e.target as Node)) {
                setMenuClicked(false);
            }
        }

        window.addEventListener("click", handleClick);
        window.addEventListener("keydown", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
            window.removeEventListener("keydown", handleClick);
        };
    }, []);

    return (
        <header className="logo">
            <h2 className="header-logo" style={headerLogoStyle}>
                SkyCast
            </h2>
            <section className="menu-section" ref={menuSectionRef} data-menu-clicked={menuClicked} onClick={changeMenuClicked} onKeyDown={handleMenuKeyDown} tabIndex={0}>
                <div className="menu-stripe-top" style={menuStripeStyle}></div>
                <div className="menu-stripe" style={menuStripeStyle}></div>
                <div className="menu-stripe-bottom" style={menuStripeStyle}></div>
                <section className="options-section" style={optionsSectionStyle} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                    <div className="options-section-element" onClick={props.changeUnits} onKeyDown={handleUnitsKeyDown} tabIndex={menuClicked ? 0 : -1}>
                        <p className="options-bold">Units</p>
                        <p>{props.preferredUnit === "metric" ? "Metric" : "Imperial"}</p>
                    </div>
                    <div className="options-section-element" onClick={props.changeDarkMode} onKeyDown={handleDarkModeKeyDown} tabIndex={menuClicked ? 0 : -1}>
                        <p className="options-bold">Dark Mode</p>
                        <p>{props.darkMode === "on" ? "On" : "Off"}</p>
                    </div>
                </section>
            </section>
        </header>
    );
}
