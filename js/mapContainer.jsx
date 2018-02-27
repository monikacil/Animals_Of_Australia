import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
    width: '70vw',
    height: '85vh',
    position: 'relative',
    borderRadius: "10px"
};

const containerStyle = {
    position: "relative",
};

// class AnimatedLoader extends React.Component{
//     render(){
//         return(
//             <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
//                 <defs>
//                     <filter id="goo">
//                         <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
//                         <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -10" result="goo" />
//                         <feBlend in="SourceGraphic" in2="goo" operator="atop" />
//                     </filter>
//                 </defs>
//             </svg>
//         )
//     }
// }

export class MapContainer extends React.Component {
    onClick = (mapProps, map, clickEvent)=>{
        if(typeof this.props.onAnchorChange === "function"){
            this.props.onAnchorChange(clickEvent.latLng.lat(),clickEvent.latLng.lng())
        }
    };
    render() {
        if(this.props.google) {
            return (
                <Map onClick={this.onClick} google={this.props.google} zoom={5} initialCenter={{
                    lat: -25.80544961231461,
                    lng: 134.208984375
                }} style={style} containerStyle={containerStyle}>
                    <Marker
                        name={'Choosen position'}
                        position={{lat: this.props.position.latitude, lng: this.props.position.longitude}}
                        icon={{
                            url: "./images/spider-icon.png",
                            anchor: new google.maps.Point(25,25),
                            scaledSize: new google.maps.Size(50,50)
                        }}
                    />
                </Map>
            );
        } else {
            return (
                <div>...
                    {/*<AnimatedLoader/>*/}
                    {/*<div className ="loader">*/}
                        {/*<div></div>*/}
                        {/*<div></div>*/}
                        {/*<div></div>*/}
                        {/*<div></div>*/}
                        {/*<div></div>*/}
                    {/*</div>*/}
                </div>
            )
        }
    }
}
const key = "AIzaSyADwFutE1ckgrDh6VRsCSr8rshqg_8Lnj4";

export default GoogleApiWrapper({
    apiKey: key
})(MapContainer)
