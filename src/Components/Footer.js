import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter className='text-center text-white main-footer-container' style={{
            backgroundColor: 'rgb(202, 206, 209)', width: "100%", position: "fixed", bottom: "0"
        }}>
            <div className='text-center p-3 main-footer-container-div' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2020 Copyright:
                <a className='text-white' href='https://mdbootstrap.com/'>
                    MDBootstrap.com
                </a>
            </div>
        </MDBFooter>
    );
}