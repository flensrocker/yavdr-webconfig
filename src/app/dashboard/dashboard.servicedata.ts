export class ValueUnitData {
  value: string;
  unit: string;

  toString(): string {
    return `${this.value}${this.unit}`;
  }
}

export interface CpuData {
  cpu_usage: number[];
  cpu_num: number;
  load_average: number[];
}

export interface SystemData {
  release: string[];
  kernel: string;
  system_alias: string[];
  uptime: string;
}

export class DiskUsageData {
  total: number;
  used: number;
  free: number;
  percent: number;
  total_human: ValueUnitData;
  used_human: ValueUnitData;
  free_human: ValueUnitData;
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
  total_human: ValueUnitData;
  available_human: ValueUnitData;
  used_human: ValueUnitData;
  free_human: ValueUnitData;
  active_human: ValueUnitData;
  inactive_human: ValueUnitData;
  buffers_human: ValueUnitData;
  cached_human: ValueUnitData;
  shared_human: ValueUnitData;
}

export class SwapUsageData {
  total: number;
  used: number;
  free: number;
  percent: number;
  sin: number;
  sout: number;
  total_human: ValueUnitData;
  used_human: ValueUnitData;
  free_human: ValueUnitData;
  sin_human: ValueUnitData;
  sout_human: ValueUnitData;
}

export class TemperatureData {
  label: string;
  current: number;
  high: number;
  critical: number;
}

export class FanData {
  label: string;
  current: number;
}

export class SystemStatusData implements CpuData, SystemData {
  cpu_usage: number[];
  cpu_num: number;
  load_average: number[];
  disk_usage: DiskUsageData[];
  memory_usage: MemoryUsageData;
  swap_usage: SwapUsageData;
  temperatures: { [key: string]: TemperatureData[] };
  fans: { [key: string]: FanData[] };
  release: string[];
  kernel: string;
  system_alias: string[];
  uptime: string;
}
