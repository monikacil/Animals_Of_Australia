import React from 'react';

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
        ];
        return groupOfAnimals.map((el, index)=>{
            let liElements;
            if(this.state.dataAnimals.indexOf(index) !== -1) {
                liElements = this.createLi(el.group)
            }
            return (<ul key={index} data-group={index} onClick={this.showList}>
                {el.name} [{el.group.length}]
                {liElements}
            </ul>)
        })
    };

    render(){
        return(
            <div className={"listContainer"}>
                {this.createUl()}
            </div>
        )
    }
}
