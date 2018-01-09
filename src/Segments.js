import React, {Component} from "react";
import {NavLink, Route} from "react-router-dom"
import Segment from "./Segment";
import L from 'leaflet';

import {Map, Polyline, TileLayer} from "react-leaflet"

class Segments extends Component {

    constructor( props )
    {
        super( props );
        document.title = props.title;
        this.state = {
            segments: []
        }
    }

    fetchSegments()
    {
        fetch( `http://localhost:5000/segments2` ).then( results => results.json() ).then( data => {
            this.setState( {segments: data} );
        } )
    }

    componentDidMount()
    {
        console.log("componentDidMount")
        this.fetchSegments();
    }



    componentWillReceiveProps( nextProps )
    {
        document.title = nextProps.title;
    }

    render()
    {
        return (
            <div>
                <Route path={`${this.props.match.url}/:id`} render={props => (
                    <Segment {...props} key={props.match.params.id}
                             title={`Segment ${props.match.params.id}  - Where should I go running?`}/>
                )}/>

                <Route exact path={this.props.match.url} render={() => (
                    <div>
                        {this.state.segments.length === 0 && <p>Loading...</p>}
                        <ul className="route">
                            {this.state.segments.map( ( segment ) =>
                                <li key={segment.id} className="route">
                                    <div style={{width: "300px", height: "150px"}}>
                                        <NavLink exact
                                                 to={`${this.props.match.url}/${segment.id}`}>
                                            {segment.name}
                                        </NavLink>

                                        <Map
                                            length={4}
                                            zoomControl={false}
                                            dragging={false}
                                            scrollWheelZoom={false}
                                            doubleClickZoom={false}
                                            bounds={L.polyline( segment.roads.map( rawPoint => [rawPoint["latitude"], rawPoint["longitude"]] ) ).getBounds()}
                                            zoom={14}>

                                            <TileLayer
                                                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />

                                            <Polyline
                                                positions={segment.roads.map( rawPoint => [rawPoint["latitude"], rawPoint["longitude"]] )}
                                                color={"blue"}
                                                weight={3}
                                                opacity={.7}
                                                lineJoin={"round"}
                                            />

                                        </Map>

                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                )}/>


            </div>
        )
    }
}

export default Segments;
