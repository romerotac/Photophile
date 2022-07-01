import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel'

function EventCarousel (){


    return(
        <>
        <Carousel>
        <Carousel.Item >
        <img
        className="d-block w-100"
        src="..\images\event-temp-back.png"
        alt="First slide"
        style={{height:'300px'}}
        />
            <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
            <img
            className="d-block w-100"
            src="..\images\event-temp-back.png"
            alt="Second slide"
            style={{height:'300px'}}
            />
            <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="..\images\event-temp-back.png"
            alt="Third slide"
            style={{height:'300px'}}
            />
            <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
        </>
    )
}

export default EventCarousel;