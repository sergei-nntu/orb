# Installation, Configuration, and Launch
There are three methods for installing, configuring, and launching the orb infrastructure:

1. Docker (docker compose)
2. Web interface (orb) 
3. Full environment (orb, orm, orm-ros)

# docker


# orb
For this project, ensure that you download and install Node.js version 20 or later from the official Node.js website.

1. Clone the repository from GitHub:

```
git clone https://github.com/sergei-nntu/orb.git
```

2. Navigate to the project directory:
```
cd orb/web
```

3. Change the proxy by entering **localhost** instead of **ros** in the package.json:
```
"proxy": "http://localhost:5001"
```

4. Install dependencies:
```
npm install
```

5. Start the development server:
```
npm run start
```