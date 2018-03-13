import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyCFzfe6JnWtMBbRtUzmE1Q9sq8gvQyBlc0';



class App extends Component {

  constructor(props){
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null 
    };

    this.videoSearch('surfboards');
}

videoSearch(trem){
  YTSearch({key: API_KEY, term: trem}, (videos) =>{
    this.setState({ 
        videos: videos,
        selectedVideo: videos[0] 
      });
    });
}

  render(){

    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);

    return(
      <div>
        <SearchBar onSearchTremChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
        videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('.root'))