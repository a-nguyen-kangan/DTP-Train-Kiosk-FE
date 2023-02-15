export class Departure {
    direction_id: number;
    estimated_departure_utc: string;
    express_stop_count: number;
    platform_number: string;
    run_id: string;
}

export class RunRef {
    destination_name: string;
}

export class NextDeparture {
    destination: string;
    time: string;
    platformNumber: string;
}

export enum RouteID {
    "Alamein" = 1,
    "Belgrave" = 2,
    // Craigieburn = 3,
    "Cranbourne" = 4,
    // Mernda = 5,
    "Frankston" = 6,
    "Glen Waverley" = 7,
    // Hurstbridge = 8,
    "Lilydale" = 9,
    "Pakenham" = 11,
    "Sandringham" = 12,
    // StonyPoint = 13,
    // Sunbury = 14,
    // Upfield = 15,
    // Werribee = 16,  
    // Williamstown = 17,
    // ShowgroundsFlemingtonRacecourse = 1482
}

export const directionID: any[] = [
    { line: "Alamein", id: 0 },
    { line: "Belgrave", id: 3 },
    { line: "Cranbourne", id: 4 },
    { line: "Frankston", id: 5 },
    { line: "Glen Waverley", id: 6 },
    { line: "Lilydale", id: 8 },
    { line: "Pakenham", id: 10 },
    { line: "Sandringham", id: 11 },
    { line: "Flinders Street", id: 1 },
    //{ line: "City Loop", id: "N/A" }
];
