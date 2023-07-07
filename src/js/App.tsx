import React from "react";
import Header from "./Header.tsx";
import WeatherSection from "./WeatherSection.tsx";
import Footer from "./Footer.tsx";

export default function App() {
    /* BODY */
    const [preferredUnit, setPreferredUnit] = React.useState<string>(() => JSON.parse(localStorage.getItem("preferredUnit")!) || "metric");

    const [darkMode, setDarkMode] = React.useState<string>(() => JSON.parse(localStorage.getItem("darkMode")!) || "on");

    const [locationNames, setLocationNames] = React.useState<string[]>(() => JSON.parse(localStorage.getItem("locationNames")!) || []);

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
    };

    function changeUnits() {
        setPreferredUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
    }

    React.useEffect(() => {
        localStorage.setItem("preferredUnit", JSON.stringify(preferredUnit));
    }, [preferredUnit]);

    function changeDarkMode() {
        setDarkMode((prevMode) => (prevMode === "off" ? "on" : "off"));
    }

    React.useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    function setLocationNamesFunction(newLocation: any) {
        const hasLocation = locationNames.includes(newLocation.location.name);
        if (!hasLocation) {
            setLocationNames((prevNames) => [newLocation.location.name, ...prevNames]);
        }
    }

    function removeLocationName(index: number) {
        setLocationNames((prevNames) => prevNames.filter((_, i) => i !== index));
    }

    React.useEffect(() => {
        localStorage.setItem("locationNames", JSON.stringify(locationNames));
    }, [locationNames]);

    React.useEffect(() => {
        if (darkMode === "on") {
            document.body.style.backgroundImage = "var(--DARK-BODY-BG-IMAGE)";
            document.body.classList.add("dark-mode");
        } else {
            document.body.style.backgroundImage = "var(--LIGHT-BODY-BG-IMAGE)";
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode]);

    return (
        <div className="app">
            <Header preferredUnit={preferredUnit} changeUnits={changeUnits} darkMode={darkMode} changeDarkMode={changeDarkMode} />
            <main>
                <WeatherSection preferredUnit={preferredUnit} darkMode={darkMode} locationNames={locationNames} setLocationNamesFunction={setLocationNamesFunction} options={options} removeLocationName={removeLocationName} />
            </main>
            <Footer darkMode={darkMode} />
        </div>
    );
}
