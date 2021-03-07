import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Button, Card, Container } from 'semantic-ui-react';

function ProductPhotoCarousel({photoLinks, deletePhoto, mainPhoto, mainPhotoUrl}) {

    return (
        <CarouselProvider
            visibleSlides={3.2}
            naturalSlideWidth={100}
            naturalSlideHeight={500}
            totalSlides={photoLinks.length}
            isIntrinsicHeight={true}
        >
            <Slider style={{padding: '30px 1px'}}>
                {
                    photoLinks.map((link, index) => {
                        return (
                        <Slide index={index} key={index}>
                            <Card style={{ height: 'fit-content' }}>
                                <Image src={link}/>
                                <Card.Content textAlign="center">
                                    <Button basic color='green' disabled={link === mainPhotoUrl} onClick={() => {console.log(link); mainPhoto(link)}}>
                                        Main
                                    </Button>
                                    <Button basic color='red' onClick={() => {deletePhoto(index);}}>
                                        Delete
                                    </Button>
                                </Card.Content>
                            </Card>
                        </Slide>);
                    })
                }
            </Slider>
            <Container textAlign='center'>
                <ButtonBack className="ui animated button">
                <div className="visible content">Back</div>
                <div className="hidden content">
                    <i className="left arrow icon"></i>
                </div>
            </ButtonBack>
            <ButtonNext className="ui animated button">
                <div className="visible content">Next</div>
                <div className="hidden content">
                    <i className="right arrow icon"></i>
                </div>
            </ButtonNext>
            </Container>
            
        </CarouselProvider>
    )
}

export default ProductPhotoCarousel
