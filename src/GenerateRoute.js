import React, {Component} from "react";
import {Redirect} from "react-router-dom";


class GenerateRoute extends Component {
    constructor( props )
    {
        super( props );
        this.state = {
            segments: [],
            estimatedDistance: props.estimatedDistance || 5000,
            generatedRouteId: null
        };

        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleSegmentChange = this.handleSegmentChange.bind( this );
    }

    handleSubmit( event )
    {
        event.preventDefault();

        let body = this.state;
        body.shapeLatitude = this.props.shapeLatitude;
        body.shapeLongitude = this.props.shapeLongitude;
        body.shapeRadius = this.props.shapeRadius;
        body.startLatitude = this.props.startLatitude;
        body.startLongitude = this.props.startLongitude;
        body.selectedSegment = this.props.selectedSegment;

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
            this.setState( {
                segments: data
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
                                <select value={this.props.selectedSegment} id="segment" name="segment"
                                        onChange={e => this.props.onSegmentChange(e.target.value) }>
                                    <option value="">None</option>
                                    {this.state.segments.map( segment =>
                                        <option key={segment.id} value={segment.id}>{segment.name}</option>
                                    )}

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
