export class Departure {
    stop_id: number;
    route_id: number;
    run_ref: string;
    direction_id: number;
    estimated_departure_utc: string;
    platform_number: string;
    destination_name: string;
    express_stop_count: number;
}

export class RunRef {
    destination_name: string;
}