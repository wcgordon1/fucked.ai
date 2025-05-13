import { Resend } from 'resend';

// Get API key from environment variable
const apiKeyFromEnv = import.meta.env.VITE_RESEND_API_KEY;
let resendApiKey: string | undefined = apiKeyFromEnv;

// Initialize Resend client
export const getResendClient = () => {
  if (!resendApiKey) {
    throw new Error('Resend API key is not set. Please provide a valid API key.');
  }
  
  return new Resend(resendApiKey);
};

// Function to set API key (can be called from app initialization)
export const setResendApiKey = (apiKey: string) => {
  resendApiKey = apiKey;
};

// Send email function
export const sendSubmissionEmail = async (formData: {
  name: string;
  email: string;
  aiType: string;
  description: string;
  imageUrl?: string;
}) => {
  try {
    const resend = getResendClient();
    
    const { data, error } = await resend.emails.send({
      from: 'AI Failures <submissions@fucked.ai>',
      to: ['will@starterbuild.com'],
      subject: `New AI Failure Submission: ${formData.aiType}`,
      text: `
Name: ${formData.name}
Email: ${formData.email}
Type of AI Failure: ${formData.aiType}
Description: ${formData.description}
${formData.imageUrl ? `Image attached: ${formData.imageUrl}` : 'No image provided'}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0E1D34; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #f9f9f9; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .label { font-weight: bold; margin-bottom: 5px; }
    .value { margin-bottom: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New AI Failure Submission</h1>
    </div>
    <div class="content">
      <div class="label">Name:</div>
      <div class="value">${formData.name}</div>
      
      <div class="label">Email:</div>
      <div class="value">${formData.email}</div>
      
      <div class="label">Type of AI Failure:</div>
      <div class="value">${formData.aiType}</div>
      
      <div class="label">Description:</div>
      <div class="value">${formData.description.replace(/\n/g, '<br>')}</div>
      
      ${formData.imageUrl ? `
      <div class="label">Image:</div>
      <div class="value"><img src="${formData.imageUrl}" alt="Submitted image" style="max-width: 100%;" /></div>
      ` : '<div class="value">No image provided</div>'}
    </div>
    <div class="footer">
      <p>This submission was sent from the F.AI website.</p>
    </div>
  </div>
</body>
</html>
      `,
    });
    
    if (error) {
      console.error('Failed to send email:', error);
      throw new Error(error.message);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
