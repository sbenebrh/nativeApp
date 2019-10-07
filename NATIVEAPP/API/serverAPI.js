


let ip = "192.168.43.173"
// var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
// console.log(findIP)

let server = 'http://' + ip + ':1337'


// getIpAddress = async () => {
//   try {
//     if (ip === '') {
//       publicIP()
//         .then(Mip => {
//           ip = Mip
//           return ip
//         })
//         .catch(error => {
//           console.log(error)
//           return '192.168.1.14'
//         })
//     } else {
//       return ip
//     }
//   }
//   catch (err) {
//     console.log(err)
//     return '192.168.1.14'
//   }
// }




const dbRegister = async (phone) => {

  return fetch(server + '/user/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phone: phone })
  })
    .then((response) => response.text())
    .catch((error) => console.log('error funtion dbRegister ' + error));
}


const dbLogin = async (phone) => {

  return fetch(server + '/user/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phone: phone })
  })
    .then((response) => response.json())
    .catch((error) => console.log('error funtion dbLogin' + error));

}


const dbVoicemail = async (token) => {

  return fetch(server + '/voicemail', {
    headers: {
      'Authorization': token
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('error funtion dbVoicemail ' + error)
      return 'error'
    })
}



const dbPushToken = async (pushToken, token) => {
  let server = 'http://' + ip + ':1337'


  return fetch(server + '/user/pushToken', {
    method: 'POST',
    headers: {
      'Authorization': token
    },
    body: JSON.stringify({ pushToken: pushToken })
  })
    .then((response) => response.json())
    .catch((error) => console.log('error funtion dbPostToken' + error));
}




const ServerAPI = async (path, method, body , token) => {
  try {
    return  fetch(server + path , {
      method: method,
      credentials: 'same-origin',
      headers: {
        'Authorization': token,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then((response) =>  response.json())
      .catch(err => console.log('path error ' + path + ' ' + err))
  }
  catch (err) {
    console.log('path error ' + path + ' ' + err)
    return ''
  }
}


export {
  ServerAPI,
  dbVoicemail
}



