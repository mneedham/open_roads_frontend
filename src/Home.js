import React, {Component} from "react";

import {FeatureGroup, Map, TileLayer, Polyline} from "react-leaflet"
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
            selectedSegment: {
                id: ""
            }
        }
        this.onCreate = this.onCreate.bind( this );
        this.onStartLatitudeChange = this.onStartLatitudeChange.bind( this );
        this.onStartLongitudeChange = this.onStartLongitudeChange.bind( this );
        this.onSegmentChange = this.onSegmentChange.bind( this );
    }

    onCreate( event )
    {
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

    onSegmentChange( value )
    {
        this.setState( {
            selectedSegment: value
        });
    }

    onStartLatitudeChange( value )
    {
        this.setState( {
            centre: {
                lat: value,
                lng: this.state.centre.lng
            }
        } )
    }

    onStartLongitudeChange( value )
    {
        this.setState( {
            centre: {
                lat: this.state.centre.lat,
                lng: value
            }
        } )
    }

    render()
    {
        return (
            <div id="main-wrap">
                <div id="sidebar">
                    <GenerateRoute
                        startLatitude={this.state.centre.lat}
                        onStartLatitudeChange={this.onStartLatitudeChange}
                        startLongitude={this.state.centre.lng}
                        onStartLongitudeChange={this.onStartLongitudeChange}
                        selectedSegment={this.state.selectedSegment}
                        onSegmentChange={this.onSegmentChange}
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

                        {this.state.selectedSegment.id !== "" &&
                            <Polyline
                                positions={this.state.selectedSegment.roads.map( rawPoint => [rawPoint["latitude"], rawPoint["longitude"]] )}
                                color={"blue"}
                                weight={3}
                                opacity={.7}
                                lineJoin={"round"}
                            />
                        }
                    </Map>
                </div>
            </div>
        );
    }
}

export default Home;
