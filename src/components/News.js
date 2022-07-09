import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }
    async componentDidMount() {
        let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=11797ac7ca6d4f98bf1ad5732df68351'
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles })

    }
    handlePrevClick=async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=11797ac7ca6d4f98bf1ad5732df68351&page=${this.state.page-1}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page:this.state.page-1, 
            articles: parsedData.articles 
        })
    }
    handleNextClick=async()=>{
    
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=11797ac7ca6d4f98bf1ad5732df68351&page=${this.state.page+1}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page:this.state.page+1,
            articles: parsedData.articles 
        })

    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsMonkey Top Headlines</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} url={element.url} />
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between container">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
                    <button disabled={(this.state.totalResults)/20<=this.state.page} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
                </div>
            </div>
        )
    }
}

export default News