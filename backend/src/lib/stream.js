import {StreamChat} from "stream-chat"
import "dotenv/config";

const apiKey = process.env.STEM_API_KEY
const apiSecret = process.env.STEM_API_SECRET

if(!apiKey || !apiSecret){
    console.log("Stream api key or secret is missing");
}
const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async(userData)=>{
    try{
        await streamClient.upsertUser(userData);
        return userData;
    }catch(error){
        console.log("Error upserting user:",error);
        
    }
}


export const generateStreamToken = (userId)=>{
    try{
        //ensure userId is a String
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    }catch(err){
        console.log("Error generating Stream token",err);
        
    }
};