import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Pubsub from 'pubsub-js'


export default class UserList extends Component {

    state = {
        initShow: true,
        loading: false,
        users: null,
        errMsg: '',
    }

    // static propTypes = {
    //     searchName: PropTypes.string.isRequired
    // }

    componentDidMount() {
        // 订阅消息
        Pubsub.subscribe('search', (msg, searchName) => {
            console.log(msg, searchName)
            //修改state
            this.setState({
                initShow: false,
                loading: true,
            })
            //发ajax请求
            const url = `https://api.github.com/search/users?q=${searchName}`
            axios.get(url)
                .then(response => {
                    const result = response.data
                    console.log(result)
                    const users = result.items.map(item => {
                        return {name: item.login, url: item.html_url, avatarUrl: item.avatar_url}
                    })
                    this.setState({loading: false, users})
                })
                .catch(error => {
                    this.setState({loading: false, error: error.message})
                })


        })
    }

    // //当组件接收到新的属性是回调
    // componentWillReceiveProps(nextProps) {
    //     const {searchName} = nextProps.searchName
    //     //修改state
    //     this.setState({
    //         initShow: false,
    //         loading: true,
    //     })
    //     //发ajax请求
    //     const url = `https://api.github.com/search/users?q=${searchName}`
    //     axios.get(url)
    //         .then(response => {
    //             const result = response.data
    //             console.log(result)
    //             const users = result.items.map(item => {
    //                 return {name: item.login, url: item.html_url, avatarUrl: item.avatar_url}
    //             })
    //             this.setState({loading: false, users})
    //         })
    //         .catch(error => {
    //             this.setState({loading: false, error: error.message})
    //         })
    // }

    render() {
        const {initShow, loading, users, errMsg} = this.state
        if (initShow) {
            return <h2>请输入关键字进行搜索</h2>
        } else if (loading) {
            return <h2>正在请求中</h2>
        } else if (errMsg) {
            return <h2>{errMsg}</h2>
        } else {
            return (
                <div className="row">
                    {
                        users.map((user, index) => (
                            <div className="card" key={index}>
                                <a href={user.url} target="_blank">
                                    <img src={user.avatarUrl}
                                         style={{width: 100}}/>
                                </a>
                                <p className="card-text">{user.name}</p>
                            </div>
                        ))
                    }
                </div>
            )
        }
    }
}