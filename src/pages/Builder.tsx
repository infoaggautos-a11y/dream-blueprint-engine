import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scene } from '@/components/builder/Scene';
import { BuilderControls } from '@/components/builder/BuilderControls';
import { RoomDetails } from '@/components/builder/RoomDetails';
import { ArrowLeft, HelpCircle, Sparkles, Receipt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveActiveConfig } from '@/lib/estimate';

const Builder = () => {
  const { toast } = useToast();
  
  // Building configuration
  const [floors, setFloors] = useState(2);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [style, setStyle] = useState<'modern' | 'traditional' | 'minimalist'>('modern');
  const [showRoof, setShowRoof] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Keep the estimate page in sync with the current design
  useEffect(() => {
    saveActiveConfig({ floors, bedrooms, bathrooms, style });
  }, [floors, bedrooms, bathrooms, style]);


  // Calculate estimated cost based on configuration
  const calculateEstimate = useCallback(() => {
    const basePrice = 15000000; // ₦15M base
    const floorCost = floors * 8000000; // ₦8M per floor
    const bedroomCost = bedrooms * 3500000; // ₦3.5M per bedroom
    const bathroomCost = bathrooms * 2000000; // ₦2M per bathroom
    
    const styleMultiplier = {
      modern: 1.2,
      traditional: 1.0,
      minimalist: 1.1,
    };

    return Math.round((basePrice + floorCost + bedroomCost + bathroomCost) * styleMultiplier[style]);
  }, [floors, bedrooms, bathrooms, style]);

  const handleReset = () => {
    setFloors(2);
    setBedrooms(3);
    setBathrooms(2);
    setStyle('modern');
    setShowRoof(true);
    setSelectedRoom(null);
    toast({
      title: "Design Reset",
      description: "Your design has been reset to defaults.",
    });
  };

  const handleSave = () => {
    const designData = {
      floors,
      bedrooms,
      bathrooms,
      style,
      estimatedCost: calculateEstimate(),
      savedAt: new Date().toISOString(),
    };
    
    // Save to localStorage for now
    const savedDesigns = JSON.parse(localStorage.getItem('tvicl_designs') || '[]');
    savedDesigns.push({
      id: `design_${Date.now()}`,
      name: `${style.charAt(0).toUpperCase() + style.slice(1)} Home`,
      ...designData,
    });
    localStorage.setItem('tvicl_designs', JSON.stringify(savedDesigns));

    toast({
      title: "Design Saved!",
      description: "Your design has been saved to your dashboard.",
    });
  };

  const handleRoomClick = (room: string) => {
    setSelectedRoom(room);
    setAutoRotate(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-display text-lg text-foreground">3D Home Builder</h1>
              <p className="text-xs text-muted-foreground">Design your dream home</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              Guide
            </Button>
            <Link to="/estimate">
              <Button variant="outline" size="sm">
                <Receipt className="w-4 h-4 mr-2" />
                View Estimate
              </Button>
            </Link>
            <Button size="sm" className="btn-gold">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Suggest
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16 flex h-[calc(100vh-4rem)]">
        {/* 3D Viewport */}
        <div className="flex-1 relative">
          <Scene
            floors={floors}
            bedrooms={bedrooms}
            style={style}
            showRoof={showRoof}
            autoRotate={autoRotate}
            selectedRoom={selectedRoom}
            onRoomClick={handleRoomClick}
          />
          
          {/* Room Details Panel */}
          <RoomDetails 
            roomId={selectedRoom} 
            onClose={() => setSelectedRoom(null)} 
          />

          {/* Viewport Instructions */}
          <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50">
            <p>🖱️ Drag to rotate • Scroll to zoom • Click rooms to select</p>
          </div>
        </div>

        {/* Controls Sidebar */}
        <aside className="w-80 bg-card/50 backdrop-blur-xl border-l border-border/50 p-4 overflow-y-auto">
          <div className="mb-4">
            <h2 className="font-display text-lg text-foreground mb-1">Design Controls</h2>
            <p className="text-xs text-muted-foreground">Configure your home</p>
          </div>
          
          <BuilderControls
            floors={floors}
            setFloors={setFloors}
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            bathrooms={bathrooms}
            setBathrooms={setBathrooms}
            style={style}
            setStyle={setStyle}
            showRoof={showRoof}
            setShowRoof={setShowRoof}
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
            onReset={handleReset}
            onSave={handleSave}
            estimatedCost={calculateEstimate()}
          />
        </aside>
      </div>
    </div>
  );
};

export default Builder;
