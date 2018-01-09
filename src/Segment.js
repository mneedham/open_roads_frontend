
import React, {Component} from "react"

import L from 'leaflet';

import {Map, Polyline, TileLayer} from "react-leaflet"

class Segment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            roads: []
        }
    }

    fetchData( id )
    {
        fetch( `http://localhost:5000/segments2/${id}` ).then( results => results.json() ).then( data => {
            this.setState( {
                id: id,
                roads: data.roads.map( rawPoint => [rawPoint["latitude"], rawPoint["longitude"]] ),
                name: data.name
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

    render() {
        return (
            <div>
                <div id="main-wrap">
                    <div id="sidebar">
                        <p>{this.state.name}</p>

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
            </div>
        )
    }
}

export default Segment;
