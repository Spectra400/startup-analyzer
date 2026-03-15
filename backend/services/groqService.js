const Groq = require('groq-sdk');

let groq = null;

function getGroqClient() {
  if (!groq) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === 'your_groq_api_key_here') {
      throw new Error('GROQ_API_KEY is not configured. Please set a valid API key in backend/.env');
    }
    groq = new Groq({ apiKey });
  }
  return groq;
}

async function analyzeStartup(idea, targetUsers, country) {
  try {
    const prompt = `You are an expert startup business analyst. Analyze the following startup idea and return ONLY a valid JSON object with no extra text, no markdown, no explanation. The JSON must have exactly these keys:
{
  "summary": "2-3 sentence overview of the startup idea",
  "marketDemand": "detailed market demand analysis with size estimates",
  "targetCustomers": "specific customer segments and personas",
  "competitorAnalysis": "top 3-5 competitors and differentiation points",
  "uniqueValueProposition": "clear UVP statement",
  "monetizationStrategy": "revenue models and pricing strategy",
  "risksAndChallenges": "top 5 risks with mitigation strategies",
  "mvpRoadmap": "3-phase MVP plan with timeline",
  "suggestedTechStack": "recommended technologies for building this startup",
  "successScore": <integer between 0 and 100>
}

Startup Idea: ${idea}
Target Users: ${targetUsers}
Country: ${country}`;

    const chatCompletion = await getGroqClient().chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 4096
    });

    const responseText = chatCompletion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error('No response received from Groq API');
    }

    // Extract JSON from the response — handle cases where the model wraps in markdown
    let jsonString = responseText.trim();

    // Remove markdown code fences if present
    if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    const analysis = JSON.parse(jsonString);

    // Validate required keys
    const requiredKeys = [
      'summary', 'marketDemand', 'targetCustomers', 'competitorAnalysis',
      'uniqueValueProposition', 'monetizationStrategy', 'risksAndChallenges',
      'mvpRoadmap', 'suggestedTechStack', 'successScore'
    ];

    for (const key of requiredKeys) {
      if (!(key in analysis)) {
        throw new Error(`Missing required key in analysis: ${key}`);
      }
    }

    // Ensure successScore is a number between 0 and 100
    analysis.successScore = Math.min(100, Math.max(0, parseInt(analysis.successScore, 10) || 50));

    return analysis;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse AI response as JSON. The model returned an invalid format.');
    }
    throw new Error(`Groq API Error: ${error.message}`);
  }
}

module.exports = { analyzeStartup };
