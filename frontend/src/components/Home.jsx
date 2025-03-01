import '../Home.css';
import AxiosInstance from './AxiosInstance';
import { React, useEffect, useState } from 'react';

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
            <h1 className="heroTitle">Glowly</h1>
            <p className="heroSubtitle">Connecting People, Inspiring Innovation</p>
            <button className="ctaButton">Get Started</button>
        </div>
    );
};

export default Home;
