import { vi, describe, test, expect, beforeAll, afterEach, SpyInstance } from "vitest";
import { INoteDTO} from 'types';
import { faker } from '@faker-js/faker';
import { getNotes, getTransformedNotes } from '@notes/__mocks__/notes.mocks';
import admin from '@config/firebase/firebase.config';
import FirebaseRepository from '@notes/infrastructure/firebase.adapter';

describe('notes infrastructure', () => {

    describe('testing void functions', () => {
        let spy: SpyInstance<unknown[], unknown>;
        beforeAll(()=> {
            spy = vi.spyOn(admin(), 'collection').mockImplementation(() => ({
                add: vi.fn(),
                doc: vi.fn().mockImplementation(() => ({
                    update: vi.fn(),
                    delete: vi.fn(),
                })),
            }))
        })

        afterEach(() => {
            spy.mockClear();
        })

        test('firebase should be callable when set a new note', () => {
            const repository = new FirebaseRepository();
            const payload:INoteDTO = {
                topic: faker.lorem.word(),
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraph(),
                date: faker.date.past()
            };
            repository.setNote(payload);
            expect(spy).toBeCalledTimes(1);
        })
    
        test('firebase should be callable when update a note', () => {
            const repository = new FirebaseRepository();
            const payload:INoteDTO = {
                topic: faker.lorem.word(),
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraph(),
                date: faker.date.past()
            };
            repository.updateNote('123', payload);
            expect(spy).toBeCalledTimes(1);
        })
    
        test('firebase should be callable when delete a note', () => {
            const repository = new FirebaseRepository();
            repository.deleteNote('123');
            expect(spy).toBeCalledTimes(1);
        })
    })

    describe('testing return values', () => {
        const noteFake = getNotes(1)[0];
        let spy: SpyInstance<unknown[], unknown>;
    
        const manyNotes = getNotes(3).map((item) => ({
            data: () => item,
            id: faker.datatype.uuid()
        }));

        beforeAll(()=>{
            spy = vi.spyOn(admin(), 'collection').mockImplementation(() => ({
                doc: vi.fn().mockImplementation(() => ({
                    get: vi.fn().mockImplementation(() => ({
                        data: () => noteFake,
                        id: '123'
                    })),
                })),
                get: vi.fn().mockImplementation(() => ({
                    docs: manyNotes
                })),
            }))
        })

        afterEach(() => {
            spy.mockClear();
        })
    
        test('firebase should return data when get a note', async() => {
            const repository = new FirebaseRepository();
            const note = await repository.getNote('123');
            expect(note).toEqual([{ ...getTransformedNotes(noteFake), id: '123' }]);
        })
    
        test('firebase should return data when get notes', async() => {
            const repository = new FirebaseRepository();
            const notes = await repository.getNotes();
            expect(notes.length).toEqual(manyNotes.length);
        });
    })

    describe('testing  return empty data', () => {
        let spy: SpyInstance<unknown[], unknown>;
        beforeAll(()=>{
            spy = vi.spyOn(admin(), 'collection').mockImplementation(() => ({
                doc: vi.fn().mockImplementation(() => ({
                    get: vi.fn().mockImplementation(() => ({
                        data: () => undefined,
                        id: faker.datatype.uuid()
                    })),
                })),
                get: vi.fn().mockImplementation(() => ({
                    docs: []
                })),
            }))
        })

        afterEach(() => {
            spy.mockClear();
        })

        test('firebase should return empty data when get a note', async() => {
            const repository = new FirebaseRepository();
            const note = await repository.getNote('123');
            expect(note.length).toBe(0);
        })

        test('firebase should return empty data when get notes', async() => {
            const repository = new FirebaseRepository();
            const notes = await repository.getNotes();
            expect(notes.length).toBe(0);
        })
    })
})
