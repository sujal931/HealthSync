
import { useEffect, useRef, useState } from 'react';
import { MapPin, Hospital, Ambulance, Navigation, Search } from 'lucide-react';

const Map3D = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  // Dummy facility data
  const facilities = [
    { 
      id: 1, 
      name: 'MediSphere General Hospital', 
      type: 'hospital', 
      address: '123 Health Ave, San Francisco, CA',
      availability: 'High',
      position: { x: 30, y: 20 }
    },
    { 
      id: 2,
      name: 'Central Medical Center', 
      type: 'hospital', 
      address: '456 Care Street, San Francisco, CA',
      availability: 'Medium',
      position: { x: 55, y: 40 }
    },
    { 
      id: 3,
      name: 'Emergency Response Unit #1', 
      type: 'ambulance', 
      address: 'Mobile Unit - Downtown',
      availability: 'Available',
      position: { x: 42, y: 35 }
    },
    { 
      id: 4,
      name: 'Community Health Clinic', 
      type: 'clinic', 
      address: '789 Wellness Blvd, San Francisco, CA',
      availability: 'High',
      position: { x: 70, y: 65 }
    },
    { 
      id: 5,
      name: 'Emergency Response Unit #2', 
      type: 'ambulance', 
      address: 'Mobile Unit - Uptown',
      availability: 'Available',
      position: { x: 80, y: 30 }
    }
  ];

  // Filter facilities based on search
  const filteredFacilities = facilities.filter(facility => 
    facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    facility.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const initMap = async () => {
      try {
        // In a real implementation, this would initialize a 3D map library
        // such as MapboxGL or Google Maps with 3D capabilities
        console.log('Initializing 3D map...');
        
        // Simulate map loading
        setTimeout(() => {
          setMapLoaded(true);
          console.log('3D map loaded successfully');
        }, 1500);
        
      } catch (error) {
        console.error('Error initializing 3D map:', error);
      }
    };

    initMap();
  }, []);
  
  const getStatusColorClass = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-red-500';
      case 'available':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] bg-gray-50 flex flex-col">
      {/* Map Controls */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <MapPin className="mr-2 text-medical-500" />
              Healthcare Facilities Map
            </h1>
            
            <div className="flex items-center w-full md:w-auto">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search facilities..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-medical-500/50 focus:border-medical-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="ml-2 flex">
                <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Navigation size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white border border-gray-200 mr-2">
                <Hospital size={14} className="text-medical-700" />
              </div>
              <span className="text-sm text-gray-700">Hospitals</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white border border-gray-200 mr-2">
                <Ambulance size={14} className="text-medical-700" />
              </div>
              <span className="text-sm text-gray-700">Ambulances</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white border border-gray-200 mr-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-gray-700">High Availability</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white border border-gray-200 mr-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              </div>
              <span className="text-sm text-gray-700">Medium Availability</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white border border-gray-200 mr-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
              </div>
              <span className="text-sm text-gray-700">Low Availability</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapContainerRef} className="absolute inset-0 bg-blue-50">
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 border-4 border-medical-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-700">Loading interactive map...</p>
              </div>
            </div>
          )}
          
          {/* Simulated 3D Map with dummy data */}
          {mapLoaded && (
            <div className="relative h-full overflow-hidden bg-[url('/map-background.png')] bg-cover">
              <div className="absolute inset-0 bg-blue-900/10"></div>
              
              {/* Simulated map markers */}
              {filteredFacilities.map(facility => (
                <button
                  key={facility.id}
                  className={`absolute transition-all duration-300 ${
                    selectedLocation === facility.name 
                      ? 'z-10 scale-110' 
                      : 'z-0 hover:scale-110'
                  }`}
                  style={{ 
                    left: `${facility.position.x}%`, 
                    top: `${facility.position.y}%`
                  }}
                  onClick={() => setSelectedLocation(
                    selectedLocation === facility.name ? null : facility.name
                  )}
                >
                  <div className="relative">
                    <div 
                      className={`h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 ${
                        selectedLocation === facility.name ? 'border-medical-500' : 'border-white'
                      }`}
                    >
                      {facility.type === 'hospital' && (
                        <Hospital className="text-medical-700" size={20} />
                      )}
                      {facility.type === 'ambulance' && (
                        <Ambulance className="text-medical-700" size={20} />
                      )}
                      {facility.type === 'clinic' && (
                        <MapPin className="text-medical-700" size={20} />
                      )}
                      <span className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${getStatusColorClass(facility.availability)} border border-white`}></span>
                    </div>
                    
                    {selectedLocation === facility.name && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl p-3 z-20 animate-fade-in">
                        <h3 className="font-semibold text-gray-800">{facility.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{facility.address}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Availability:</span>
                          <span className={`font-medium ${
                            facility.availability.toLowerCase() === 'high' || facility.availability.toLowerCase() === 'available'
                              ? 'text-green-600'
                              : facility.availability.toLowerCase() === 'medium'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                          }`}>
                            {facility.availability}
                          </span>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <button className="flex-1 py-1.5 px-3 bg-medical-500 text-white text-sm rounded-lg">
                            Details
                          </button>
                          <button className="flex-1 py-1.5 px-3 bg-white border border-gray-200 text-sm rounded-lg">
                            Directions
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map3D;
