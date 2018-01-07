import React, {Component} from "react";

import {FeatureGroup, Map, TileLayer} from "react-leaflet"
import {EditControl} from "react-leaflet-draw"

import GenerateRoute from "./GenerateRoute"

class Home extends Component {
    constructor()
    {
        super();
        this.state = {
            centre: {
                lat: 51.357397146246264,
                lng: -0.20153965352074504,
            },
        }
        this.onCreate = this.onCreate.bind( this );
    }

    onCreate( event )
    {
        console.log( event );
        if ( event.layerType === "circle" )
        {
            let layer = event.layer;
            console.log( layer._latlng.lat )
            this.setState( {
                shapeLatitude: layer._latlng.lat,
                shapeLongitude: layer._latlng.lng,
                shapeRadius: layer._mRadius
            } );
        }
    }

    render()
    {

        return (
            <div id="main-wrap">
                <div id="sidebar">
                    <GenerateRoute
                        startLatitude={this.state.centre.lat}
                        startLongitude={this.state.centre.lng}
                        shapeLatitude={this.state.shapeLatitude}
                        shapeLongitude={this.state.shapeLongitude}
                        shapeRadius={this.state.shapeRadius}
                    />
                </div>
                <div id="content-wrap">
                    <Map
                        center={this.state.centre}
                        length={4}
                        zoom={14}>
                        <TileLayer
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <FeatureGroup>
                            <EditControl
                                onCreated={this.onCreate}
                                draw={{
                                    rectangle: false,
                                    polygon: false,
                                    circlemarker: false,
                                    marker: false
                                }}
                            />
                        </FeatureGroup>
                    </Map>
                </div>
            </div>
        );
    }
}

export default Home;
