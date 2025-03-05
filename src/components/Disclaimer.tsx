
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <section id="disclaimer" className="section-container">
      <h2 className="section-title text-center">Legal Disclaimer</h2>
      <p className="section-subtitle text-center">
        Important information about the use of Stellaris: AI Space Explorer
      </p>
      
      <div className="glass-panel p-8 mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <div className="space-y-4 text-gray-300">
          <p>
            <strong className="text-white">Simulation Purposes Only:</strong> Stellaris: AI Space Explorer is designed for educational, entertainment, and simulation purposes only. The information, guidance, and analyses provided by this AI tool should not be used for actual space missions, exploration, or settlement activities without proper expert verification.
          </p>
          
          <p>
            <strong className="text-white">No Warranty:</strong> AI WEB TOOLS LLC provides this service "as is" without any warranties, expressed or implied. We do not guarantee the accuracy, completeness, or reliability of any information provided by Stellaris.
          </p>
          
          <p>
            <strong className="text-white">Use at Your Own Risk:</strong> Users interact with Stellaris at their own risk. AI WEB TOOLS LLC and its affiliates shall not be liable for any damages, losses, or consequences that may arise from the use of or reliance on Stellaris or the information it provides.
          </p>
          
          <p>
            <strong className="text-white">Not a Substitute for Professional Expertise:</strong> Stellaris is not a substitute for professional advice or expertise in space exploration, engineering, astronomy, or related fields. All critical decisions should be verified by qualified professionals.
          </p>
          
          <p>
            <strong className="text-white">Data and Privacy:</strong> User interactions with Stellaris are subject to OpenAI's privacy policies. For details about how your data is handled, please refer to the Privacy Policy link in the footer.
          </p>
          
          <p>
            <strong className="text-white">Third-Party Content:</strong> Stellaris may reference or provide links to third-party content. AI WEB TOOLS LLC is not responsible for the accuracy or reliability of any third-party information.
          </p>
          
          <p>
            <strong className="text-white">Intellectual Property:</strong> Stellaris: AI Space Explorer is the intellectual property of AI WEB TOOLS LLC. Unauthorized use, reproduction, or distribution is prohibited.
          </p>
          
          <p>
            <strong className="text-white">Changes to Service:</strong> AI WEB TOOLS LLC reserves the right to modify, suspend, or discontinue Stellaris or any part of the service at any time without notice.
          </p>
          
          <p className="text-sm text-gray-400 mt-8">
            By using Stellaris: AI Space Explorer, you acknowledge that you have read, understood, and agree to be bound by this disclaimer. If you do not agree with any part of this disclaimer, please refrain from using the service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Disclaimer;
