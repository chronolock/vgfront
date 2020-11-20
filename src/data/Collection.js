export default class Collection{
    constructor(id, name, cod, era){
        this._id = id;
        this._name = name;
        this._cod = cod;
        this._era = era;
    }

    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }

    get name(){
        return this._name;
    }

    set name(value){
        this._name = value;
    }

    get cod(){
        return this._cod;
    }

    set cod(value){
        this._cod = value;
    }

    get era(){
        return this._era;
    }

    set era(value){
        this._era = value;
    }
}