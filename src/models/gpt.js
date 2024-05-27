import OpenAIApi from 'openai';
import configJson from "../../config.json" assert { type: "json" };

export class GPT {
    constructor(model_name, url) {
        this.model_name = model_name;

        let config = {};
        if (url)
            config.baseURL = url;
        if (configJson.OPENAI_ORG_ID)
            config.organization = configJson.OPENAI_ORG_ID;
        if (configJson.OPENAI_API_KEY)
            config.apiKey = configJson.OPENAI_API_KEY;
        else
            throw new Error('OpenAI API key missing! Make sure you set your OPENAI_API_KEY in your config.json.');

        this.openai = new OpenAIApi(config);
    }

    async sendRequest(turns, systemMessage, stop_seq='***') {

        let messages = [{'role': 'system', 'content': systemMessage}].concat(turns);

        let res = null;
        try {
            console.log('Awaiting openai api response...')
            console.log('Messages:', messages);
            let completion = await this.openai.chat.completions.create({
                model: this.model_name || "gpt-3.5-turbo",
                messages: messages,
                stop: stop_seq,
            });
            if (completion.choices[0].finish_reason == 'length')
                throw new Error('Context length exceeded'); 
            console.log('Received.')
            res = completion.choices[0].message.content;
        }
        catch (err) {
            if ((err.message == 'Context length exceeded' || err.code == 'context_length_exceeded') && turns.length > 1) {
                console.log('Context length exceeded, trying again with shorter context.');
                return await sendRequest(turns.slice(1), systemMessage, stop_seq);
            } else {
                console.log(err);
                res = 'My brain disconnected, try again.';
            }
        }
        return res;
    }

    async embed(text) {
        const embedding = await this.openai.embeddings.create({
            model: this.model_name || "text-embedding-ada-002",
            input: text,
            encoding_format: "float",
        });
        return embedding.data[0].embedding;
    }
}



