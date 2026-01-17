
## STACK TECNOLOGICO

#### UI LIBRARY
[React 19](https://reactjs.org/)

#### UI COMPONENTS
[MUI 7](https://mui.com/material-ui/getting-started/) 

#### STATE MANAGEMENT
[@priolo/jon](https://github.com/priolo/jon)

#### BUILDER
[Vite 7](https://vitejs.dev/)

#### MOCK API
[MSW 2](https://mswjs.io/)

#### CLIENT ROUTING
[React Router 7](https://reactrouter.com/)  



## INSTALLATION

### DEVELOPMENT

1. Installa le dipendenze npm  
`npm install`
1. Crea il file `.env.development` nella root del progetto con il seguente contenuto:  
	```
	VITE_API_MOCK=true
	```
1. Avvia il progetto in modalità DEV  
`npm run dev`
1. Apri il browser su  
   `http://localhost:5173/app`

### PRODUCTION

1. Installa le dipendenze npm  
`npm install`
1. Compila il progetto  
`npm run build`
1. Crea il file `.env.production` nella root del progetto con il seguente contenuto:  
	```
	VITE_API_MOCK=false
	```
1. Avvia un server statico sulla cartella `dist`  
	(p.e. `npx serve dist`)
1. Apri il browser su  
   `http://localhost:5000/app`


## STRUTTURA

#### STORES
`src\stores`  
**CONTROLLER** per componenti specializzati come le PAGES.  
Si occupa di mantenere lo stato e la logica di business dell'applicazione.  
Gli STORE hanno dependency injection per renderli testabili e indipendenti.
TEST: si possono testare con unit-test.

#### PAGES
`src\pages`  
**VIEW** di alto livello legati ad uno STORE.  
Non hanno logica di business.  
Si occupano solo della presentazione e interazione con l'utente.

#### TYPES
`src\types`  
**MODEL** (POCO) entità dell'applicazione.

#### COMPONENTS
`src\components`  
Componenti riutilizzabili.   
Adatti a presentare o modificare un dato specifico (p.e. una textbox).  
Non hanno dipendenze.
TEST: testabili con `testing-library`

#### LAYOUT
`src\layout`  
Componenti di layout.  
Si occupano di strutturare e la navigazione delle PAGES. 
Collegati a STOREs specifici per la gestione della presentazone a livello globale.

#### API
`src\api\tasks.ts`  
Espone i metodi per la comunicazione con il backend.  
`src\api\tasks.mock.ts`  
Simula le chiamate al backend per i test e la modalità MOCK.  


### MOCK

#### API MOCK
`src\mock\handlers.ts`  
Simula le risposte del backend utilizzando MSW.

#### REPOSITORY
`src\mock\repository.ts`  
Simula un DB utilizzando localStorage.  

#### PLUGINS
`src\plugins.ts`  
Servizi specializzati per l'applicazione:  
- Recupero dei valori nell QueryString.  
- Inizializzazione servizion MSW per la modalità MOCK.  
- Gestione della comunicazione AJAX.  



## UX e ITERAZIONE CON A.I.
Questo progetto è stato realizzato utilizzando l'AI solo come copilota.  
Nello specifico sono state generate alcune configurazioni di progetto (per esempio vite.config.js) e alcuni test che ho revisionato.  
L'architettura e il 90% del codice è stati interamente progettati da me.  

A fine progetto ho provato a far generare i "requirements.md" su alcune piattaforma di "vibe coding":
- Lavabel
- Replit
- Base44

Lovable è il migliore:  
https://project-todo-master.lovable.app/tasks  

La posizione dei bottoni principali è sul HEADER, simile alla mia soluzione:
In questa maniera, specie per la tabella, si evita la gestione del footer.

Sulla mia la modifica dello STATUS avviene tramite DIALOG per essere compatibile con il mobile.

Loveable non gestisce gli stati da QueryString (filtro testo, ordinamento)  
l'url non puo' essere condiviso per ripristinare lo stato dell'applicazione.  

Loveable, secondo me, in generale è troppo complessa, ci sono troppe parti interattive a schermo soprattutto se si attiva la multiselezione.


## TESTING
Per eseguire i test:  
`npm run test`

quindi vengono eseguiti gli unit-test   
- sugli STORES  
`src/stores/task/detail.test.ts`  
`src/stores/task/list.test.ts`  
- sulle UTILS  
`src/plugins/urlParams/url.test.ts`  
- sui COMPONENTS  
`src/components/TableCellSort.test.tsx`  
`src/components/StatusDialog.test.tsx`  

