// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
// 	// apiKey: process.env.OPENAI_API_KEY,
// 	apiKey: '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',
// 	organization: "org-4LOysOMzz5TtvgJn2oBEE9DS",
// });

// const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
I want you to act as a personal trainer. I will provide you with all the information needed about an individual looking to become fitter, stronger and healthier through physical training, and your role is to devise the best workout and meal plans for that person depending on their current fitness level, goals and lifestyle habits.  I will provide you with the individual's height, weight, age, activity level, availability, access to equipment, diet restrictions, disliked foods, and goals. With this information, you should create an optimized meal plan and workout plan based on your knowledge as a personal trainer. For the meal plan, calculate the individual's necessary calories per day to achieve their goal, using the information given, and ensure the meal plan matches those calories, as well as macros (protein, fat, and carbs). Provide the exact measurements of each ingredient in each meal and show the calories + macronutrients in each meal.
Make sure the individual gets 30 grams of fiber everyday with their meal plan. Provide a different meal plan for all 7 days of the week that includes the total calorie, fiber, and macronutrient counts for each meal AND a workout plan.

Provide the output in the following format:
Monday Meal Plan:
Wednesday Meal Plan:
Thursday Meal Plan:
Friday Meal Plan:
Saturday Meal Plan:
Sunday Meal Plan:

Monday Workout:
Tuesday Workout:
Wednesday Workout:
Thursday Workout:
Friday Workout:
Saturday Workout:
Sunday Workout:


Here's the individual's info:

`;

// const generateAction = async (req, res) => {
// 	console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

// 	// const baseCompletion = await openai.createCompletion({
// 	// 	model: "text-davinci-003",
// 	// 	prompt: `${basePromptPrefix}${req.body.userInput}\n`,
// 	// 	temperature: 0,
// 	// 	max_tokens: 1000,
// 	// });

// 	const completion = await openai.createChatCompletion({
// 		model: "gpt-3.5-turbo",
// 		messages: [{role: "user", content: `Hello!`}],
// 	});
// 	console.log(completion.data.choices[0].message);

// 	const basePromptOutput = completion.data.choices.pop();

// 	res.status(200).json({ output: basePromptOutput });
// };

// export default generateAction;

import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
    apiKey: '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',
    organization: 'org-4LOysOMzz5TtvgJn2oBEE9DS',
});
const openai = new OpenAIApi(configuration);
const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `${basePromptPrefix}${req.body.userInput}` }],
        max_tokens: 2000
    });
    console.log(completion.data.choices[0].message);
    const basePromptOutput = completion.data.choices.pop();
    res.status(200).json({ output: basePromptOutput });
};
export default generateAction;