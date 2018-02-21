import React from "react";

export class Header extends React.Component{
    render(){
        return <div className={"header"}>Animals of Australia</div>
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