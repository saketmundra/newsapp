import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,url}= this.props;
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img className="card-img-top" src={!imageUrl ? "https://www.saintlad.com/wp-content/uploads/2021/07/An-Error-Occurred-While-Loading-a-Higher-Quality-Version-of-this-Photo-or-Video.png" : imageUrl} alt="Cant Load" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <a href={url} className="btn btn-sm btn-primary">Learn more..</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem