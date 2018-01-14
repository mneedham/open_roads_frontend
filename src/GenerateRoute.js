import React, {Component} from "react";
import {Redirect} from "react-router-dom";


class GenerateRoute extends Component {
    constructor( props )
    {
        super( props );
        this.state = {
            segments: {},
            estimatedDistance: props.estimatedDistance || 5000,
            generatedRouteId: null
        };

        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleSegmentChange = this.handleSegmentChange.bind( this );
    }

    handleSubmit( event )
    {
        event.preventDefault();

        let body = {};
        body.estimatedDistance = this.state.estimatedDistance;
        body.shapeLatitude = this.props.shapeLatitude;
        body.shapeLongitude = this.props.shapeLongitude;
        body.shapeRadius = this.props.shapeRadius;
        body.startLatitude = this.props.startLatitude;
        body.startLongitude = this.props.startLongitude;
        body.selectedSegment = this.props.selectedSegment.id.toString();

        fetch( 'http://localhost:5000/routes2', {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify( body ),
        } ).then( results => results.json() ).then( data => {
            this.setState( {
                generatedRouteId: data.routeId
            } )
        } ).catch( console.log );
    }

    handleSegmentChange( event )
    {
        this.setState( {
            selectedSegment: event.target.value
        } );
    }

    componentDidMount()
    {
        fetch( "http://localhost:5000/segments2" ).then( results => results.json() ).then( data => {

            let segments = [];
            for ( let item of data )
            {
                segments[item.id] = item;
            }

            this.setState( {
                segments: segments
            } );
        } )
    }

    render()
    {
        if ( this.state.generatedRouteId )
        {
            return ( <Redirect to={{pathname: `/routes/${this.state.generatedRouteId}`, push: true}}/> )
        } else
        {
            return (
                <div>
                    <form action="" method="POST" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Route details</legend>
                            <p>
                                <label htmlFor="segment">Segment</label>
                                <select value={this.props.selectedSegment.id} id="segment" name="segment"
                                        onChange={e => {
                                            let segment = this.state.segments[e.target.value];
                                            this.props.onSegmentChange( segment );
                                        }
                                        }>
                                    <option value="">None</option>
                                    {Object.entries( this.state.segments ).sort((a,b) => a[1].name.localeCompare(b[1].name)).map( segment => {
                                        let segmentId = segment[0];
                                        return (<option key={segmentId}
                                                        value={segmentId}>{this.state.segments[segmentId].name}
                                                        </option>);
                                    })}

                                </select>
                            </p>

                            <p>
                                <label htmlFor="latitude">Latitude</label>
                                <input type="text"
                                       name="latitude"
                                       id="latitude"
                                       defaultValue={this.props.startLatitude}
                                       onChange={e => this.props.onStartLatitudeChange( e.target.value )}
                                       size="20"/>
                            </p>

                            <p>
                                <label htmlFor="longitude">Longitude</label>
                                <input type="text"
                                       name="longitude"
                                       id="longitude"
                                       defaultValue={this.props.startLongitude}
                                       onChange={e => this.props.onStartLongitudeChange( e.target.value )}
                                       size="20"/>
                            </p>

                            <p>
                                <label htmlFor="estimatedDistance">Estimated distance</label>
                                <input type="text"
                                       name="estimatedDistance"
                                       id="estimatedDistance"
                                       defaultValue={this.state.estimatedDistance}
                                       onChange={e => this.setState( {estimatedDistance: e.target.value} )}/>
                            </p>

                        </fieldset>
                        <p>
                            <input type="submit" value="Generate route"/>
                        </p>
                    </form>
                </div>
            )
        }
    }
}

export default GenerateRoute;
