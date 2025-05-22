export interface BaseRecord {
    id?: string;
    category: 'plants' | 'birds' | 'animals';
    image?: string;
    created_at?: string;
    updated_at?: string;
    user_id?: string;
}

export interface BirdRecord extends BaseRecord {
    common_name: string;
    scientific_name: string;
    ebird_family?: string;
    habitat?: string;
    local_occurences?: string;
    nature_group: string[];
    global_g_rank?: string;
    ontario_s_rank?: string;
    canada_cosewic?: string;
    observation_history: {
        oberved_date: string;
        location: string;
    }[];
}

export interface Category {
    key: string;
    label: string;
}

export interface NatureGroup {
    [category: string]: Category[];
  }