import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
interface User {
    id?: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    city: string;
}
const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      first_name
      last_name
      birth_date
      city
    }
  }
`;

function AppContent() {
    const { refetch } = useQuery(GET_USERS);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    return (
        <>
            <h1>User Manager</h1>
            <UserForm refetch={refetch} editingUser={editingUser} setEditingUser={setEditingUser} />
            <UserList setEditingUser={setEditingUser} />
        </>
    );
}

export default function App() {
    return (
        <ApolloProvider client={client}>
            <div
                style={{
                    display: 'block',
                    minHeight: '100vh',
                    margin: 0,
                    padding: '2rem 2rem 4rem',
                    fontFamily: 'sans-serif',
                }}
            >
                <AppContent />
            </div>
        </ApolloProvider>
    );
}
