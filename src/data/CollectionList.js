import Observable from "./Observable"
import Collection from "./Collection"
import Config from "./Config"

export default class ClanList extends Observable{
    constructor(){
        super();
        fetch(Config.COLLECTION_LIST_REQUEST, {method:'GET'}).then( res => {
            res.json().then(json => {
                json.forEach(value => {
                    this._collection.push(new Collection(value.id, value.name, value.cod, value.era));
                })
                this.setState({collections: this._collection});
            })
        })
        this._collection = [];
    }

    
}