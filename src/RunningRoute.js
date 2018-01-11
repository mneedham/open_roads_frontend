import React, {Component} from "react"

import L from 'leaflet';

import {Map, Polyline, TileLayer} from "react-leaflet"

class RunningRoute extends Component {
    constructor( props )
    {
        super( props );
        document.title = props.title;
        this.state = {
            roads: [],
            distance: 0
        };
    }

    fetchData( id )
    {

        fetch( `http://localhost:5000/routes2/${id}` ).then( results => results.json() ).then( data => {
            this.setState( {
                id: id,
                roads: data.roads.map( rawPoint => [rawPoint["latitude"], rawPoint["longitude"]] ),
                distance: data.distance
            } );
        } )
    }

    componentWillReceiveProps( newProps )
    {
        this.fetchData( newProps.match.params.id );
    }

    componentDidMount()
    {
        this.fetchData( this.props.match.params.id );
    }

    render()
    {
        return (
            <div id="main-wrap">
                <div id="sidebar">
                    <p>Distance: {(this.state.distance / 1.6 / 1000).toFixed( 2 )} miles</p>
                    <p>
                        <a href={`http://localhost:5000/routes/${this.props.match.params.id}?type=gpx`} download>Download
                            as GPX</a>
                    </p>
                </div>
                <div id="content-wrap">
                    {this.state.roads.length > 0 &&
                    <Map
                        length={4}
                        bounds={L.polyline( this.state.roads).getBounds()}
                        zoom={14}>

                        <TileLayer
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Polyline
                            positions={this.state.roads}
                            color={"blue"}
                            weight={3}
                            opacity={.7}
                            lineJoin={"round"}
                        />

                    </Map>}

                </div>
            </div>
        );
    }
}

export default RunningRoute;
