
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  delay: number;
  avatarSrc?: string;
  initials?: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, title, delay, avatarSrc, initials = "US" }) => (
  <div 
    className="glass-panel p-6 rounded-xl opacity-0 animate-fade-in-up"
    style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
  >
    <div className="flex items-start mb-4">
      <Avatar className="h-12 w-12 mr-4 border-2 border-space-blue">
        {avatarSrc ? (
          <AvatarImage src={avatarSrc} alt={name} />
        ) : (
          <AvatarFallback className="bg-space-black text-space-blue">{initials}</AvatarFallback>
        )}
      </Avatar>
      <svg className="h-8 w-8 text-space-blue" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </div>
    <p className="text-gray-300 mb-4">{quote}</p>
    <div>
      <h4 className="font-semibold text-white">{name}</h4>
      <p className="text-sm text-gray-400">{title}</p>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="section-container">
      <h2 className="section-title text-center">What Space Enthusiasts Say</h2>
      <p className="section-subtitle text-center">
        See how people are using Stellaris to enhance their space simulation adventures.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        <TestimonialCard 
          quote="Stellaris helped me design my dream Mars base complete with hydroponics and radiation shielding. The simulation is so detailed I almost feel like I'm really there planning a real colony!"
          name="Alex Chen"
          title="Space Simulation Hobbyist"
          delay={0.2}
          initials="AC"
          avatarSrc="/placeholder.svg"
        />
        
        <TestimonialCard 
          quote="Dude, this is like, the best trip ever! I sparked up, fired up Stellaris, and suddenly I was navigating through the rings of Saturn. Totally immersive experience, man. 10/10 would space out again!"
          name="Jay Cosmos"
          title="Recreational Explorer & Astronomy Enthusiast"
          delay={0.3}
          initials="JC"
          avatarSrc="/placeholder.svg"
        />
        
        <TestimonialCard 
          quote="As a science teacher, I use Stellaris to get my students excited about space exploration. The AI generates amazingly detailed simulation scenarios that make learning about exoplanets and space travel so much more engaging."
          name="Dr. Sarah Martinez"
          title="High School Science Educator"
          delay={0.4}
          initials="SM"
          avatarSrc="/placeholder.svg"
        />
      </div>
    </section>
  );
};

export default Testimonials;
