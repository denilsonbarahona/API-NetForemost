import express, { Request, Response } from 'express';
import NoteRepository from '@notes/core/notes';
import FirebaseRepository from '@notes/infrastructure/firebase.adapter';
import NoteDTO from '@notes/core/schema';
import Validator from '@utils/validators';

const router = express.Router();

router.get('/', async(_req:Request, res:Response) => {
    const repository = new NoteRepository(new FirebaseRepository());
    try {
        const notes = await repository.getNotes();
        res.status(200).json(notes);
    } catch (error: unknown) {
        res.status(500).json((error as Error).message);
    }
});

router.get('/:id', async(req:Request, res:Response) => {
    const repository = new NoteRepository(new FirebaseRepository());
    try {
        const note = await repository.getNote(req.params.id);
        res.status(200).json(note);
    } catch (error: unknown) {
        res.status(500).json((error as Error).message);
    }
});

router.post('/', async(_req:Request, res:Response) => {
    const NoteSchema = new NoteDTO();
    const payload = NoteSchema.create(_req.body);
    const repository = new NoteRepository(new FirebaseRepository(), new Validator());
    try {
        const response = await repository.setNote(payload);
        res.status(response.status).json(response.message);
    } catch (error: unknown) {
        res.status(500).json((error as Error).message);
    }
});

router.put('/:id', async(_req:Request, res:Response) => {
    const NoteSchema = new NoteDTO();
    const payload = NoteSchema.create(_req.body);
    const repository = new NoteRepository(new FirebaseRepository(), new Validator());
    try {
        const response = await repository.updateNote(_req.params.id, payload);
        res.status(response.status).json(response.message);
    } catch (error: unknown) {
        res.status(500).json((error as Error).message);
    }
});

router.delete('/:id', async(_req:Request, res:Response) => {
    const repository = new NoteRepository(new FirebaseRepository());
    try {
        const response = await repository.deleteNote(_req.params.id);
        res.status(response.status).json(response.message);
    } catch (error: unknown) {
        res.status(500).json((error as Error).message);
    }
});

export default router;