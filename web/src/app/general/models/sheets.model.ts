export interface SheetItem {
    item: string;
    amount: number;
    is_checked: boolean;
}

export interface Sheet {
    id: string;
    title: string;
    created_at: string;
    items?: SheetItem[];
}