# Bank For All - Peer Share and Microfinance Platform for All

This is an open-source project aimed at creating a peer sharing and microfinance platform for people who unemployed or low-income individuals or groups who otherwise would have no other access to financial services.

The platform will enable them to access loans, as well as share resources and knowledge with each other, thereby creating a sustainable community.

> If any of you have an idea to share with us, please feel free to open a pull request.

## Workflow

- DB diagram: https://dbdiagram.io/d/6404ccf2296d97641d8589c7 <br />
- Source api: https://docs.google.com/document/d/1CPJrx3pA0Jv5GVAcEpaOK1QWkTm8xNUX-t-2zn_s8hI/edit

## Technologies Used

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [AWS](https://aws.amazon.com/)

## How to run the project

**Clone the project**

```bash
git clone https://github.com/bankforall/api.git
```

**Change directory**

```bash
cd api
```

**Create a .env file**

```bash
touch .env
```

**Install dependencies**

```bash
npm install
```

**Run the project**

```bash
npm run dev
```

## .env file example

```bash
PORT=5000
MONGO_URI=
JWT_SECRET_KEY=
NODE_ENV=
```

## API Documentation

The API documentation can be found [https://localhost:5000/docs](https://localhost:5000/docs).

> Note: The API documentation is only available in development mode.

## Contributing

To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes and commit them to the new branch.
4. Push the branch to your forked repository.
5. Create a pull request to the main repository.

## Contribution Guidelines

We welcome contributions from developers of all skill levels. Whether you're a seasoned developer or just starting out, there are many ways you can contribute to the project.

### Reporting Issues

If you find a bug or issue with the platform, please report it by opening an issue on our GitHub repository. Be sure to include as much detail as possible, including steps to reproduce the issue.

### Submitting Bug Fixes or Features

If you'd like to contribute code to the project, you can do so by submitting a pull request. Before submitting a pull request, please make sure to follow our coding standards and ensure that your changes are thoroughly tested.

### Contributing to Documentation

We also welcome contributions to the project's documentation. If you notice any errors or omissions in the documentation, please submit a pull request with your proposed changes.

## License

This project is licensed under the [MIT License](./LICENSE).
