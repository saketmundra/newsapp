import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            category: "general"

        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.state.category}&apiKey=fe559ce1b1554add83a0d249a051fd66`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles })

    }
    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fe559ce1b1554add83a0d249a051fd66&page=${this.state.page - 1}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }
    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fe559ce1b1554add83a0d249a051fd66&page=${this.state.page + 1}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
        })

    }
    changecategory = async (e) => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${e}&apiKey=fe559ce1b1554add83a0d249a051fd66`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page,
            articles: parsedData.articles,
            category: e
        })
        console.log(this.state.category);

    }
    

    render() {
        return (
            <div className="container">
                <div className="text-center d-flex justify-content-between " style={{ fontSize: "45px" }}>Top Headlines{this.state.category==="general"?"":"-"+(this.state.category).charAt(0).toUpperCase()+(this.state.category).slice(1)}
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.category==="general"?"Category":(this.state.category).charAt(0).toUpperCase()+(this.state.category).slice(1)}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" onClick={() => this.changecategory("technology")} href="#">Technology</button>
                            <button className="dropdown-item" onClick={() => this.changecategory("business")} >Business</button>
                            <button className="dropdown-item" onClick={() => this.changecategory("entertainment")} href="#">Entertainment</button>
                            <button className="dropdown-item" onClick={() => this.changecategory("science")} href="#">Science</button>
                            <button className="dropdown-item" onClick={() => this.changecategory("health")} href="#">Health</button>
                            <button className="dropdown-item" onClick={() => this.changecategory("sports")} href="#">Sports</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} url={element.url} />
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between container">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
                    <button disabled={(this.state.totalResults) / 20 <= this.state.page} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
                </div>
            </div>
        )
    }
}

export default News