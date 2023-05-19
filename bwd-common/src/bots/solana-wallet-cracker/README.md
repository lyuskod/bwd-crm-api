
1. Install node.js from here: 
https://nodejs.org/en/download

2. After installation, open terminal (console) and type:
node -v

3. After performing step 2, you should see smth like:
v19.5.0

4. Type in console:
cd <path_to_our_scripts_folder>

PS: replace <path_to_our_scripts_folder> to path to our scripts folder on your computer.
It shoud look smth like
cd C:/Downloads/solana-wallet-cracker

5. Type in console the following command and wait for installation:
npm install

6. Type in console:
node run start

After that command, script will start to work.
If it finds wallet with any balance, then it will:
1 - create empty file '_____FOUND_____.txt' inside our scripts directory
2 - create file with publicKey, privateKey, balance, seed inside our root directory.
File name will be 'wallets.json'

After step 6, if you want to run script again. You can simply do:
1. Open terminal and type
cd <path_to_our_scripts_folder>

2. npm run start


Happy hacking! :)