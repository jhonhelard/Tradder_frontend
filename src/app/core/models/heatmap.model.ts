export interface HeatMapResultSetModel {
    id: string;
    name: string;
    discretion: string;
    value: (number | null)[];
    children: HeatMapChildrenModel[];
}

export interface HeatMapChildrenModel {
    id: string;
    name: string;
    discretion: string;
    value: (number | null)[];
}