import React from 'react';

export default class RadiusButtons extends React.Component{
    constructor(props){
        super(props);
        this.radius = ["10", "30", "50", "100"];
    }
    btnChange = (e) =>{
        if(typeof this.props.onButtonRadius === "function"){
            this.props.onButtonRadius(e.target.value);
        }
    };

    render(){
        return (
            <div className={"buttonsDiv"}>
                <div className={"buttons"}>
                    <span>Wybierz promień: </span>
                    <div className={"buttons"}>
                        {this.radius.map((el, index) => {
                            return <button className={"btn"} key={index} onClick={this.btnChange} value={el}>{el} km</button>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}