# Codemotion Tickets

Questo è un progetto di supporto per l'EduPath del Codemotion "Sviluppare un'applicazione decentralizzata su blockchain".

Si tratta di un semplice smart contract che viene utilizzato in una dApp (decentralized app) di demo per vendere biglietti (demo) del Codemotion e poterne verificare il possesso.

### Installazione e configurazione

Alla prima esecuzione è necessario installare le dipendenze del progetto, lanciando il comando:

```npm install```

Se si desidera effettuare il deploy e l'invocazione del contratto su reti pubbliche di test (ad esempio Ropsten o Rinkeby), bisogna creare un file chiamato `.env`, che deve avere i parametri specificati in `.env.template` (i valori assegnati vanno personalizzati con la propria chiave privata e il link custom per accedere alle API della rete selezionata).

### Deploy e invocazione del contratto

Per il deploy in locale del contratto è predisposto uno script che può essere invocato tramite il comando:

```npx hardhat run scripts/deploy_codemotion_tickets.js```

Se si desidera effettuare il deploy su una rete specifica, è necessario aggiungere l'opzione `--network <NOME_RETE>`.

Per invocare il contratto ed eseguire l'acquisto e la verifica di un biglietto, è stato predisposto un task che può essere invocato con il comando:

```npx hardhat buyTicket --contract-address <INDIRIZZO_CONTRATTO>```

Anche in questo caso si deve aggiungere l'opzione `--network <NOME_RETE>` se si desidera invocare il task su una rete specifica.

### EduPath

L'EduPath "Sviluppare un'applicazione decentralizzata su blockchain" si compone dei seguenti episodi:

* **Episodio 1:** *Introduzione e presentazione dell'EduPath*

    Introduzione alla blockchain Ethereum e allo sviluppo di applicazioni decentralizzate mediante gli smart contract

* **Episodio 2:** *Setup dell'ambiente di lavoro*

    Setup dell'ambiente di sviluppo, descrizione dei tool e spiegazione degli elementi di cui si compone un'applicazione decentralizzata

* **Episodio 3:** *Scrivere dati sulla blockchain*

    Scrittura della prima funzione dello smart contract, che scrive dati sulla blockchain
    
    Puoi vedere il codice relativo a questo step con il comando `git checkout episode3`.

* **Episodio 4:** *Leggere dati dalla blockchain*

    Differenza tra le operazioni di lettura e di scrittura sulla blockchain, gas fee e ottimizzazione delle chiamate
    
    Puoi vedere il codice relativo a questo step con il comando `git checkout episode4`.

* **Episodio 5:** *Validare i dati: regole e best practices*

    Come eseguire la validazione dei dati in ingresso
    
    Puoi vedere il codice relativo a questo step con il comando `git checkout episode5`.

* **Episodio 6:** *Controllo degli accessi e sicurezza*

    Sistemi per garantire la sicurezza e il controllo sui contratti
    
    Puoi vedere il codice relativo a questo step con il comando `git checkout episode6`.

* **Episodio 7:** *Organizzare il codice: ereditarietà*

    Come funziona l'ereditarietà in Solidity e come è possibile sfruttarla per rendere il codice più gestibile
    
    Puoi vedere il codice relativo a questo step con il comando `git checkout episode7`.

* **Episodio 8:** *Come interagire con lo smart contract*

    Deploy e invocazione delle funzioni dello smart contract su una blockchain di test in locale
    
* **Episodio 9:** *Perché i test sono fondamentali*

    Come testare lo smart contract per evitare che i nostri bug rimangano per sempre online

* **Episodio 10:** *Deploy su blockchain pubblica*

    Deploy su rete di test e interazione con il contratto su rete pubblica
