import React from 'react';

export default class RadiusButtons extends React.Component{
    constructor(props){
        super(props);
        this.radius = ["50", "100", "150", "200"];
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
                    <span>Select radius: </span>
                    <div className={"buttons"}>
                        {this.radius.map((el, index) => {
                            let className;
                            if(this.props.radius === el) {
                                className = "btn activeBtn";
                            } else{
                                className = "btn"
                            }
                            return <div className={className} key={index}><span onClick={this.btnChange} data-value={el}>{el} km</span></div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}