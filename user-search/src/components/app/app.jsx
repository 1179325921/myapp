import React, {Component} from 'react'
import UserList from "../user-list/userList";
import Search from "../user-search/userSearch";

export default class App extends Component {

    state = {
        searchName: '',
    }

    setSearchName = (searchName) => {
        this.setState({searchName})
    }

    render() {
        return (
            <div className="container">
                <Search setSearchName={this.setSearchName}/>
                <UserList searchName={this.state}/>
            </div>
        )
    }
}