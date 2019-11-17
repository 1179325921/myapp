import React, {Component} from 'react'
import CommentAdd from "../comment-add/comment-add";
import CommentList from "../comment-list/comment-list";


export default class App extends Component {

    //给组件对象指定state属性(会覆盖)
    state = {
        comments: [
            {username: 'Tom', content: '挺好'},
            {username: 'Jack', content: '太难了'},
        ]
    }

    //添加评论
    addComment = (comment) => {
        //取出comment
        const {comments} = this.state
        comments.unshift(comment)
        //更新数组
        this.setState({comments})
    }

    //删除指定评论
    deleteComment = (index) => {
        //取出comment
        const {comments} = this.state
        //删除
        comments.splice(index, 1)

        //更新数组
        this.setState({comments})
    }

    render() {
        const {comments} = this.state
        return (
            <div>
                <header className="site-header jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1>请发表对React的评论</h1>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <CommentAdd addComment={this.addComment}/>
                    <CommentList comments={comments}　deleteComment={this.deleteComment}/>
                </div>
            </div>
        )
    }
}
