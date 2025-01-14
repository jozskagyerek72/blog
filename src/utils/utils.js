export const middleStyle = {width: "300px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",}

export const extraUrlAndId = (cloudinaryUrl) =>
{
    const lastSlashIndex = cloudinaryUrl.lastIndexOf("/")
    const url = cloudinaryUrl.substring(0,lastSlashIndex)
    const id = cloudinaryUrl.substring(lastSlashIndex+1)
    return {url,id}
}

export const sanitizeUrl = (html) =>
{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
}

export const authStyle =
{
    width: "400px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "solid 2px black",
    borderRadius: "10px",
    padding:"50px",
    backgroundColor: "whitesmoke"

}

export const responsiveContainer =
{
    display: "flex",
    justifyContent: "center",
    alignItems: "center" 
}