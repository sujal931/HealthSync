
import { Video, Calendar, Clock, MessageSquare, Shield, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConsultationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  primary?: boolean;
}

const ConsultationCard = ({ 
  title, 
  description, 
  icon, 
  linkTo, 
  primary = false 
}: ConsultationCardProps) => {
  return (
    <div 
      className={`rounded-xl p-6 transition-all duration-300 hover:shadow-xl ${
        primary 
          ? 'bg-gradient-to-br from-medical-500 to-medical-700 text-white'
          : 'bg-white border border-gray-200'
      }`}
    >
      <div className={`inline-flex items-center justify-center p-3 rounded-full mb-5 ${
        primary 
          ? 'bg-white/20 text-white' 
          : 'bg-medical-100 text-medical-700'
      }`}>
        {icon}
      </div>
      
      <h3 className={`text-xl font-semibold mb-3 ${primary ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </h3>
      
      <p className={`mb-6 ${primary ? 'text-white/80' : 'text-gray-600'}`}>
        {description}
      </p>
      
      <Link 
        to={linkTo}
        className={`inline-flex items-center text-sm font-medium ${
          primary 
            ? 'text-white hover:text-white/90' 
            : 'text-medical-600 hover:text-medical-700'
        }`}
      >
        Learn more
        <ExternalLink size={16} className="ml-1" />
      </Link>
    </div>
  );
};

export default ConsultationCard;
