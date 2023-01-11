import { vi, describe, test, expect, beforeAll } from "vitest";
import { INoteDTO} from 'types';
import { faker } from '@faker-js/faker';
import { getNotes } from '@notes/__mocks__/notes.mocks';
import NoteRepository from '@notes/core/notes';
import NoteDTO from '@notes/core/schema';
import FirebaseRepository from '@notes/infrastructure/firebase.adapter';
import Validator from '@utils/validators';

describe('notes core', () => {
    beforeAll(()=> {
        vi.mock("@notes/infrastructure/firebase.adapter", () => {
            const FirebaseRepository = vi.fn(() => ({
                setNote: vi.fn(),
                updateNote: vi.fn(),
                deleteNote: vi.fn(),
                getNotes: vi.fn().mockResolvedValue(getNotes(3)),
                getNote: vi.fn().mockResolvedValue(getNotes(1)),
            }));
            return {
                default : FirebaseRepository
            };
        });
    })

    describe('testing invalid payload', () => {

        test('setNote should return a 400 status code when the payload is invalid', async () => {
            const repository = new NoteRepository(new FirebaseRepository(), new Validator());
            const fakepayload = {
                topic: faker.datatype.number(),
                body: faker.lorem.paragraph(),
                date: faker.date.past()
            };
            const NoteSchema = new NoteDTO();
            const payload = NoteSchema.create(fakepayload as any);
            const response = await repository.setNote(payload);
            expect(response.status).toBe(400);
        })

        test('updateNote should return a 400 status code when the payload is invalid', async () => {
            const repository = new NoteRepository(new FirebaseRepository(), new Validator());
            const fakepayload = {
                topic: faker.datatype.number(),
                body: faker.lorem.paragraph(),
                date: faker.date.past()
            };
            const NoteSchema = new NoteDTO();
            const payload = NoteSchema.create(fakepayload as any);
            const response = await repository.updateNote('123', payload);
            expect(response.status).toBe(400);
        })
    })

    describe('testing id not found', () => {
        test('updateNote should return a 200 status code even when the id is not found', async () => {
            const repository = new NoteRepository(new FirebaseRepository(), new Validator());
            const fakepayload:INoteDTO = {
                topic: faker.lorem.word(),
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraph(),
                date: faker.date.past()
            };
            const NoteSchema = new NoteDTO();
            const payload = NoteSchema.create(fakepayload as any);
            const response = await repository.updateNote('123', payload);
            expect(response.status).toBe(200);
        })

        test('deleteNote should return a 200 status code even when the id is not found', async () => {
            const repository = new NoteRepository(new FirebaseRepository(), new Validator());
            const response = await repository.deleteNote('123');
            expect(response.status).toBe(200);
        });
    })

    describe('returning data', () => {
        test('getNotes should return an array of notes', async () => {
            const repository = new NoteRepository(new FirebaseRepository(), new Validator());
            const response = await repository.getNotes();
            expect(Array.isArray(response)).toBe(true);
        })

        test('getNote should return a array instance', async () => {
            const repository = new NoteRepository(new FirebaseRepository(), new Validator());
            const response = await repository.getNote('123');
            expect(Array.isArray(response)).toBe(true);
        })
    });
    
});