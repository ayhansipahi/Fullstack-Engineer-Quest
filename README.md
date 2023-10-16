# ParcelLab Fullstack Engineer Quest

Welcome to the ParcelLab Fullstack Engineer Quest. This repository demonstrates a full-stack application utilizing a Next.js frontend and an Express.js backend, structured as a TurboRepo.

## Project Structure

This TurboRepo is organized into applications and packages, located within the `/apps` and `/packages` directories respectively.

### Applications

- **web**: A Next.js application that serves as the frontend of the quest.
- **api**: An Express.js server that handles backend operations.

### Packages

- **csv-parser**: A CSV parser that converts CSV files into JSON.
- **eslint-config-custom**: ESLint configurations for client-side applications.
- **eslint-config-custom-server**: ESLint configurations for server-side applications.
- **scripts**: Jest configurations for testing.
- **logger**: An isomorphic logger, a small wrapper around console.log.
- **tsconfig**: Shared tsconfig.json used throughout the monorepo.

## Running the Project Locally

1. Clone the repository to your local machine.
2. Navigate to the repository directory.
3. Install the dependencies by running the following command:
   ```bash
   yarn install
   ```
4. Build the project:
   ```bash
   yarn build
   ```
5. Start the development server:
   ```bash
   yarn dev
   ```

Now, the Next.js application should be running on [http://localhost:3000](http://localhost:3000), and the Express.js server should be running on [http://localhost:3001](http://localhost:3001).

## Testing

To run the tests across the monorepo, use the following command:

```bash
yarn test
```

## Linting

To lint the project, use the following command:

```bash
yarn lint
```

## Technologies Used

- **Next.js**: For the frontend application.
- **Express.js**: For the backend server.
- **React**: For building UI components.
- **TypeScript**: For static type checking.
- **ESLint**: For code linting.
- **Jest**: For testing.
- **Prettier**: For code formatting.

## License

This project is licensed under the MIT License.
