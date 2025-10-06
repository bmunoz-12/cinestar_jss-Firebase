import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

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


//MOSTRAR CINESSSSSSSSSSSSSSSSS
async function getCines() {
	const cines = await getDocs(collection(db, "cines"));	
	
	let html = `<br/><h1>Nuestros Cines</h1><br/>`

	cines.forEach(cine => {
		cine = cine.data();

		html += `				
				<div class="contenido-cine">
	        	    <img src="img/cine/${cine.id}.1.jpg" width="227" height="170"/>
            	   	<div class="datos-cine">
       				   	<h4>${cine.RazonSocial}</h4><br/>
                		<span>${cine.Direccion} - ${cine.Detalle}<br/><br/>Teléfono: ${cine.Telefonos}</span>
                	</div>
                	<br/>
                	<a href="cine.html?id=${cine.id}">
                		<img src="img/varios/ico-info2.png" width="150" height="40"/>
                	</a>
				</div>            
            `
	});
	document.getElementById('contenido-interno').innerHTML = html

}
getCines()
