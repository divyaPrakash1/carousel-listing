import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import "./../custom.scss";


const CarouselComponent = () => {

    return (
        <MDBCarousel showIndicators showControls interval={18000} style={{ width: "79%", float: "right" }}>
            <MDBCarouselItem itemId={1} interval={3000}>
                <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg' className='d-block w-100' alt='...' />
                <MDBCarouselCaption>
                    <h5>First slide</h5>
                </MDBCarouselCaption>
            </MDBCarouselItem>

            <MDBCarouselItem itemId={2} interval={3000}>
                <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg' className='d-block w-100' alt='...' />
                <MDBCarouselCaption>
                    <h5>Second slide</h5>
                </MDBCarouselCaption>
            </MDBCarouselItem>

            <MDBCarouselItem itemId={3} interval={3000}>
                <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg' className='d-block w-100' alt='...' />
                <MDBCarouselCaption>
                    <h5>Third slide</h5>
                </MDBCarouselCaption>
            </MDBCarouselItem>

            <MDBCarouselItem itemId={4} interval={3000}>
                <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg' className='d-block w-100' alt='...' />
                <MDBCarouselCaption>
                    <h5>Fourth slide</h5>
                </MDBCarouselCaption>
            </MDBCarouselItem>

            <MDBCarouselItem itemId={5} interval={3000}>
                <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg' className='d-block w-100' alt='...' />
                <MDBCarouselCaption>
                    <h5>Fifth slide</h5>
                </MDBCarouselCaption>
            </MDBCarouselItem>

            <MDBCarouselItem itemId={6} interval={3000}>
                <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg' className='d-block w-100' alt='...' />
                <MDBCarouselCaption>
                    <h5>Sixth slide</h5>
                </MDBCarouselCaption>
            </MDBCarouselItem>
        </MDBCarousel>
    )
}

export default CarouselComponent