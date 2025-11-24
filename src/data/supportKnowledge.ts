import { siteDetails } from "./siteDetails";
import { faqs } from "./faq";
import { tiers } from "./pricing";
import { benefits } from "./benefits";

export interface SupportAnswer {
  answer: string;
  confidence: number;
}

export const getSupportAnswer = (question: string): SupportAnswer => {
  const lowerQuestion = question.toLowerCase().trim();
  
  // Pricing questions
  if (lowerQuestion.includes("price") || lowerQuestion.includes("cost") || lowerQuestion.includes("pricing") || lowerQuestion.includes("plan")) {
    const starterPrice = tiers[0].price;
    const proPrice = tiers[1].price;
    return {
      answer: `We offer three pricing tiers:\n\n• Starter: $${starterPrice}/month - Basic features with email support\n• Pro: $${proPrice}/month - Advanced features with priority support\n• Enterprise: Custom pricing - Full features with dedicated support\n\nYou can find all details in our Pricing section. Need help choosing? Feel free to ask!`,
      confidence: 0.9
    };
  }

  // Security questions
  if (lowerQuestion.includes("secure") || lowerQuestion.includes("security") || lowerQuestion.includes("safe") || lowerQuestion.includes("encryption") || lowerQuestion.includes("protect")) {
    const securityFaq = faqs.find(f => f.question.toLowerCase().includes("secure"));
    if (securityFaq) {
      return {
        answer: securityFaq.answer,
        confidence: 0.95
      };
    }
    return {
      answer: `${siteDetails.siteName} uses bank-level encryption and military-grade security measures. We never store your login information, and biometric authentication adds an extra layer of protection. Your financial data is always safe with us.`,
      confidence: 0.85
    };
  }

  // Device/multi-device questions
  if (lowerQuestion.includes("device") || lowerQuestion.includes("phone") || lowerQuestion.includes("tablet") || lowerQuestion.includes("computer") || lowerQuestion.includes("multiple")) {
    const deviceFaq = faqs.find(f => f.question.toLowerCase().includes("device"));
    if (deviceFaq) {
      return {
        answer: deviceFaq.answer,
        confidence: 0.95
      };
    }
    return {
      answer: `Yes! ${siteDetails.siteName} works seamlessly across all your devices - smartphone, tablet, and computer. Your account syncs automatically so you can access your finances anywhere.`,
      confidence: 0.85
    };
  }

  // Bank account questions
  if (lowerQuestion.includes("bank") || lowerQuestion.includes("account") || lowerQuestion.includes("connect") || lowerQuestion.includes("link")) {
    const bankFaq = faqs.find(f => f.question.toLowerCase().includes("bank"));
    if (bankFaq) {
      return {
        answer: bankFaq.answer,
        confidence: 0.95
      };
    }
    return {
      answer: `Yes! ${siteDetails.siteName} supports connections with over 10,000 financial institutions worldwide. You can securely link all your accounts through our secure portal.`,
      confidence: 0.85
    };
  }

  // Investing questions
  if (lowerQuestion.includes("invest") || lowerQuestion.includes("investment") || lowerQuestion.includes("portfolio") || lowerQuestion.includes("expertise") || lowerQuestion.includes("financial knowledge")) {
    const investFaq = faqs.find(f => f.question.toLowerCase().includes("invest"));
    if (investFaq) {
      return {
        answer: investFaq.answer,
        confidence: 0.95
      };
    }
    const investBenefit = benefits.find(b => b.title.toLowerCase().includes("invest"));
    if (investBenefit) {
      return {
        answer: `${investBenefit.description} ${investBenefit.bullets.map(b => b.title).join(", ")}. No financial degree required!`,
        confidence: 0.85
      };
    }
  }

  // Budgeting questions
  if (lowerQuestion.includes("budget") || lowerQuestion.includes("spending") || lowerQuestion.includes("expense") || lowerQuestion.includes("track")) {
    const budgetBenefit = benefits.find(b => b.title.toLowerCase().includes("budget"));
    if (budgetBenefit) {
      return {
        answer: `${budgetBenefit.description} Features include: ${budgetBenefit.bullets.map(b => b.title).join(", ")}.`,
        confidence: 0.9
      };
    }
  }

  // Features questions
  if (lowerQuestion.includes("feature") || lowerQuestion.includes("what can") || lowerQuestion.includes("what does") || lowerQuestion.includes("capabilities")) {
    const featureList = benefits.map(b => b.title).join(", ");
    return {
      answer: `${siteDetails.siteName} offers powerful features including: ${featureList}. We help you budget smartly, invest seamlessly, and keep your data secure with bank-grade protection.`,
      confidence: 0.85
    };
  }

  // Support/help questions
  if (lowerQuestion.includes("help") || lowerQuestion.includes("support") || lowerQuestion.includes("contact") || lowerQuestion.includes("assistance")) {
    const supportFaq = faqs.find(f => f.question.toLowerCase().includes("help"));
    if (supportFaq) {
      return {
        answer: supportFaq.answer,
        confidence: 0.95
      };
    }
    return {
      answer: `Our support team is available 24/7 via chat or email at help@finwise.com. We also offer extensive in-app tutorials and a comprehensive knowledge base. How can I help you today?`,
      confidence: 0.9
    };
  }

  // General greeting
  if (lowerQuestion.includes("hi") || lowerQuestion.includes("hello") || lowerQuestion.includes("hey") || lowerQuestion.match(/^(hi|hello|hey)$/)) {
    return {
      answer: `Hi! I'm here to help answer questions about ${siteDetails.siteName}. You can ask me about pricing, features, security, or anything else. What would you like to know?`,
      confidence: 0.95
    };
  }

  // Check FAQ for matches
  for (const faq of faqs) {
    const faqLower = faq.question.toLowerCase();
    const keywords = faqLower.split(" ").filter(w => w.length > 3);
    const matchingKeywords = keywords.filter(k => lowerQuestion.includes(k));
    
    if (matchingKeywords.length >= 2) {
      return {
        answer: faq.answer,
        confidence: 0.8
      };
    }
  }

  // Default response
  return {
    answer: `I'm not entirely sure about that specific question. Could you rephrase it or ask about something else? You can ask me about:\n\n• Pricing and plans\n• Features and capabilities\n• Security and privacy\n• Device compatibility\n• Bank account connections\n• Investing options\n\nOr feel free to contact our support team at help@finwise.com for more detailed assistance!`,
    confidence: 0.3
  };
};

