
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProps) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
    autoSave: true,
    fontSize: 'medium',
    soundEnabled: false,
    defaultWorkflow: '',
    maxHistoryItems: '50',
    sessionTimeout: '30'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-capital-dark-blue">
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* General Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-capital-dark-blue">General</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-sm font-medium">
                Enable Notifications
              </Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode" className="text-sm font-medium">
                Dark Mode
              </Label>
              <Switch
                id="darkMode"
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="autoSave" className="text-sm font-medium">
                Auto Save Chats
              </Label>
              <Switch
                id="autoSave"
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="soundEnabled" className="text-sm font-medium">
                Sound Effects
              </Label>
              <Switch
                id="soundEnabled"
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
              />
            </div>
          </div>

          {/* Display Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-capital-dark-blue">Display</h3>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Language</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                <SelectTrigger className="border-capital-blue/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Font Size</Label>
              <Select value={settings.fontSize} onValueChange={(value) => handleSettingChange('fontSize', value)}>
                <SelectTrigger className="border-capital-blue/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Workflow Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-capital-dark-blue">Workflow</h3>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Default Workflow</Label>
              <Select value={settings.defaultWorkflow} onValueChange={(value) => handleSettingChange('defaultWorkflow', value)}>
                <SelectTrigger className="border-capital-blue/30">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  <SelectItem value="add-invoice-xero">Add Invoice to Xero</SelectItem>
                  <SelectItem value="financial-analysis">Financial Analysis</SelectItem>
                  <SelectItem value="compliance-check">Compliance Check</SelectItem>
                  <SelectItem value="risk-assessment">Risk Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxHistory" className="text-sm font-medium">
                Max History Items
              </Label>
              <Input
                id="maxHistory"
                type="number"
                value={settings.maxHistoryItems}
                onChange={(e) => handleSettingChange('maxHistoryItems', e.target.value)}
                className="border-capital-blue/30 focus:border-capital-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout" className="text-sm font-medium">
                Session Timeout (minutes)
              </Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                className="border-capital-blue/30 focus:border-capital-blue"
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-capital-blue/30 text-capital-dark-blue"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-capital-blue hover:bg-capital-dark-blue text-white"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
