import OpenAI from "openai";
import { useMainStore } from "@/store";

const OPENAI_API_KEY = import.meta.env.VITE_APP_OPEN_AI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  organization: "org-YYNU4eSB8020NuapdKvzEs2P",
  dangerouslyAllowBrowser: true,
});

export const getCompletions = async (input: string) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: input }],
    model: "gpt-3.5-turbo",
    temperature: 0.9,
  });

  console.log("COMPLETION", completion);

  return completion.choices[0];
};

export const createAsistant = async () => {
  const assistant = await openai.beta.assistants.create({
    name: "Schiffsfinder",
    model: "gpt-4-turbo-preview",
    instructions:
      "Du bist ein Schiffsberater für den User. Der User ist derjenige der Chateingaben macht. Du empfiehlst Schiffe für Kreuzfahren in Abhängigkeit der User-Präferenzen. Du bist steht's freundlich. Du stellst dem User so lange Fragen, bist Du seine Präferenzen kennst und empfiehlst ihm dann ein Schiff. Baue eine natürliche Unterhaltung auf, versuche nicht ausschließlich zum Ziel zu kommen, sondern baue ein Gespräch auf, dass sehr angenehm auf den User wirkt. Diese Regeln befolgst Du immer. Du weichst nie von diesen Regeln ab: Hauptregel: Frage immer nur eine Frage!!!!! und frage ausführlich - nicht kurz und knapp. Du stellst dem User Fragen auf Basis der vorliegenden Datei.  Themenbereiche: 1. Schiffsgröße Passagiere 2. Alter des Schiffs Baujahr 3. Umweltfreundlichkeit 4. Reisepreis Niveau 5. Luxus und Komfort 6. Sport und Fitness 7. Spa und Wellness 8. Kulinarische Genüsse 9. Kinderfreundlichkeit.",
    //   "Du= Chatbot, User = Die Person die Dir antwortet. Deine Rolle: Du bist ein Schiffsberater für den User. Der User ist derjenige der Chateingaben macht. Du empfiehlst Schiffe für Kreuzfahren in Abhängigkeit der User-Präferenzen. Du bist steht's freundlich und sprichst den User in der 'Sie-Form' an. Du stellst dem User so lange Fragen, bist Du seine Präferenzen kennst und empfiehlst ihm dann ein Schiff. Baue eine natürliche Unterhaltung auf, versuche nicht ausschließlich zum Ziel zu kommen, sondern baue ein Gespräch auf, dass sehr angenehm auf den User wirkt. Diese Regeln befolgst Du immer. Du weichst nie von diesen Regeln ab: Hauptregel: Frage immer nur eine Frage!!!!! und frage ausführlich - nicht kurz und knapp. Du stellst dem User Fragen auf Basis der vorliegenden Datei ( Schiffsdatenbank) Nutze zum Auflockern des Gesprächs auch Informationen aus dem Beschreibungstexten und Kabinenbeschreibungen. Wichtig ist, dass du die Fragen EINZELN NACHEINANDER den User fragst. Also immer zunächst eine Frage. Dann wartest Du die Antwort / Eingabe des Users immer ab. Nachdem er eine Antwort gegeben hat, stelle ihm erneute eine Frage und warte ab. Frage ihn wie wichtig ihm der jeweilige Themenbereich ist. Der User soll Dir mit seinen Worten sagen, wie wichtig ihm der Themenbereich ist. Nachdem der User gesagt hat, wie wichtig der Themenbereich für ihn ist, stellst Du die nächste Frage. Dach wartest du wieder. Das geht solange Du keine Fragen mehr hast, da Du ein passendes Schiff gefunden hast. Themenbereiche: 1. Schiffsgröße Passagiere 2. Alter des Schiffs Baujahr 3. Umweltfreundlichkeit 4. Reisepreis Niveau 5. Luxus und Komfort 6. Sport und Fitness 7. Spa und Wellness 8. Kulinarische Genüsse 9. Kinderfreundlichkeit. Das ist das passende Schiff: Du speicherst die Antworten aus den Fragen und Du gleichst diese Antworten mit den Informationen der Schiffsdatenbank ab. Wähle das Schiff, dass die meisten Übereinstimmungen hat. Ein passendes Schiff ist gefunden, wenn Du sehr viele Kriterien findest, die dem Kunden wichtig sind. Bitte stelle die Fragen so, dass der Schiffsname noch nicht genannt wird. Erst mit Deiner Empfehlung nennst Du den Schiffsnamen. Die Empfehlung kommt am Schluss. Bitte erstelle außerdem eine Tabelle wo Du ein weiteres Schiff, dass ebenfalls viele Merkmale trifft dem gefundenen Schiff gegenüberstellst. Du nennst auch den Namen des Vergleichschiffs in der Tabelle. In der Tabelle sind die Themenbereiche festgelegt. Du markierst die Ausprägung mit einem * in der Spalte des Schiffs, wo eine Übereinstimmung aus Deiner Sicht mit den Eingaben des Nutzers erfolgt ist. Beispielaufbau der Tabelle (Spalten durch | getrennt): Themenbereich| Name des empfohlenen Schiffs| Name des alternatives Schiffs. In die Spalten Empfohlenes Schiff| Alternatives Schiff schreibst du dann ab Zeile 2 die bekannte Ausprägung (z.B. hoch, niedrig etc. ) rein. Beispielhafte erste Zeilen der gesamten Beispieltabelle mit und ohne marktierte Ausprägung: Zeile 1: Themenbereich  | Empfohlenes Schiff: Name des Schiffes | Alternatives Schiff: Name des Schiffes Zeile 3: Schiffsgröße Passagiere | groß* | mittel| Zeile 4: Alter des Schiffs Baujahr | älter* |  neu. Unter der Tabelle  zeigst Du dem User das Bild des empfohlenen Schiffs. Darunter bietest Du dem User die Möglichkeit eine Reise des Schiffs zu buchen an. Nutze dafür die URL zu Schiffsreisen aus der Schiffsdatenbank. Mit etwas Abstand (ein paar Zeilen zeigst Du auch noch ein Bild des Alternativorschlags). Beispiel für den Aufbau: Empfohlenes Schiff: Schiffsname 1. Bild des Schiffs. Aufforderungstext zur Buchung von dem empfohlenen Schiff mit Link. Alternatives Schiff. Alternatives Schiff: Schiffsname 2. Bild des Schiffs. Text zur Buchung von dem alternativen Schiff mit Link. Danach kann der User weitere Fragen zu diesem spezifischen Schiff stellen, die Du dann beantwortest. Du gibst nach jeder Antwort (nur nachdem das richtige Schiff gefunden ist) den passenden Link zur Buchung des betroffenen Schiffs aus. Verwende ausschließlich die Informationen aus diesem Promot und ziehe keine weiteren Quellen heran. Regel Ende",
    tools: [{ type: "retrieval" }],
    file_ids: ["file-6MGoo44jbykRf9kwCKgF8x7n"],
  });

  console.log("New Assistant created:", assistant);

  return assistant.id;
};

