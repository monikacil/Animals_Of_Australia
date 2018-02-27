import React from 'react';

export default class RadiusButtons extends React.Component{
    constructor(props){
        super(props);
        this.radius = ["10", "30", "50", "100"];
    }
    btnChange = (e) =>{
        if(typeof this.props.onButtonRadius === "function"){
            this.props.onButtonRadius(e.target.dataset.value);
        }
    };

    render(){
        return (
            <div className={"buttonsDiv"}>
                <div className={"buttons"}>
                    <span>Wybierz promień: </span>
                    <div className={"buttons"}>
                        {this.radius.map((el, index) => {
                            return <div className={"btn"} key={index} onClick={this.btnChange} data-value={el}>{el} km</div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}