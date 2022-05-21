require("dotenv").config();
const openAI = require("openai")

const configuration = new openAI.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openAI.OpenAIApi(configuration);

module.exports = async function generateCaption(post) {
    var message = `Write a creative ad in ${post.language}` 
    if(post.category){
        message += ` for a ${post.category} company`
    }
    if(post.companyName){
        if(post.category){
            message += ` called ${post.companyName}`
        } else {
            message += ` for a company called ${post.companyName}`
        }
        
    }
    if(post.audience){
        message += ` aimed at ${post.audience}`
    }
    if(post.location){
        message += `. The business is located at ${post.location}`
    }

    message += `. keywords ${post.keywords}.`

    if(post.question){
        message += '. It should contain a question.'
    }


    if(post.funny){
        message += '. The ad should be fun with a touch of irony.'
    }

    if(post.emoji){
        message += '. The ad must contain emojis.'
    }

    console.log(message)
    // return message;
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
        return completion;
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          return "Error. Pruebe nuevamente."
        } else {
          console.log(error.message);
          return "Error. Pruebe nuevamente."
        }
      }
}



