import { ForeignAgentType } from "@prisma/client";
import axios from "axios";

interface createForeignAgentData {
    name: string;
    type: ForeignAgentType;
}


export async function createForeignAgent(data: createForeignAgentData) {
    try {

        const response = await axios.post<string[]>("http://localhost:5000/get_foreign_agent_variants", {
            ...data,
        });
        if (response.status === 200) {
            const variants = response.data;
            console.log(variants);
            return await prisma?.foreignAgent.create({
                data: {
                    ...data,
                    variants,
                }
            })
        }
        console.error(response.statusText);
        return null;
    } catch (error) {
        console.error((error as Error).message);
    }
}