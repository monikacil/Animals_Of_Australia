import React from 'react';

const listOfAreas = [{longitude: 132.4340057373047,
latitude: -12.630455567979785}, {longitude: 152.1112060546875,
latitude: -26.181321125359688}, {longitude: 139.4769287109375,
latitude: -34.29466478367243}, {longitude: 128.6663818359375,
latitude: -15.544991314777425}, {longitude: 114.9993896484375,
latitude: -28.677335277734677}, {longitude: 133.890380859375,
latitude: -23.57657430554567}];

export default class AnimalList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataAnimals: []
        }
    }
    showList = (e) => {
        let index = Number(e.target.dataset.group);
        if(this.state.dataAnimals.indexOf(index) === -1){
            this.setState({
                dataAnimals: this.state.dataAnimals.concat(index)
            })
        } else {
            this.setState({
                dataAnimals: this.state.dataAnimals.filter((el)=>{
                    return el !== index
                })
            })
        }
    };

    createLi =(group) => {
        return group.map((el, index) =>{
            let showImage = () => {
                this.props.handleGetImages(el);
            };
            return <li onClick={showImage} key={index}>{el.name}</li>
        })
    };
    createUl = () => {
        let groupOfAnimals = [
            {name: "Mammals", group: this.props.animalsLists.mammals},
            {name: "Birds", group: this.props.animalsLists.birds},
            {name: "Reptiles", group: this.props.animalsLists.reptiles},
            {name: "Amphibians", group: this.props.animalsLists.amphibians},
            {name: "Insects", group: this.props.animalsLists.insects},
            {name: "Arachnids", group: this.props.animalsLists.arachnids},
            {name: "Fishes", group: this.props.animalsLists.fishes},
        ];
        return groupOfAnimals.map((el, index)=>{
            let liElements;
            if(this.state.dataAnimals.indexOf(index) !== -1) {
                liElements = this.createLi(el.group)
            }
            return (<ul key={index}>
                <p data-group={index} onClick={this.showList}>{el.name} [{el.group.length}]</p>
                {liElements}
            </ul>)
        })
    };
    checkListLength = () => {
        if(this.props.animalsLists.mammals.length === 0 && this.props.animalsLists.birds.length === 0
            && this.props.animalsLists.reptiles.length === 0 && this.props.animalsLists.amphibians.length === 0
            && this.props.animalsLists.insects.length === 0 && this.props.animalsLists.arachnids.length === 0
            && this.props.animalsLists.fishes.length === 0){
            return true;
        }
    };
    showRandomArea = () => {
        let index = Math.floor((Math.random() * 6));
        this.props.handleShowRandomArea(listOfAreas[index]);
    };

    render(){
        if(this.props.appState === "start"){
            return (
                <div className={"list"}>
                    <ol className={"instruction"}><h1>How to use it?</h1>
                        <li>Click on the map to select area.</li>
                        <li>Wait until list of animals groups is loaded.</li>
                        <li>Expand the list to see all the species.</li>
                        <li>Click on the species to see the foto.</li>
                        <li>Choose radius of area (buttons with kilometers).</li>
                    </ol>
                </div>
            )
        } else if(this.props.appState === "waiting"){
            return(
                <div className={"list"}>
                    <div className={"loader"}>
                        <div className={"sk-circle"}>
                            <div className={"sk-circle1 sk-child"}></div>
                            <div className={"sk-circle2 sk-child"}></div>
                            <div className={"sk-circle3 sk-child"}></div>
                            <div className={"sk-circle4 sk-child"}></div>
                            <div className={"sk-circle5 sk-child"}></div>
                            <div className={"sk-circle6 sk-child"}></div>
                            <div className={"sk-circle7 sk-child"}></div>
                            <div className={"sk-circle8 sk-child"}></div>
                            <div className={"sk-circle9 sk-child"}></div>
                            <div className={"sk-circle10 sk-child"}></div>
                            <div className={"sk-circle11 sk-child"}></div>
                            <div className={"sk-circle12 sk-child"}></div>
                        </div>
                    </div>
                </div>
            )
        } else if(this.checkListLength() === true){
            return (
                <div className={"list"}>
                    <ol className={"instruction"}><h1>Sorry, but there are no animals here...</h1>
                        <li>Try to select bigger radius or change the area.</li>
                        <li>Or just <span className={"showSomeAnimals"} onClick={this.showRandomArea}>click</span> if you want to see some interesting animals!</li>
                    </ol>
                </div>
            )
        } else if(this.props.appState === "done") {
            return (
                <div className={"list"}>
                    <h1>Choose a class:</h1>
                    <div className={"listContainer"}>
                        {this.createUl()}
                    </div>
                </div>
            )
        }
    }
}