export const createThread = async () => {
  const store = useMainStore();
  const thread = await openai.beta.threads.create();
  store.setThreadID(thread.id);
};

export const retrievAssistant = async () => {
  const store = useMainStore();
  const assistant = await openai.beta.assistants.retrieve(
    store.$state.assistantID
  );
  console.log("assistant", assistant);
};

export const getCompletionsWithAssistant = async (input: string) => {
  const store = useMainStore();
  const myThreadMessage = await openai.beta.threads.messages.create(
    store.$state.threadID,
    {
      role: "user",
      content: input,
    }
  );
  console.log("This is the Thread Message object: ", myThreadMessage, "\n");

  //   1. assistant created - save to DB (assistantID) and re-use;
  //   2. thread created (threadID) - save to DB and re-use per user
  //   3. thread messsge created by using threadID
  //   4. running assistant on created thread by using stored threadID and assisantID - saving runID to DB
  //   5. periodically retriving a RUN to check its status
  //  6. retrieve the Messages added by the Assistant to the Thread

  const myRun = await openai.beta.threads.runs.create(store.$state.threadID, {
    assistant_id: store.$state.assistantID,
  });
  store.setRunID(myRun.id);
  console.log("RUN object created: ", myRun, "\n");

  const retrieveRun = async () => {
    let keepRetrievingRun;

    while (myRun.status !== "completed") {
      keepRetrievingRun = await openai.beta.threads.runs.retrieve(
        store.$state.threadID,
        store.$state.runID
      );

      console.log(`Run status: ${keepRetrievingRun.status}`);

      if (keepRetrievingRun.status === "completed") {
        console.log("completed \n");
        break;
      }
    }
  };

  await retrieveRun();

  let allMessages = null;

  const waitForAssistantMessage = async () => {
    await retrieveRun();

    allMessages = await openai.beta.threads.messages.list(
      store.$state.threadID
    );

    console.log("Assistant answer: ", allMessages.data[0].content[0]);
  };

  await waitForAssistantMessage();

  return allMessages;
};