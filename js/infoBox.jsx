import React from 'react';

export default class InfoBox extends React.Component{
    closeInfoBtn = () => {
        this.props.handleCloseInfoBtn();
    };
    render(){
        return (
            <div className={"image"}>
                <img src={this.props.chosenAnimal.img[0]} />
                <button onClick={this.closeInfoBtn} type="button">
                    <span>&times;</span>
                </button>
            </div>
        )
    }
}
