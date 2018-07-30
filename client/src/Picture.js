import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import store from './store'
import {getCurrentImage} from './albumAppActions'
import './picture.css'

class Picture extends Component{
	state ={
		currentImage: {}
	}
	componentDidMount(){
		getCurrentImage(this.props.match.params.imageid)

		this.unsubscribe = store.subscribe(() =>{
			const state = store.getState()

			this.setState({
				currentImage: state.currentImage
			})
		})
	}

	componentWillUnmount(){
		this.unsubscribe() //cleanup resources
	}

	toggleExpand(){
			document.getElementById("displayedPicture").classList.toggle('shrinkImage')
	} //click to display full sized image. click again to shrink. cursor to display zoom in/out

	render(){
		return(
			<div id="pictureContainer">
				<h3 id="pictureTitle">{this.state.currentImage.name}</h3>
				<img id="displayedPicture" className="shrinkImage" src={this.state.currentImage.imageUrl} alt={this.state.currentImage.name} onClick={this.toggleExpand}/>
				<div className="pictureText">
					<Link to={'/album/' + this.props.match.params.albumid} >Return to Album</Link>
				</div>
			</div>
		)
	}
}

export default Picture