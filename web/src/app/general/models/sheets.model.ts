export interface SheetItem {
    id: string;
    item: string;
    amount: number;
    is_checked: boolean;
    created_at?: string;
    modified_at?: string;
}

export interface Sheet {
    id: string;
    title: string;
    created_at: string;
    items?: SheetItem[];
}