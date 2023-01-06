import { IRepositoryNote } from "@adapters/notes.types"
import { IRepositoryAdapter } from "@adapters/repository.types"

class NoteRepository implements IRepositoryNote {
    constructor (private repository: IRepositoryAdapter) {
        this.repository = repository;
    }
    async setNote(){};
    async getNotes(){
        const notes = await this.repository.getNotes();
        return notes;
    };
}