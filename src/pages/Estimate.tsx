import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer, CalendarCheck, Ruler, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import {
  addOns,
  boqTotal,
  buildBoq,
  finishTiers,
  formatNaira,
  grossFloorArea,
  loadActiveConfig,
  milestones,
  sectionTotal,
  timelineMonths,
  type FinishTier,
} from '@/lib/estimate';

const Estimate = () => {
  const { toast } = useToast();
  const config = useMemo(() => loadActiveConfig(), []);
  const [tier, setTier] = useState<FinishTier>('signature');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const sections = useMemo(() => buildBoq(config, tier), [config, tier]);
  const construction = useMemo(() => boqTotal(sections), [sections]);
  const addOnTotal = addOns
    .filter((a) => selectedAddOns.includes(a.id))
    .reduce((sum, a) => sum + a.cost, 0);

  const subtotal = construction + addOnTotal;
  const contingency = Math.round(subtotal * 0.05);
  const total = subtotal + contingency;

  const area = grossFloorArea(config);
  const perSqm = Math.round(total / area);
  const months = timelineMonths(config);

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl print:hidden">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-serif text-lg text-foreground">Detailed Cost Estimate</h1>
              <p className="text-xs text-muted-foreground">Bill of Quantities &amp; payment plan</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Link to="/builder">
              <Button size="sm" variant="gold">
                <Sparkles className="mr-2 h-4 w-4" />
                Edit Design
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 pb-24 pt-24">
        {/* Executive summary */}
        <Card className="overflow-hidden border-border/50 p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <Badge className="bg-primary/15 text-primary">Preliminary Proposal</Badge>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground">
                {config.style.charAt(0).toUpperCase() + config.style.slice(1)} Residence
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {config.floors} floors · {config.bedrooms} bedrooms · {config.bathrooms} bathrooms
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Total Estimated Investment
              </p>
              <p className="mt-1 font-serif text-4xl font-semibold text-primary">
                {formatNaira(total)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Includes 5% contingency buffer
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Ruler className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{area} m² gross area</p>
                <p className="text-xs text-muted-foreground">{formatNaira(perSqm)} per m²</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {months.min}–{months.max} months
                </p>
                <p className="text-xs text-muted-foreground">Estimated build duration</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{formatNaira(contingency)}</p>
                <p className="text-xs text-muted-foreground">Price volatility buffer</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Finish tier */}
        <section className="mt-8">
          <h3 className="font-serif text-xl font-semibold text-foreground">Finish Specification</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {finishTiers.map((t) => (
              <button
                key={t.value}
                onClick={() => setTier(t.value)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  tier === t.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 bg-card hover:border-primary/40'
                }`}
              >
                <p className="font-medium text-foreground">{t.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.blurb}</p>
                <p className="mt-3 text-xs font-medium text-primary">
                  {t.multiplier === 1 ? 'Base finish' : `+${Math.round((t.multiplier - 1) * 100)}% on finishes`}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* BOQ */}
        <section className="mt-10">
          <h3 className="font-serif text-xl font-semibold text-foreground">Bill of Quantities</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Every line item priced at current market rates.
          </p>

          <Accordion type="multiple" className="mt-4 space-y-3">
            {sections.map((s) => (
              <AccordionItem
                key={s.id}
                value={s.id}
                className="rounded-xl border border-border/50 bg-card px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex w-full items-center justify-between pr-4">
                    <span className="text-sm font-medium text-foreground">{s.title}</span>
                    <span className="text-sm font-semibold text-primary">
                      {formatNaira(sectionTotal(s))}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="overflow-x-auto pb-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                          <th className="py-2 pr-4 font-medium">Description</th>
                          <th className="py-2 pr-4 font-medium">Unit</th>
                          <th className="py-2 pr-4 text-right font-medium">Qty</th>
                          <th className="py-2 pr-4 text-right font-medium">Rate</th>
                          <th className="py-2 text-right font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {s.items.map((item) => (
                          <tr key={item.description} className="border-t border-border/40">
                            <td className="py-2 pr-4 text-foreground">{item.description}</td>
                            <td className="py-2 pr-4 text-muted-foreground">{item.unit}</td>
                            <td className="py-2 pr-4 text-right text-muted-foreground">
                              {item.quantity.toLocaleString()}
                            </td>
                            <td className="py-2 pr-4 text-right text-muted-foreground">
                              {formatNaira(item.rate)}
                            </td>
                            <td className="py-2 text-right font-medium text-foreground">
                              {formatNaira(item.quantity * item.rate)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-border/50 bg-card p-4">
            <span className="text-sm text-muted-foreground">Construction subtotal</span>
            <span className="font-serif text-lg font-semibold text-foreground">
              {formatNaira(construction)}
            </span>
          </div>
        </section>

        {/* Add-ons */}
        <section className="mt-10">
          <h3 className="font-serif text-xl font-semibold text-foreground">Premium Add-ons</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {addOns.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-card p-4"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{a.label}</p>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                  <p className="mt-1 text-xs font-medium text-primary">{formatNaira(a.cost)}</p>
                </div>
                <Switch
                  checked={selectedAddOns.includes(a.id)}
                  onCheckedChange={() => toggleAddOn(a.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Totals */}
        <Card className="mt-10 border-border/50 p-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Construction works</span>
              <span className="text-foreground">{formatNaira(construction)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Premium add-ons</span>
              <span className="text-foreground">{formatNaira(addOnTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contingency (5%)</span>
              <span className="text-foreground">{formatNaira(contingency)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Total investment</span>
              <span className="font-serif text-2xl font-semibold text-primary">
                {formatNaira(total)}
              </span>
            </div>
          </div>
        </Card>

        {/* Milestones */}
        <section className="mt-10">
          <h3 className="font-serif text-xl font-semibold text-foreground">Milestone Payment Schedule</h3>
          <div className="mt-4 space-y-3">
            {milestones.map((m, i) => (
              <div
                key={m.label}
                className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 font-medium text-primary">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.note}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{formatNaira(Math.round(total * m.percent / 100))}</p>
                  <p className="text-xs text-muted-foreground">{m.percent}%</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 print:hidden">
          <Button
            variant="gold"
            size="lg"
            onClick={() =>
              toast({
                title: 'Request received',
                description: 'Our lead quantity surveyor will reach out to schedule your review.',
              })
            }
          >
            <CalendarCheck className="mr-2 h-4 w-4" />
            Schedule Consultation
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Download Proposal
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Rates are indicative and subject to site survey, soil test and final architectural drawings.
        </p>
      </main>
    </div>
  );
};

export default Estimate;
