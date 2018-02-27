import React from "react";

export class Header extends React.Component{
    render(){
        return <div className={"header"}>
            <img src="https://openclipart.org/image/2400px/svg_to_png/61759/kangaroo-Sign.png" width={"100px"} height={"100px"}/>
            <span>Animals of Australia</span></div>
    }
}
export class Footer extends React.Component{
    render(){
        return(
            <div className={"footer"}>
                <span>Created by Monika Cilińska, data from <a href="https://api.ala.org.au/">Atlas of Living Australia</a></span>
            </div>
        )
    }
}