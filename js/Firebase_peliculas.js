import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, getDocs, where, query} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

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


async function getPeliculas() {
											//Ibtener id cartelera
    const id = new URLSearchParams(window.location.search).get('id')
    console.log("ID Obtenido: ", id); //<-- mostrar en consla

    if(!id) return

	let estado = "";
	if (id === "cartelera") estado = "1";
	else if (id === "estrenos") estado = "2";

	const coleccion = query(collection(db, "peliculas"), where("idEstado", "==", estado));
	const documentos = await getDocs(coleccion);

        let html = `<br/><h1>Cartelera</h1><br/>`

        documentos.forEach((doc) => {
			const pelicula = doc.data();

			console.log(pelicula)

            html += `            
				<div class="contenido-pelicula">
					<div class="datos-pelicula">
						<h2>${pelicula.Titulo}</h2><br/>
						<p>${pelicula.Sinopsis}</p>
						<br/>
                       	<div class="boton-pelicula"> 
                       		<a href="pelicula.html?id=${pelicula.id}" >
                       			<img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                       		</a>
               			</div>
               			<div class="boton-pelicula"> 
               				<a href="https://www.youtube.com/v/${pelicula.link}" target=_blank  onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
               					<img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
               				</a>
                        </div> 
					</div>	
					<img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"/><br/><br/>
				</div>
            `
        });
		
        document.getElementById('contenido-interno').innerHTML = html
    }

getPeliculas()


