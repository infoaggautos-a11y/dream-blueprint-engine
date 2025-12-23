import { motion } from 'framer-motion';
import { MessageSquare, Hammer, Palette, ClipboardList, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ProjectMessage } from '@/types/dashboard';

interface CommunicationHubProps {
  messages: ProjectMessage[];
}

const CommunicationHub = ({ messages }: CommunicationHubProps) => {
  const unreadCount = messages.filter((m) => !m.isRead).length;

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return new Intl.DateTimeFormat('en-NG', { month: 'short', day: 'numeric' }).format(date);
  };

  const getRoleIcon = (icon: string) => {
    switch (icon) {
      case 'hammer':
        return <Hammer className="h-4 w-4" />;
      case 'palette':
        return <Palette className="h-4 w-4" />;
      case 'clipboard':
        return <ClipboardList className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl border border-border/30 bg-card p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Project Communications</h3>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-primary text-primary-foreground">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      {/* Messages List */}
      <div className="mb-4 space-y-3">
        {messages.slice(0, 4).map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-xl p-4 transition-colors ${
              !message.isRead
                ? 'border border-primary/30 bg-primary/5'
                : 'bg-muted/20 hover:bg-muted/30'
            }`}
          >
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-primary">
                  {getRoleIcon(message.icon)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{message.role}</p>
                  <p className="text-xs text-muted-foreground">{message.sender}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              "{message.message}"
            </p>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-center text-muted-foreground hover:text-foreground">
          View All Messages
        </Button>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Start New Conversation
        </Button>
      </div>
    </motion.div>
  );
};

export default CommunicationHub;
