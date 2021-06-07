

export const register=(data)=>{
    
        const fetchUrl=`https://e798dae2db7d.ngrok.io/api/${'account'}`;
       
        
        return  fetch(fetchUrl,{
              cors:'no-cors',
              method:"POST",
              headers:{
                "Accept":'application/json',
                "Content-Type":'application/json'
              },
              body:JSON.stringify(data)
            })
            .then(response=>response.json())
           
      
}

export const login=()=>{

}

export const logout=()=>{

}