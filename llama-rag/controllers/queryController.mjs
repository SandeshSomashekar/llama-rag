import * as llamaIndex from "llamaindex";
import { load } from "@std/dotenv";

let queryEngine;

export default async function queryController (req,res) {
    try{
        if(!queryEngine) {
        await init();
        }
        const {query} = req.body;
        const response = await queryEngine.query({query});
        res.send({result: true, content: response.message.content});
    } catch(e) {
        res.json({result: false, error: e});
    }
};

const init = async function() {
    if(queryEngine) {
        return;
    }
    await load({export: true});

    const docs = await new llamaIndex.SimpleDirectoryReader().loadData({directoryPath: '.data'});
    const index = await llamaIndex.VectorStoreIndex.fromDocuments(docs);
    
    //Creating query engine
    queryEngine = await index.asQueryEngine();
}
