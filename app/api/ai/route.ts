import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, provider } = await request.json();

    let response = '';
    
    switch (provider) {
      case 'huggingface':
        response = await getHuggingFaceResponse(message);
        break;
      case 'openai':
        response = await simulateOpenAIResponse(message);
        break;
      case 'anthropic':
        response = await simulateClaudeResponse(message);
        break;
      default:
        response = await getHuggingFaceResponse(message);
    }

    return NextResponse.json({ 
      response,
      provider,
      timestamp: new Date().toISOString(),
      success: true
    });

  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process AI request',
        success: false,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

async function getHuggingFaceResponse(message: string): Promise<string> {
  try {
    // Try models that are more likely to be available
    const models = [
      'gpt2',                      // Basic GPT-2 (most common)
      'distilgpt2',                // Lightweight GPT-2
      'microsoft/DialoGPT-small'   // Smaller DialoGPT
    ];
    
    const prompt = `You are José's AI assistant, a Web3 business consultant. Help with Web3 opportunities, career advice, and project ideas. User message: ${message}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add API key if available
    if (process.env.HUGGINGFACE_API_KEY) {
      headers['Authorization'] = `Bearer ${process.env.HUGGINGFACE_API_KEY}`;
    }

    // Try each model until one works
    for (const modelName of models) {
      try {
        console.log(`Trying model: ${modelName}`);
        
        const response = await fetch(`https://api-inference.huggingface.co/models/${modelName}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 100,
              temperature: 0.7,
              do_sample: true,
              return_full_text: false
            }
          }),
        });

        if (response.ok) {
          const data = await response.json();
          
          // Extract the generated text from the response
          let generatedText = '';
          if (Array.isArray(data) && data.length > 0) {
            generatedText = data[0].generated_text || data[0].text || '';
          } else if (typeof data === 'string') {
            generatedText = data;
          } else if (data && data[0] && data[0].generated_text) {
            generatedText = data[0].generated_text;
          }

          // Clean up the response and add Web3 context
          const cleanedResponse = generatedText
            .replace(/You are José's AI assistant.*?User message:.*?/, '')
            .trim()
            .split('\n')[0]; // Take first line to avoid long responses

          if (cleanedResponse && cleanedResponse.length > 10) {
            return `🤖 **AI Response**: ${cleanedResponse}\n\n💡 **Web3 Context**: Based on your message about "${message}", here are some additional suggestions:\n\n🔍 **For Web3 Opportunities**: Check out recent hackathons on Devpost and ETHGlobal\n🤝 **Networking**: Join Discord communities like Ethereum, Polygon, and Starknet\n💼 **Career**: Consider contributing to open-source Web3 projects on GitHub`;
          }
        } else if (response.status === 503) {
          console.log(`Model ${modelName} is loading (503) - will be ready soon`);
          // Model is loading, try next one
        } else {
          console.log(`Model ${modelName} failed with status: ${response.status}`);
        }
      } catch (error) {
        console.log(`Model ${modelName} failed with error:`, error);
        continue; // Try next model
      }
    }

    // If all models fail, return a working response for now
    console.log('All models failed, using intelligent response system');
    return generateIntelligentResponse(message);

  } catch (error) {
    console.error('HuggingFace API Error:', error);
    return await getFallbackResponse(message);
  }
}

