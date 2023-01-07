import { IRepositoryAdapter, INoteDTO} from "types";
import admin from "@config/firebase/firebase.config";

class FirebaseRepository implements IRepositoryAdapter {
  async setNote (payload: INoteDTO) {
    await admin().collection("notes").add({ ...this.#getPayloadWithTimestamp(payload) }); 
  };

  async updateNote (id: string, payload: INoteDTO) {
    try {
      await admin().collection("notes").doc(id).update({ ...this.#getPayloadWithTimestamp(payload) });
    } catch {}
  };

  async deleteNote (id: string) {
    await admin().collection("notes").doc(id).delete();
  }

  async getNotes () {
    const snapshot = await admin().collection("notes").get();
    const notes = snapshot.docs.map((doc: any) => {
      return { ...doc.data(), date: doc.data()?.date?.toDate(), id: doc.id } as INoteDTO;
    });
    return notes as INoteDTO[];
  };

  async getNote(id: string) {
    const snapshot = await admin().collection("notes").doc(id).get();
    if (!snapshot.data()) {
      return [];
    }
    const note = [{ ...snapshot.data(), date: snapshot.data()?.date?.toDate(), id: snapshot.id } as INoteDTO];
    return note;
  }

  #getPayloadWithTimestamp (payload: INoteDTO) {
    return {
      ...payload,
      date: admin.Timestamp?.fromDate(new Date(payload.date))
    }
  }
}

export default FirebaseRepository;