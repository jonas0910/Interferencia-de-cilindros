import './App.css'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const [Er, setEr] = useState([]);
  const [N, setN] = useState([]);
  const {handleSubmit,register} = useForm();
  let [count,setCount] = useState(0);
  


  const calcularER = (k,mediaER) => {
    let numeros=[];
    for (let i=0; i<500;i++){
    let lambda = 1/mediaER
    let numsPseudo = [];
    for (let i=0; i<k;i++){
      numsPseudo.push(Math.random());
    }

    
    let er = (-1/(k*lambda))*Math.log(numsPseudo.reduce((p,c)=>{
      return (1-p)*(1-c);
    }));
    numeros.push(er);
    }
    return numeros
  }

  const calcularN = (mediaN,desvEstandar) => {
    let numeros=[];
    let numsPseudo = [];
    for (let i=0; i<500;i++){
      numsPseudo = [];
      for (let i=0; i<12;i++){
        numsPseudo.push(Math.random());
      }

      let n = ((numsPseudo.reduce((p,c)=>
        c+p,0))-6)*desvEstandar+ parseFloat(mediaN);
      numeros.push(n);
    }
    return numeros
  }


  const onSubmitER = handleSubmit((data) => {
      setCount(0)
      const nums=calcularER(data.k,data.mediaER);
      setEr(nums);
    });

  const onSubmitN = handleSubmit((data) => {
    setCount(0)
      const nums=calcularN(data.mediaN,data.desvEstandar);
      setN(nums);

  });


  useEffect(() => {
    N.map((n,i) => {
      if (n>=Er[i]){
        setCount(c=>c+1);
      }
    })
  },[N,Er])

  return (
    <>
      <h1>Ejercicio 10</h1>
      <p>
      Un cilindro con diám etro x , será insertado en un agujero con diám etro xr Si x, sigue
una distribución normal con media de 1.5 cm y varianza de 0.0016, y x2, una distribución
2-Erlang y una media de 2.5 cm, sim ule en una hoja de cálculo la inserción de
500 cilindros y determ ine m ediante el estimador la probabilidad de que haya interferencia
(es decir, que cilindro pequeño no entre en el agujero).
      </p>    
      <div className='formularios'>
      <form onSubmit={onSubmitER}>
        <input type="number" step="any" placeholder="k" {...register("k")} />
        <input type="number" step="any" placeholder="media" {...register("mediaER")} />
        <input type="submit" value="Calcular ER(Diametros de agujeros)"/>
      </form>
      <form onSubmit={onSubmitN}>
        <input type="number" step="any" placeholder="media" {...register("mediaN")} />
        <input type="number" step="any" placeholder="desvEstandar" {...register("desvEstandar")} />
        <input type="submit" value="Calcular N(Diametros de cilindros)"/>
      </form>
      </div>
      <div className='porcentaje'>
        Probabilidad de interferencia: {
          count/500*100
        }%
      </div>
      <div className='tablaNumeros'>
      <div>
        <h3>Diametros de agujeros</h3>
        {Er.map((e,i) => <p key={i}>{e}</p>)}
      </div>
      <div>
        <h3>Diametros de cilindros</h3>
        {N.map((n,i) => <p key={i}>{n}</p>)}
      </div>
      <div>
        <h3>Cabe o no cabe el cilindro</h3>
        {N.map((n,i) => <p key={i} className={
          n>=Er[i] ? "noCabe" : "cabe"   
        }>{n>=Er[i] ? "No Cabe" : "Cabe"}</p>)}
      </div>
      </div>
    </>
  )
}

export default App
