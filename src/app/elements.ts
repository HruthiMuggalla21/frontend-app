export interface Elements{
    sensor_name: string;
    description: string;
    unit: string;
    use_in_optimization:boolean;
    current_value:number;
    optimized_value:number;
    operator_low:number;
    operator_high:number;
    status:boolean;
  }