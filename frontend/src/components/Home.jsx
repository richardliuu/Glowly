import '../Home.css';
import AxiosInstance from './AxiosInstance';
import { React, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Search from "./Search"; // Import the Search component

const Home = () => {
    const [myData, setMyData] = useState();
    const [loading, setLoading] = useState(true);

    const GetData = () => {
        AxiosInstance.get(`users/`).then((res) => {
            setMyData(res.data);
            console.log(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        GetData();
    }, []);

    return (
        <div className="heroContainer"> 
            {loading ? (
                <p className="loading">Loading data...</p>
            ) : (
                <div className="heroContent"> 
                    <h1 className="heroTitle"> Glowly </h1>
                    <div className="heroSubtitleContainer">
                        <p className="heroSubtitle">Connecting</p>
                    </div>
                    <button className="ctaButton">Get Started</button>

                    {/* this is the search component */}
                    <div style={{ marginTop: "30px" }}>
                        <Search />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
