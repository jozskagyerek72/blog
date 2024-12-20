import express from "express"
import cors from "cors"
import { removeFromCloud } from "./cloudinaryConfig.js"

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`app listening on port ${PORT}`))

app.delete("/post/:id", async (req,res)=>{
    try {
        const {id} = req.params
        removeFromCloud(id)
        res.json({msg:"sikeres törlés"})
    } catch (error) {
        console.log(error);
    }
})