import { useState, useRef, useEffect} from 'react'
import { Links , useFetcher} from '@remix-run/react'
import { crearDedicatoria  , obtenerDedicatorias} from '../utilities'
import Swal from 'sweetalert2'


function dedicatorias() {
    const fetcher = useFetcher()
    const formulario = useRef()
    const [anonimo,setAnonimo] = useState(true)
    const [img,setImg] = useState()
    const [respuesta,setRespuesta] = useState()
    const [dedicatorias,setDedicatorias] = useState()

    const [websocket, setWebsocket] = useState()

    useEffect(()=>{
        if (respuesta) {
            Swal.fire({
                imageUrl: 'https://media.giphy.com/media/ThrM4jEi2lBxd7X2yz/giphy.gif',
                imageHeight: 400,
                imageAlt: 'A tall image',
                footer:respuesta.detail ? "Es necesaria una imagen o un texto" : "Buuuu!"
              })
        }
    },[respuesta])

    useEffect(()=>{
        if (!dedicatorias) {
            obtenerDedicatorias(setDedicatorias)
        }
        if (websocket) {
            websocket.onmessage = (event) => {
                obtenerDedicatorias(setDedicatorias)
            }
        }else{
            setWebsocket(new WebSocket(`ws://192.168.1.183:4000/websocket`));
        }
    },[websocket])


    function handleUpload(logo) {
        const lector = new FileReader();
        lector.readAsDataURL(logo);
        lector.onload = () => {
          setImg(lector.result);
        };
      }

    async function sendForm() {
        const texto = document.getElementById('mensajeDedicatoria').value
        const autor = document.getElementById('autor')
        crearDedicatoria( autor ? autor.value : '', img, texto , setRespuesta)
    }

    function verDedicatoria(e) {
        Swal.fire({
            html:
            '<div className="text-center ">'+
                            `<h1 className="h6 mt-3 mb-3">${e.autor}</h1>`+
                            e.imagen && `<img src=${e.imagen} alt="" className="mt-3" />`+
                            '<p className="w-75 mx-auto mt-3 ">'+
                            e.texto+
                            '</p>'+
                            '</div>'

            
          })
        
    }
  return (
    <main className='dedicatorias-view'>
        <div className="row p-0 w-75 mx-auto  rowContainer">
            <div className="col-3 p-0">
                <fetcher.Form ref={formulario}  className='formOfrenda h-100 m-2 text-center'>
                    <h1 className='h3 mt-5 mb-4'>Dedicatoria</h1>
                    <div className="formOfrenda w-75 mx-auto mb-3"></div>
                    <p className=' mx-auto mb-4 w-75'>Este espacio esta pensado para que puedas dedicarle unas palabras a un ser especial que quieras compartir con todos los <strong>Co creadores</strong></p>
                    
                        {
                            img ?
                            <div>
                            <img src={img} width={90} height={90}  alt="" />
                            </div>:
                            <label htmlFor="inputImg" className='dropZone '> 
                            <span>Imagen</span>
                            <input onChange={(e)=>{handleUpload(e.target.files[0])}} type="file" id='inputImg' accept='.png*'  placeholder='hola' className=' inputEscondido' />
                            </label>
                        }
                    
                    
                    <textarea name="mensajeDedicatoria" id="mensajeDedicatoria" cols="20" rows="5" className='mt-2 dedicatrioaText w-75 d-block mx-auto' />
                    <label className='d-block mx-auto mt-3 mb-3' htmlFor="">
                        <input  onChange={()=>setAnonimo(!anonimo)} checked={anonimo} type="checkbox"  name="autor" className='' />
                        <span className='ms-2'>Anonimo</span>
                    </label>
                    {
                         !anonimo &&
                         <input type="text"  id="autor" className='w-75 mx-auto ps-2 pe-2' />
                    }
                    <div className="text-end w-75 mx-auto mt-3">
                        <button onClick={()=>{sendForm()}} className='ms-auto'>Crear</button>

                    </div>
                </fetcher.Form> 
            </div>
            <div className="col-9 p-0 rowContainerDed h-100">
                <div className="row mt-4 ">
                    { dedicatorias &&
                    dedicatorias.map(e => (
                    <div onClick={()=>verDedicatoria(e)} key={e.id} className="col-3 cartaDedicatoriaPadre h-100 mb-4">
                        <div className="cartaDedicatoria text-center">
                            <h1 className='h6 mt-3 mb-3'>{e.autor}</h1>
                            <div className='formOfrenda w-75 mx-auto'></div>
                            {e.imagen !== "/" &&
                                <img src={e.imagen} alt="" width={190} height={200} className='mt-3' />
                            }
                            <p className='w-75 mx-auto mt-3 '>
                                {e.texto}
                            </p>
                        </div>
                    </div>
                    )) 
                    }
                </div>
            </div>
        </div>
    </main>
  )
}

export default dedicatorias