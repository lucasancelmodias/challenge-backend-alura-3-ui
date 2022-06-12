
export async function sendFile(file : FormData) {
    const response = await fetch(`${process.env.API_URL}/fileupload`, {
        method: "Post",
        body: file,
    })
    
    const json = await response.json();
   
    if(response.ok) {
        return {data : json, error: false}
    }else{
        return {data : json, error: true}
    }

    
}