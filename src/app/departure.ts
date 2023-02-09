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

export class NextDeparture {
    destination: string;
    time: string;
    platformNumber: string;
}

export enum Directions {
    "Alamein " = 1,
    "Belgrave " = 2,
    // Craigieburn = 3,
    "Cranbourne " = 4,
    // Mernda = 5,
    "Frankston " = 6,
    "Glen Waverley " = 7,
    // Hurstbridge = 8,
    "Lilydale "= 9,
    "Pakenham " = 11,
    "Sandringham " = 12,
    // StonyPoint = 13,
    // Sunbury = 14,
    // Upfield = 15,
    // Werribee = 16,  
    // Williamstown = 17,
    // ShowgroundsFlemingtonRacecourse = 1482
}
