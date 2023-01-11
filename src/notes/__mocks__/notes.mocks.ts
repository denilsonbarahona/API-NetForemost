import admin from "@config/firebase/firebase.config";
import { faker } from '@faker-js/faker';

export const getNotes = (items: number)=>{
    const notes = [];
    for (let i = 0; i < items; i++) {
        notes.push({
            topic: faker.lorem.word(),
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            date: admin.Timestamp?.fromDate(faker.date.past()),
        })
    }
    return notes;
}

export const getTransformedNotes = (note: any)=>{
    return {
        ...note,
        date: note?.date?.toDate()
    }
}