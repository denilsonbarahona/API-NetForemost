export interface IRepositoryNote {
    setNote: (payload: INoteDTO) => Promise<{ status: number; message: string; }>;
    getNotes: () => Promise<INoteDTO[]>;
    getNote: (id: string) => Promise<INoteDTO[]>;
    updateNote: (id: string, payload: INoteDTO) => Promise<{ status: number; message: string; }>;
    deleteNote: (id: string) => Promise<{ status: number; message: string; }>;
}

export interface INoteDTO {
    id?: string;
    topic?: string;
    title: string;
    body: string;
    date: Date;
}