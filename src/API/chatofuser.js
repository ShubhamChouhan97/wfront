export const Chatofuser = async (senderatid,reciveratid) => {
    // console.log("reciverid at api",reciveratid);
    // console.log("senderid at api",senderatid);
    const response = await fetch('https://wback-mpbz.onrender.com/api/chat/ofuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Allows cookies to be sent and
        body: JSON.stringify({
            reciveratid:reciveratid,
            senderatid:senderatid
        })
        });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
   //7744 console.log("dsc",data);
    return data;
    }
