# Progetto: "Gestione di Task Avanzato"

Crea una piccola applicazione a pagina singola (SPA) per la gestione di task (tipo To-Do List).

## Requisiti funzionali

1. Visualizzazione dei task: Mostra un elenco di task. Per ogni task, visualizza: titolo, descrizione (breve), stato (aperto, in corso, completato), e data di creazione.
2. Aggiunta di un nuovo task: Un form per aggiungere nuovi task (solo titolo e descrizione inizialmente).
3. Modifica e eliminazione: Possibilità di modificare i dettagli di un task esistente e di eliminarlo.
4. Cambio di stato: Un modo semplice per cambiare lo stato di un task (es. un pulsante o un menu a discesa).
5. Persistenza dei dati: I task devono essere salvati e caricati in modo che rimangano visibili dopo un ricaricamento della pagina (implementa un semplice mock di API Rest).
6. Validazione del form: Implementa una validazione di base per i form (es. titolo obbligatorio).

## Requisiti tecnici

1. State Management: Utilizza un sistema di gestione dello stato non integrato in React (es. Redux, Redux Toolkit, Zustand, Jotai). In alternativa, se si usano solo gli Hook nativi, la gestione dello stato globale deve essere implementata in modo estremamente pulito ed efficiente (es. useReducer + Context).
2. Preferibilmente scrivi il progetto in TypeScript.
3. Utilizza React Router DOM per implementare due viste principali (es. /tasks per l'elenco e /tasks/new per la creazione, o /tasks/:id per la modifica).
4. Integrazione API Mock: Simula l'interazione con un backend, usando una libreria come Axios/Fetch per "leggere" e "scrivere" i task in modo asincrono (anche se i dati vengono salvati localmente o in un file JSON).

## Opzionali

1. Scrivi test unitari significativi (es. per un custom hook, per una logica complessa o per un componente cruciale) utilizzando la libreria che preferisci.Istruzioni di Consegna
2. Fornisci il codice sorgente in un repository Git pubblico (GitHub, GitLab, Bitbucket).
3. Includi un file README.md che contenga:
   - Istruzioni chiare per l'installazione delle dipendenze e l'avvio del progetto (npm install, npm start).
   - Istruzioni per l'esecuzione dei test (npm test).
   - Brevi note sulle scelte di architettura e delle librerie utilizzate