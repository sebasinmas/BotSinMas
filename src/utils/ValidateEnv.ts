import { Console } from "console"

export const validateEnvs = () => {
    if(!process.env.BOT_TOKEN){
        console.warn("Bot token is not set");
        return false;
    }
    if(!process.env.MONGO_URI){
        console.warn("Mongo URI is not set");
        return false;
    }
    return true;
}