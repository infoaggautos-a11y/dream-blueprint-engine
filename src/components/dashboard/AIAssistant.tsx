import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const suggestions = [
  "What's my realistic budget?",
  'Compare material costs',
  'Show similar projects',
];

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-secondary shadow-lg transition-shadow hover:shadow-xl"
          >
            <Bot className="h-6 w-6 text-secondary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 w-80 overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-secondary p-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-serif text-lg font-semibold text-foreground">TVICL Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-64 overflow-y-auto p-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-lg rounded-tl-none bg-muted/50 p-3">
                  <p className="text-sm text-foreground">
                    Hello! I'm your TVICL assistant. I can help you explore your dream home options, compare costs, and answer any questions.
                  </p>
                </div>
              </div>

              {/* Smart Suggestions */}
              <div className="mt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-primary" />
                  Quick questions:
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setMessage(suggestion)}
                      className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-muted/30 border-border/50"
                />
                <Button variant="gold" size="icon" className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
