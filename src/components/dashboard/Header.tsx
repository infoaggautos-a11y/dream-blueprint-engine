import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Bell, ChevronDown, User, Settings, LogOut, Home, Compass, Palette, Zap, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  userName?: string;
  userTier: 'visitor' | 'prospect' | 'client';
}

const Header = ({ userName = 'Guest', userTier }: HeaderProps) => {
  const [notificationCount] = useState(3);
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: Home, href: '/' },
    { label: 'Builder', icon: Compass, href: '#builder' },
    { label: 'Materials', icon: Palette, href: '#materials' },
    { label: 'Smart Home', icon: Zap, href: '#smart-home' },
    ...(userTier === 'client'
      ? [{ label: 'My Construction', icon: HardHat, href: '/my-construction', highlight: true }]
      : []),
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-serif text-xl font-bold text-primary-foreground">T</span>
          </div>
          <span className="font-serif text-2xl font-semibold text-foreground">TVICL</span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? location.pathname === '/' : location.pathname === item.href;
            const isLink = item.href.startsWith('/');
            const highlight = 'highlight' in item && item.highlight;

            const content = (
              <>
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
                {highlight && (
                  <Badge className="ml-1 animate-pulse bg-primary/20 text-primary text-xs px-1.5 py-0">
                    Building
                  </Badge>
                )}
              </>
            );

            if (isLink) {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {content}
                </Link>
              );
            }

            return (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {content}
              </motion.a>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {notificationCount}
              </span>
            )}
          </motion.button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" className="gap-2 pl-2 pr-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="hidden text-sm font-medium text-foreground sm:inline">
                  {userName}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userTier} Account</p>
              </div>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
