import React, { useState, useEffect, createContext } from 'react'

import CarouselComponent from './CarouselComponent';
import Listing from './Listing';
import Login from './Login';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import Footer from './Footer';

import Banner from './Banner';
import SideBarMenu from './SideBarMenu';
import BarGraph from './Graph/BarGraph';
import LineGraph from './Graph/LineGraph';
import AreaGraph from './Graph/AreaGraph';
// import { map, throttleTime } from 'rxjs/operators';
// import { fromEvent } from 'rxjs';


export const NameContext = createContext();


const NameContextProvider = ({ children }) => {
    const [name, setName] = useState("");

    return (
        <NameContext.Provider value={{ name, setName }}>
            {children}
        </NameContext.Provider>
    );
};

const Mainpage = () => {


    useEffect(() => {
        // // Create an Observable from a DOM event (e.g., mousemove)
        // const mouseMove$ = fromEvent(document, 'mousemove');

        // // Apply RxJS operators to the Observable
        // const throttledMouseMove$ = mouseMove$.pipe(
        //     throttleTime(200), // Throttle events to one every 200 milliseconds
        //     map(event => ({ x: event.clientX, y: event.clientY })) // Map the event to its coordinates
        // );

        // // Subscribe to the Observable
        // const subscription = throttledMouseMove$.subscribe(coordinates => {
        //     console.log('Mouse coordinates:', coordinates);
        // });

        // // Clean up the subscription when the component unmounts
        // return () => {
        //     subscription.unsubscribe();
        // };
    }, []);


    return (
        <NameContextProvider>
            <div className='main-component-container row'>
                <div className='nav-bar-main'>
                    <Navbar />
                </div>
                <div className="bg-info text-light text-center py-3">
                    <Banner />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="bg-light">
                                <SideBarMenu />
                            </div>
                        </div>
                        <div className="col-md-8" style={{ overflow: "auto", maxHeight: "73%" }}>
                            <Routes>
                                <Route path='login' element={<Login />} />
                                <Route path='listing' element={<Listing />} />
                                <Route path='signUp' element={<SignUp />} />
                                <Route path='bar-graph' element={<BarGraph />} />
                                <Route path='line-graph' element={<LineGraph />} />
                                <Route path='area-graph' element={<AreaGraph />} />
                                <Route path="/*" element={<CarouselComponent />} />
                            </Routes>
                        </div>
                    </div>
                </div>
                <div className="footer-container">
                    <Footer />
                </div>
            </div>
        </NameContextProvider>
    )
}

export default Mainpage
