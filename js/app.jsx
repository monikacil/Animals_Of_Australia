import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/main.scss';
import MapContainer from "./mapContainer.jsx";
import AnimalList from "./list.jsx";
import InfoBox from "./infoBox.jsx";
import RadiusButtons from "./radiusButtons.jsx";
import {Header, Footer} from "./mainTemplate.jsx";

class OptionContainer extends React.Component{
    render(){
        return(
            <div className={"listSection"}>
                <RadiusButtons onButtonRadius={this.props.onButtonRadius}/>
                <AnimalList animalsLists={this.props.animalsLists}
                            handleGetImages={this.props.handleGetImages}
                            appState={this.props.appState}/>
            </div>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            radius: "10",
            position : {
                latitude: null,
                longitude: null
            },
            animalsLists :{
                mammals : [],
                birds : [],
                reptiles : [],
                amphibians : [],
                insects : [],
                arachnids : [],
            },
            chosenAnimal: null,
            status: "start"
        };
    }

    handleAnchorChange = (latitude, longitude) => {
        this.setState({
            position:{
                latitude: latitude,
                longitude: longitude
            },
            status: "waiting"
        });
        this.getData(latitude, longitude, this.state.radius);
    };
    getData = (lat, lon, rad) => {
        let apiAdress = `https://biocache.ala.org.au/ws/occurrences/search?pageSize=200&fq=kingdom:Animalia&fq=multimedia:Image&lat=${lat}&lon=${lon}&radius=${rad}`;
        fetch(apiAdress)
            .then(r => r.json())
            .then( data => {
                this.setState({status: "done"});
                this.handleClassifyAnimals(data.occurrences)
            });
    };
    handleButtonRadius = (radius) =>{
        this.setState({
            radius: radius,
            status: "waiting"
        });
        this.getData(this.state.position.latitude, this.state.position.longitude, radius);
    };
    getNameOfGroups = (obj) =>{
        if (obj.vernacularName) {
            return (obj.vernacularName)
        } else if(obj.raw_vernacularName) {
            return (obj.raw_vernacularName)
        } else if(obj.scientificName){
            return (obj.scientificName)
        } else {
            return null;
        }
    };
    handleGetImages = (animal) => {
        this.setState({
            chosenAnimal: animal
        })
    };
    handleCloseInfoBtn = () => {
        this.setState({
            chosenAnimal: null
        })
    };

    handleClassifyAnimals = (list) => {
        let mammals = [];
        let birds = [];
        let reptiles = [];
        let amphibians = [];
        let insects = [];
        let arachnids = [];

        list.forEach(e => {
            if (e.classs === "Aves" || e.speciesGroups[1] === "Birds") {
                let nameOfGroup = this.getNameOfGroups(e);
                if(nameOfGroup !== null && birds.find(e => e.name === nameOfGroup) === undefined){
                    birds.push({name: nameOfGroup, img: e.imageUrls});
                }
            }
            else if (e.classs === "Insecta" || e.speciesGroups[1] === "Insects") {
                let nameOfGroup = this.getNameOfGroups(e);
                if(nameOfGroup !== null && insects.find(e => e.name === nameOfGroup) === undefined){
                    insects.push({name: nameOfGroup, img: e.imageUrls});
                }
            }
            else if (e.classs === "Mammalia" || e.speciesGroups[1] === "Mammals") {
                let nameOfGroup = this.getNameOfGroups(e);
                if(nameOfGroup !== null && mammals.find(e => e.name === nameOfGroup) === undefined){
                    mammals.push({name: nameOfGroup, img: e.imageUrls});
                }
            }
            else if (e.classs === "Amphibia" || e.speciesGroups[1] === "Amphibians") {
                let nameOfGroup = this.getNameOfGroups(e);
                if(nameOfGroup !== null && amphibians.find(e => e.name === nameOfGroup) === undefined){
                    amphibians.push({name: nameOfGroup, img: e.imageUrls});
                }
            }
            else if (e.classs === "Reptilia" || e.speciesGroups[1] === "Reptiles") {
                let nameOfGroup = this.getNameOfGroups(e);
                if(nameOfGroup !== null && reptiles.find(e => e.name === nameOfGroup) === undefined){
                    reptiles.push({name: nameOfGroup, img: e.imageUrls});
                }
            }
            else if (e.classs === "Arachnida" || e.speciesGroups[1] === "Arachnids") {
                let nameOfGroup = this.getNameOfGroups(e);
                if(nameOfGroup !== null && arachnids.find(e => e.name === nameOfGroup) === undefined){
                    arachnids.push({name: nameOfGroup, img: e.imageUrls});
                }
            }
        });

        this.setState({
            animalsLists :{
                mammals : mammals,
                birds : birds,
                reptiles : reptiles,
                amphibians : amphibians,
                insects : insects,
                arachnids : arachnids,
            }
        });
    };
    render(){
        let infoBox;
        if(this.state.chosenAnimal !== null){
            infoBox = <InfoBox handleCloseInfoBtn={this.handleCloseInfoBtn} chosenAnimal={this.state.chosenAnimal}/>
        }
        return (
            <div className={"mainContainer"}>
                <Header />
                <div className={"row"}>
                    <div className={"leftColumn"}>
                        {infoBox}
                        <MapContainer onAnchorChange={this.handleAnchorChange}
                                      position={this.state.position}/>
                    </div>
                    <div className={"rightColumn"}>
                        <OptionContainer onButtonRadius={this.handleButtonRadius}
                                         handleClassifyAnimals={this.handleClassifyAnimals}
                                         animalsLists={this.state.animalsLists}
                                         handleGetImages={this.handleGetImages}
                                         appState={this.state.status}/>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});