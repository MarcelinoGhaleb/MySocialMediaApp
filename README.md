# MySocialMediaApp

Welcome to MySocialMediaApp, a React Native application for social media interaction. This application allows users to post tweets, view their feed, compose new tweets, and manage their profile.

## Features

- **Feed Screen**: View a feed of superhero posts fetched from an external API.
- **Compose Screen**: Compose and post new tweets with a character limit of 280.
- **Profile Screen**: View user profile information and manage posted tweets.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/MySocialMediaApp.git
```

2. Navigate to the project directory:

```bash
cd MySocialMediaApp
```

3. Install dependencies:

```bash
npm install
```

4. Run the application:

```bash
npm start
```

5. Follow the instructions in the console to launch the app on a simulator or device.

## Dependencies

- `react`: JavaScript library for building user interfaces.
- `react-native`: Framework for building native applications using React.
- `@react-navigation/native`: Routing and navigation library for React Native.
- `@reduxjs/toolkit`: Toolkit for efficient Redux development.
- `axios`: Promise-based HTTP client for making API requests.
- `notifee`: Library for displaying notifications in React Native.

## Development

- This project uses Redux for state management. Redux slices are defined for authentication, user profile, and tweet-related actions.
- Navigation between screens is handled using React Navigation.
- External API requests are made using Axios.
- Notifications are implemented using Notifee.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug fixes, please submit an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
