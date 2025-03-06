
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Star, StarHalf, StarOff } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  delay: number;
  avatarSrc?: string;
  initials?: string;
  rating: number; // Rating out of 5
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex text-space-blue mt-2 mb-3">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 fill-space-blue" />
      ))}
      {hasHalfStar && <StarHalf key="half" className="h-5 w-5 fill-space-blue" />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOff key={`empty-${i}`} className="h-5 w-5" />
      ))}
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, title, delay, avatarSrc, initials = "US", rating }) => (
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
    <StarRating rating={rating} />
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <TestimonialCard 
          quote="Stellaris helped me design my dream Mars base complete with hydroponics and radiation shielding. The simulation is so detailed I almost feel like I'm really there planning a real colony!"
          name="Alex Chen"
          title="Space Simulation Hobbyist"
          delay={0.2}
          initials="AC"
          avatarSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          rating={5}
        />
        
        <TestimonialCard 
          quote="Dude, this is like, the best trip ever! I sparked up, fired up Stellaris, and suddenly I was navigating through the rings of Saturn. Totally immersive experience, man. 10/10 would space out again!"
          name="Jay Cosmos"
          title="Recreational Explorer & Astronomy Enthusiast"
          delay={0.3}
          initials="JC"
          avatarSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          rating={4.5}
        />
        
        <TestimonialCard 
          quote="As a science teacher, I use Stellaris to get my students excited about space exploration. The AI generates amazingly detailed simulation scenarios that make learning about exoplanets and space travel so much more engaging."
          name="Sarah Martinez"
          title="High School Science Teacher"
          delay={0.4}
          initials="SM"
          avatarSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          rating={4}
        />

        <TestimonialCard 
          quote="I'm an amateur astronomer and Stellaris has become my go-to companion for stargazing nights. The interface could be more intuitive, but the space simulation quality makes up for it. Great for planning observation sessions!"
          name="Mike Reynolds"
          title="Amateur Astronomer & Photography Hobbyist"
          delay={0.5}
          initials="MR"
          avatarSrc="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          rating={3.5}
        />
      </div>
    </section>
  );
};

export default Testimonials;
