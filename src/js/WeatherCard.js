import React from "react"

export default function WeatherCard(props) {
    /* || STYLE */

    const weatherCardStyle = props.darkMode === "on" ? {backgroundImage: "var(--DARK-CARD-BG-IMAGE)"} : {}

    const weatherCardTextStyle = props.darkMode === "on" ? {color: "var(--DARK-MAIN-COLOR)"} : {}

    const deleteBackgroundStyle = props.darkMode === "on" ? {backgroundColor: "var(--DARK-DELETE-BG-COLOR)"} : {}

    const deleteTextStyle = props.darkMode === "on" ? {color: "var(--DARK-DELETE-TEXT-COLOR)"} : {}

    /* || JS */
    
    function handleDeleteKeyDown(e) {
        if (e.key === "Enter") {
            props.removeLocationName(props.index)
        }
    }

    return (
        <div className="weather-card" style={weatherCardStyle} tabIndex={0}>
            <h3 className="weather-card-location" style={weatherCardTextStyle}>{props.location.name}, {props.location.country}</h3>
            <img className="weather-card-icon" src={props.current.condition.icon} />
            <p className="weather-card-condition" style={weatherCardTextStyle}>{props.current.condition.text}</p>
            <h2 className="weather-card-temp" style={weatherCardTextStyle}>{props.preferredUnit === "metric" ? `${props.current.temp_c}C` : `${props.current.temp_f}F`}</h2>
            <div className="weather-card-delete" style={deleteBackgroundStyle} onClick={() => props.removeLocationName(props.index)} onKeyDown={handleDeleteKeyDown} tabIndex={0}>
                <p className="weather-card-delete-text" style={deleteTextStyle}>DELETE</p>
            </div>
        </div>
    )
}