import React from "react";
import WeatherCard from "./WeatherCard.tsx";

type WeatherSectionProps = {
    preferredUnit: string;
    darkMode: string;
    locationNames: string[];
    setLocationNamesFunction: (newLocation: string) => void;
    options: {
        method: string;
        headers: {
            "X-RapidAPI-Key": string;
            "X-RapidAPI-Host": string;
        };
    };
    removeLocationName: (index: number) => void;
};

export default function WeatherSection(props: WeatherSectionProps) {
    /* || STYLE */

    const addLocationCardStyle = props.darkMode === "on" ? { backgroundImage: "var(--DARK-CARD-BG-IMAGE)" } : {};

    const addLocationPlusStyle = props.darkMode === "on" ? { backgroundColor: "var(--DARK-MAIN-COLOR)" } : {};

    const addLocationTextStyle = props.darkMode === "on" ? { color: "var(--DARK-LOGO-COLOR)" } : {};

    /* || JS */

    /* LOCATION DATA */
    const [locationDatas, setLocationDatas] = React.useState<object[]>([]);

    React.useEffect(() => {
        setLocationDatas([]);
        const locationFetches = props.locationNames.map(async (item: string) => {
            try {
                const res = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${item}`, props.options);
                return await res.json();
            } catch (err) {
                return console.log(err);
            }
        });
        Promise.all(locationFetches)
            .then((data) => setLocationDatas(data))
            .catch((err) => console.log(err));
    }, [props.locationNames]);

    const locationDatasMapped = locationDatas.map((item, index) => <WeatherCard key={index} index={index} data={{ ...item }} preferredUnit={props.preferredUnit} darkMode={props.darkMode} removeLocationName={props.removeLocationName} />);

    /* ADD LOCATION */
    const addLocationCardRef = React.useRef<HTMLDivElement>(null);

    const [addCardClicked, setAddCardClicked] = React.useState(false);

    const [addCardContent, setAddCardContent] = React.useState(false);

    const [currentLocation, setCurrentLocation] = React.useState("");

    const [locationSubmitted, setLocationSubmitted] = React.useState<string | null>(null);

    const [formTrueFalse, setFormTrueFalse] = React.useState(true);

    function handleAnimatedElement() {
        if (addLocationCardRef.current) {
            addLocationCardRef.current.style.animationPlayState = "running";
        }
    }

    function changeAddCardClicked() {
        setAddCardClicked((prevCard) => !prevCard);
    }

    function changeAddCardContent() {
        setTimeout(() => {
            setAddCardContent((prevCard) => !prevCard);
        }, 150);
    }

    function handleAddCardKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Enter") {
            handleAnimatedElement();
            changeAddCardClicked();
            changeAddCardContent();
        }
    }

    function handleLocationFormChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setCurrentLocation(value);
    }

    function addLocationFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLocationSubmitted(currentLocation);
        setFormTrueFalse((prevValue) => !prevValue);
        setCurrentLocation("");
    }

    React.useEffect(() => {
        if (locationSubmitted) {
            fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${locationSubmitted}`, props.options)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Try again");
                    }
                    return res.json();
                })
                .then((data) => {
                    props.setLocationNamesFunction(data);
                })
                .catch((err) => console.log(err));
        }
    }, [locationSubmitted, formTrueFalse]);

    return (
        <section className="weather-section">
            {locationDatas.length === props.locationNames.length && (
                <div className="add-card-to-scale">
                    <div
                        className="add-location-card"
                        ref={addLocationCardRef}
                        style={addLocationCardStyle}
                        data-add-card-clicked={addCardClicked.toString()}
                        onClick={() => {
                            handleAnimatedElement();
                            changeAddCardClicked();
                            changeAddCardContent();
                        }}
                        onKeyDown={handleAddCardKeyDown}
                        tabIndex={0}
                    >
                        {!addCardContent ? (
                            <>
                                <div className="add-location-button">
                                    <div className="add-location-plus-horizontal" style={addLocationPlusStyle}></div>
                                    <div className="add-location-plus-vertical" style={addLocationPlusStyle}></div>
                                </div>
                                <h3 className="add-location-text" style={addLocationTextStyle}>
                                    Add Location
                                </h3>
                            </>
                        ) : (
                            <>
                                <h3 className="add-location-text" style={addLocationTextStyle}>
                                    Add Location
                                </h3>
                                <form className="add-location-form" onSubmit={addLocationFormSubmit} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                                    <input className="add-location-input" id="location" name="location" placeholder="Enter Location" autoComplete="off" value={currentLocation} onChange={handleLocationFormChange} />
                                    <button className="add-location-submit">Add</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
            {locationDatasMapped}
        </section>
    );
}
