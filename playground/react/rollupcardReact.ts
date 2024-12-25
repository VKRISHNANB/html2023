import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Card = ({ title, content, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4 cursor-pointer flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
        <h3 className="font-medium text-gray-900">
          {title}
        </h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-48' : 'max-h-0'
        }`}
      >
        <div className="p-4 text-gray-600">
          {content}
        </div>
      </div>
    </div>
  );
};

const CollapsibleCards = () => {
  // Generate sample data for 25 cards
  const cards = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
    content: `This is the content for card ${i + 1}. Click the header to toggle this content. You can customize this text for each card as needed.`
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Collapsible Cards</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              content={card.content}
              index={card.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleCards;