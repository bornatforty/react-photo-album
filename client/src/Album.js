import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import store from './store'
import {getAlbums, getCurrentAlbum} from './albumAppActions'
import Preview from './Preview'
import './Album.css'

class Sidebar extends Component{
	render(){
		return(
			<div id="albumSidebar">
				<h3 id="sidebarTitle">My Albums</h3>
				{this.props.albums.map((album,i) =>( //map albums array. Display the album name in the nav and point to album id.
							<div className="sidebarLinks" key={'sidebar-' + i}><Link to={`/album/${album.id}`}>{album.name}</Link></div>
						)
					)}
				<h4><Link to="/">Home</Link></h4> 
			</div>
		)
	}
}

class Album extends Component{
	state ={
		albums: [],
		currentAlbum: {
			images: []
		} //imported from albumAppActions
	}

	componentDidMount(){
			getCurrentAlbum(this.props.match.params.albumid)


		this.unsubscribe = store.subscribe(() =>{
			const state = store.getState() //current state of the app. most recent values from the reducer

			this.setState({
				currentAlbum: state.currentAlbum,
				albums: state.albums
			})
		})
	}
	componentWillReceiveProps(newProps){
		if(this.props.match.params.albumid !== newProps.match.params.albumid) {
			getCurrentAlbum(newProps.match.params.albumid)
		}
	} //checks for updated props

	componentWillUnmount(){
		this.unsubscribe() //cleanup resources and halt continuous props calls
	}

	render(){

		return(
			<div id="albumPageContainer">
				<Sidebar albums={this.state.albums}/>
				<div id="albumMain">
					<h3 id="albumTitle">"{this.state.currentAlbum.name}"</h3>
					<div id="imagePreviews">
						{console.log('this.state: ' , this.state)}
						{this.state.currentAlbum.images.map((image, i) => ( //map the current album only and display preview images
								<Preview path={image.albumId + '/' + image.id} name={image.name} previewImage={image.imageUrl} key={'image-' + i} />
							)
						)}
					</div>
				</div>
			</div>
		)
	}
}

export default Album