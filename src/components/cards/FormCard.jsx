import { Button, Container, TextField, Divider, FormControlLabel, Switch } from "@material-ui/core";
import React, { Component } from "react";
import Card from '../../data/Card'
import "./style.css";


class FormCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clanList: [],
            collectionList: [],
            rarityList: ["C", "R", "RR", "RRR", "VR", "TD", "PR", "OR", "SVR", "SP", "LIR", "GR", "SR", "Z"],
            clan: "",
            collection: "",
            seq: "",
            name: "",
            grade: 0,
            power: 5000,
            shield: 15000,
            critical: 1,
            race: "",
            isSentinel: false,
            isCritical: false,
            isDraw: false,
            isFront: false,
            isHeal: false,
            isStand: false,
            triggerPower: 0,
            isBoost: true,
            isIntercept: false,
            isTwinDrive: false,
            isTripleDrive: false,
            imaginaryGift: false,
            imgUrl: "",
            cardFlavor: "",
            cardEffect: "",
            rarity: ""
        }

        this._clanList = this.props.clanList;
        this._collectionList = this.props.collectionList;

        this._clanListSubscribe = result => {
            this.setState({ ...this.state, clanList: result.clans });
        };

        this._collectionListSubscribe = result => {
            this.setState({ ...this.state, collectionList: result.collections });
        };

        this._currentGift = "F";
        this._currentEra = "V";

        this._isBoostChanged = false;
        this._isInterceptChanged = false;
        this._isTwinDriveChanged = false;
        this._isTripleDriveChanged = false;
        this._shieldChanged = false;
        this._powerChanged = false;
        this._urlImageChanged = false;
        this._triggerPowerChanged = false;

    }


    render() {
        return (
            <form>
                <Container maxWidth="md" className="container_formcard">
                    <TextField id="standard-basic" label="Clan" select SelectProps={{ native: true }} className="field_formcard" margin="normal" value={this.state.clan} onChange={e => {
                        if(e.target.value < 0 )
                        return;
                        this._currentGift = this.state.clanList[e.target.value].gift;
                        this.updateDefaultFields({ ...this.state, clan: e.target.value });
                    }} >
                        <option key={0} value={-1} defaultValue >Choose a clan</option>
                        {this.state.clanList.map((value, index) => {
                            return (
                                <option key={'clan_' + value.id} value={index}>{value.name}</option>
                            )
                        })}
                    </TextField>
                    <TextField id="standard-basic" label="Collection" select SelectProps={{ native: true }} className="field_formcard" margin="normal" value={this.state.collection} onChange={e => {
                        if (e.target.value < 0) {
                            return;
                        }

                        this._currentEra = this.state.collectionList[e.target.value].era;
                        this.updateDefaultFields({ ...this.state, collection: e.target.value });
                    }} >
                        <option key={0} value={-1} defaultValue >Choose a collection</option>
                        {this.state.collectionList.map((value, index) => {
                            return (
                                <option key={'collection_' + value.id} value={index}>{value.cod + ' - ' + value.name}</option>
                            )
                        })}
                    </TextField>
                    <TextField id="standard-basic" label="Seq" type="number" margin="normal" className="numberField_small_formcard field_formcard" value={this.state.seq} onChange={e => {
                        const newState = { ...this.state, seq: e.target.value };
                        this.updateDefaultFields(newState);
                    }} />
                    <TextField id="standard-basic" label="Rarity" select SelectProps={{ native: true }} className="field_formcard" margin="normal" value={this.state.rarity} onChange={e => {
                        this.setState({ ...this.state, rarity: e.target.value })
                    }} >
                        <option key={0} value={-1} defaultValue >Choose a rarity</option>
                        {this.state.rarityList.map((value, index) => {
                            return (
                                <option key={'rarity_' + value} value={index}>{value}</option>
                            )
                        })}
                    </TextField>
                    <Divider light className="dividerInset" />
                    <TextField id="standard-basic" label="Card Name" fullWidth value={this.state.name} onChange={e => this.setState({ ...this.state, name: e.target.value })} />
                    <TextField id="standard-basic" label="Grade" type="number" className="field_formcard numberField_small_formcard" value={this.state.grade} onChange={e => {
                        if ((e.target.value < 0) || (e.target.value > 5)) {
                            return;
                        }
                        let newState = { ...this.state, grade: e.target.value };

                        this.updateDefaultFields(newState);
                    }} />
                    <TextField id="standard-basic" label="Power" type="number" className="field_formcard" value={this.state.power} onChange={e => {
                        this._powerChanged = true;
                        this.setState({ ...this.state, power: e.target.value })
                    }} />
                    <TextField id="standard-basic" label="Shield" type="number" className="field_formcard" value={this.state.shield} onChange={e => {
                        this._isBoostChanged = true;
                        this.setState({ ...this.state, shield: e.target.value })
                    }}
                    />
                    <TextField id="standard-basic" label="Critical" type="number" className="field_formcard numberField_small_formcard" value={this.state.critical} onChange={e => this.setState({ ...this.state, critical: e.target.value })} />
                    <TextField id="standard-basic" label="Race" className="field_formcard" value={this.state.race} onChange={e => {
                        this.setState({ ...this.state, race: e.target.value })
                    }} />
                    <FormControlLabel control={
                        <Switch name="imaginaryGift" value={1} color="primary" checked={this.state.imaginaryGift} onChange={e => {
                            this.setState({ ...this.state, imaginaryGift: e.target.checked })
                        }} />
                    } label="Imaginary Gift" />
                    <FormControlLabel control={
                        <Switch name="Sentinel" value={1} color="primary" checked={this.state.isSentinel} onChange={e => {
                            this.updateDefaultFields({ ...this.state, isSentinel: e.target.checked });
                        }} />
                    } label="Sentinel" />
                    <Divider light className="dividerInset" />
                    <FormControlLabel control={
                        <Switch name="criticalTrigger" color="primary" checked={this.state.isCritical} onChange={e => {
                            if (e.target.checked) {
                                this.updateDefaultFields({
                                    ...this.state,
                                    isCritical: e.target.checked,
                                    isDraw: false,
                                    isFront: false,
                                    isHeal: false,
                                    isStand: false
                                })
                            } else {
                                this.updateDefaultFields({
                                    ...this.state,
                                    isCritical: false,
                                })
                            }
                        }} />
                    } label="Critical Trigger" />
                    <FormControlLabel control={
                        <Switch name="drawTrigger" color="primary" checked={this.state.isDraw} onChange={e => {
                            if (e.target.checked) {
                                this.updateDefaultFields({
                                    ...this.state,
                                    isCritical: false,
                                    isDraw: true,
                                    isFront: false,
                                    isHeal: false,
                                    isStand: false
                                })
                            } else {
                                this.updateDefaultFields({
                                    ...this.state,
                                    isDraw: false,
                                })
                            }
                        }} />
                    } label="Draw Trigger" />
                    <FormControlLabel control={
                        <Switch name="frontTrigger" color="primary" checked={this.state.isFront} onChange={e => {
                            if (e.target.checked) {
                                this.updateDefaultFields({
                                    ...this.state,
                                    isCritical: false,
                                    isDraw: false,
                                    isFront: true,
                                    isHeal: false,
                                    isStand: false
                                })
                            } else {
                                this.updateDefaultFields({
                                    ...this.state,
                                    isFront: false,
                                })
                            }
                        }} />
                    } label="Front Trigger" />
                    <FormControlLabel control={
                        <Switch name="healTrigger" color="primary" checked={this.state.isHeal} onChange={e => {
                            if (e.target.checked) {
                                this.updateDefaultFields({
                                    ...this.state,
                                    isCritical: false,
                                    isDraw: false,
                                    isFront: false,
                                    isHeal: true,
                                    isStand: false
                                })
                            } else {
                                this.updateDefaultFields({
                                    ...this.state,
                                    isHeal: false,
                                })
                            }
                        }} />
                    } label="Heal Trigger" />
                    <FormControlLabel control={
                        <Switch name="standTrigger" color="primary" checked={this.state.isStand} onChange={e => {
                            if (e.target.checked) {
                                this.updateDefaultFields({
                                    ...this.state,
                                    isCritical: false,
                                    isDraw: false,
                                    isFront: false,
                                    isHeal: false,
                                    isStand: true
                                })
                            } else {
                                this.updateDefaultFields({
                                    ...this.state,
                                    isStand: false,
                                })
                            }
                        }} />
                    } label="Stand Trigger" />
                    <TextField id="standard-basic" label="Trigger Power" type="number" value={this.state.triggerPower} onChange={e => {
                        this._triggerPowerChanged = true;
                        this.setState({ ...this.state, triggerPower: e.target.value })
                    }} />
                    <Divider light className="dividerInset" />
                    <FormControlLabel control={
                        <Switch name="boost" color="primary" checked={this.state.isBoost} onChange={e => {
                            this._isBoostChanged = true;
                            this.setState({ ...this.state, isBoost: e.target.checked })
                        }} />
                    } label="Boost" />
                    <FormControlLabel control={
                        <Switch name="intercept" color="primary" checked={this.state.isIntercept} onChange={e => {
                            this._isInterceptChanged = true;
                            this.setState({ ...this.state, isIntercept: e.target.checked })
                        }} />
                    } label="Intercept" />
                    <FormControlLabel control={
                        <Switch name="twinDrive" color="primary" checked={this.state.isTwinDrive} onChange={e => {
                            this._isTwinDriveChanged = true;
                            this.setState({ ...this.state, isTwinDrive: e.target.checked })
                        }} />
                    } label="TwinDrive" />
                    <FormControlLabel control={
                        <Switch name="tripleDrive" color="primary" checked={this.state.isTripleDrive} onChange={e => {
                            this._isTripleDriveChanged = true;
                            this.setState({ ...this.state, isTripleDrive: e.target.checked })
                        }} />
                    } label="Triple Drive" />
                    <Divider light className="dividerInset" />
                    <TextField id="standard-basic" label="Image URL" fullWidth value={this.state.imgUrl} onChange={e => {
                        this._urlImageChanged = true;
                        this.setState({ ...this.state, imgUrl: e.target.value })
                    }} />
                    <TextField id="standard-basic" label="Card Flavor" fullWidth multiline rows={3} className="field_formcard" value={this.state.cardFlavor} onChange={e => {
                        this.setState({ ...this.state, cardFlavor: e.target.value })
                    }} />
                    <TextField id="standard-basic" label="Card Effect" fullWidth multiline rows={6} className="field_formcard" value={this.state.cardEffect} onChange={e => {
                        this.setState({ ...this.state, cardEffect: e.target.value })
                    }} />
                    <Button variant="contained" color="primary" onClick={this.sendCard.bind(this)}>
                        Register Card
                    </Button>
                </Container>
            </form>
        );
    }

    componentDidMount() {
        this._clanList.subscribe(this._clanListSubscribe);
        this._collectionList.subscribe(this._collectionListSubscribe);
    }

    componentWillUnmount() {
        this._clanList.unsubscribe(this._clanListSubscribe);
        this._collectionList.unsubscribe(this._collectionListSubscribe);
    }

    updateDefaultFields(newState) {


        switch (parseInt(newState.grade)) {
            case 0:
                const isTrigger = (newState.isCritical || newState.isDraw || newState.isFront || newState.isHeal || newState.isStand);
                newState = {
                    ...newState,
                    power: !this._powerChanged ? 5000 : newState.power,
                    shield: !this._shieldChanged ? this._getDefaultTriggerShield(newState) : newState.shield,
                    triggerPower: !this._triggerPowerChanged ? (isTrigger ? (this._currentEra === "V" ? 10000 : 5000) : 0) : newState.triggerPower,
                    isBoost: !this._isBoostChanged ? true : newState.isBoost,
                    isIntercept: !this._isInterceptChanged ? false : newState.isIntercept,
                    isTwinDrive: !this._isTwinDriveChanged ? false : newState.isTwinDrive,
                    isTripleDrive: !this._isTripleDriveChanged ? false : newState.isTripleDrive
                }
                break;
            case 1:
                newState = {
                    ...newState,
                    power: !this._powerChanged ? 8000 : newState.power,
                    shield: !this._shieldChanged ? 10000 : newState.shield,
                    isBoost: !this._isBoostChanged ? true : newState.isBoost,
                    isIntercept: !this._isInterceptChanged ? false : newState.isIntercept,
                    isTwinDrive: !this._isTwinDriveChanged ? false : newState.isTwinDrive,
                    isTripleDrive: !this._isTripleDriveChanged ? false : newState.isTripleDrive,
                    triggerPower: !this._triggerPowerChanged ? 0 : newState.triggerPower,
                }
                break;
            case 2:
                newState = {
                    ...newState,
                    power: !this._powerChanged ? (this._currentGift === "F" ? 10000 : 9000) : newState.power,
                    shield: !this._shieldChanged ? 5000 : newState.shield,
                    isBoost: !this._isBoostChanged ? false : newState.isBoost,
                    isIntercept: !this._isInterceptChanged ? true : newState.isIntercept,
                    isTwinDrive: !this._isTwinDriveChanged ? false : newState.isTwinDrive,
                    isTripleDrive: !this._isTripleDriveChanged ? false : newState.isTripleDrive,
                    triggerPower: !this._triggerPowerChanged ? 0 : newState.triggerPower,
                }
                break;
            case 3:
                newState = {
                    ...newState,
                    power: !this._powerChanged ? (this._currentGift === "F" ? 13000 : 12000) : newState.power,
                    shield: !this._shieldChanged ? 0 : newState.shield,
                    isBoost: !this._isBoostChanged ? false : newState.isBoost,
                    isIntercept: !this._isInterceptChanged ? false : newState.isIntercept,
                    isTwinDrive: !this._isTwinDriveChanged ? true : newState.isTwinDrive,
                    isTripleDrive: !this._isTripleDriveChanged ? false : newState.isTripleDrive,
                    triggerPower: !this._triggerPowerChanged ? 0 : newState.triggerPower,
                }
                break;
            case 4:
                if (this._currentEra === "V") {
                    newState = {
                        ...newState,
                        power: !this._powerChanged ? 15000 : newState.power,
                        shield: !this._shieldChanged ? 0 : newState.shield,
                        isBoost: !this._isBoostChanged ? false : newState.isBoost,
                        isIntercept: !this._isInterceptChanged ? false : newState.isIntercept,
                        isTwinDrive: !this._isTwinDriveChanged ? true : newState.isTwinDrive,
                        isTripleDrive: !this._isTripleDriveChanged ? false : newState.isTripleDrive,
                        triggerPower: !this._triggerPowerChanged ? 0 : newState.triggerPower,
                    }
                } else {
                    newState = {
                        ...newState,
                        power: !this._powerChanged ? 15000 : newState.power,
                        shield: !this._shieldChanged ? 0 : newState.shield,
                        isBoost: !this._isBoostChanged ? false : newState.isBoost,
                        isIntercept: !this._isInterceptChanged ? false : newState.isIntercept,
                        isTwinDrive: !this._isTwinDriveChanged ? false : newState.isTwinDrive,
                        isTripleDrive: !this._isTripleDriveChanged ? true : newState.isTripleDrive,
                        triggerPower: !this._triggerPowerChanged ? 0 : newState.triggerPower,
                    }
                }
                break
            case 5:
                newState = {
                    ...newState,
                    power: !this._powerChanged ? 70000 : newState.power,
                    shield: !this._shieldChanged ? 0 : newState.shield,
                    isBoost: !this._isBoostChanged ? false : newState.isBoost,
                    isIntercept: !this._isInterceptChanged ? false : newState.isIntercept,
                    isTwinDrive: !this._isTwinDriveChanged ? false : newState.isTwinDrive,
                    isTripleDrive: !this._isTripleDriveChanged ? false : newState.isTripleDrive,
                    triggerPower: !this._triggerPowerChanged ? 0 : newState.triggerPower,
                }
                break;
            default:
                console.log("default");
                newState = {
                    ...newState,
                    isBoost: !this._isBoostChanged ? false : newState.isBoost,
                    isIntercept: !this._isInterceptChanged ? false : newState.isIntercept,
                    isTwinDrive: !this._isTwinDriveChanged ? false : newState.isTwinDrive,
                    isTripleDrive: !this._isTripleDriveChanged ? false : newState.isTripleDrive
                }
                break;
        }

        if (!this._urlImageChanged) {
            if ((newState.collection !== "") && (newState.seq !== "")) {

                const cod = this.state.collectionList[newState.collection].cod;
                let seq = newState.seq;

                if (seq.length === 1) {
                    seq = "00" + seq;
                } else {
                    if (seq.length === 2) {
                        seq = "0" + seq;
                    }
                }

                newState.imgUrl = "https://s3-ap-northeast-1.amazonaws.com/cf-vanguard.com/wordpress/wp-content/images/cardlist/" +
                    cod + "/" + cod.replace("-", "").toLowerCase() + "_" + seq + ".png";
            }
        }

        this.setState(newState);
    }

    _getDefaultTriggerShield(state) {
        if (state.isCritical && state.isSentinel) {
            return 30000;
        }

        if (state.isCritical) {
            return 15000;
        }

        if (state.isDraw && state.isSentinel) {
            return 0;
        }

        if (state.isDraw) {
            return 5000;
        }

        if (state.isFront) {
            return 15000;
        }

        if (state.isHeal) {
            return 20000;
        }

        if (state.isStand) {
            return 10000;
        }

        return 10000;
    }

    sendCard() {
        this.card = new Card();
        console.log(this.state);
    }
}

export default FormCards;