import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavLink {
  to: string;
  label: string;
  icon: any;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  isRTL: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks, isRTL }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] lg:hidden"
          />
          <motion.div
            initial={{ x: isRTL ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '100%' : '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} bottom-0 w-[280px] bg-white z-[100] shadow-2xl lg:hidden flex flex-col`}
          >
            <div className="p-4 flex justify-end">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="px-4 pb-6 flex-1 overflow-y-auto">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-charcoal/80 hover:text-charcoal hover:bg-sand-gold/10 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                    onClick={onClose}
                  >
                    {link.icon && <link.icon className="h-5 w-5" />}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Button className="w-full bg-sand-gold hover:bg-sand-gold/90 text-white font-semibold">
                  Plan Your Trip
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;