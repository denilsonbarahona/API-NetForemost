import { IRepositoryAdapter} from "@adapters/repository.types";
import admin from "@config/firebase/firebase.config";

export class FirebaseRepository implements IRepositoryAdapter {
  async setNote (){
    console.log("setNote");
  };

  async getNotes () {
    const snapshot = await admin.collection("notes").get();
    const notes = snapshot.docs.map((doc: any) => {
      return { data: doc.data(), id: doc.id };
    });
    return notes;
  };
}