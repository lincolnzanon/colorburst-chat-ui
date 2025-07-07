
import React, { useState, useEffect } from 'react';
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
    sessionTimeout: '30',
    emailNotifications: true,
    autoBackup: false,
    dataRetention: '90',
    apiTimeout: '30',
    maxFileSize: '10',
    compressionEnabled: true,
    analyticsEnabled: true,
    betaFeatures: false
  });

  useEffect(() => {
    // Apply dark mode to document
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    localStorage.setItem('appSettings', JSON.stringify(settings));
    onClose();
  };

  const handleReset = () => {
    setSettings({
      notifications: true,
      darkMode: false,
      language: 'en',
      autoSave: true,
      fontSize: 'medium',
      soundEnabled: false,
      defaultWorkflow: '',
      maxHistoryItems: '50',
      sessionTimeout: '30',
      emailNotifications: true,
      autoBackup: false,
      dataRetention: '90',
      apiTimeout: '30',
      maxFileSize: '10',
      compressionEnabled: true,
      analyticsEnabled: true,
      betaFeatures: false
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-capital-dark-blue dark:text-white">
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* General Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-capital-dark-blue dark:text-white">General</h3>
            
            <div className="grid grid-cols-2 gap-4">
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

              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications" className="text-sm font-medium">
                  Email Notifications
                </Label>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="betaFeatures" className="text-sm font-medium">
                  Beta Features
                </Label>
                <Switch
                  id="betaFeatures"
                  checked={settings.betaFeatures}
                  onCheckedChange={(checked) => handleSettingChange('betaFeatures', checked)}
                />
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-capital-dark-blue dark:text-white">Display</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Language</Label>
                <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                  <SelectTrigger className="border-capital-blue/30 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Font Size</Label>
                <Select value={settings.fontSize} onValueChange={(value) => handleSettingChange('fontSize', value)}>
                  <SelectTrigger className="border-capital-blue/30 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="extra-large">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Data & Storage */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-capital-dark-blue dark:text-white">Data & Storage</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoBackup" className="text-sm font-medium">
                  Auto Backup
                </Label>
                <Switch
                  id="autoBackup"
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="compressionEnabled" className="text-sm font-medium">
                  Data Compression
                </Label>
                <Switch
                  id="compressionEnabled"
                  checked={settings.compressionEnabled}
                  onCheckedChange={(checked) => handleSettingChange('compressionEnabled', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataRetention" className="text-sm font-medium">
                  Data Retention (days)
                </Label>
                <Input
                  id="dataRetention"
                  type="number"
                  value={settings.dataRetention}
                  onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                  className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxFileSize" className="text-sm font-medium">
                  Max File Size (MB)
                </Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange('maxFileSize', e.target.value)}
                  className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Performance Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-capital-dark-blue dark:text-white">Performance</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apiTimeout" className="text-sm font-medium">
                  API Timeout (seconds)
                </Label>
                <Input
                  id="apiTimeout"
                  type="number"
                  value={settings.apiTimeout}
                  onChange={(e) => handleSettingChange('apiTimeout', e.target.value)}
                  className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
                />
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
                  className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
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
                  className="border-capital-blue/30 focus:border-capital-blue dark:border-gray-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="analyticsEnabled" className="text-sm font-medium">
                  Analytics
                </Label>
                <Switch
                  id="analyticsEnabled"
                  checked={settings.analyticsEnabled}
                  onCheckedChange={(checked) => handleSettingChange('analyticsEnabled', checked)}
                />
              </div>
            </div>
          </div>

          {/* Workflow Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-capital-dark-blue dark:text-white">Workflow</h3>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Default Workflow</Label>
              <Select value={settings.defaultWorkflow} onValueChange={(value) => handleSettingChange('defaultWorkflow', value)}>
                <SelectTrigger className="border-capital-blue/30 dark:border-gray-600">
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
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1 border-capital-blue/30 text-capital-dark-blue dark:border-gray-600 dark:text-white"
            >
              Reset to Defaults
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-capital-blue/30 text-capital-dark-blue dark:border-gray-600 dark:text-white"
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
