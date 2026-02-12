import React from 'react';
import { Card } from '../components/common';
import { Construction } from 'lucide-react';

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text mb-2">{title}</h1>
        <p className="text-text-light">{description}</p>
      </div>

      <Card className="text-center py-16">
        <Construction className="w-16 h-16 text-text-light mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-text mb-2">
          Coming Soon
        </h3>
        <p className="text-text-light">
          This feature is under development and will be available soon.
        </p>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
