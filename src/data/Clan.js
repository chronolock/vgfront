export default class Clan{
    constructor(id, name, nation, gift){
        this._id = id;
        this._name = name;
        this._nation = nation;
        this._gift = gift;
    }

    
    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }
    
    get nation(){
        return this._nation;
    }

    set nation(value){
        this._nation = value;
    }

    get name(){
        return this._name;
    }

    set name(value){
        this._name = value;
    }

    get gift(){
        return this._gift;
    }

    set gift(value){
        this._gift = value;
    }

}