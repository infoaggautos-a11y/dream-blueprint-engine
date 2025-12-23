import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Home, 
  Bed, 
  Bath, 
  Layers, 
  Paintbrush,
  Sun,
  Eye,
  EyeOff,
  RotateCcw,
  Save,
  Download
} from 'lucide-react';

interface BuilderControlsProps {
  floors: number;
  setFloors: (value: number) => void;
  bedrooms: number;
  setBedrooms: (value: number) => void;
  bathrooms: number;
  setBathrooms: (value: number) => void;
  style: 'modern' | 'traditional' | 'minimalist';
  setStyle: (value: 'modern' | 'traditional' | 'minimalist') => void;
  showRoof: boolean;
  setShowRoof: (value: boolean) => void;
  autoRotate: boolean;
  setAutoRotate: (value: boolean) => void;
  onReset: () => void;
  onSave: () => void;
  estimatedCost: number;
}

const styles = [
  { value: 'modern', label: 'Modern', icon: '🏢' },
  { value: 'traditional', label: 'Traditional', icon: '🏠' },
  { value: 'minimalist', label: 'Minimalist', icon: '🔲' },
] as const;

export const BuilderControls = ({
  floors,
  setFloors,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  style,
  setStyle,
  showRoof,
  setShowRoof,
  autoRotate,
  setAutoRotate,
  onReset,
  onSave,
  estimatedCost,
}: BuilderControlsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Estimate Card */}
      <Card className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
        <div className="flex items-center gap-2 mb-2">
          <Home className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">Estimated Cost</span>
        </div>
        <p className="text-2xl font-bold text-gradient-gold font-display">
          {formatCurrency(estimatedCost)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Based on current configuration
        </p>
      </Card>

      {/* Floors Control */}
      <Card className="p-4 bg-card border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-primary" />
          <Label className="text-sm">Floors: {floors}</Label>
        </div>
        <Slider
          value={[floors]}
          onValueChange={(value) => setFloors(value[0])}
          min={1}
          max={4}
          step={1}
          className="w-full"
        />
      </Card>

      {/* Bedrooms Control */}
      <Card className="p-4 bg-card border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <Bed className="w-4 h-4 text-primary" />
          <Label className="text-sm">Bedrooms: {bedrooms}</Label>
        </div>
        <Slider
          value={[bedrooms]}
          onValueChange={(value) => setBedrooms(value[0])}
          min={1}
          max={6}
          step={1}
          className="w-full"
        />
      </Card>

      {/* Bathrooms Control */}
      <Card className="p-4 bg-card border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <Bath className="w-4 h-4 text-primary" />
          <Label className="text-sm">Bathrooms: {bathrooms}</Label>
        </div>
        <Slider
          value={[bathrooms]}
          onValueChange={(value) => setBathrooms(value[0])}
          min={1}
          max={4}
          step={1}
          className="w-full"
        />
      </Card>

      {/* Style Selection */}
      <Card className="p-4 bg-card border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <Paintbrush className="w-4 h-4 text-primary" />
          <Label className="text-sm">Style</Label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {styles.map((s) => (
            <Button
              key={s.value}
              variant={style === s.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStyle(s.value)}
              className={style === s.value ? 'btn-gold' : ''}
            >
              <span className="mr-1">{s.icon}</span>
              <span className="text-xs">{s.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* View Options */}
      <Card className="p-4 bg-card border-border/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {showRoof ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
            <Label className="text-sm">Show Roof</Label>
          </div>
          <Switch checked={showRoof} onCheckedChange={setShowRoof} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-primary" />
            <Label className="text-sm">Auto Rotate</Label>
          </div>
          <Switch checked={autoRotate} onCheckedChange={setAutoRotate} />
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button onClick={onSave} className="w-full btn-gold">
          <Save className="w-4 h-4 mr-2" />
          Save Design
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};
