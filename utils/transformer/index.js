import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();
const configuration = new Configuration({
    organization: "org-YGrtxJyj562CN8Dzx84pSwhg",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = function generateCaption(post) {
    var message = `Write a creative ad in ${post.language}` 
    if(post.category){
        message += ` for a ${post.category} company`
    }
    if(post.name){
        message += ` called ${post.name}`
    }
    if(post.audience){
        message += ` aimed at ${post.audience}`
    }
    if(post.location){
        message += `. The business is located at ${post.location}`
    }

    message += `. keywords ${post.Keywords}.`

    if(post.question){
        message += '. It should contain a question.'
    }


    if(post.funny){
        message += '. The ad should be fun with a touch of irony.'
    }

    if(post.emoji){
        message += '. The ad must contain emojis.'
    }

    return message;
    try {
        const completion = await openai.createCompletion("text-davinci-002", {
        prompt: message,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
        },
        {
            timeout: 10000
        });
        console.log(completion.data);
        return completion;
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
          return "Error. Pruebe nuevamente."
        }
      }
}



