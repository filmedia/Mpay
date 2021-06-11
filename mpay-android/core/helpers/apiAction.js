

export const post=(path,data)=>{
  const fetchUrl=`https://38595b706555.ngrok.io/api/${path}`;
 
  
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

export const get=(path)=>{
  const fetchUrl=`https://38595b706555.ngrok.io/api/${path}`;
  return  fetch(fetchUrl,{
        cors:'no-cors',
        method:"GET",
        headers:{
          "Accept":'application/json',
          "Content-Type":'application/json'
        }
      })
      .then(response=>response.json())
     
}


export const update=(path,data)=>{
  const fetchUrl=`https://38595b706555.ngrok.io/api/${path}`;
    return  fetch(fetchUrl,{
          cors:'no-cors',
          method:"PUT",
          headers:{
            "Accept":'application/json',
            "Content-Type":'application/json'
          },
          body:JSON.stringify(data)
        })
        .then(response=>response.json())
  }

  export const remove=(path)=>{
    const fetchUrl=`https://38595b706555.ngrok.io/api/${path}`;
    return  fetch(fetchUrl,{
          cors:'no-cors',
          method:"DELETE",
          headers:{
            "Accept":'application/json',
            "Content-Type":'application/json'
          }
        })
        .then(response=>response.json())
       
  }