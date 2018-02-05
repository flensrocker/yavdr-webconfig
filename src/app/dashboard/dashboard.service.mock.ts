import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  DashboardService,
  SystemStatusData,
} from './dashboard.service';

@Injectable()
export class DashboardServiceMock implements DashboardService {
  private static _systemStatus: SystemStatusData = JSON.parse(`
  {
    "cpu_usage": [
        90.0,
        0.0
    ],
    "cpu_num": 2,
    "load_average": [
        1.28,
        1.01,
        0.61
    ],
    "disk_usage": [
        {
            "total": 58789298176,
            "used": 8900341760,
            "free": 46872203264,
            "percent": 16.0,
            "total_human": {
                "value": "54.8",
                "unit": "GB"
            },
            "used_human": {
                "value": "8.3",
                "unit": "GB"
            },
            "free_human": {
                "value": "43.7",
                "unit": "GB"
            },
            "device": "/dev/sda2",
            "mountpoint": "/",
            "fstype": "ext4",
            "opts": "rw,relatime,errors=remount-ro,data=ordered"
        },
        {
            "total": 535805952,
            "used": 4780032,
            "free": 531025920,
            "percent": 0.9,
            "total_human": {
                "value": "511.0",
                "unit": "MB"
            },
            "used_human": {
                "value": "4.6",
                "unit": "MB"
            },
            "free_human": {
                "value": "506.4",
                "unit": "MB"
            },
            "device": "/dev/sda1",
            "mountpoint": "/boot/efi",
            "fstype": "vfat",
            "opts": "rw,relatime,fmask=0077,dmask=0077,codepage=437,iocharset=iso8859-1,shortname=mixed,errors=remount-ro"
        },
        {
            "total": 172373409792,
            "used": 3229589504,
            "free": 160364146688,
            "percent": 2.0,
            "total_human": {
                "value": "160.5",
                "unit": "GB"
            },
            "used_human": {
                "value": "3.0",
                "unit": "GB"
            },
            "free_human": {
                "value": "149.4",
                "unit": "GB"
            },
            "device": "/dev/sda4",
            "mountpoint": "/srv",
            "fstype": "ext4",
            "opts": "rw,relatime,data=ordered"
        }
    ],
    "memory_usage": {
        "total": 4105695232,
        "available": 3338842112,
        "percent": 18.7,
        "used": 526729216,
        "free": 3103604736,
        "active": 494903296,
        "inactive": 307888128,
        "buffers": 33423360,
        "cached": 441937920,
        "shared": 8269824,
        "total_human": {
            "value": "3.8",
            "unit": "GB"
        },
        "available_human": {
            "value": "3.1",
            "unit": "GB"
        },
        "used_human": {
            "value": "502.3",
            "unit": "MB"
        },
        "free_human": {
            "value": "2.9",
            "unit": "GB"
        },
        "active_human": {
            "value": "472.0",
            "unit": "MB"
        },
        "inactive_human": {
            "value": "293.6",
            "unit": "MB"
        },
        "buffers_human": {
            "value": "31.9",
            "unit": "MB"
        },
        "cached_human": {
            "value": "421.5",
            "unit": "MB"
        },
        "shared_human": {
            "value": "7.9",
            "unit": "MB"
        }
    },
    "swap_usage": {
        "total": 4261408768,
        "used": 0,
        "free": 4261408768,
        "percent": 0.0,
        "sin": 0,
        "sout": 0,
        "total_human": {
            "value": "4.0",
            "unit": "GB"
        },
        "used_human": {
            "value": "0",
            "unit": "B"
        },
        "free_human": {
            "value": "4.0",
            "unit": "GB"
        },
        "sin_human": {
            "value": "0",
            "unit": "B"
        },
        "sout_human": {
            "value": "0",
            "unit": "B"
        }
    },
    "temperatures": {
        "coretemp": [
            {
                "label": "Package id 0",
                "current": 45.0,
                "high": 82.0,
                "critical": 102.0
            },
            {
                "label": "Core 0",
                "current": 45.0,
                "high": 82.0,
                "critical": 102.0
            },
            {
                "label": "Core 1",
                "current": 42.0,
                "high": 82.0,
                "critical": 102.0
            }
        ],
        "nct6775": [
            {
                "label": "SYSTIN",
                "current": 32.0,
                "high": 0.0,
                "critical": null
            },
            {
                "label": "CPUTIN",
                "current": 33.0,
                "high": 80.0,
                "critical": 80.0
            },
            {
                "label": "PECI Agent 0",
                "current": 45.0,
                "high": 80.0,
                "critical": 80.0
            },
            {
                "label": "PCH_CHIP_TEMP",
                "current": 53.0,
                "high": null,
                "critical": null
            },
            {
                "label": "PECI Agent 1",
                "current": 0.0,
                "high": 80.0,
                "critical": 80.0
            }
        ]
    },
    "fans": {
        "nct6775": [
            {
                "label": "",
                "current": 0
            },
            {
                "label": "",
                "current": 958
            },
            {
                "label": "",
                "current": 0
            },
            {
                "label": "",
                "current": 0
            }
        ]
    },
    "release": [
        "Ubuntu",
        "18.04",
        "bionic"
    ],
    "kernel": "4.13.0-32-generic",
    "system_alias": [
        "Linux",
        "4.13.0-32-generic",
        "#35-Ubuntu SMP Thu Jan 25 09:13:46 UTC 2018"
    ],
    "uptime": "-1 day, 23:11:42"
  }`);

  constructor(
  ) {
  }

  getSystemStatus(): Observable<SystemStatusData> {
    return Observable.of<SystemStatusData>(DashboardServiceMock._systemStatus);
  }
}
