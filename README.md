# nimbus-rate-ts
<h1>
<a href="https://app.diagrams.net/#G1NrKxvHgq6qztJFbl_JirAOgyKuR_3v2E">Structure project link</a>
</h1>
This is monorepo application NestJS
configure monorepo in nest-cli.json
structure :
<ol>
    <li><b>apps</b>
        <ol>
            <li>nimbus-api
            <p>REST <a href="http://116.203.136.246:8081/doc/">documentation</a></p>
            </li>
            <li>socket-client</li>
            <li>collector</li>
            <li>statistic</li>
        </ol>
    </li>

<li><b>constant</b>
<p>all constants application</p>
</li>
    
<li><b>contract</b>
    <ol>
        <li>nimbus-contract-initial30-new
            <p>contract between 11377186-19175040</p>
        </li>
        <li>nimbus-contract-initial30-old
            <p>contract between 11368496,11377185</p>
        </li>
        <li>nimbus-contract-main
            <p>This is main contracts between 19263181 - .....</p>
        </li>
        <li>nimbus-contract-star
            <p>This contract was added to receive data and 
            rates between blocks 19175041-19263180. 
            In the main contract in these the wrong course</p>
        </li>
    </ol>
</li>
<li>databases
    <ol>nimbus-rate
        <li>contracts
        <p>All observed contracts are filled with data by default 
        Only one contract can be active at one time.</p>
        </li>
        <li>lost-block
        <p>Table for storing uncounted blocks. It is necessary to 
        enter initial values, contract data ranges from the table. 
        Further, new values of unread block ranges are 
        added automatically</p>
        </li>
        <li>rate
        <p>The main array of rate data. Filled in automatically</p>
        </li>
        <li>tokens
        <p>The table contains token statistics. Filled in manually</p>
        </li>
    </ol>
</li>
<li>envs
<p>Constant storage</p>
</li>
<li>public
<p>Test page to control socket operation. Available at <a href="http://116.203.136.246:8081/socket/index.html">address</a>></p>
</li>

</ol>

### WEB3-CLIENT

Service for connecting to web3 using REST API and SOCKET
start from prod

````bash
npm run build
npm run prod:wss
````
or start from dev
````bash
npm run dev:wss
````

### NIMBUS-API
````bash
npm run build
npm run prod:api
````
or start from dev
````bash
npm run dev:api
````

###### NIMBUS-API-REST
<p>url <a href="https://exchange-rate-ts.nimbusplatform.io/api/v1">https://exchange-rate-ts.nimbusplatform.io/api/v1</a></p>
<p>url <a href="http://116.203.136.246:8081/doc">documentation</a><p>
<p>url from <a href="http://116.203.136.246:8081/api/v1/">request</a> .../api/v1/</p>

###### NIMBUS-API-SOCKET
example connected:
<p>url <a href="https://exchange-rate-ts.nimbusplatform.io/socket">https://exchange-rate-ts.nimbusplatform.io/socket</a></p>
http://116.203.136.246:8081/socket/index.html

source example: 
/public/socket/index.html
/public/socket/main.js


````typescript
message: IWebsocketMessage = {
type: 'receive_rate',
block: 1234567,
data: {
    token: Object [
      {symbol: 'BNB', rate: '100000000', time: 11234567890},
      {symbol: 'BUSD', rate: '100000000', time: 11234567890}
    ]
    }
}

.on('subscribe')
.on('message', message)
````

###### NIMBUS-COLLECTOR
example connected
<p>url production <a href="https://exchange-rate-collector-ts.nimbusplatform.io/api/v1">https://exchange-rate-collector-ts.nimbusplatform.io/api/v1</a></p>
<p>url develop <a href="http://116.203.136.246:8059/api/v1">http://116.203.136.246:8059/api/v1</a></p>
<p>url <a href="http://116.203.136.246:8059/doc">documentation</a><p>

````bash
npm run build
npm run prod:coll
````
or start from dev
````bash
npm run dev:coll
````

###### NIMBUS-STATISTIC
example connected
<p>url production <a href="https://exchange-rate-statistic-ts.nimbusplatform.io/api/v1">https://exchange-rate-statistic-ts.nimbusplatform.io/api/v1</a></p>
<p>url develop <a href="http://116.203.136.246:8058/api/v1">http://116.203.136.246:8058/api/v1</a></p>
<p>url <a href="http://116.203.136.246:8058/doc">documentation</a><p>

````bash
npm run build
npm run prod:stat
````
or start from dev
````bash
npm run dev:stat
````
