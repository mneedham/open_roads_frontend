import React, {Component} from "react";
import {Redirect} from "react-router-dom";


class GenerateRoute extends Component {
    constructor( props )
    {
        super( props );
        this.state = {
            segments: [],
            startLatitude: props.startLatitude,
            startLongitude: props.startLongitude,
            estimatedDistance: props.estimatedDistance || 5000,
            generatedRouteId: null,
            selectedSegment: props.selectedSegment || ""
        };

        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleSegmentChange = this.handleSegmentChange.bind( this );
    }

    handleSubmit( event )
    {
        event.preventDefault();

        fetch( 'http://localhost:5000/routes2', {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify( this.state ),
        } ).then( results => results.json() ).then( data => {
            this.setState( {
                generatedRouteId: data.routeId
            } )
        } ).catch( console.log );
    }

    handleSegmentChange( event )
    {
        this.setState( {selectedSegment: event.target.value} );
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
                                <select value={this.state.selectedSegment} id="segment" name="segment"
                                        onChange={this.handleSegmentChange}>
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
                                       defaultValue={this.state.startLatitude}
                                       onChange={e => this.setState( {startLatitude: e.target.value} )}
                                       size="20"/>
                            </p>

                            <p>
                                <label htmlFor="longitude">Longitude</label>
                                <input type="text"
                                       name="longitude"
                                       id="longitude"
                                       defaultValue={this.state.startLongitude}
                                       onChange={e => this.setState( {startLongitude: e.target.value} )}
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
