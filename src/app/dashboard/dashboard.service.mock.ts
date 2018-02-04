import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  DashboardService,
  SystemStatusData,
} from './dashboard.service';

@Injectable()
export class DashboardServiceMock implements DashboardService {
  constructor(
  ) {
  }

  getSystemStatus(): Observable<SystemStatusData> {
    return Observable.of<SystemStatusData>({
      cpu_usage: [
        70.0,
        12.5
      ],
      cpu_num: 2,
      load_average: [
        1.32,
        0.69,
        0.27
      ],
      disk_usage: [
        {
          total: 58789298176,
          used: 8493568000,
          free: 47278977024,
          percent: 15.2,
          total_human: '54.8GB',
          used_human: '7.9GB',
          free_human: '44.0GB',
          device: '/dev/sda2',
          mountpoint: '/',
          fstype: 'ext4',
          opts: 'rw,relatime,errors=remount-ro,data=ordered'
        },
        {
          total: 172373409792,
          used: 3229589504,
          free: 160364146688,
          percent: 2.0,
          total_human: '160.5GB',
          used_human: '3.0GB',
          free_human: '149.4GB',
          device: '/dev/sda4',
          mountpoint: '/srv',
          fstype: 'ext4',
          opts: 'rw,relatime,data=ordered'
        },
        {
          total: 535805952,
          used: 4780032,
          free: 531025920,
          percent: 0.9,
          total_human: '511.0MB',
          used_human: '4.6MB',
          free_human: '506.4MB',
          device: '/dev/sda1',
          mountpoint: '/boot/efi',
          fstype: 'vfat',
          opts: 'rw,relatime,fmask=0077,dmask=0077,codepage=437,iocharset=iso8859-1,shortname=mixed,errors=remount-ro'
        }
      ],
      memory_usage: {
        total: 4105687040,
        available: 3339243520,
        percent: 18.7,
        used: 527130624,
        free: 3107729408,
        active: 491819008,
        inactive: 310185984,
        buffers: 30900224,
        cached: 439926784,
        shared: 8273920,
        total_human: '3.8GB',
        available_human: '3.1GB',
        used_human: '502.7MB',
        free_human: '2.9GB',
        active_human: '469.0MB',
        inactive_human: '295.8MB',
        buffers_human: '29.5MB',
        cached_human: '419.5MB',
        shared_human: '7.9MB'
      },
      swap_usage: {
        total: 4261408768,
        used: 0,
        free: 4261408768,
        percent: 0.0,
        sin: 0,
        sout: 0,
        total_human: '4.0GB',
        used_human: '0B',
        free_human: '4.0GB',
        sin_human: '0B',
        sout_human: '0B'
      },
      temperatures: {
        'coretemp': [{
          label: 'Package id 0',
          current: 37.0,
          high: 82.0,
          critical: 102.0
        }, {
          label: 'Core 0',
          current: 34.0,
          high: 82.0,
          critical: 102.0
        }, {
          label: 'Core 1',
          current: 34.0,
          high: 82.0,
          critical: 102.0
        }],
        'nct6775': [{
          label: 'SYSTIN',
          current: 26.0,
          high: 0.0,
          critical: null
        }, {
          label: 'CPUTIN',
          current: 25.0,
          high: 80.0,
          critical: 80.0
        }, {
          label: 'PECI Agent 0',
          current: 38.0,
          high: 80.0,
          critical: 80.0
        }, {
          label: 'PCH_CHIP_TEMP',
          current: 43.0,
          high: null,
          critical: null
        }, {
          label: 'PECI Agent 1',
          current: 0.0,
          high: 80.0,
          critical: 80.0
        }]
      },
      release: [
        'Ubuntu',
        '18.04',
        'bionic'
      ],
      kernel: '4.13.0-25-generic',
      system_alias: [
        'Linux',
        '4.13.0-25-generic',
        '#29-Ubuntu SMP Mon Jan 8 21:14:41 UTC 2018'
      ]
    });
  }
}
