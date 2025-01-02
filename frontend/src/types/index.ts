export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    active: boolean;
}

export type FormMode = 'new' | 'edit' | 'delete' | 'view';