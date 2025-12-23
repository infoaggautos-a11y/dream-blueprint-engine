import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Maximize2, Palette, Lightbulb, Thermometer } from 'lucide-react';

interface RoomDetailsProps {
  roomId: string | null;
  onClose: () => void;
}

const roomData: Record<string, { name: string; type: string; features: string[]; size: string }> = {
  living_1: { name: 'Living Room', type: 'Ground Floor', features: ['Smart Lighting', 'Climate Control', 'Entertainment System'], size: '45 m²' },
  bedroom_1: { name: 'Master Bedroom', type: 'Ground Floor', features: ['Smart Blinds', 'Climate Control', 'Security System'], size: '28 m²' },
  bathroom_1: { name: 'Main Bathroom', type: 'Ground Floor', features: ['Heated Floors', 'Smart Mirror', 'Water Saving'], size: '12 m²' },
  living_2: { name: 'Family Room', type: 'First Floor', features: ['Smart Lighting', 'Home Theater', 'Climate Control'], size: '40 m²' },
  bedroom_2: { name: 'Bedroom 2', type: 'First Floor', features: ['Smart Blinds', 'Climate Control'], size: '22 m²' },
  bathroom_2: { name: 'Bathroom 2', type: 'First Floor', features: ['Heated Floors', 'Smart Shower'], size: '10 m²' },
  living_3: { name: 'Lounge', type: 'Second Floor', features: ['Panoramic Views', 'Smart Lighting'], size: '35 m²' },
  bedroom_3: { name: 'Guest Bedroom', type: 'Second Floor', features: ['Climate Control', 'Smart Blinds'], size: '20 m²' },
  bathroom_3: { name: 'Guest Bathroom', type: 'Second Floor', features: ['Smart Mirror'], size: '8 m²' },
};

export const RoomDetails = ({ roomId, onClose }: RoomDetailsProps) => {
  if (!roomId) return null;

  const room = roomData[roomId] || { 
    name: 'Room', 
    type: 'Unknown Floor', 
    features: [], 
    size: '-- m²' 
  };

  return (
    <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 p-4 bg-card/95 backdrop-blur-xl border-primary/30 animate-fade-in z-10">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display text-lg text-foreground">{room.name}</h3>
          <p className="text-sm text-muted-foreground">{room.type}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant="outline" className="border-primary/50 text-primary">
          <Maximize2 className="w-3 h-3 mr-1" />
          {room.size}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Smart Features</p>
        <div className="flex flex-wrap gap-2">
          {room.features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature.includes('Lighting') && <Lightbulb className="w-3 h-3 mr-1" />}
              {feature.includes('Climate') && <Thermometer className="w-3 h-3 mr-1" />}
              {feature.includes('Smart') && !feature.includes('Lighting') && <Palette className="w-3 h-3 mr-1" />}
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="text-xs">
          <Palette className="w-3 h-3 mr-1" />
          Materials
        </Button>
        <Button size="sm" className="text-xs btn-gold">
          Customize
        </Button>
      </div>
    </Card>
  );
};
