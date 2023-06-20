import axios from 'axios';

export const GET_DATA = async (Url, handleData, params = false, token = false) =>{
  await axios.get(Url, {
    params: {...params},
    headers:{
      'Content-Type':'application/json',
      Authorization:`Bearer ${token}`
    },
  }).then(res => {
    let obj = {
      data: res.data,
      status: res.status
    };
    handleData(obj);
  }).catch(e => {
    handleData(e.response)
  }) 
}
export const POST_JSON = async (Url, Data, handleData, token = false, params = false)=>{
  await axios.post(Url, Data, {
    params:{...params},
    headers:{
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    let obj = {
      data: res.data,
      status: res.status
    };
    handleData(obj)
  }).catch(e =>{
    handleData(e.response)
  })
}

export const POST_FORM = async (Url, Data, handleData, token = false, params = false) =>{
  await axios.post(Url, Data, {
    params: {...params},
    headers:{
      'Content-Type':'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  }).then( res =>{
    let obj = {
      data: res.data,
      status: res.status
    };
    handleData(obj); 
  }).catch(e =>{
    handleData(e.response)
  })
}



