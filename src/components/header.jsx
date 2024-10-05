// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import '../style/header.css';
import logo1 from "../assets/nss_logo.png";
import logo2 from "../assets/tce_logo.png";

const Header = () => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const eventDate = new Date("2024-10-26T16:15:00");
            const currentDate = new Date();
            const timeDifference = eventDate - currentDate;

            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

                setTimeLeft(`${days} days, ${hours} hours, ${minutes} minutes left`);
            } else {
                setTimeLeft("Deadline Exceeded!");
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <header className="box-1">
            <div className='top-box'>
                <div className="logo-container">
                    <img src={logo2} alt="College Logo" className='logo'/>
                   
                </div>
                <div className='booth-name'>
                    <h1>Make Your ID</h1>
                </div>
                <div className="event-details">
                    <h1 className="event-title">Class Of {new Date().getFullYear()}</h1>
                    <p className="event-date">{timeLeft}</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
