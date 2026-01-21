# Weather App Assignment

This is a simple weather application built with Angular 19+ (latest stable) and NestJS. It allows users to search for current weather conditions by city name.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## Setup Steps

1.  **Clone the repository** (if not already done).
2.  **Install dependencies** for both client and server:
    ```bash
    npm install
    cd server && npm install
    cd ..
    ```
3.  **Configure Environment Variables**:
    - Create a `.env` file in the `server` directory.
    - Add your OpenWeatherMap API Key:
      ```env
      OPENWEATHER_API_KEY=your_api_key_here
      ```
      (A placeholder file has been created at `server/.env`).

## How to Run Locally

To run both the Angular client and the NestJS server concurrently:

```bash
npm run dev
```

- **Client**: http://localhost:4200
- **Server**: http://localhost:3000

Alternatively, you can run them separately:
- Server: `cd server && npm run start:dev`
- Client: `ng serve`

## Features & Design Decisions

### Architecture
- **Proxy Server**: A NestJS backend is used to proxy requests to OpenWeatherMap. This ensures the API key is never exposed to the client browser, adhering to security best practices.
- **Standalone Components**: The Angular application uses standalone components (`WeatherComponent`) for a modern, modular architecture, reducing boilerplate (NgModule).
- **Service-based Logic**: `WeatherService` handles all HTTP communication and error transformation.

### State Management (NgRx)
The application uses NgRx for robust state management, following the Redux pattern. The state logic is located in `src/store`.

#### Directory Structure
- `actions/`: Defines dispatchable actions (`[Weather] Load Weather`, `Success`, `Failure`).
- `reducers/`: Pure functions that handle state transitions based on actions.
- `selectors/`: Memoized functions to select specific slices of state (`selectWeather`, `selectLoading`).
- `effects/`: Handles side effects (API calls) to keep components pure.
- `models/`: Interface definitions for the state.

#### How to Add New Features
1. **Define State Model**: Update or create a state interface in `models/`.
2. **Create Actions**: Define events in `actions/`.
3. **Update Reducer**: Handle the new actions to update the state.
4. **Create Effects**: Handle any side effects (async operations).
5. **Create Selectors**: Expose data to components.
6. **Register**: Ensure the reducer and effects are registered in `app.config.ts`.


### Weather Data
- **Temperature**: Displayed in **Celsius** (`units=metric` is used in the API call) based on the environment variable `temperatureUnit` else default to metric.
- **Error Handling**:
  - **404 (City Not Found)**: Displays a specific user-friendly message.
  - **Other Errors**: Displays a generic error message for network issues or server errors.
  - Errors are displayed in the UI via an alert box.
- **Loading State**: The submit button is disabled and shows "Loading..." while the request is in progress.

### Testing
- Unit tests are implemented using **Jest**.
- Business logic in `WeatherService` and `WeatherComponent` is fully covered.
- Run tests with:
  ```bash
  npm test
  ```

## Deployment Notes (Optional)
- Build the Angular app: `ng build` (output in `dist/`).
- Build the NestJS app: `cd server && npm run build` (output in `server/dist/`).
- Serve the Angular static files using the NestJS server or a separate web server (Nginx/Apache).
- Ensure `OPENWEATHER_API_KEY` is set in the production environment.


## Notes
If I had more time I would:
- Add more unit tests for edge cases.
- Implement end-to-end tests using tools like Protractor.
- Optimize the proxy server to handle multiple concurrent requests more efficiently.
- Add a feature to allow users to switch between Celsius and Fahrenheit.
- Add logging to the proxy server to track requests, responses, and errors.
- Improve the error handling for the proxy server to provide more detailed error messages.
- Add a loading indicator for the proxy server to show when requests are being processed.
- Cache the weather data for a certain period to reduce the number of API calls.


