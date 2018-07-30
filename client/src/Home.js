import React, {Component} from 'react'
import store from './store'
import Preview from './Preview'
import {getAlbums} from './albumAppActions'
import './Home.css'

class Home extends Component {
	state = {
		albums: []
	}

	componentDidMount(){
		getAlbums()

		this.unsubscribe = store.subscribe(() =>{
			const state = store.getState()

			this.setState({
				albums: state.albums
			})
		})
	}

	componentWillUnmount(){
		this.unsubscribe() //clean up resources and avoid 
	}

	render(){
		return(
			<div>
				<h2 id="albumPreviewTitle">Albums</h2>
				<div id="albumPreviews">
					{this.state.albums.map((album, i) => (
							<Preview path={'album/' + album.id} name={album.name} previewImage={album.images[0].imageUrl} key={'album-' + i} />
						) //cover image is always the first image in the images array.
					)}
				</div>
			</div>
		)
	}
}

export default Home