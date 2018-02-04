export class DiskUsageData {
  total: number;
  used: number;
  free: number;
  percent: number;
  total_human: string;
  used_human: string;
  free_human: string;
  device: string;
  mountpoint: string;
  fstype: string;
  opts: string;
}

export class MemoryUsageData {
  total: number;
  available: number;
  percent: number;
  used: number;
  free: number;
  active: number;
  inactive: number;
  buffers: number;
  cached: number;
  shared: number;
  total_human: string;
  available_human: string;
  used_human: string;
  free_human: string;
  active_human: string;
  inactive_human: string;
  buffers_human: string;
  cached_human: string;
  shared_human: string;
}

export class SwapUsageData {
  total: number;
  used: number;
  free: number;
  percent: number;
  sin: number;
  sout: number;
  total_human: string;
  used_human: string;
  free_human: string;
  sin_human: string;
  sout_human: string;
}

export class TemperatureData {
  label: string;
  current: number;
  high: number;
  critical: number;
}

export class SystemStatusData {
  cpu_num: number;
  cpu_usage: number[];
  load_average: number[];
  disk_usage: DiskUsageData[];
  memory_usage: MemoryUsageData;
  swap_usage: SwapUsageData;
  temperatures: { [key: string]: TemperatureData[] };
  release: string[];
  kernel: string;
  system_alias: string[];
}
