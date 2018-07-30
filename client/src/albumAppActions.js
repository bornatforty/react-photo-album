import store from './store'
import axios from 'axios'

export function getAlbums(){
	axios.get('http://localhost:3001/albums?_embed=images').then(response => {
		console.log('getAlbums action: ' , response.data)
		store.dispatch({
			type: "GET_ALBUMS", //action being performed
			payload: response.data //data to be passed to reducers. entire albums array of objects
		})
	})
}
export function getImages(){
	axios.get('http://localhost:3001/images').then(response => {
		store.dispatch({
			type: "GET_IMAGES",
			payload: response.data
		}) //entire images array of objects
	})
}
export function getCurrentAlbum(albumid){
	axios.get('http://localhost:3001/albums/' + albumid + '?_embed=images').then(response => {
		console.log('getCurrentAlbum action: ' , response.data)
		store.dispatch({
			type: "GET_CURRENT_ALBUM",
			payload: response.data
		})
		getAlbums() //data includes all albums and also current album only
	})
}
export function getCurrentImage(imageid){
	axios.get('http://localhost:3001/images/' + imageid).then(response => {
		store.dispatch({
			type: "GET_CURRENT_IMAGE",
			payload: response.data
		})		//axios pointing only to the data for the current image
	})
}