export default class Observable {
    constructor(){
        this._state = {}
        this._subscribers = [];
    }

    subscribe(func){
        this._subscribers.push(func);
    }

    unsubscribe(func){
        this._subscribers = this._subscribers.filter(f => f !== func);
    }

    _notifty(){
        this._subscribers.forEach(f => f(this._state));
    }

    setState(newState){
        this._state = newState;
        this._notifty();
    }

    getState(){
        return this._state;
    }
}