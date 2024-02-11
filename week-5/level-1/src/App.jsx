import React from 'react';
import Card from "./Components/Card";
import cardData from "./data.json";
import './App.css'; // Import your CSS file for styling

function App() {
    return (
        <div className="grid-container"> {/* Apply CSS grid layout */}
            {cardData.map((card, index) => (
                <Card
                    key={index}
                    name={card.name}
                    description={card.description}
                    interests={card.interests}
                    socials={card.socials}
                    alias={card.alias}
                />
            ))}
        </div>
    );
}

export default App;
