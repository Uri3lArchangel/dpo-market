export const initWSKraken = (data:any)=>{
    const socket = new WebSocket("wss://ws.kraken.com");
    socket.onopen=()=>{
         socket.send(JSON.stringify(data));
         return {Sock:socket,Opened:true}
    }
    return {Sock:socket,Opened:false}

}
export const initWSOKX=(data:any)=>{
    const socket = new WebSocket("wss://ws.okx.com:8443/ws/v5/public")
    socket.onopen=()=>{
        socket.send(JSON.stringify(data))
        return {Sock:socket,Opened:true}

    }
    return {Sock:socket,Opened:false}

}