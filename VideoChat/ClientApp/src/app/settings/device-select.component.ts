import { Component, EventEmitter, Input, Output } from '@angular/core';

class IdGenerator {
  protected static id: number = 0;
  static getNext() {
    return ++IdGenerator.id;
  }
}

@Component({
  selector: 'app-device-select',
  templateUrl: './device-select.component.html'
})
export class DeviceSelectComponent {
  private localDevices: MediaDeviceInfo[] = [];

  id: string;
  selectedId: string;

  get devices(): MediaDeviceInfo[] {
    return this.localDevices;
  }

  @Input() label: string;
  @Input() kind: MediaDeviceKind;
  @Input() set devices(devices: MediaDeviceInfo[]) {
    this.selectedId = this.find(this.localDevices = devices);
  }

  @Output() settingsChanged = new EventEmitter<MediaDeviceInfo>();

  constructor() {
    this.id = `device-select-${IdGenerator.getNext()}`;
  }

  onSettingsChanged(deviceId: string) {
    this.setAndEmitSelections(this.selectedId = deviceId);
  }

  private find(devices: MediaDeviceInfo[]) {
    if (devices && devices.length > 0) {
      return devices[0].deviceId;
    }

    return null;
  }

  private setAndEmitSelections(deviceId: string) {
    this.settingsChanged.emit(this.devices.find(d => d.deviceId === deviceId));
  }
}
