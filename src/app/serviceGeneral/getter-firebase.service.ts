import {Injectable, Input} from '@angular/core';
import {
  Actividad,
  Carrusel,
  Categoria,
  DiscoverGC,
  Evento,
  Persona,
  SobreNosotrosGeneral,
  Usuario,
  Empresa
} from "../objetos";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {initializeApp} from "firebase/app";
import {environment} from "../../environments/environment";
import {collection, getDocs, getFirestore, query, where} from "@angular/fire/firestore";



@Injectable({
  providedIn: 'root'
})
export class GetterFirebaseService {
  @Input() categoria!: Categoria;
  @Input() quienesSomos!: Persona;
  @Input() discoverGC!: DiscoverGC;
  @Input() sobreNosotros!: SobreNosotrosGeneral;
  @Input() carrusel!: Carrusel;
  @Input() usuario!: Usuario;
  @Input() actividad!: Actividad;
  app = initializeApp(environment);
  db = getFirestore(this.app);


  constructor(private firestore: AngularFirestore) {
  }

  getCategorias(): Observable<Categoria[]> {
    return this.firestore.collection<Categoria>('categorias').valueChanges();
  }

  getActividades() {
    return this.firestore.collection<Actividad>('actividades').valueChanges();
  }

  getEventos(){
    return this.firestore.collection<Evento>('eventos').valueChanges();
  }

  getQuienesSomos() {
    return this.firestore.collection<Persona>('sobreNosotrosPersonas').valueChanges();
  }

  getMunicipios() {
    return this.firestore.collection<DiscoverGC>('municipios').valueChanges();
  }

  getImagesCarrusel() {
    return this.firestore.collection<Carrusel>('imagenesCarrusel').valueChanges();
  }

  getAboutUs() {
    return this.firestore.collection<SobreNosotrosGeneral>('sobreNosotros').valueChanges();
  }

  async getCategoriaActividades(nombreCategoria: string) {
    const categorias = collection(this.db, "categorias");
    const q = query(categorias, where("titulo", "==", nombreCategoria));
    const querySnapshot = await getDocs(q);

    var activities: string[] = [];

    querySnapshot.forEach((doc) => {
      const actividades = doc.get("actividades");

      for (let acti in actividades){
        activities.push(acti);
      }
    });

    const todasActividades = collection(this.db, "actividades");
    const q2 = query(todasActividades);
    const querySnapshot2 = await getDocs(q2);

    var solucion: Actividad[] = [];

    querySnapshot2.forEach((doc) => {
      for (let i=0; i<activities.length; i++){
        if(activities[i] == doc.id){
          solucion.push((<Actividad>doc.data()));
        }
      }

    });
    return solucion;
  }

  async getActividadesEmpresas(nombreActividad: string) {

    const actividades = collection(this.db, "actividades");
    const q = query(actividades, where("name", "==", nombreActividad));
    const querySnapshot = await getDocs(q);

    var companies: string[] = [];

    querySnapshot.forEach((doc) => {
      const empresas = doc.get("empresas");
      for (let empre in empresas){
        companies.push(empre);
      }
    });
    const todasEmpresas = collection(this.db, "empresas");
    const q2 = query(todasEmpresas);
    const querySnapshot2 = await getDocs(q2);

    var solucion: Empresa[] = [];

    querySnapshot2.forEach((doc) => {
      for (let i=0; i<companies.length; i++){
        if(companies[i] == doc.id){
          solucion.push((<Empresa>doc.data()));
        }
      }

    });
    return solucion;
  }
}




