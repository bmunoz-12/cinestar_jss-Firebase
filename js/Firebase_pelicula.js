import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyB6kFYRJi50nGM-MAUpGk7RA01aBDZ6qyI",
	authDomain: "cinestar-bmunoz.firebaseapp.com",
	projectId: "cinestar-bmunoz",
	storageBucket: "cinestar-bmunoz.firebasestorage.app",
	messagingSenderId: "240796683847",
	appId: "1:240796683847:web:b28728a3459ef821706b62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



async function getPelicula () {

	const id = new URLSearchParams(window.location.search).get('id')
	console.log("ID OBTENIDO", id);
	if (!id) return

	const colleccion = query(collection(db, "peliculas"), where("id", "==", id));
  	const documentos = await getDocs(colleccion);

	const pelicula = documentos.docs[0].data();
	
	console.log("Película:", pelicula);


    document.getElementById('contenido-interno').innerHTML = `
                <br/><h1>Cartelera</h1><br/>
				<div class="contenido-pelicula">
					<div class="datos-pelicula">
						<h2>${pelicula.Titulo}</h2>
						<p>${pelicula.Sinopsos}</p>
						<br/>
						<div class="tabla">
							<div class="fila">
								<div class="celda-titulo">Título Original :</div>
								<div class="celda">${pelicula.Titulo}</div>
							</div>
							<div class="fila">
								<div class="celda-titulo">Estreno :</div>
								<div class="celda">${pelicula.FechaEstrenoss}</div>
							</div>
							<div class="fila">
								<div class="celda-titulo">Género :</div>
								<div class="celda">${pelicula.Geneross}</div>
							</div>
							<div class="fila">
								<div class="celda-titulo">Director :</div>
								<div class="celda">${pelicula.Director}</div>
							</div>
							<div class="fila">
								<div class="celda-titulo">Reparto :</div>
								<div class="celda">${pelicula.Reparto}</div>
							</div>
						</div>
					</div>
					<img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"><br/><br/>
				</div>
				<div class="pelicula-video">
					<embed src="https://www.youtube.com/v/${pelicula.Link}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
				</div>
    `

}
getPelicula()