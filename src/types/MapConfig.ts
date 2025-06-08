export interface MapConfig {
    type: string;
    data_source: string;
    revision?: string;
    date_range?: string;
    from: string | null;
    to: string | null;
}