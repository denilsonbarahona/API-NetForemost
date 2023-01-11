import { IRepositoryNote, IRepositoryAdapter, INoteDTO, IValidate, IValidator } from "types"

class NoteRepository implements IRepositoryNote, IValidate {
    constructor (
        private repository: IRepositoryAdapter,
        private validator?: IValidator,
    ) {
        this.repository = repository;
        this.validator = validator;
    }

    async setNote(payload: INoteDTO){
        try {
            const validation = await this.validate<INoteDTO>(payload);
            if (validation.status === 400) {
                return validation;
            }
            await this.repository.setNote(payload);
            return { status: 200, message: "Note created" };
        } catch (error) {
            throw new Error("Error setting note");
        }
    };

    async updateNote (id: string, payload: INoteDTO) {
        try {
            const validation = await this.validate<INoteDTO>(payload);
            if (validation.status === 400) {
                return validation;
            }
            await this.repository.updateNote(id, payload);
            return { status: 200, message: "Note updated" };
        } catch (error: unknown) {
            throw new Error("Error updating note");
        }
    };

    async deleteNote (id: string) {
        try {
            await this.repository.deleteNote(id);
            return { status: 200, message: "Note deleted" };
        } catch {
            throw new Error("Error deleting note");
        }
    };

    async getNotes(){
        try {
            const notes = await this.repository.getNotes();
            return notes;
        } catch {
            throw new Error("Error getting notes");
        }
    };

    async getNote (id: string) {
        try {
            const note = await this.repository.getNote(id);
            return note;
        } catch {
            throw new Error("Error getting note");
        }
    };

    async validate<T extends object>(payload: T) {
        const response = await this.validator?.validation(payload);
        if (response) {
            return { status: 200, message: "Payload validated" };
        }
        return { status: 400, message: "Invalid payload"}
    };

}

export default NoteRepository;