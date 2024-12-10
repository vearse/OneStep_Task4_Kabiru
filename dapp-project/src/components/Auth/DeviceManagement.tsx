import React from 'react';
import { Device } from '../../types/User';
import { Button } from '../UI/Button';

interface DeviceManagementProps {
  devices: Device[];
  onRemoveDevice: (deviceId: string) => void;
}

const DeviceManagement: React.FC<DeviceManagementProps> = ({
  devices,
  onRemoveDevice,
}) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-900">Logged In Devices</h2>
      {devices.length > 0 ? (
        devices.map((device) => (
          <div
            key={device.id}
            className="flex justify-between items-center border-b py-4"
          >
            <div>
              <p className="text-lg font-semibold">{device.name}</p>
              <p className="text-sm text-gray-500">
                Last Login: {device.lastLogin.toLocaleString()}
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => onRemoveDevice(device.id)}
              className="px-4 py-2 text-sm"
            >
              Remove
            </Button>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No devices found.</p>
      )}
    </div>
  );
};

export default DeviceManagement;