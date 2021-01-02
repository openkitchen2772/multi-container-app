import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: '',
        message: ''
    }

    componentDidMount () {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues () {
        const values = await axios.get("/api/values/current");
        this.setState({values: values.data});
    }

    async fetchIndexes () {
        const seenIndexes = await axios.get("/api/values/all");
        this.setState({seenIndexes: seenIndexes.data.rows});
    }

    renderSeenIndexes () {
        return this.state.seenIndexes.map(({number}) => number).join(", ");
    }

    renderValues  () {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            );
        }

        return entries;
    }

    onIndexChangeHandler = (event) => {
        this.setState({index: event.target.value});
    }

    onIndexSubmitHandler = async (event) => {
        event.preventDefault();

        const res = await axios.post("/api/values", {
            index: this.state.index
        });

        console.log(res.data);
        
        if (!res.data.working) {
            this.setState({message: res.data.message});
        }
        else {
            this.setState({message: ''});
        }

        this.setState({index: ''});
        this.fetchValues();
        this.fetchIndexes();
    }

    render () {
        return (
            <div>
                <form onSubmit={this.onIndexSubmitHandler}>
                    <label>Enter your index:</label>
                    <input
                        style={{ margin: "0px 10px 0px 10px" }}
                        value={this.state.index}
                        onChange={this.onIndexChangeHandler}/>
                    <button className="App-submit-button">Submit</button>
                    <p>{this.state.message}</p>
                </form>

                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated Values:</h3>
                <div className="App-result">
                    {this.renderValues()}
                </div>
            </div>
        );
    }
}

export default Fib;