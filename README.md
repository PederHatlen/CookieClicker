# CookieClicker

Dette er Server funksjonaliteten minus Web-APIen *([https://github.com/Zkrgu/cookie-clicker](https://github.com/Zkrgu/cookie-clicker))* 
Dette er også min egen klikkerklient (**/client/**)

## Oppsett

---

### Server

- Valgfritt os (Vi bruker debian)
- DNS
- DB (MySQL/MariaDB)
- apache/nginx (Vi bruker nginx)
- WEB-API fra [https://github.com/Zkrgu/cookie-clicker](https://github.com/Zkrgu/cookie-clicker)
  - node.js
- Dette prosjektet

#### Server oppsett

Server hostname i DNS er **api.cookie** (for API/WS) og **db.cookie** (Leaderboard/db)  
(API og DB er laget for å kunne være separate maskiner)  

SQL filene for oppsett av DB ligger under **sql/**  

Alle filer under **site/server/** legges i webserver root  

---

### Klienter

- DNS satt til server
- Klient ID
- webapi.js fra serveren (simplifisering av datasending)

Alle klienetene har egne klikkere, oppsett derifra.  
