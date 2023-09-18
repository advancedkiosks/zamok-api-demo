# zamok-api-demo

Example usage of the Zamok WebView API

## Getting Started

1. Clone this repository.
2. ```
   git clone git@github.com:YOUR_USERNAME/zamok-api-demo.git
   cd zamok-api-demo
   git checkout dev
   npm install -g yarn
   yarn
   yarn start
   ```
   This will start the development server on port [8081](http://localhost:8081/).
3. Add `http://localhost:8081/?zamok=16.2.0` to [Webview API Origins](https://www.kioskdashboard.com/settings).
4. Set the [New Window Action](https://www.kioskdashboard.com/settings) to `newWindowToTab`
5. Set the [Kiosk Template](https://www.kioskdashboard.com/solution/homepage) to Website.
6. Change the URL to `http://localhost:8081/?zamok=16.2.0`.
7. Save and Apply changes.
8. Start kiosk.