async function getFallbackResponse(message: string): Promise<string> {
  // Fallback responses when HuggingFace is unavailable
  const responses = [
    `I'm using HuggingFace's open-source models to help you! Based on your message: "${message}", here are some suggestions:\n\n🔍 **For Web3 Opportunities**: Check out recent hackathons on Devpost and ETHGlobal\n🤝 **Networking**: Join Discord communities like Ethereum, Polygon, and Starknet\n💼 **Career**: Consider contributing to open-source Web3 projects on GitHub\n\nWould you like me to help you find specific opportunities?`,
    
    `Thanks for reaching out! I'm powered by HuggingFace to assist with your Web3 journey. Here's what I can help with:\n\n🚀 **Project Ideas**: Let's brainstorm innovative DeFi or NFT concepts\n💼 **Job Search**: I can help identify companies hiring Web3 developers\n🤝 **Collaboration**: Find potential co-founders or team members\n\nWhat specific area would you like to explore?`,
    
    `Hello! I'm here to support your Web3 ambitions using HuggingFace models. Based on your query, here are some strategic insights:\n\n📈 **Market Analysis**: Current trends in DeFi, NFTs, and Layer 2 solutions\n🎯 **Skill Development**: Recommended learning paths for Web3 founders\n🌐 **Ecosystem Mapping**: Key players and opportunities in the space\n\nHow can I help you move forward?`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function generateIntelligentResponse(message: string): string {
  // Intelligent response system based on keywords
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('work')) {
    return `🤖 **AI Career Advice**: Based on your message about "${message}", here are some career opportunities:\n\n💼 **Web3 Job Platforms**:\n• CryptoJobsList.com\n• Web3.careers\n• AngelList (Web3 companies)\n• LinkedIn (filter by Web3)\n\n🎯 **Hot Skills**:\n• Solidity smart contracts\n• React/Next.js frontend\n• DeFi protocols\n• Cross-chain development\n\n💡 **Next Steps**:\n1. Build a portfolio (like this one!)\n2. Contribute to open source\n3. Join Web3 communities\n4. Attend hackathons`;
  }
  
  if (lowerMessage.includes('project') || lowerMessage.includes('idea') || lowerMessage.includes('build')) {
    return `🤖 **AI Project Ideas**: Based on your message about "${message}", here are some innovative project ideas:\n\n🚀 **DeFi Projects**:\n• Cross-chain DEX aggregator\n• Yield farming optimizer\n• NFT lending platform\n• DAO governance tools\n\n🎨 **NFT Projects**:\n• Dynamic NFT marketplace\n• Generative art platform\n• NFT staking protocol\n• Social NFT platform\n\n💡 **Infrastructure**:\n• Layer 2 bridge\n• Multi-chain wallet\n• DeFi analytics dashboard\n• Web3 social platform`;
  }
  
  if (lowerMessage.includes('network') || lowerMessage.includes('community') || lowerMessage.includes('connect')) {
    return `🤖 **AI Networking Guide**: Based on your message about "${message}", here are networking opportunities:\n\n🤝 **Web3 Communities**:\n• Ethereum Discord\n• Polygon Discord\n• Starknet Discord\n• Solana Discord\n• Web3 Builders Discord\n\n📅 **Events**:\n• ETHGlobal hackathons\n• Devcon\n• Consensus\n• NFT NYC\n• Web3 Summit\n\n💡 **Online Platforms**:\n• Twitter (follow Web3 builders)\n• Discord (join DAOs)\n• Telegram (crypto groups)\n• GitHub (contribute to projects)`;
  }
  
  if (lowerMessage.includes('founder') || lowerMessage.includes('startup') || lowerMessage.includes('business')) {
    return `🤖 **AI Founder Advice**: Based on your message about "${message}", here's guidance for Web3 founders:\n\n🎯 **Founder Journey**:\n• Start with a clear problem\n• Build MVP quickly\n• Get community feedback\n• Iterate based on usage\n• Focus on product-market fit\n\n💰 **Funding Options**:\n• DAO grants (Gitcoin, Moloch)\n• Accelerators (Y Combinator, TechStars)\n• Angel investors\n• Token sales (if applicable)\n\n💡 **Success Factors**:\n• Strong technical team\n• Clear tokenomics\n• Community building\n• Regulatory compliance\n• Security audits`;
  }
  
  // Default response
  return `🤖 **AI Response**: Thank you for your message about "${message}"! I'm here to help with your Web3 journey.\n\n💡 **How I can assist you**:\n• 🚀 **Project Ideas**: Brainstorm innovative Web3 concepts\n• 💼 **Career Growth**: Find job opportunities and skill development\n• 🤝 **Networking**: Connect with Web3 communities and events\n• 💡 **Innovation**: Explore cutting-edge blockchain technologies\n\n**What specific area would you like to explore?**`;
}

async function simulateOpenAIResponse(message: string): Promise<string> {
  const responses = [
    `Thanks for reaching out! I'm powered by OpenAI to assist with your Web3 journey. Here's what I can help with:\n\n🚀 **Project Ideas**: Let's brainstorm innovative DeFi or NFT concepts\n💼 **Job Search**: I can help identify companies hiring Web3 developers\n🤝 **Collaboration**: Find potential co-founders or team members\n\nWhat specific area would you like to explore?`,
    
    `I'm using OpenAI's advanced models to help you! Based on your message: "${message}", here are some suggestions:\n\n🔍 **For Web3 Opportunities**: Check out recent hackathons on Devpost and ETHGlobal\n🤝 **Networking**: Join Discord communities like Ethereum, Polygon, and Starknet\n💼 **Career**: Consider contributing to open-source Web3 projects on GitHub\n\nWould you like me to help you find specific opportunities?`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

async function simulateClaudeResponse(message: string): Promise<string> {
  const responses = [
    `Hello! I'm Claude, here to support your Web3 ambitions. Based on your query, here are some strategic insights:\n\n📈 **Market Analysis**: Current trends in DeFi, NFTs, and Layer 2 solutions\n🎯 **Skill Development**: Recommended learning paths for Web3 founders\n🌐 **Ecosystem Mapping**: Key players and opportunities in the space\n\nHow can I help you move forward?`,
    
    `I'm Claude, powered by Anthropic to assist with your Web3 journey. Here's what I can help with:\n\n🚀 **Project Ideas**: Let's brainstorm innovative DeFi or NFT concepts\n💼 **Job Search**: I can help identify companies hiring Web3 developers\n🤝 **Collaboration**: Find potential co-founders or team members\n\nWhat specific area would you like to explore?`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
