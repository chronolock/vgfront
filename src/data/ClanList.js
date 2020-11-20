import Observable from "./Observable"
import Clan from "./Clan"
import Config from "./Config"

export default class ClanList extends Observable{
    constructor(){
        super();
        fetch(Config.CLAN_LIST_REQUEST, {method:'GET'}).then( res => {
            res.json().then(json => {
                json.forEach(value => {
                    this._clans.push(new Clan(value.id, value.name, value.nation, value.gift));
                })
                this.setState({clans: this._clans});
            })
        })
        this._clans = [];
    }

    
}